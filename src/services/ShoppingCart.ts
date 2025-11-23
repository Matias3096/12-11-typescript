import { Product } from '../types/Product';

export class ShoppingCart {

    //Atributo privado: lista interna de productos
    private items: Product [] = [];

    //Agregar producto al carrito
    addProduct(product: Product): void {
        this.items.push(product);
    }

    //Eliminar un producto por id(solo el primero que coincida)

    removeProduct(id: number): void {
        const index = this.items.findIndex(p => p.id === id);
        if (index !== -1) {
            this.items.splice(index, 1);
        }
    }

    //Obtener todos los productos 
    getItems (): Product [] {
        return [...this.items]; //Copia para proteger la lista interna
    }

    //Total sin IVA
    getTotal(): number {
        return this.items.reduce((acc,p) => acc + p.price, 0);
    }

    //Total con IVA aplicado
    //Ejemplo: si iva = 21 => total * 1.21
    getTotalConIva(iva: number): number {
        const total = this.getTotal();
        const multiplicador = 1 + iva / 100;
        return total * multiplicador;
    }

    //Vaciar carrito
    clear(): void {
        this.items= [];
    }


}