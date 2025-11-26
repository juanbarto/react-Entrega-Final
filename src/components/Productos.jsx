import { useProducts } from "../context/ProductsProvider";
// Importa componente Link de 'react-router-dom' p/crear enlaces de navegación sin recargar pág.
import { Link } from "react-router-dom";

// ====================
// Componente Productos
// ====================

// Componente recibe 'agregarAlCarrito' como prop desde componente (App.jsx). Permite modif est del carrito que vive fuera de este componente.
function Productos({agregarAlCarrito}) {
    const {productos, cargando, error, eliminarProducto} = useProducts();
    // RENDERIZADO COND P/ESTADOS:
    // Carga: Si 'cargando'=true --> muestra msj + termina renderizado (return).
    if (cargando) return <p>Cargando productos...</p>
    // Error: Si 'error' contiene msj --> lo muestra + termina renderizado.
    if (error) return <p>{error}</p>
    console.log("Productos:", productos);

    // RENDERIZADO PCIPAL (datos se cargados con éxito):
    return (
        <div>
            <h2>Lista de Productos</h2>

            <Link to = "/productos/nuevo"
                style = {{marginBottom: "10px 0", display: "inline-block"}}>
                ➕ Crear producto
            </Link>

            <div style = {{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
                {/* Iter p/mostrar lista de productos: */}
                {/* 'productos.map(producto => (...))' itera sobre el array 'productos' p/crear dinámicamente el JSX por c/elem. */}

                {productos.map(producto => (
                    <div
                        // 'key={producto.id}' es prop oblig en React para elems de lista. Ayuda a rastrear qué elems han cambiado, mejorando rend.
                        key = {producto.id}
                        style = {{
                            border: "1px solid #ccc",
                            borderRadius: "10px",
                            margin: "10px",
                            padding: "10px",
                            width: "200px",
                            textAlign: "center"
                        }}
                    >
                        <img 
                            src = {producto.imagen || "https://via.placeholder.com/100"} 
                            alt = {producto.nombre} 
                            style = {{width: "100px", height: "100px"}}
                        />
                        <h4>{producto.nombre}</h4>
                        <p>${producto.precio}</p>
                        {/* Botón p/añadir a carrito. Si click, llama a prop 'agregarAlCarrito', pasándole objeto 'producto' actual. Ejecuta cambio de est en componente padre. */}
                        <button 
                            onClick = {() => agregarAlCarrito(producto)}
                            style = {{ backgroundColor: "green", color: "white", marginTop: "8px" }}
                        >
                            🛒 Agregar al carrito
                        </button>
                        
                        {/* Botón p/eliminar del carrito. Si click, llama a prop 'eliminarProducto'. Ejecuta cambio de est en componente padre. */}
                        <button 
                            onClick = {() => eliminarProducto(producto.id)}
                            style = {{ backgroundColor: "crimson", color: "white", marginTop: "8px" }}
                        >
                            🗑 Eliminar
                        </button>

                                        

                        {/* Link a la página de detalle. Utiliza template literals (`) p/construir URL dinámica, inyectando 'producto.id' en el path. */}
                        <Link to = {`/productos/editar/${producto.id}`} 
                            style = {{
                                display: "block",
                                marginTop: "10px",
                                color: "blue"
                            }}
                        >
                            ✏️ Editar
                        </Link> 
                    </div>
                ))}
            </div>
        </div>
    );
}

// Exporta el componente para que pueda ser importado en App.jsx.
export default Productos;