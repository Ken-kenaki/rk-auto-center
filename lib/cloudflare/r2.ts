import "server-only";

export class R2Client {
  private accountId: string;
  private bucketName: string;
  private apiToken: string;
  private publicDomain: string;

  constructor() {
    this.accountId = process.env.CLOUDFLARE_ACCOUNT_ID || "61080fa86f61d83f489f7c4ea66616b3";
    this.bucketName = process.env.CLOUDFLARE_R2_BUCKET_NAME || "rkauto-assets";
    this.apiToken = process.env.CLOUDFLARE_API_TOKEN || "";
    this.publicDomain = process.env.R2_PUBLIC_URL || "";
  }

  getPublicUrl(key: string): string {
    if (this.publicDomain) {
      return `${this.publicDomain.replace(/\/$/, "")}/${key.replace(/^\//, "")}`;
    }
    return `/api/storage/preview?fileId=${encodeURIComponent(key)}`;
  }

  async upload(key: string, data: BodyInit, contentType: string = "application/octet-stream"): Promise<boolean> {
    try {
      const cleanKey = key.replace(/^\//, "");
      const url = `https://api.cloudflare.com/client/v4/accounts/${this.accountId}/r2/buckets/${this.bucketName}/objects/${encodeURIComponent(cleanKey)}`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${this.apiToken}`,
          "Content-Type": contentType,
        },
        body: data,
      });
      return response.ok;
    } catch (err) {
      console.error("R2 upload error:", err);
      return false;
    }
  }

  async download(key: string): Promise<{ data: ArrayBuffer; contentType: string } | null> {
    try {
      const cleanKey = key.replace(/^\//, "");
      const url = `https://api.cloudflare.com/client/v4/accounts/${this.accountId}/r2/buckets/${this.bucketName}/objects/${encodeURIComponent(cleanKey)}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.apiToken}`,
        },
      });

      if (!response.ok) return null;
      const contentType = response.headers.get("content-type") || "image/jpeg";
      const data = await response.arrayBuffer();
      return { data, contentType };
    } catch (err) {
      console.error("R2 download error:", err);
      return null;
    }
  }

  async delete(key: string): Promise<boolean> {
    try {
      const cleanKey = key.replace(/^\//, "");
      const url = `https://api.cloudflare.com/client/v4/accounts/${this.accountId}/r2/buckets/${this.bucketName}/objects/${encodeURIComponent(cleanKey)}`;
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${this.apiToken}`,
        },
      });
      return response.ok;
    } catch (err) {
      console.error("R2 delete error:", err);
      return false;
    }
  }
}

export const r2 = new R2Client();

