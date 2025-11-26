import { Link } from "react-router-dom";

// ==============
// Componente Nav
// ==============

function Nav() {
    return (
        <nav style = {{backgroundColor: "#333", color: "white", padding:"10px"}}>
            <ul style = {{listStyle: "none", display: "flex", justifyContent: "space-around", margin: 0}}>
                {/* Uso de <Link>: Permite navegación de React sin recargar la página, haciendo la app Single Page Application (SPA). */}
                <li><Link to = "/" style = {{color: "white", textDecoration: "none"}}>Inicio</Link></li>
                <li><Link to = "/productos" style = {{color: "white", textDecoration: "none"}}>Productos</Link></li>
                <li><Link to = "/contacto" style = {{color: "white", textDecoration: "none"}}>Contacto</Link></li>
            </ul>
        </nav>
    );
}

export default Nav;