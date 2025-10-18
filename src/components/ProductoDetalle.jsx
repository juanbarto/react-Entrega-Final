// Importa 'useParams' de 'react-router-dom' p/leer parámes de URL.
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

// ==========================
// Componente ProductoDetalle
// ==========================

function ProductoDetalle(){
    // Se extrae val del parám dinámico ':id' (definido en App.jsx como /productos/:id).    
    const {id} = useParams();
    // EST DEL PRODUCTO:
    // Inicializa 'producto'=null, ya que componente comienza s/datos del producto.
    const [producto, setProducto] = useState(null);
    // EST DE CARGA:
    // Inicializa 'cargando'=true, indicando que la solicitud a API está en curso.
    const [cargando, setCargando] = useState(true);
    // EST DE ERROR:
    // P/manejar + mostrar cualquier error ocurrido durante fetch.
    const [error, setError] = useState(null);

    // useEffect: Ejecuta lógica p/obtener producto de la API.
    useEffect(() => {
        // Fetch a la API: Se utiliza (` `) p/incrustar el 'id' obtenido de la URL, creando ruta dinám p/producto específico.
        fetch(`https://www.fakestoreapi.com/products/${id}`)
            .then(respuesta=>respuesta.json())
            .then(datos => {
                // Si solicitud=OK, actualiza est 'producto'.
                setProducto(datos);
                // Desactiva el estado de carga.
                setCargando(false);
            })
            .catch(error=>{
                console.error("Error al obtener el producto:", error);
                // Guarda msj error + desactiva la carga.
                setError("No se pudo obtener el producto.");
                setCargando(false);
            });
            // Array de dependencias contiene [id]. Fetch se ejecutará c/vez que val 'id' cambie.
    }, [id]);

    // RENDERIZADO CONDICIONAL p/manejar 3 est posibles:
    // Si cargando:
    if (cargando) return <p>Cargando producto...</p>;
    // Si ocurrió error (ej. problema red o 404 personalizado):
    if (error) return <p>{error}</p>;
    // Si no hay producto (ej. API=null o API=objeto vacío y no fue manejado por error):
    if (!producto) return <p>Producto no encontrado.</p>;

    // RENDERIZADO FINAL: Muestra detalles de producto si todo OK.
    return(
        <div style={{textAlign: "center", marginTop: "20px"}}>
            <h2>{producto.title}</h2>
            <img
                src={producto.image}
                alt={producto.title}
                style={{width: "200px", height: "200px"}}
            />
            <p>{producto.description}</p>
            <p><strong>Precio:</strong> ${producto.price}</p>
        </div>
    );
}

export default ProductoDetalle;