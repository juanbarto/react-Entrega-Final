// Importa Hooks de est y efectos secundarios de React.
import { useState, useEffect } from "react";
// Importa componente Link de 'react-router-dom' p/crear enlaces de navegación sin recargar pág.
import { Link } from "react-router-dom";

// ====================
// Componente Productos
// ====================

// Componente recibe 'agregarAlCarrito' como prop desde componente (App.jsx). Permite modif est del carrito que vive fuera de este componente.
function Productos({agregarAlCarrito}){
    // EST DE DATOS:
    // Define est 'productos' p/almacenar lista de productos obtenida de API.
    // 'useState([])' inicializa el estado como un array vacío. Es p/que componente no intente mapear datos indefinidos antes de la carga.  
    const [productos, setProductos]=useState([]);
    // EST DE CARGA:
    // Define est 'cargando' p/controlar visualización de un mensaje de carga. Inicializa a 'true' porque la carga comienza inmediatamente al montar el componente.
    const [cargando, setCargando]=useState(true);
    // EST DE ERRORES:
    // Define el estado 'error' p/capturar-mostrar cualquier fallo de API.
    const [error, setError]=useState(null);

    //'useEffect' se utiliza para manejar efectos secundarios, como la solicitud a una API.
    useEffect(()=>{
        // 'fetch("https://fakestoreapi.com/products")' realiza solicitud a API para obtener datos de los productos.
        // '.then(respuesta=>respuesta.json())' convierte la rta de API a JSON.
        // '.then(datos=>setProductos(datos))' toma datos JSON y los utiliza p/actualizar est 'productos'. Esto provoca que componente se vuelva a renderizar c/datos de los productos.
        fetch("https://fakestoreapi.com/products")
            .then(respuesta=>respuesta.json())
            .then(datos=>{
                // Actualiza est 'productos' con datos recibidos, provoca re-renderizado.
                setProductos(datos);
                // Desactiva est de carga, ya que los datos se obtuvieron con éxito.
                setCargando(false);
            })
            // .catch() captura-maneja cualquier error que ocurra durante la solicitud.
            .catch((error)=>{
                console.error("Error al cargar los productos.",error);
                // Actualiza est 'error' p/mostrar msj a usuario.
                setError('Problema al cargar los productos.');
                // Aunque haya error, debe desactivar est de carga p/mostrar el error.
                setCargando(false);
            });
    // Array vacío '[]' como 2do argumento indica a 'useEffect' que func solo debe ejecutarse 1 vez, cuando componente se monta por 1ra vez. Previene que se realicen solicitudes infinitas a API c/vez que componente se actualiza.
    }, []);

    // RENDERIZADO COND P/ESTADOS:
    // Carga: Si 'cargando'=true --> muestra msj + termina renderizado (return).
    if (cargando) return <p>Cargando productos...</p>
    // Error: Si 'error' contiene msj --> lo muestra + termina renderizado.
    if (error) return <p>{error}</p>

    // RENDERIZADO PCIPAL (datos se cargados con éxito):
    return(
        <div>
            <h2>Lista de Productos</h2>
            <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
                {/* Iter p/mostrar lista de productos: */}
                {/* 'productos.map(producto => (...))' itera sobre el array 'productos' p/crear dinámicamente el JSX por c/elem. */}
                {productos.map(producto=>(
                    <div
                        // 'key={producto.id}' es prop oblig en React para elems de lista. Ayuda a rastrear qué elems han cambiado, mejorando rend.
                        key={producto.id}
                        style={{
                            border: "1px solid #ccc",
                            borderRadius: "10px",
                            margin: "10px",
                            padding: "10px",
                            width: "200px",
                            textAlign: "center"
                        }}
                    >
                        <img src={producto.image} alt={producto.title} style={{width: "100px", height: "100px"}} />
                        <h4>{producto.title}</h4>
                        <p>${producto.price}</p>
                        {/* Botón p/añadir a carrito. Si click, llama a prop 'agregarAlCarrito', pasándole objeto 'producto' actual. Ejecuta cambio de est en componente padre. */}
                        <button onClick={()=>agregarAlCarrito(producto)}>Agregar al Carrito</button>
                        {/* Link a la página de detalle. Utiliza template literals (`) p/construir URL dinámica, inyectando 'producto.id' en el path. */}
                        <Link to={`/productos/${producto.id}`} 
                            style={{
                                display: "block",
                                marginTop: "10px",
                                color: "blue"
                            }}
                        >
                            Ver detalle
                        </Link> 
                    </div>
                ))}
            </div>
        </div>
    );
}

// Exporta el componente para que pueda ser importado en App.jsx.
export default Productos;