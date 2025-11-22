import { HttpService } from "./HttpService";
import { Product } from "../types/Product";

export class ProductService {
  private http: HttpService;

  constructor(baseUrl = "https://fakestoreapi.com") {
    this.http = new HttpService(baseUrl);
  }

  async getAllProducts(): Promise<Product[]> {
    return this.http.get<Product[]>("/products");
  }

  async getProductById(id: number): Promise<Product> {
    return this.http.getById<Product>("/products", id);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    const encoded = encodeURIComponent(category);
    return this.http.get<Product[]>(`/products/category/${encoded}`);
  }
}

export const productService = new ProductService();
