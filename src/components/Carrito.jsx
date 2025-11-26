// ==================
// Componente Carrito
// ==================

// El componente recibe est 'carrito' (array-productos) y func 'vaciarCarrito' como props.
function Carrito({carrito, vaciarCarrito}) {
    // Renderizado condicional: Si length(array)=0 --> está vacío, muestra un msj y termina ejecución del componenete (no renderiza el resto).
    if (carrito.length === 0) return <p>El carrito está vacío</p>;

    return (
        <div style = {{
            border: "1px solid #ccc",
            padding: "10px",
            margin: "20px",
            borderRadius: "10px"}}
        >
            <h3>Carrito</h3>
            {/* Itera sobre array 'carrito' p/mostrar c/ítem. */}
            {/* key={i} es p/indetif c/elem de la lista. i-índice se utiliza si no hay ID único. */}
            {carrito.map((item, i) => (
                <p key = {i}>{item.title}-${item.price}</p>
            ))}
            {/* Si click, llama a prop 'vaciarCarrito', que ejecuta func actualización de est en componente padre (App). */}
            <button onClick = {vaciarCarrito}>Vaciar carrito</button>
        </div>
    );
}

export default Carrito;