import { useState } from 'react'
import ItemCount from './ItemCount'
import { useCart } from '../context/CartContext'

export default function ItemDetail({ product }){
  const { title, description, price, stock, thumbnail, category, tag } = product
  const { addItem } = useCart()
  const [addedQty, setAddedQty] = useState(0)

  const handleAdd = (qty) => {
    setAddedQty(qty)
    addItem(product, qty)
  }

  return (
    <div className="row g-4">
      <div className="col-md-6">
        {thumbnail && <img src={thumbnail} alt={title} className="img-fluid rounded shadow" />}
      </div>
      <div className="col-md-6">
        <div className="mb-2">
          <span className="badge text-bg-secondary me-2">{category}</span>
          {tag && <span className="badge text-bg-info">{tag}</span>}
        </div>
        <h2>{title}</h2>
        <p className="lead">${price}</p>
        <p>{description}</p>
        <p className="text-muted">Stock disponible: {stock}</p>

        {addedQty === 0
          ? <ItemCount stock={stock} initial={1} onAdd={handleAdd} />
          : <p className="alert alert-success">Agregado al carrito ✅</p>
        }
      </div>
    </div>
  )
}
