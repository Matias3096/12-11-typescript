📦 Proyecto TypeScript – Trabajo Práctico
Programación Web / Desarrollo de Software
🚀 Tecnologías utilizadas

Node.js

TypeScript

ts-node

Imports/Exports (ESModules + CommonJS)

FakeStoreAPI

POO (Clases, Modelos, Interfaces)

Funciones avanzadas: map, filter, reduce

📁 Estructura del proyecto
src/
 ├── main.ts
 ├── services/
 │     ├── HttpService.ts
 │     ├── ProductService.ts
 ├── utils/
 │     ├── ProductFilters.ts
 │     ├── ProductTransformations.ts
 ├── models/
 │     ├── ProductModel.ts
 │     ├── ProductFactory.ts
 ├── types/
       ├── Product.ts

✅ Funcionalidades implementadas
1. Filtrado de productos

Por categoría

Por precio máximo / mínimo

Por texto en título

Filtro avanzado con parámetros opcionales

2. Carrito de compras

Agregar productos

Quitar productos

Calcular total

Total con IVA

Vaciar carrito

3. Transformaciones

Ordenamientos

Map con IVA

Map resumen

Modelos OOP → ProductModel

4. Estadísticas con reduce

Precio promedio

Total

Conteo por categoría

Promedio por categoría

Distribución por rangos

Mejor valorado

5. Uso de servicios (API REST)

HttpService para GET

ProductService para productos

ProductFactory para crear modelos

🛠 Cómo instalar

Clonar el repositorio

Instalar dependencias:

npm install

▶️ Cómo ejecutar el proyecto
npx ts-node src/main.ts

📚 Qué se aprende en este TP

TypeScript real aplicado

Manejo de modelos + factory

Arquitectura por capas

Manipulación de arrays avanzada

Uso de API REST

Validaciones + try/catch

Buenas prácticas de estructura

👨‍💻 Autor

Matías Fernández – Desarrollo de Software
Proyecto realizado con acompañamiento pedagógico paso a paso.