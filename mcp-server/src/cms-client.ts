/**
 * CMS Client for MCP Server
 * Mirrors patterns from the frontend src/lib/cms.ts
 */

export interface Document {
  id: string;
  path: string;
  title: string;
  description?: string;
  content: string;
  collection: string;
  locale: string;
  type: "article" | "archive";
  sidebar_position?: number;
  visible?: boolean | number;
  item_name?: string;
  icon?: string;
  keywords?: string[];
  category?: string[];
  section?: string[];
  slug?: string;
  author?: string;
  reading_time?: number;
  updated_date?: string;
  pub_date?: string;
}

export interface DocumentsResponse {
  documents: Document[];
  total: number;
  limit: number;
  offset: number;
}

export interface GetDocumentsOptions {
  collection?: string;
  locale?: string;
  type?: string;
  search?: string;
  limit?: number;
  offset?: number;
  visible?: boolean;
}

export class CmsClient {
  constructor(
    private baseUrl: string,
    private apiKey?: string,
  ) {}

  private async request<T>(endpoint: string): Promise<T> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (this.apiKey) {
      headers["Authorization"] = `Bearer ${this.apiKey}`;
      headers["x-api-key"] = this.apiKey;
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      throw new Error(`CMS API error: ${response.status} ${response.statusText}`);
    }

    return response.json() as Promise<T>;
  }

  async getDocuments(options: GetDocumentsOptions = {}): Promise<DocumentsResponse> {
    const params = new URLSearchParams();

    for (const [key, value] of Object.entries(options)) {
      if (value !== undefined && value !== null) {
        params.append(key, String(value));
      }
    }

    const query = params.toString();
    const endpoint = query ? `/api/documents?${query}` : "/api/documents";
    return this.request<DocumentsResponse>(endpoint);
  }

  async getDocumentByPath(path: string, locale?: string): Promise<Document | null> {
    const params = new URLSearchParams({ path });
    if (locale) params.append("locale", locale);

    try {
      const result = await this.request<DocumentsResponse>(`/api/documents?${params}`);
      return result.documents?.[0] ?? null;
    } catch {
      return null;
    }
  }

  async searchDocuments(
    query: string,
    options: { collection?: string; locale?: string; limit?: number } = {},
  ): Promise<DocumentsResponse> {
    return this.getDocuments({
      search: query,
      locale: options.locale ?? "en",
      collection: options.collection,
      limit: options.limit ?? 10,
      visible: true,
    });
  }
}
