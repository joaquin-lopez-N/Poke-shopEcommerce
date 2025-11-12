import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext.jsx";

const CartWidget = () => {
  const { totalQuantity } = useCart();

  if (totalQuantity === 0) return null;

  return (
    <Link to="/cart" className="cart-widget">
      🛒 <span>{totalQuantity}</span>
    </Link>
  );
};

export default CartWidget;
