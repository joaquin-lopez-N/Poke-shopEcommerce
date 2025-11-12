import { Link } from "react-router-dom";
import "./Item.css";

const Item = ({ id, title, price, image, stock, category }) => {
  return (
    <article className="card">
      <img src={image} alt={title} className="card-img" loading="lazy" />
      <div className="card-body">
        <h3 className="card-title">{title}</h3>
        <p className="card-category">Tipo: {category}</p>
        <p className="card-price">${price}</p>
        {stock > 0 ? (
          <p className="card-stock">Stock: {stock}</p>
        ) : (
          <p className="card-no-stock">Sin stock</p>
        )}
        <Link to={`/item/${id}`} className="card-btn">
          Ver detalle
        </Link>
      </div>
    </article>
  );
};

export default Item;
