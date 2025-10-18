import { useState } from "react";

// ===============================
// Componente FormularioControlado
// ===============================

function FormularioControlado(){
    // Se utiliza 'useState' p/crear 1 var est 'nombre' y 1 func 'setNombre' p/actualizarla. Val inic es 1 cadena vacía ('').
    const [nombre,setNombre]=useState('');

    function manejarEnvio(evento){
        // 'evento.preventDefault()' evita que navegador recargue pág. Es el comportamiento predeterm al enviar un formulario.
        evento.preventDefault();
        alert(`Formulario enviado por: ${nombre}`)
    }

    return(
        // 'onSubmit={manejarEnvio}' asocia func 'manejarEnvio' al evento de envío del formulario. Cuando el usuario envía el formulario, esta func se ejecuta.
        <form onSubmit={manejarEnvio}>
            <input
                type="text"
                // 'value={nombre}' vincula val del input al est 'nombre'.Input siempre mostrará val que esté en el est.
                value={nombre}
                // 'onChange={(evento)=>setNombre(evento.target.value)}' se ejecuta c/vez que usuario escribe. El 'evento.target.value' obtiene val actual de input y 'setNombre' actualiza est 'nombre' con él.
                onChange={(evento)=>setNombre(evento.target.value)}
                placeholder="Ingresa tu nombre"
            />
            <button type="submit">Enviar</button>
        </form>
    );
}

export default FormularioControlado;