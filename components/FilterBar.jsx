import { useId } from 'react'

export default function FilterBar({ search, setSearch, minPrice, setMinPrice, maxPrice, setMaxPrice, onClear }){
  const searchId = useId()
  const minId = useId()
  const maxId = useId()

  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="row g-2 align-items-end">
          <div className="col-12 col-md-6">
            <label htmlFor={searchId} className="form-label">Buscar</label>
            <input
              id={searchId}
              className="form-control"
              placeholder="Nombre del producto (ej: Pikachu, Ultra Ball, Full Restore)"
              value={search}
              onChange={e=>setSearch(e.target.value)}
            />
          </div>
          <div className="col-6 col-md-2">
            <label htmlFor={minId} className="form-label">Precio mín.</label>
            <input
              id={minId}
              type="number"
              min="0"
              className="form-control"
              value={minPrice ?? ''}
              onChange={e=>setMinPrice(e.target.value === '' ? null : Number(e.target.value))}
            />
          </div>
          <div className="col-6 col-md-2">
            <label htmlFor={maxId} className="form-label">Precio máx.</label>
            <input
              id={maxId}
              type="number"
              min="0"
              className="form-control"
              value={maxPrice ?? ''}
              onChange={e=>setMaxPrice(e.target.value === '' ? null : Number(e.target.value))}
            />
          </div>
          <div className="col-12 col-md-2 d-grid">
            <button className="btn btn-outline-secondary" onClick={onClear}>Limpiar</button>
          </div>
        </div>
      </div>
    </div>
  )
}
