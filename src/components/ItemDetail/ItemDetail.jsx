import { useState } from "react";
import { Link } from "react-router-dom";
import ItemCount from "../ItemCount/ItemCount.jsx";
import { useCart } from "../../context/CartContext.jsx";
import "./ItemDetail.css";

const ItemDetail = ({ product }) => {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = (quantity) => {
    addItem(product, quantity);
    setAdded(true);
  };

  const outOfStock = product.stock === 0;

  return (
    <section className="detail-container">
      <img src={product.image} alt={product.title} className="detail-img" />
      <div className="detail-info">
        <h2>{product.title}</h2>
        <p className="detail-type">Tipo: {product.category}</p>
        <p className="detail-price">${product.price}</p>
        <p className="detail-desc">{product.description}</p>

        {outOfStock && (
          <p className="detail-no-stock">Este Pokémon no está disponible.</p>
        )}

        {!outOfStock && !added && (
          <ItemCount stock={product.stock} initial={1} onAdd={handleAdd} />
        )}

        {added && (
          <div className="detail-actions">
            <p className="detail-added">
              Pokémon agregado al equipo (carrito).
            </p>
            <Link to="/cart" className="btn-primary">
              Ir al carrito
            </Link>
            <Link to="/" className="btn-secondary">
              Seguir adoptando
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default ItemDetail;
