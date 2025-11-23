import { productService } from "./ProductService";
import { ProductModel } from "../models/ProductModel";

export class SearchService {
    private cache = new Map<string, ProductModel[]>();
    private debounceTimer: NodeJS.Timeout | null = null;

    search(query: string, delay = 400): Promise<ProductModel[]> {
        return new Promise((resolve) => {

            // Si ya está en cache → devolver
            if (this.cache.has(query)) {
                return resolve(this.cache.get(query)!);
            }

            //  Debounce — cancelar búsquedas previas
            if (this.debounceTimer) clearTimeout(this.debounceTimer);

            this.debounceTimer = setTimeout(async () => {
                const productos = await productService.getAllProducts();

                // Filtrar por coincidencia en el título
                const resultado = productos.filter(p =>
                    p.title.toLowerCase().includes(query.toLowerCase())
                );

                // Convertir a ProductModel
                const models = resultado.map(p => new ProductModel(p));

                // Guardar en caché
                this.cache.set(query, models);

                resolve(models);

            }, delay);
        });
    }
}
