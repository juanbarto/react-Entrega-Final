import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProducts } from "../context/ProductsProvider";

// ===============================
// Componente FormularioControlado
// ===============================

function FormularioControlado() {
    // Declara est 'producto' p/almacenar datos de formulario (un objeto).
    // setProducto es la función p/actualizar este est.
    // 'const [producto, setProducto] = useState({...});': 
    // useState es Hook fundamental p/que componentes funcionales manejen datos dinámicos. 
    // 1er elem (producto) es var que contiene el est actual del formulario,
    // 2do (setProducto) es func exclusiva que debe usarse p/actualizar dicho estado e iniciar una re-renderización.
    const [producto, setProducto] = useState({
        nombre: "",
        precio: "",
        descripcion: "",
        imagen: "",
    });

    const {id} = useParams();

    const navigate = useNavigate();

    const {productos, agregarProducto, actualizarProducto} = useProducts();

    useEffect(() => {
        if (id) {
            const productoEditar = productos.find(producto => producto.id === id);
            if (productoEditar) {
                setProducto(productoEditar);
            }
        }
    }, [id, productos]);

    // Declara el estado 'errores' p/almacenar msjs de validación (un objeto).
    // setErrores es la func p/actualizar este est.
    const [errores, setErrores] = useState({});
    // Func que maneja los cambios en campos del formulario.
    const manejarCambio = (evento) => {
        // Actualiza est 'producto'.
        // 'setProducto({ ...producto, [evento.target.name]: evento.target.value, })': Lóg central de formularios controlados. 
        // Se utiliza el Spread Operator (...producto) p/crear 1 nueva copia del objeto de est, asegurando que est anterior no sea mutado directamente. 
        // '[evento.target.name]: evento.target.value' es prop de objeto computada de JS que toma dinámicamente el name del input p/sobrescribir solo el campo modificado en nueva copia del est.
        setProducto({
            ...producto,// Copia todas las props existentes de est actual (operador spread).
            // Actualiza propd cuyo nombre coincide c/atrib 'name' del input que disparó el evento, usando val actual del input (propiedad computada).
            [evento.target.name]: evento.target.value,
        });
    };
    // Func que realiza validación de campos del formulario.
    const validar = () => {
        // Objeto temporal para almacenar los errores encontrados en esta validación.
        const nuevosErrores = {}; 
        // Validación del nombre:
        if (!producto.nombre.trim()) 
            nuevosErrores.nombre = "El nombre es obligatorio.";
        // Validación del precio:
        if (!producto.precio || producto.precio <= 0) 
            nuevosErrores.precio = "El precio debe ser mayor o igual a cero.";
        // Validación de descripción:
        if (!producto.descripcion.trim() || producto.descripcion.length < 10)
            nuevosErrores.descripcion = "La descripción debe tener al menos 10 caracteres.";
        // Actualiza el estado 'errores' con los errores encontrados.
        setErrores(nuevosErrores);
        // Retorna true si no hay errores (objeto nuevosErrores está vacío), y false si hay errores.
        // 'return Object.keys(nuevosErrores).length === 0': Utiliza 'Object.keys()' p/obtener 1 array con nombres de todas las props (claves) que se encuentran dentro del objeto nuevosErrores. 
        // Si longitud(array)=cero --> no se encontró ningún error de validación, ==> func validar retorna true.
        return Object.keys(nuevosErrores).length === 0;
    };
    // Func asíncrona que maneja envío del formulario.
    const manejarEnvio = async (evento) => {
        // 'evento.preventDefault()': Evita comportamiento predeterm del formulario (refresh página).
        evento.preventDefault();
        // 'if (!validar()) return': Result de func validar()=false. Operador '!' invierte val a true, y sentencia 'return' detiene inmediatamente ejecución de func 'manejarEnvio', 
        // evitando que se intente enviar datos inválidos a la API.
        if (!validar()) return;
        // 'try { ... } catch(error) { ... }': Estructura p/oper que pueden fallar, como peticiones de red. 
        // Cód dentro de try se intenta ejecutar. Si error (falla de red, fallo de promesa fetch, o throw explícito), 
        // ctrl de ejecución pasa inmediatamente al bloque 'catch(error)' p/gestionar el fallo.
        try {
            if (id) {
                await actualizarProducto(id, producto);
                alert("✏️ Producto actualizado correctamente.");
            } else {
                await agregarProducto(producto)    
                // Muestra alerta de éxito.
                alert("✅ Producto agregado correctamente.")
            }
            
            // Limpia formulario reseteando est 'producto'.
            setProducto({ nombre: "", precio: "", descripcion: "", imagen: "" });
            // Limpia mensajes de error.
            setErrores({});
            navigate("/productos");            
        // Captura + maneja cualquier error que ocurra durante petición fetch o en bloque try.
        } catch(error) {
            // Muestra msj error en consola p/depuración.
            alert("❌ No se pudo realizar la operación.");
            console.error(error.message);
        }
    };
    // Func renderizado retorna estructura del formulario.
    return (

        <form
            // Asigna func manejarEnvio a evento de envío del formulario. 
            onSubmit = {manejarEnvio} 
            style = {{
                // Estilos en línea p/presentación del formulario.
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                alignItems: "center", 
                marginTop: "15px" 
            }}
        >   
            {/* Campo Nombre del Producto */}
            <input
                type = "text"
                // Importante: debe coincidir con la clave en el estado 'producto'.
                name = "nombre"
                // Val enlazado a est 'producto.nombre' (Controlado).
                placeholder = "Nombre del Producto"
                value = {producto.nombre}
                // C/cambio actualiza el estado.
                onChange = {manejarCambio}
            />
            {/* Renderizado Condicional del Error de Nombre */}
            {/* '{errores.nombre && <p style = {{ color: "red" }}>{errores.nombre}</p>}': Utiliza operador lóg AND (&&). 
            Si '(errores.nombre)'=truthy (si existe msj error p/nombre) ==> evalúa y retorna expresión '(el elemento <p>)' ==> lo renderice. 
            Si '(errores.nombre)'=falsy (no hay error) ==> no renderiza nada.*/ }
            {errores.nombre && <p style = {{ color: "red" }}>{errores.nombre}</p>}
            {/* Campo Precio */}
            <input
                type = "number"
                name = "precio"
                placeholder = "Precio"
                value = {producto.precio}
                onChange = {manejarCambio}
            />
            {/* Renderizado Condicional del Error de Precio */}
            {errores.precio && <p style = {{ color: "red" }}>{errores.precio}</p>}
            {/* Campo Descripción (textarea) */}
            <textarea
                name = "descripcion"
                placeholder = "Descripción"
                value = {producto.descripcion}
                onChange = {manejarCambio}
            />
            {/* Renderizado Condicional del Error de Descripción */}
            {errores.descripcion && <p style = {{ color: "red" }}>{errores.descripcion}</p>}
            {/* Campo URL de la Imagen */}
            <input
                type = "text"
                name = "imagen"
                placeholder = "URL de la imagen (opcional)"
                value = {producto.imagen}
                onChange = {manejarCambio}
            />
            {/* Botón de Envío */}
            <button type = "submit">
                {id ? "Actualizar producto" :  "Agregar producto"}
            </button>
        </form>
    );
}
// Exporta  componente p/poder usarlo en otras partes de la aplicación.
export default FormularioControlado;