import { useState } from 'react'

export default function ItemCount({ stock=0, initial=1, onAdd }){
  const [count, setCount] = useState(initial)

  const dec = () => setCount(c => Math.max(1, c-1))
  const inc = () => setCount(c => Math.min(stock, c+1))

  const add = () => {
    if(stock <= 0) return
    if(count < 1) return
    onAdd(count)
  }

  if(stock === 0){
    return <p className="text-danger">Producto sin stock</p>
  }

  return (
    <div className="d-flex align-items-center gap-2">
      <button className="btn btn-outline-secondary" onClick={dec} disabled={count<=1}>-</button>
      <span className="fs-5" style={{minWidth:32, textAlign:'center'}}>{count}</span>
      <button className="btn btn-outline-secondary" onClick={inc} disabled={count>=stock}>+</button>
      <button className="btn btn-primary" onClick={add}>Agregar</button>
    </div>
  )
}
