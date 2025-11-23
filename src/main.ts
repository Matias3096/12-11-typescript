import { productService } from './services/ProductService';
import { filtrarProductos }  from "./utils/ProductFilters";
import { ShoppingCart } from "./services/ShoppingCart";
import { ProductModel } from "./models/ProductModel";
import { SearchService} from './services/SearchServices';

// Estadísticas avanzadas
import {
  averagePriceByCategory,
  bestRatedProduct,
  priceDistribution
} from './utils/ProductTransformations';

// Filtros
import {
  filterByCategory,
  filterByMaxPrice,
  filterByMinPrice,
  searchByTitle
} from "./utils/ProductFilters";

// Transformaciones / Ordenamientos
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

  try {
    const productos = await productService.getAllProducts();
    console.log("Productos obtenidos: ", productos.length);

    // ------------------------------------------------------------------------------------------------
    // 1) FILTROS
    // ------------------------------------------------------------------------------------------------
    console.log("\n ---FILTROS---");

    console.log("Electronics:", filterByCategory(productos, "electronics").length);
    console.log("Menores a 50:", filterByMaxPrice(productos, 50).length);
    console.log("Mayores o iguales a 100:", filterByMinPrice(productos, 100).length);
    console.log("Contiene 'bag':", searchByTitle(productos, "bag").length);

    // ------------------------------------------------------------------------------------------------
    // 2) ORDENAMIENTOS
    // ------------------------------------------------------------------------------------------------
    console.log("\n ---ORDENAMIENTOS---");
    console.log("Precio asc:", sortByPriceAsc(productos)[0]);
    console.log("Precio desc:", sortByPriceDesc(productos)[0]);
    console.log("Alfabético:", sortBytitle(productos)[0]);

    // ------------------------------------------------------------------------------------------------
    // 3) TRANSFORMACIONES
    // ------------------------------------------------------------------------------------------------
    console.log("\n ---TRANSFORMACIONES---");
    console.log("Resumen:", mapToProductSummary(productos)[0]);
    console.log("Con IVA 21%:", mapWithTax(productos, 21)[0]);

    // ------------------------------------------------------------------------------------------------
    // 4) REDUCE / ESTADÍSTICAS
    // ------------------------------------------------------------------------------------------------
    console.log("\n ---ESTADISTICAS---");
    console.log("Promedio:", averagePrice(productos));
    console.log("Total:", totalPrice(productos));
    console.log("Conteo por categoría:", countByCategory(productos));

    // ------------------------------------------------------------------------------------------------
    // 5) FILTRO AVANZADO
    // ------------------------------------------------------------------------------------------------
    console.log("\n ---FILTRO AVANZADO---");

    console.log("Electronics 50-200:", filtrarProductos(productos, 50, 200, "electronics").length);
    console.log(">=100:", filtrarProductos(productos, 100).length);
    console.log("Solo categoría jewelery:", filtrarProductos(productos, undefined, undefined, "jewelery").length);
    console.log("Sin filtros:", filtrarProductos(productos).length);

    // ------------------------------------------------------------------------------------------------
    // 6) SHOPPING CART
    // ------------------------------------------------------------------------------------------------
    console.log("\n ---CARRITO---");

    const cart = new ShoppingCart();
    cart.addProduct(productos[0]);
    cart.addProduct(productos[5]);
    cart.addProduct(productos[10]);

    console.log("Items:", cart.getItems().length);
    console.log("Total sin IVA:", cart.getTotal());
    console.log("Total con IVA:", cart.getTotalConIva(21));

    cart.removeProduct(productos[5].id);
    console.log("Items tras eliminar:", cart.getItems().length);

    cart.clear();
    console.log("Carrito vacío:", cart.getItems().length);

    // ------------------------------------------------------------------------------------------------
    // 7) ESTADISTICAS AVANZADAS
    // ------------------------------------------------------------------------------------------------
    console.log("\n ---ESTADISTICAS AVANZADAS---");

    console.log("Promedio por categoría:", averagePriceByCategory(productos));
    console.log("Mejor valorado:", bestRatedProduct(productos));
    console.log("Distribución precios:", priceDistribution(productos));

    // PRODUCT MODEL TESTS
    console.log("\n ---ProductModel Tests---");

    // Convertir Product -> ProductModel
    const productModels = productos.map(p => new ProductModel(p));

    console.log("Primer producto con IVA (21%)", productModels[0].getPriceWithTax(21));
    console.log("Descripción corta:", productModels[0].shortDescription());
    console.log("¿Es premium?", productModels[0].isPremium());

  } catch (error) {
    console.log("Error en ejecución:", error);
  }



  //BUSQUEDAS AVANZADAS
  console.log("\n--Buscador con cache y Debounce--");
  const searchService = new SearchService();


  //1° Busqueda (toca la API)
  const r1 = await searchService.search("bag");
  console.log("Busqueda 1 (bag): ", r1.length);

  //2° Busqueda igual -> viene de cache(rapido)
  const r2 = await searchService.search("bag");
  console.log("Busqueda 2 (cache): ",r2.length);

  //Busqueda distinta
  const r3 = await searchService.search("Shirt");
  console.log("Busqueda 3 (shirt): ", r3.length);

}

main();
