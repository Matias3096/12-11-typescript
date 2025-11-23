import { Product } from "../types/Product";
import { ProductModel } from "./ProductModel";

export class ProductFactory {

    static create(product: Product): ProductModel {
        return new ProductModel(product);
    }

    static createMany(products: Product[]): ProductModel[] {
        return products.map(p => new ProductModel(p));
    }
}
