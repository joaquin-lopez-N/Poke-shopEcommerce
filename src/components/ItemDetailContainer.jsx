import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase'
import ItemDetail from './ItemDetail'

export default function ItemDetailContainer(){
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    const ref = doc(db, 'products', id)
    setLoading(true)
    getDoc(ref)
      .then(snap => setProduct(snap.exists() ? { id: snap.id, ...snap.data() } : null))
      .finally(()=> setLoading(false))
  },[id])

  if(loading) return <p>Cargando detalle...</p>
  if(!product) return <p>Producto no encontrado.</p>

  return <ItemDetail product={product} />
}
