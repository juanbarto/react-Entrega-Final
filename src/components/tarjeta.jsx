import Boton from "./boton";

function Tarjeta({textoPrueba,descripcionPrueba,botonPrueba}){
    return(
        <div>
            <h2>{textoPrueba}</h2>
            <h3>{descripcionPrueba}</h3>
            <Boton 
                texto={botonPrueba}
                color="blue" 
            />
        </div>
        );
    };

export default Tarjeta;