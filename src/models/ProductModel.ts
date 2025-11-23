import { Product, Rating  } from "../types/Product";

export class ProductModel {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {rate: number; count: number};


    constructor(product: Product) {
        this.id = product.id;
        this. title = product.title;
        this.price = product.price;
        this.description = product.description;
        this.category = product.description;
        this.category = product.category;
        this.image = product.image;
        this.rating = product.rating;
    }

    //Metodos propios del producto

    getPriceWithTax(TaxPercent: number): number {
        return this.price * (1 + TaxPercent / 100);
    }

    shortDescription(maxLength = 40 ): string {
        return this.description.length <= maxLength
        ? this.description
        : this.description.slice(0, maxLength) + "...";
    }
    
    isPremium(): boolean {
        return this.price >= 100;
    }
}