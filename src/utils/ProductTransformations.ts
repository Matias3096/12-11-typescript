import { Product, Rating } from '../types/Product';
type CategoryStats = {
    total : number;
    count: number;
}



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

//Promedio de precio por categoria
export function averagePriceByCategory(products: Product[]): Record <string, number> {
    // 1) Typing del acumulador
  const result: Record<string, CategoryStats> = products.reduce(
    (acc, p) => {
      if (!acc[p.category]) {
        acc[p.category] = { total: 0, count: 0 };
      }
      acc[p.category].total += p.price;
      acc[p.category].count += 1;
      return acc;
    },
    {} as Record<string, CategoryStats>
    );

    //Convertimos totales a promedios
    const averages: Record<string, number> ={};

    for (const category in result) {
        const {total, count} = result[category];
        averages[category] = total / count;
    }

    return averages;

}

//Producto mejor valorado
export function bestRatedProduct(products: Product[]): Product | null {
    if (products.length === 0 ) return null;

    return products.reduce((best, p) => {
        return p.rating.rate > best.rating.rate ? p : best;
    }, products[0]);
}

//Distribucion de precios por rangos
export function priceDistribution(products: Product[]): Record<string, number> {
    const ranges = {
        "0-50":0,
        "50-100":0,
        "100-200":0,
        "200-500":0,
        "500+":0
    };

    for (const p of products) {
        if ( p.price <50 ) ranges["0-50"]++;
        else if (p.price < 100) ranges["50-100"]++;
        else if (p.price < 200) ranges["100-200"]++;
        else if (p.price < 500) ranges["200-500"]++;
        else ranges["500+"]++;
    }

    return ranges;
}