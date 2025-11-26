// Importa Hooks de est y efectos secundarios de React.
import { createContext, useContext, useState, useEffect } from "react";

// ===========================
// Componente ProductsProvider
// ===========================

const ProductsContext = createContext();

export function ProductsProvider({children}) {
    // EST DE DATOS:
    // Define est 'productos' p/almacenar lista de productos obtenida de API.
    // 'useState([])' inicializa el estado como un array vacío. Es p/que componente no intente mapear datos indefinidos antes de la carga.  
    const [productos, setProductos] = useState([]);
    // EST DE CARGA:
    // Define est 'cargando' p/controlar visualización de un mensaje de carga. Inicializa a 'true' porque la carga comienza inmediatamente al montar el componente.
    const [cargando, setCargando] = useState(true);
    // EST DE ERRORES:
    // Define el estado 'error' p/capturar-mostrar cualquier fallo de API.
    const [error, setError] = useState(null);
    // 'useEffect(() => { ... }, []);' se utiliza para manejar efectos secundarios, como la solicitud a una API. 
    // Previene que llamada al API se ejecute en c/re-renderizado
    useEffect(() => {
        // 'fetch("https://69053e5fee3d0d14c132355b.mockapi.io/productos")' realiza solicitud a API MockAPI para obtener lista de productos. 
        // '.then(respuesta=>respuesta.json())' convierte la rta de API a JSON.
        // '.then(datos=>setProductos(datos))' toma datos JSON y los utiliza p/actualizar est 'productos'. Esto provoca que componente se vuelva a renderizar c/datos de los productos.
        fetch("https://69053e5fee3d0d14c132355b.mockapi.io/productos")
            .then(respuesta => respuesta.json())
            .then(datos => {
                // Actualiza est 'productos' con datos recibidos, provoca re-renderizado.
                setProductos(datos);
                // Desactiva est de carga, ya que los datos se obtuvieron con éxito.
                setCargando(false);
            })
            // .catch() captura-maneja cualquier error que ocurra durante la solicitud.
            .catch((error) => {
                console.error("Error al cargar los productos.",error);
                // Actualiza est 'error' p/mostrar msj a usuario.
                setError('Problema al cargar los productos.');
                // Aunque haya error, debe desactivar est de carga p/mostrar el error.
                setCargando(false);
            });
    // Array vacío '[]' como 2do argumento indica a 'useEffect' que func solo debe ejecutarse 1 vez, cuando componente se monta por 1ra vez. Previene que se realicen solicitudes infinitas a API c/vez que componente se actualiza.
    }, []);

    async function agregarProducto(nuevoProducto) {
        try {
            // 'const respuesta = await fetch("...", { method: "POST", body: JSON.stringify(producto), ... })': 
            // 'Fetch' es API, realiza peticiones HTTP. 
            // 'await' solo puede usarse dentro de 1 func async. Se utiliza p/pausar la ejecución de func hasta que Promesa devuelta por fetch se resuelva. 
            // 'JSON.stringify(producto)' convierte objeto JavaScript producto en 1 cadena JSON para su transmisión por la red.
            const respuesta = await fetch(
                "https://69053e5fee3d0d14c132355b.mockapi.io/productos", {
                    // Especifica mét HTTP p/crear recurso.
                    method: "POST",
                    // Indica que cuerpo de petición es JSON.
                    headers: {"content-type": "application/json"},
                    // Convierte objeto 'producto' a formato JSON p/enviarlo.
                    body: JSON.stringify(nuevoProducto)
                }
            );
            // 'if (!respuesta.ok) throw new Error("...")': Prop 'respuesta.ok' verif si cód est HTTP se encuentra en rango de éxito (200-299). 
            // Si false (ej. 404 o 500), utiliza sentencia 'throw new Error' p/generar una excepción. Esto fuerza a la ejecución a salir del bloque 'try' e 
            // ir directamente al bloque 'catch' p/manejar el fallo.
            if (!respuesta.ok)
                // Si rta no fue exitosa, lanza error + será capturado por bloque catch.
                throw new Error("Error al agregar el producto.");

            const productoCreado = await respuesta.json();

            setProductos([...productos, productoCreado]);

        } catch (error) {
            console.error("❌ Error POST",error);
        }
    }        

    async function eliminarProducto(id) {
        try {
            const respuesta = await fetch(
                `https://69053e5fee3d0d14c132355b.mockapi.io/productos/${id}`, {
                    method: "DELETE",
                }
            );

            if (!respuesta.ok)
                throw new Error("Error al eliminar el producto.");

            setProductos(productos.filter(producto => producto.id !==id));

        } catch (error) {
            console.error("❌ Error DELETE",error);
        }            
    }

    async function actualizarProducto(id, productoActualizado) {
        try {
            const respuesta = await fetch(
                `https://69053e5fee3d0d14c132355b.mockapi.io/productos/${id}`, {
                    method: "PUT",
                    headers: {"content-type": "application/json"},
                    body: JSON.stringify(productoActualizado),
                }
            );

            if (!respuesta.ok)
                throw new Error("Error al actualizar el producto.");

            const productoModificado = await respuesta.json();
            
            setProductos(productos.map(producto => producto.id ===id ? productoModificado : producto));
        
        } catch (error) {
            console.error("❌ Error PUT",error);            
        }
    }

    return (
        <ProductsContext.Provider value={{productos, cargando, error, agregarProducto, eliminarProducto, actualizarProducto}}>
            {children}
        </ProductsContext.Provider>
    );
}

export const useProducts = () => useContext(ProductsContext);