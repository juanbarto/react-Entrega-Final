// ==================
// Componente Carrito
// ==================

function Carrito({ carrito, vaciarCarrito }) {
    // Renderizado condicional
    if (carrito.length === 0) return <p>El carrito está vacío</p>;

    return (
        <div
            style={{
                border: "1px solid #ccc",
                padding: "10px",
                margin: "20px",
                borderRadius: "10px",
            }}
        >
            <h3>Carrito</h3>

            {carrito.map((item, i) => (
                <p key={i}>
                    {item.nombre} – ${item.precio}
                </p>
            ))}

            <button onClick={vaciarCarrito}>Vaciar carrito</button>
        </div>
    );
}

export default Carrito;