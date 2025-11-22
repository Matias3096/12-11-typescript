import { productService } from "./services/ProductService";

async function main() {
  const products = await productService.getAllProducts();
  console.log("Productos cargados:", products.length);

  for (const p of products) {
    console.log(`${p.id} - ${p.title}`);
  }
}

main();
