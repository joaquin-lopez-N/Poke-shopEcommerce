import { Link, NavLink } from 'react-router-dom'
import CartWidget from './CartWidget'

export default function NavBar(){
  return (
    <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">Poketienda</Link>
        <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#nav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div id="nav" className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto">
            <li className="nav-item"><NavLink className="nav-link" to="/">Inicio</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/categoria/pokemon">Pokémon</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/categoria/pokeballs">Poké Balls</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/categoria/items">Ítems</NavLink></li>
          </ul>
          <CartWidget />
        </div>
      </div>
    </nav>
  )
}
