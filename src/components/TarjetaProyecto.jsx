import Boton from "./boton";

// ==========================
// Componente TarjetaProyecto
// ==========================

function TarjetaProyecto({titulo,descripcion,botonTexto}) {
    return (
        <div style = {{border: "1px solid #ccc", padding: "10px", margin: "10px"}}>
            <h2>{titulo}</h2>
            <p>{descripcion}</p>
            <Boton texto = {botonTexto} color="blue"/>
        </div>
    )
}

export default TarjetaProyecto;