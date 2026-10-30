import "server-only";

class D1Client {
  private accountId: string;
  private databaseId: string;
  private apiToken: string;

  constructor() {
    this.accountId = process.env.CLOUDFLARE_ACCOUNT_ID || "61080fa86f61d83f489f7c4ea66616b3";
    this.databaseId = process.env.CLOUDFLARE_D1_DATABASE_ID || "9b4e9f02-2cf8-4848-bd4a-ee2e72e95160";
    this.apiToken = process.env.CLOUDFLARE_API_TOKEN || "";
  }

  async query<T = any>(sql: string, params: any[] = []): Promise<T[]> {
    const url = `https://api.cloudflare.com/client/v4/accounts/${this.accountId}/d1/database/${this.databaseId}/query`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sql, params }),
      cache: "no-store",
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`D1 Query Error (${response.status}): ${errText}`);
    }

    const data = await response.json();
    if (!data.success || !data.result?.[0]?.success) {
      const errMessage = data.errors?.[0]?.message || data.result?.[0]?.error || "Unknown D1 error";
      throw new Error(`D1 Execution Error: ${errMessage}`);
    }

    return (data.result[0].results || []) as T[];
  }

  async first<T = any>(sql: string, params: any[] = []): Promise<T | null> {
    const rows = await this.query<T>(sql, params);
    return rows.length > 0 ? rows[0] : null;
  }

  async execute(sql: string, params: any[] = []): Promise<{ success: boolean; changes: number; lastRowId?: number }> {
    const url = `https://api.cloudflare.com/client/v4/accounts/${this.accountId}/d1/database/${this.databaseId}/query`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sql, params }),
      cache: "no-store",
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`D1 Execute Error (${response.status}): ${errText}`);
    }

    const data = await response.json();
    if (!data.success) {
      const errMessage = data.errors?.[0]?.message || "Failed executing D1 statement";
      throw new Error(`D1 Execution Error: ${errMessage}`);
    }

    const meta = data.result?.[0]?.meta;
    return {
      success: true,
      changes: meta?.changes ?? 0,
      lastRowId: meta?.last_row_id,
    };
  }

  async batch(statements: { sql: string; params?: any[] }[]): Promise<any[]> {
    const url = `https://api.cloudflare.com/client/v4/accounts/${this.accountId}/d1/database/${this.databaseId}/query`;
    const payload = statements.map((s) => ({ sql: s.sql, params: s.params || [] }));

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`D1 Batch Error: ${errText}`);
    }

    const data = await response.json();
    return data.result || [];
  }
}

export const d1 = new D1Client();

