import { productService } from "./services/ProductService";


// Filtros 
import {
  filterByCategory,
  filterByMaxPrice,
  filterByMinPrice,
  searchByTitle
} from "./utils/ProductFilters";

//Transformaciones y ordenamientos

import {
  sortByPriceAsc,
  sortByPriceDesc,
  sortBytitle,
  mapToProductSummary,
  mapWithTax,
  averagePrice,
  totalPrice,
  countByCategory
} from "./utils/ProductTransformations";

async function main (){
  const productos = await productService.getAllProducts();


  console.log("Todos los productos: ", productos.length);

  //Ejemplo 1: Filtrar por categoria
  const electronics = filterByCategory(productos, "electronics");
  console.log ("Electronics", electronics.length);

  //Ejemplo 2: Filtrar productos con precio <= 50
  const baratos = filterByMaxPrice(productos, 50);
  console.log("Menores a 50:", baratos.length);

  //Ejemplo 3: Filtrar productos >=100
  const premium = filterByMinPrice(productos, 100);
  console.log("Mayores o iguales a 100: ", premium.length);


  //Ejemplo 4: Buscar por nombre
  const busqueda = searchByTitle(productos, "bag");
  console.log("Contiene 'bag':",busqueda.length);
}

main();
