import { useState } from "react";

// ================
// Componente Login
// ================

 function Login({ setUsuario }){
    const[nombre,setNombre]=useState("");
    const[password,setPassword]=useState("");

    function manejarSubmit(evento){
        evento.preventDefault();
        if  (nombre==="admin" && password==="1234"){
            setUsuario(nombre);
            alert("Incio de sesión exitoso.");
        } else{
            alert("Nombre de usuario o password incorrecto.");
        }
    }

    return(
        <form
            onSubmit={manejarSubmit}
            style={{textAling: "center", marginTop: "20px"}}
        >
            <h2>Login</h2>
            <input
                type="text"
                placeholder="Usuario"
                value={nombre}
                onChange={(evento)=>setNombre(evento.target.value)}
            />
            <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(evento)=>setPassword(evento.target.value)}
            />
            <button type="submit">Entrar</button>
        </form>
    );
}

export default Login;