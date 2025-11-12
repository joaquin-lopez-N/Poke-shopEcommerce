# Pokémon Pet Shop 🐾

Proyecto final - E-commerce SPA desarrollado con **React**.

## Descripción

Pokémon Pet Shop es una Single Page Application que simula un e-commerce donde el usuario puede:

- Navegar un catálogo de Pokémon por categorías (tipos).
- Ver el detalle de cada Pokémon.
- Agregar unidades al carrito (según stock disponible).
- Visualizar el resumen de compra.
- Completar un formulario de checkout.
- Generar una orden almacenada en **Firestore**, obteniendo un `orderId`.

## Tecnologías

- React + Vite
- React Router DOM
- Firebase (Firestore)
- CSS

## Estructura principal

- App
  - NavBar
    - CartWidget
  - ItemListContainer
    - ItemList
      - Item
  - ItemDetailContainer
    - ItemDetail
      - ItemCount
  - Cart
    - CartItem
  - CheckoutForm
- CartContext para el estado global del carrito.

## Firebase

Colecciones sugeridas:

### products

- `title` (string)
- `price` (number)
- `stock` (number)
- `category` (string, ej: "fire", "water", "grass")
- `image` (string - URL)
- `description` (string)

### orders

Generada al confirmar la compra:

- `buyer` (name, email, phone)
- `items` (id, title, price, quantity)
- `total`
- `createdAt` (timestamp)

## Variables de entorno

Crear archivo `.env` (no subir al repo):

```bash
VITE_FIREBASE_API_KEY=TU_API_KEY
VITE_FIREBASE_AUTH_DOMAIN=TU_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID=TU_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET=TU_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID=TU_SENDER_ID
VITE_FIREBASE_APP_ID=TU_APP_ID
```

## Comandos

Instalar dependencias:

```bash
npm install
```

Correr en desarrollo:

```bash
npm run dev
```

Build para producción:

```bash
npm run build
```

## Deploy sugerido

- Firebase Hosting, Vercel o Netlify.
- Asegurar que todas las rutas de la SPA apunten a `index.html`.

