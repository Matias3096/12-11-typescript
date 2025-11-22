import { Product } from "../types/Product";


//ORDENAMIENTOS - SORT

//Ordenar por precio ascendente
export function sortByPriceAsc(products : Product[]): Product[] {
    return [...products].sort((a, b) => a.price - b.price);
}

//Ordenar por precio descendente
export function sortByPriceDesc(products: Product[]): Product[] {
    return [...products].sort((a, b) => b.price - a.price);
}

//Ordenar alfabeticamente por titulo
export function sortBytitle(products: Product[]): Product[] {
    return [...products].sort((a, b) => a.title.localeCompare(b.title));
}


//TRANSFORMACIONES - MAP

//Crear un resumen del producto
export function mapToProductSummary(products: Product[]) {
    return products.map(p => ({
        id: p.id,
        title: p.title,
        price: p.price,
        category: p.category
    }));
}

//Agregar un campo calculado (precio con IVA)
export function mapWithTax(products: Product[], taxPercent: number) {
    return products.map (p => ({
        ...p,
        finalPrice: p.price * (1 + taxPercent / 100)
    }));
}

//ESTADISTICAS - REDUCE

//Calcular precio promedio
export function averagePrice(products: Product[]): number {
    if (products.length === 0) return 0;
    
    const total = products.reduce((acc,p) => acc + p.price, 0);
    return total / products.length;
}

//sumar todos los precios
export function totalPrice(products : Product[]): number {
   return products.reduce((acc, p) => acc + p.price,0);
}

//Contar productos por categoria
export function countByCategory(products: Product[]) {
    return products.reduce((acc, p) => {
        acc[p.category] = (acc[p.category] || 0) + 1;
        return acc;
    }, {} as Record <string, number>);

}