// Importa 'useParams' de 'react-router-dom' p/leer parámes de URL.
import { useParams } from "react-router-dom";
import { useProducts } from "react";

// ==========================
// Componente ProductoDetalle
// ==========================

function ProductoDetalle(){
    // Se extrae val del parám dinámico ':id' (definido en App.jsx como /productos/:id).    
    const {id} = useParams();
    // EST DEL PRODUCTO:
    // Inicializa 'producto'=null, ya que componente comienza s/datos del producto.
    const {productos} = useProducts();
    
    const producto = productos.find((p) => p.id === id);

    if (!producto) {
        return <p>Producto no encontrado.</p>;
    }

    return (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
            <h2>{producto.nombre}</h2>

        {producto.imagen && (
            <img
                src={producto.imagen}
                alt={producto.nombre}
                style={{ width: "200px", height: "200px" }}
            />
        )}

        <p>{producto.descripcion}</p>
        <p>
            <strong>Precio:</strong> ${producto.precio}
        </p>
        </div>
    );
}

export default ProductoDetalle;