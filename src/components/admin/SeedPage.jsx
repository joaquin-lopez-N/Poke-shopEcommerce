import { useMemo, useState } from 'react'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../firebase'

const SEED = [
  // ======= POKÉMON =======
  {title:'Bulbasaur', price:1500, stock:12, category:'pokemon', tag:'planta/veneno', thumbnail:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png', description:'Starter Kanto tipo planta/veneno.'},
  {title:'Charmander', price:1600, stock:10, category:'pokemon', tag:'fuego', thumbnail:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png', description:'Lagartija de fuego.'},
  {title:'Squirtle', price:1550, stock:11, category:'pokemon', tag:'agua', thumbnail:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png', description:'Tortuga de agua.'},
  {title:'Pikachu', price:1800, stock:15, category:'pokemon', tag:'eléctrico', thumbnail:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png', description:'Icono eléctrico de Kanto.'},
  {title:'Eevee', price:2000, stock:6, category:'pokemon', tag:'normal', thumbnail:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/133.png', description:'Evoluciones múltiples.'},
  {title:'Snorlax', price:2600, stock:4, category:'pokemon', tag:'normal', thumbnail:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/143.png', description:'Dormilón gigantesco.'},

  // ======= POKÉ BALLS =======
  {title:'Poké Ball', price:200, stock:60, category:'pokeballs', thumbnail:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png', description:'La clásica de siempre.'},
  {title:'Great Ball', price:400, stock:50, category:'pokeballs', thumbnail:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/great-ball.png', description:'Mejor tasa de captura.'},
  {title:'Ultra Ball', price:800, stock:40, category:'pokeballs', thumbnail:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/ultra-ball.png', description:'Alta performance.'},
  {title:'Premier Ball', price:300, stock:30, category:'pokeballs', thumbnail:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/premier-ball.png', description:'Edición especial.'},
  {title:'Dusk Ball', price:650, stock:25, category:'pokeballs', thumbnail:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/dusk-ball.png', description:'Mejor en cuevas/noche.'},
  {title:'Quick Ball', price:700, stock:25, category:'pokeballs', thumbnail:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/quick-ball.png', description:'Mejor al inicio del combate.'},
  {title:'Luxury Ball', price:900, stock:20, category:'pokeballs', thumbnail:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/luxury-ball.png', description:'Más amistad para el Pokémon.'},
  {title:'Timer Ball', price:750, stock:20, category:'pokeballs', thumbnail:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/timer-ball.png', description:'Mejora con turnos de combate.'},
  {title:'Dive Ball', price:650, stock:20, category:'pokeballs', thumbnail:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/dive-ball.png', description:'Mejor en agua.'},
  {title:'Net Ball', price:650, stock:20, category:'pokeballs', thumbnail:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/net-ball.png', description:'Mejor para bicho/agua.'},
  {title:'Heal Ball', price:500, stock:25, category:'pokeballs', thumbnail:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/heal-ball.png', description:'Cura al capturar.'},
  {title:'Repeat Ball', price:700, stock:20, category:'pokeballs', thumbnail:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/repeat-ball.png', description:'Mejor si ya está registrado.'},
  {title:'Nest Ball', price:600, stock:20, category:'pokeballs', thumbnail:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/nest-ball.png', description:'Mejor para Pokémon de bajo nivel.'},
  {title:'Master Ball', price:50000, stock:2, category:'pokeballs', thumbnail:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/master-ball.png', description:'Captura garantizada.'},

  // ======= ÍTEMS =======
  {title:'Potion', price:300, stock:40, category:'items', thumbnail:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/potion.png', description:'Cura 20 PS.'},
  {title:'Super Potion', price:700, stock:25, category:'items', thumbnail:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/super-potion.png', description:'Cura 50 PS.'},
  {title:'Hyper Potion', price:1200, stock:15, category:'items', thumbnail:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/hyper-potion.png', description:'Cura 200 PS.'},
  {title:'Antidote', price:200, stock:35, category:'items', thumbnail:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/antidote.png', description:'Cura envenenamiento.'},
  {title:'Paralyze Heal', price:200, stock:35, category:'items', thumbnail:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/paralyze-heal.png', description:'Cura parálisis.'},
  {title:'Awakening', price:250, stock:25, category:'items', thumbnail:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/awakening.png', description:'Cura sueño.'},
  {title:'Burn Heal', price:250, stock:25, category:'items', thumbnail:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/burn-heal.png', description:'Cura quemaduras.'},
  {title:'Ice Heal', price:250, stock:25, category:'items', thumbnail:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/ice-heal.png', description:'Cura congelación.'},
  {title:'Full Heal', price:800, stock:20, category:'items', thumbnail:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/full-heal.png', description:'Cura cualquier estado.'},
  {title:'Revive (Revivir)', price:1500, stock:15, category:'items', thumbnail:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/revive.png', description:'Revive a un Pokémon debilitado con 50% PS.'},
  {title:'Max Revive (Revivir Máximo)', price:3000, stock:8, category:'items', thumbnail:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/max-revive.png', description:'Revive a un Pokémon con PS completos.'},
  {title:'Full Restore', price:3000, stock:12, category:'items', thumbnail:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/full-restore.png', description:'Restaura PS completos y cura estados.'},
  {title:'Rare Candy (Caramelo Raro)', price:5000, stock:10, category:'items', thumbnail:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/rare-candy.png', description:'Sube un nivel al Pokémon.'}
]

export default function SeedPage(){
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  // Requiere ?key=siembra en la URL
  const enabled = useMemo(()=> new URLSearchParams(window.location.search).get('key') === 'siembra', [])

  const seed = async () => {
    setLoading(true)
    const ref = collection(db,'products')
    const created = []
    for(const p of SEED){
      const docRef = await addDoc(ref, p)
      created.push(docRef.id)
    }
    setResult(created)
    setLoading(false)
  }

  if(!enabled){
    return <div className="alert alert-warning">Acceso restringido. Agregá <code>?key=siembra</code> al final de la URL.</div>
  }

  return (
    <div className="container">
      <h2>Siembra de productos</h2>
      <p className="text-muted">Inserta Pokémon, Poké Balls e Ítems en la colección <code>products</code>.</p>
      <button className="btn btn-primary" disabled={loading} onClick={seed}>
        {loading ? 'Sembrando...' : 'Sembrar datos demo'}
      </button>
      {result && (
        <div className="mt-3">
          <p className="text-success">Listo. Documentos creados: {result.length}</p>
          <code style={{whiteSpace:'pre-wrap'}}>{JSON.stringify(result,null,2)}</code>
        </div>
      )}
    </div>
  )
}
