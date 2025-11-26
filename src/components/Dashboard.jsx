import { useAuth } from "../context/AuthContext";

// ====================
// Componente Dashboard
// ====================

function Dashboard() {
    // Uso del Custom Hook: Accede al est del 'user' y a funcn 'logout' provistas por AuthContext.
    const {user, logout} = useAuth();

    return (
        <div style = {{textAlign: "center", marginTop: "30px"}}>
            <h2>Bienvenido, {user}</h2>
            <p>Ud. ha accedido a una ruta protegida.</p>
            {/* Lógica de acción: Si click, llama a func 'logout' del contexto, que resetea usuario y token. */}
            <button onClick = {logout}>Cerrar sesión</button>
        </div>
    );
}

export default Dashboard;