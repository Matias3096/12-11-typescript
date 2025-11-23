export class HttpService {

    constructor(private baseUrl: string) {}

    async get<T>(path: string): Promise<T> {
        const resp = await fetch(this.baseUrl + path);
        if (!resp.ok) throw new Error("Error HTTP: " + resp.status);
        return resp.json() as Promise<T>;
    }
}
