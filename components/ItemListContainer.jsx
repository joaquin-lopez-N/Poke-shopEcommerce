import { useEffect, useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../firebase'
import ItemList from './ItemList'
import FilterBar from './FilterBar'

export default function ItemListContainer({ greeting }){
  const { categoryId } = useParams()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  // Filtros UI
  const [search, setSearch] = useState('')
  const [minPrice, setMinPrice] = useState(null)
  const [maxPrice, setMaxPrice] = useState(null)

  useEffect(()=>{
    const ref = collection(db, 'products')
    const q = categoryId ? query(ref, where('category','==', categoryId)) : ref
    setLoading(true)
    getDocs(q)
      .then(snap => {
        const list = snap.docs.map(d => ({ id: d.id, ...d.data() }))
        setProducts(list)
      })
      .finally(()=> setLoading(false))
  },[categoryId])

  const filtered = useMemo(()=>{
    const term = search.trim().toLowerCase()
    return products.filter(p => {
      const matchesText = term === '' || `${p.title} ${p.tag ?? ''}`.toLowerCase().includes(term)
      const matchesMin = (minPrice==null) || (p.price >= minPrice)
      const matchesMax = (maxPrice==null) || (p.price <= maxPrice)
      return matchesText && matchesMin && matchesMax
    })
  },[products, search, minPrice, maxPrice])

  const clearFilters = () => {
    setSearch(''); setMinPrice(null); setMaxPrice(null);
  }

  if(loading) return <p className="lead">Cargando productos...</p>
  if(!products.length) return <p>No hay productos para esta categoría.</p>

  return (
    <>
      {greeting && <h1 className="mb-3">{greeting}</h1>}
      <FilterBar
        search={search} setSearch={setSearch}
        minPrice={minPrice} setMinPrice={setMinPrice}
        maxPrice={maxPrice} setMaxPrice={setMaxPrice}
        onClear={clearFilters}
      />
      {filtered.length ? (
        <ItemList products={filtered} />
      ) : (
        <div className="alert alert-info">No hay resultados con esos filtros.</div>
      )}
      <div className="text-end mt-3">
        <Link to="/cart" className="btn btn-outline-primary">Ir al carrito</Link>
      </div>
    </>
  )
}
