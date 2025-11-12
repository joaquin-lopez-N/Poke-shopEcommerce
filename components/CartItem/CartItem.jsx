import { useCart } from "../../context/CartContext.jsx";
import "./CartItem.css";

const CartItem = ({ item }) => {
  const { removeItem } = useCart();

  return (
    <article className="cart-item">
      <div className="cart-item-left">
        <img
          src={item.image}
          alt={item.title}
          className="cart-item-img"
        />
        <div>
          <h3>{item.title}</h3>
          <p>Cantidad: {item.quantity}</p>
          <p>Precio unitario: ${item.price}</p>
        </div>
      </div>
      <div className="cart-item-right">
        <p>Subtotal: ${item.price * item.quantity}</p>
        <button onClick={() => removeItem(item.id)}>Eliminar</button>
      </div>
    </article>
  );
};

export default CartItem;
