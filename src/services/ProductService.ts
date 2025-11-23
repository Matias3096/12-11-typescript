import { HttpService } from "./HttpService";
import { Product } from "../types/Product";
import { ProductFactory } from "../models/ProductFactory";

class ProductService {
    private http = new HttpService("https://fakestoreapi.com");

    async getAllProducts(): Promise<Product[]> {
        const products = await this.http.get<Product[]>("/products");
        return products;
    }

    async getProductById(id: number): Promise<Product> {
        return await this.http.get<Product>(`/products/${id}`);
    }
}

export const productService = new ProductService();
