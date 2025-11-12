import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar.jsx";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer.jsx";
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer.jsx";
import Cart from "./components/Cart/Cart.jsx";
import CheckoutForm from "./components/CheckoutForm/CheckoutForm.jsx";

const App = () => {
  return (
    <>
      <NavBar />
      <main className="main-container">
        <Routes>
          <Route
            path="/"
            element={
              <ItemListContainer greeting="¡Bienvenido a Pokémon Pet Shop! Elegí tu compañero ideal." />
            }
          />
          <Route path="/category/:categoryId" element={<ItemListContainer />} />
          <Route path="/item/:itemId" element={<ItemDetailContainer />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckoutForm />} />
          <Route path="*" element={<h2>404 - Página no encontrada</h2>} />
        </Routes>
      </main>
    </>
  );
};

export default App;
