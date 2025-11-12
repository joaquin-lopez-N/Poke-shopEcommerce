import { Link } from 'react-router-dom'

export default function Item({ product }){
  const { id, title, price, thumbnail, stock, category, tag } = product
  return (
    <div className="card h-100 shadow-sm">
      {thumbnail && <img src={thumbnail} alt={title} className="card-img-top" style={{objectFit:'contain', height:160}}/>}
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-center mb-1">
          <span className="badge text-bg-secondary text-uppercase">{category}</span>
          {tag && <span className="badge text-bg-info">{tag}</span>}
        </div>
        <h6 className="card-title">{title}</h6>
        <p className="text-muted mb-1">Stock: {stock}</p>
        <p className="fw-bold fs-5 mt-auto">${price}</p>
        <Link to={`/item/${id}`} className="btn btn-primary w-100 mt-2">Ver detalle</Link>
      </div>
    </div>
  )
}
