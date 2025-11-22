export class HttpService {
  constructor(private baseUrl: string) {}

  private buildUrl(endpoint: string): string {
    return `${this.baseUrl}${endpoint}`;
  }

  async get<T>(endpoint: string): Promise<T> {
    const url = this.buildUrl(endpoint);
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data: T = await response.json();
    return data;
  }

  async getById<T>(endpoint: string, id: number): Promise<T> {
    return this.get<T>(`${endpoint}/${id}`);
  }

  async post<T, B = Partial<T>>(endpoint: string, body: B): Promise<T> {
      const response = await fetch (this.buildUrl(endpoint),{
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    return (await response.json()) as T;
  }
}
