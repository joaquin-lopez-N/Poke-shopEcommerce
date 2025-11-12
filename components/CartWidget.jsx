import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function CartWidget(){
  const { totalQty } = useCart()
  return (
    <Link to="/cart" className="btn btn-warning position-relative">
      🛒 Carrito
      {totalQty>0 && (
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill text-bg-danger">
          {totalQty}
        </span>
      )}
    </Link>
  )
}
