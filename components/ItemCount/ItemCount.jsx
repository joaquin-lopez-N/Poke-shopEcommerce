import { useState } from "react";
import "./ItemCount.css";

const ItemCount = ({ stock, initial = 1, onAdd }) => {
  const [count, setCount] = useState(initial);

  const handleDecrement = () => {
    if (count > 1) setCount(count - 1);
  };

  const handleIncrement = () => {
    if (count < stock) setCount(count + 1);
  };

  const handleAdd = () => {
    if (stock === 0) return;
    if (count < 1) return;
    onAdd(count);
  };

  if (stock === 0) {
    return <p className="no-stock-msg">Sin stock disponible.</p>;
  }

  return (
    <div className="item-count">
      <div className="controls">
        <button onClick={handleDecrement} disabled={count <= 1}>
          -
        </button>
        <span>{count}</span>
        <button onClick={handleIncrement} disabled={count >= stock}>
          +
        </button>
      </div>
      <button className="add-btn" onClick={handleAdd}>
        Agregar al carrito
      </button>
    </div>
  );
};

export default ItemCount;
