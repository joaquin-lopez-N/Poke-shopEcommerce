import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext.jsx";
import CartItem from "../CartItem/CartItem.jsx";
import "./Cart.css";

const Cart = () => {
  const { cart, clearCart, totalPrice } = useCart();

  if (cart.length === 0) {
    return (
      <section className="cart-container">
        <h2>Tu equipo está vacío</h2>
        <p className="info-msg">
          No añadiste ningún Pokémon a tu carrito.
        </p>
        <Link to="/" className="btn-primary">
          Ver catálogo
        </Link>
      </section>
    );
  }

  return (
    <section className="cart-container">
      <h2>Tu equipo Pokémon</h2>
      <div className="cart-list">
        {cart.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>

      <div className="cart-summary">
        <p>Total a pagar: ${totalPrice}</p>
        <div className="cart-actions">
          <button className="btn-secondary" onClick={clearCart}>
            Vaciar carrito
          </button>
          <Link to="/checkout" className="btn-primary">
            Finalizar compra
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Cart;
