#!/usr/bin/env node

/**
 * Applivery Docs MCP Server
 *
 * Usage:
 *   npx @applivery/docs-mcp-server --cms-url https://your-cms.example.com
 *
 * Options:
 *   --cms-url <url>     CMS base URL (or env CMS_URL)
 *   --api-key <key>     CMS API key (or env CMS_API_KEY)
 *   --site-url <url>    Public docs site URL (or env SITE_URL, default: https://docs.applivery.com)
 */

import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CmsClient } from "./cms-client.js";
import { createServer } from "./server.js";

function parseArgs(argv: string[]): Record<string, string> {
  const args: Record<string, string> = {};
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg.startsWith("--") && i + 1 < argv.length) {
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

  if (!cmsUrl) {
    console.error("Error: --cms-url is required (or set CMS_URL env variable)");
    console.error("Usage: applivery-docs-mcp --cms-url https://your-cms.example.com");
    process.exit(1);
  }

  const client = new CmsClient(cmsUrl, apiKey);
  const server = createServer(client, siteUrl);

  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
