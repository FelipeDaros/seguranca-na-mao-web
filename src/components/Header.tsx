import { NavLink } from "react-router-dom";
import "../styles/style.css";
import { useAuth } from "../context/AuthContext";

export function Header() {
    const { signOut } = useAuth();

    return (
        <nav className="navbar">
            <ul className="list">
                <NavLink className="fontNav" to="/">Home</NavLink>
                <NavLink className="fontNav" to="/pontos">Pontos</NavLink>
                <NavLink className="fontNav" to="/" onClick={signOut}>Sair</NavLink>
            </ul>
        </nav>
    )
}