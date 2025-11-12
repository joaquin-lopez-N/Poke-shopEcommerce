import Item from './Item'

export default function ItemList({ products }){
  return (
    <div className="row g-3">
      {products.map(p => (
        <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={p.id}>
          <Item product={p} />
        </div>
      ))}
    </div>
  )
}
