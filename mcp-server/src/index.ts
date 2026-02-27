#!/usr/bin/env node

/**
 * Applivery Docs MCP Server
 *
 * Usage (stdio — for Cursor, VS Code, Cline, Windsurf, Claude Code):
 *   npx @applivery/docs-mcp-server --cms-url https://your-cms.example.com
 *
 * Usage (HTTP — for Claude.ai connectors and remote clients):
 *   npx @applivery/docs-mcp-server --http --cms-url https://your-cms.example.com
 *
 * Options:
 *   --cms-url <url>     CMS base URL (or env CMS_URL)
 *   --api-key <key>     CMS API key (or env CMS_API_KEY)
 *   --site-url <url>    Public docs site URL (or env SITE_URL, default: https://docs.applivery.com)
 *   --http              Run as HTTP server instead of stdio
 *   --port <port>       HTTP port (or env PORT, default: 3000)
 */

import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import express from "express";
import cors from "cors";
import { CmsClient } from "./cms-client.js";
import { createServer } from "./server.js";

function parseArgs(argv: string[]): Record<string, string> {
  const args: Record<string, string> = {};
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--http") {
      args["http"] = "true";
    } else if (arg.startsWith("--") && i + 1 < argv.length) {
      const key = arg.slice(2);
      args[key] = argv[++i];
    }
  }
  return args;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  const cmsUrl = args["cms-url"] || process.env.CMS_URL;
  const apiKey = args["api-key"] || process.env.CMS_API_KEY;
  const siteUrl = args["site-url"] || process.env.SITE_URL || "https://docs.applivery.com";
  const httpMode = args["http"] === "true" || process.env.MCP_HTTP === "true";
  const port = parseInt(args["port"] || process.env.PORT || "3000", 10);

  if (!cmsUrl) {
    console.error("Error: --cms-url is required (or set CMS_URL env variable)");
    console.error("Usage: applivery-docs-mcp --cms-url https://your-cms.example.com");
    process.exit(1);
  }

  const client = new CmsClient(cmsUrl, apiKey);

  if (httpMode) {
    await startHttpServer(client, siteUrl, port);
  } else {
    await startStdioServer(client, siteUrl);
  }
}

async function startStdioServer(client: CmsClient, siteUrl: string) {
  const server = createServer(client, siteUrl);
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

async function startHttpServer(client: CmsClient, siteUrl: string, port: number) {
  const app = express();
  app.use(cors());
  app.use(express.json());

  // Map to track transports by session ID
  const transports = new Map<string, StreamableHTTPServerTransport>();

  // Handle all MCP requests on /mcp
  app.all("/mcp", async (req, res) => {
    // Check for existing session
    const sessionId = req.headers["mcp-session-id"] as string | undefined;

    if (sessionId && transports.has(sessionId)) {
      // Reuse existing transport for this session
      const transport = transports.get(sessionId)!;
      await transport.handleRequest(req, res, req.body);
      return;
    }

    // New session — create transport + server
    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: () => crypto.randomUUID(),
    });

    transport.onclose = () => {
      if (transport.sessionId) {
        transports.delete(transport.sessionId);
      }
    };

    const server = createServer(client, siteUrl);
    await server.connect(transport);

    if (transport.sessionId) {
      transports.set(transport.sessionId, transport);
    }

    await transport.handleRequest(req, res, req.body);
  });

  // Health check
  app.get("/health", (_req, res) => {
    res.json({ status: "ok", sessions: transports.size });
  });

  app.listen(port, "0.0.0.0", () => {
    console.error(`Applivery Docs MCP Server (HTTP) listening on http://0.0.0.0:${port}/mcp`);
  });
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
