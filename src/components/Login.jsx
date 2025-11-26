import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// ================
// Componente Login
// ================

function Login() {
    // EST DE INPUTS:
    // 'nombre' = usuario escrito en campo input.
    // 'password' = pass escrita en campo input.
    // Ambos controlados x useState p/actualizar dinámicamente su valor.
    const [nombre, setNombre] = useState("");
    const [password, setPassword] = useState("");
    // Se extrae func 'login' del contexto de autenticación.
    const {login} = useAuth();
    // Hook p/navegación programática (redirección) después de 1 acción exitosa.
    const navigate = useNavigate();

    const manejarSubmit = (evento) => {
        // Lógica de validación (Inicio)
        evento.preventDefault();
        // Simula verificación básica de credenciales.
        // ÉXITO: En entorno real --> acá iría fetch() a API, validación en servidor, etc.
        if  (nombre === "admin" && password === "1234") {
            // Si coincide --> actualiza est 'usuario' en App.jsx y "desbloquea" rutas.
            login(nombre);
            // Redirige al usuario al Dashboard (ruta protegida) tras login exitoso.
            navigate("/dashboard");
        } else {
            // FALLO: Si no coincide --> alerta error fake.
            alert("Nombre de usuario o password incorrecto.");
        }
    }; // Lógica de validación (Fin)

    return (
        // Form con 2 inputs controlados + botón submit.
        <form
            onSubmit = {manejarSubmit}
            style = {{textAlign: "center", marginTop: "20px"}}
        >
            <h2>Login</h2>
            <input
                type = "text"
                placeholder = "Usuario"
                value = {nombre}
                // Control del Input 1: Actualiza est 'nombre' con c/tecla presionada.
                onChange = {(evento) => setNombre(evento.target.value)}
            />
            <input
                type = "password"
                placeholder = "Contraseña"
                value = {password}
                // Control del Input 2: Actualiza est 'password' con c/tecla presionada.
                onChange = {(evento) => setPassword(evento.target.value)}
            />
            <button type = "submit">Entrar</button>
        </form>
    );
}

export default Login;