import { Product } from '../types/Product';
//Filtrar por categoria
export function filterByCategory(products: Product[], category: string): Product[] {
    return products.filter((p) => p.category === category);
}
//Filtrar por precio maximo
export function filterByMaxPrice(products: Product[], maxPrice: number): Product[] {
    return products.filter((p) => p.price <= maxPrice);
}
//Filtrar por precio minimo
export function filterByMinPrice(products : Product[], minPrice: number): Product[]{
    return products.filter((p) => p.price >= minPrice );
}
//Buscar por titulo
export function searchByTitle(products: Product[], text: string): Product[] {
    const lower = text.toLowerCase();
    return products.filter((p) => p.title.toLowerCase().includes(lower));
}


//Filtro avanzado ejercicio del tp
export function filtrarProductos (
    productos: Product[],
    precioMin?: number,
    precioMax?: number,
    categoria?: string
): Product [] {
    return productos.filter((p) => {
        //Filtro por precio minimo
        if (precioMin !== undefined && p.price < precioMin) {
            return false;
        }

        //Filtro por precio maximo
        if (precioMax !== undefined && p.price > precioMax ) {
            return false;
        }

        //Filtro por categoria
        if (categoria !== undefined && p.category !== categoria) {
            return false;
        }

        return true;  // Si cumple todo, lo dejamos pasar
    });
}