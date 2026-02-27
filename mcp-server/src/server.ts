/**
 * MCP Server — Applivery Documentation Tools
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { CmsClient, type Document } from "./cms-client.js";

/** Strip markdown to plain text for excerpts */
function stripMarkdown(md: string): string {
  return md
    .replace(/^---[\s\S]*?---\n*/m, "") // frontmatter
    .replace(/!\[.*?\]\(.*?\)/g, "")     // images
    .replace(/\[([^\]]+)\]\(.*?\)/g, "$1") // links → text
    .replace(/#{1,6}\s+/g, "")           // headings
    .replace(/[*_~`]+/g, "")             // bold/italic/code
    .replace(/>\s+/g, "")               // blockquotes
    .replace(/\|.*\|/g, "")             // tables
    .replace(/-{3,}/g, "")              // horizontal rules
    .replace(/\n{2,}/g, "\n")           // collapse newlines
    .trim();
}

/** Build a URL for a document */
function docUrl(doc: Document, siteUrl: string): string {
  const locale = doc.locale || "en";
  // Path from CMS is like "content/en/docs/device-management/android/index.mdx"
  // We need to derive the URL slug from it
  let slug = doc.path || "";
  // Remove content/{locale}/ prefix
  slug = slug.replace(/^content\/[a-z]{2}\//, "");
  // Remove file extension
  slug = slug.replace(/\.(mdx?|md)$/, "");
  // Remove trailing /index
  slug = slug.replace(/\/index$/, "");
  return `${siteUrl}/${locale}/${slug}`;
}

export function createServer(cmsClient: CmsClient, siteUrl: string): McpServer {
  const server = new McpServer({
    name: "applivery-docs",
    version: "1.0.0",
  });

  // Tool: search_docs
  server.tool(
    "search_docs",
    "Search Applivery documentation by keyword or phrase. Returns matching pages with titles, descriptions, and content excerpts.",
    {
      query: z.string().describe("Search query text"),
      collection: z.string().optional().describe("Filter by collection (e.g., docs, glossary, api)"),
      locale: z.string().optional().default("en").describe("Locale code (en, es, fr, de, pt, it, ja, zh, ko)"),
      limit: z.number().min(1).max(20).optional().default(10).describe("Maximum number of results"),
    },
    async ({ query, collection, locale, limit }) => {
      const result = await cmsClient.searchDocuments(query, { collection, locale, limit });

      const items = result.documents.map((doc) => {
        const excerpt = stripMarkdown(doc.content || "").slice(0, 300);
        return {
          title: doc.title,
          path: doc.path,
          description: doc.description || "",
          excerpt: excerpt + (excerpt.length >= 300 ? "..." : ""),
          url: docUrl(doc, siteUrl),
          collection: doc.collection,
          locale: doc.locale,
        };
      });

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify({ results: items, total: result.total }, null, 2),
          },
        ],
      };
    },
  );

  // Tool: get_doc_page
  server.tool(
    "get_doc_page",
    "Get the full content of a specific documentation page by its path. Returns the complete page content in markdown format.",
    {
      path: z.string().describe("Document path (e.g., 'docs/device-management/android/enrollment')"),
      locale: z.string().optional().default("en").describe("Locale code"),
    },
    async ({ path, locale }) => {
      const doc = await cmsClient.getDocumentByPath(path, locale);

      if (!doc) {
        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify({ error: "Document not found", path, locale }),
            },
          ],
          isError: true,
        };
      }

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                title: doc.title,
                description: doc.description || "",
                content: doc.content,
                url: docUrl(doc, siteUrl),
                collection: doc.collection,
                locale: doc.locale,
                updated: doc.updated_date || doc.pub_date || null,
              },
              null,
              2,
            ),
          },
        ],
      };
    },
  );

  // Tool: list_docs
  server.tool(
    "list_docs",
    "List available documentation pages. Optionally filter by collection or locale. Returns page titles and paths for navigation.",
    {
      collection: z.string().optional().describe("Filter by collection (e.g., docs, glossary, api)"),
      locale: z.string().optional().default("en").describe("Locale code"),
      limit: z.number().min(1).max(100).optional().default(50).describe("Maximum number of results"),
      offset: z.number().min(0).optional().default(0).describe("Pagination offset"),
    },
    async ({ collection, locale, limit, offset }) => {
      const result = await cmsClient.getDocuments({
        collection,
        locale,
        limit,
        offset,
        visible: true,
      });

      const items = result.documents.map((doc) => ({
        title: doc.title,
        path: doc.path,
        description: doc.description || "",
        collection: doc.collection,
        locale: doc.locale,
        url: docUrl(doc, siteUrl),
      }));

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                documents: items,
                total: result.total,
                hasMore: offset + limit < result.total,
              },
              null,
              2,
            ),
          },
        ],
      };
    },
  );

  return server;
}
