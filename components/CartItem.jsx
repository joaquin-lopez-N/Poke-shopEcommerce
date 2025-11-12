import { useCart } from '../context/CartContext'

export default function CartItem({ item }){
  const { removeItem } = useCart()
  return (
    <div className="card mb-2">
      <div className="card-body d-flex align-items-center gap-3">
        {item.thumbnail && <img src={item.thumbnail} alt={item.title} width="64" height="64" style={{objectFit:'contain'}}/>}
        <div className="me-auto">
          <h6 className="mb-1">{item.title}</h6>
          <small className="text-muted">x{item.qty} · ${item.price} c/u</small>
        </div>
        <div className="text-end">
          <div className="fw-bold mb-1">${item.qty * item.price}</div>
          <button className="btn btn-sm btn-outline-danger" onClick={()=>removeItem(item.id)}>Quitar</button>
        </div>
      </div>
    </div>
  )
}
