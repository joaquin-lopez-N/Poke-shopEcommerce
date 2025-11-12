import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import CartItem from './CartItem'

export default function Cart(){
  const { items, totalPrice, clear } = useCart()

  if(items.length === 0){
    return (
      <div className="text-center">
        <p className="lead">El carrito está vacío</p>
        <Link to="/" className="btn btn-primary">Ir al catálogo</Link>
      </div>
    )
  }

  return (
    <div className="row g-4">
      <div className="col-lg-8">
        {items.map(i => <CartItem key={i.id} item={i} />)}
        <button className="btn btn-outline-danger mt-2" onClick={clear}>Vaciar carrito</button>
      </div>
      <div className="col-lg-4">
        <div className="card">
          <div className="card-body">
            <h5>Resumen</h5>
            <p className="fs-4">Total: ${totalPrice}</p>
            <Link to="/checkout" className="btn btn-success w-100">Ir al pago</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
