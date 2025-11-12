import { Link, NavLink } from "react-router-dom";
import CartWidget from "../CartWidget/CartWidget.jsx";
import "./NavBar.css";

const NavBar = () => {
  return (
    <header className="nav-header">
      <nav className="nav-container">
        <Link to="/" className="logo">
          <span className="logo-ball">⚡</span> Pokémon Pet Shop
        </Link>

        <ul className="nav-links">
          <li>
            <NavLink to="/" end>
              Inicio
            </NavLink>
          </li>
          <li>
            <NavLink to="/category/fire">Tipo Fuego</NavLink>
          </li>
          <li>
            <NavLink to="/category/water">Tipo Agua</NavLink>
          </li>
          <li>
            <NavLink to="/category/grass">Tipo Planta</NavLink>
          </li>
        </ul>

        <CartWidget />
      </nav>
    </header>
  );
};

export default NavBar;
