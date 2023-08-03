import { NavLink } from "react-router-dom";
import "../styles/style.css";

export function Header() {
    return (
        <nav className="navbar">
            <ul className="list">
                <NavLink className="fontNav" to="/">Home</NavLink>
                <NavLink className="fontNav" to="/pontos">Pontos</NavLink>
            </ul>
        </nav>
    )
}