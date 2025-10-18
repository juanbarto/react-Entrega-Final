// Importa  Hook 'useState' p/gestionar est interno (color fondo del botón).
import {useState} from "react";

// ================
// Componente Botón
// ================

// Componente Boton recibe 2 props de componente padre:
// 'texto': Sse mostrará dentro del botón.
// 'color': Color inic que tendrá botón.
function Boton({texto,color}){
    // Define est local 'bgColor' y función actualizadora 'setBgColor'.Inicializa 'bgColor' con val de prop 'color' recibida.
    const [bgColor,setBgColor]=useState(color);
    // Func lógica p/alternar color de fondo e/azul y verde.
    function cambiarColor(){
        // Verifica est actual de 'bgColor'. 'setBgColor', React re-renderiza componente con nuevo val.
        if (bgColor==='blue'){
            // Si color=azul --> color=verde
            setBgColor("green");
        } else{
            // Si color=verde --> color=azul
            setBgColor("blue");
        }
    }
    // Objeto estilo que utiliza est 'bgColor' p/fondo. Este objeto se aplica directamente a elem <button>.
    const estilo={
        backgroundColor: bgColor,
        color:'white',
        padding:'10px',
        border:'none'
    };
    // Func que maneja evento 'onClick'.
    const handleClick=()=>{
        // Muestra msj en consola p/registrar un click.
        console.log(`Haz hecho click en el botón ${texto}`)
        // Llama a func que actualiza est 'bgColor', que realiza el cambio de color.
        cambiarColor(); // Nueva función agregada
    };

    return(
        <button 
            style={estilo} // Aplica  estilos dinámicos (incluyendo color fondo de est).
            onClick={handleClick} // Asigna func 'handleClick' a evento de click.
        >
            { /* Muestra el texto recibido por prop. */}
            {texto} 
        </button>
    ) 
}

export default Boton;