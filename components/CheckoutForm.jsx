import { useState } from 'react'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { useCart } from '../context/CartContext'
import { db } from '../firebase'
import { Link } from 'react-router-dom'

export default function CheckoutForm(){
  const { items, totalPrice, clear } = useCart()
  const [buyer, setBuyer] = useState({ name:'', phone:'', email:'' })
  const [orderId, setOrderId] = useState(null)
  const [loading, setLoading] = useState(false)

  const onChange = e => setBuyer(prev => ({...prev, [e.target.name]: e.target.value}))

  const onSubmit = async (e) => {
    e.preventDefault()
    if(items.length===0) return
    setLoading(true)
    try{
      const order = {
        buyer,
        items: items.map(i => ({ id:i.id, title:i.title, price:i.price, qty:i.qty })),
        total: totalPrice,
        createdAt: serverTimestamp()
      }
      const docRef = await addDoc(collection(db,'orders'), order)
      setOrderId(docRef.id)
      clear()
    } finally{
      setLoading(false)
    }
  }

  if(orderId){
    return (
      <div className="text-center">
        <h2>¡Gracias por tu compra!</h2>
        <p>Tu ID de orden es:</p>
        <code className="fs-5">{orderId}</code>
        <div className="mt-3"><Link to="/" className="btn btn-primary">Volver al inicio</Link></div>
      </div>
    )
  }

  if(items.length===0){
    return (
      <div className="text-center">
        <p className="lead">No hay productos en el carrito.</p>
        <Link to="/" className="btn btn-primary">Ir al catálogo</Link>
      </div>
    )
  }

  return (
    <form className="row g-3" onSubmit={onSubmit}>
      <h2>Checkout</h2>
      <div className="col-md-6">
        <label className="form-label">Nombre</label>
        <input name="name" className="form-control" value={buyer.name} onChange={onChange} required />
      </div>
      <div className="col-md-6">
        <label className="form-label">Teléfono</label>
        <input name="phone" className="form-control" value={buyer.phone} onChange={onChange} required />
      </div>
      <div className="col-12">
        <label className="form-label">Email</label>
        <input type="email" name="email" className="form-control" value={buyer.email} onChange={onChange} required />
      </div>
      <div className="col-12 d-grid d-md-inline">
        <button className="btn btn-success" disabled={loading}>{loading? 'Generando orden...' : 'Confirmar compra'}</button>
      </div>
    </form>
  )
}
