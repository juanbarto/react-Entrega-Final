// Importa estilos CSS para este componente.
import './App.css'
// Importa Hooks y Componentes nec de 'react-router-dom' p/navegación.
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './components/Dashboard';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header'
import Nav from './components/Nav';
import Home from './components/Home';
import Contacto from './components/Contacto';
import Gallery from './components/Gallery';
import Footer from './components/Footer';
import EquipoTalentoLab from './components/EquipoTalentoLab';
import TarjetaProyecto from './components/TarjetaProyecto';
import GaleriaInteres from './components/GaleriaInteres';
import FormularioControlado from './components/FormularioControlado';
// Importa Hook 'useState' p/manejar est local (ej. el carrito).
import { useState } from 'react';
import Productos from './components/Productos';
import ProductoDetalle from './components/ProductoDetalle'
import Carrito from './components/Carrito';
import Login from './components/Login';
import { ProductsProvider } from './context/ProductsProvider';

// ==========================
// Componente App (Principal)
// ==========================

function App() {
    // Define est 'carrito' y su func actualizadora 'setCarrito'. Inicializa como array vacío ([]). Aquí se guardarán los prods seleccionados.
    const [carrito, setCarrito] = useState([]);
    // Func p/añadir un prod al carrito.
    function agregarAlCarrito(producto) {
        // ('...'): spread operator p/crear nuevo array:
        // Toma todos elems del 'carrito' actual y añade nuevo 'producto' al final. Asegura no-cambio de est.
        // 'setCarrito([...carrito, producto])': Spread Operator (...carrito) p/copiar todos los elems del array carrito existente. 
        // Garantiza que array original no sea mutado.
        setCarrito([...carrito,producto]);
    }

    // Func para vaciar carrito.
    function vaciarCarrito() {
        // Est 'carrito' = array vacío.
        setCarrito([]);
    }

    // ===========================
    // Estructura visual del sitio
    // ===========================

    return (
        <div>
            {/* AuthProvider: Envuelve la app para proveer el contexto de autenticación a todos los componentes hijos. */}
            <AuthProvider>
                <ProductsProvider>
                    {/* BrowserRouter: Componente que envuelve toda la aplicación que usará rutas. */}
                    <BrowserRouter>
                        <Header />
                        <Nav />
                        {/* Routes: Contenedor donde se definen todas las rutas de la aplicación. Solo una se renderiza. */}
                        <Routes>
                            {/* Ruta de Login. Visible siempre. */}
                            <Route path = "/login" element = {<Login />} />
                            {/* Ruta Protegida: Componente Dashboard SÓLO se renderizará si usuario está autenticado (lógica dentro de ProtectedRoute). */}
                            <Route path = "/dashboard" element = {
                                <ProtectedRoute>
                                    {<Dashboard />} 
                                </ProtectedRoute>
                            }    
                            />
                            {/* Rutas públicas */}
                            <Route path = "/" element = {<Home />} />
                            {/* Pasa func 'agregarAlCarrito' como prop. Permite que componente 'Productos' (hijo) pueda modif estado 'carrito' definido en componente 'App' (padre). */}
                            <Route path = "/productos" element = {<Productos agregarAlCarrito = {agregarAlCarrito} />} />
                            {/* Ruta dinámica p/ver 1 prod individual. ":id" es parám de URL que se puede acceder dentro de ProductoDetalle. */}
                            <Route path = "/productos/:id" element = {<ProductoDetalle />} />
                            <Route path = "/contacto" element = {<Contacto />} />
                            <Route path = "/productos/nuevo" element = {<FormularioControlado />} />
                            <Route path = "/productos/editar/:id" element = {<FormularioControlado />} />                            
                        </Routes>
                        {/* Componentes que se muestran siempre, indep de ruta actual. */}
                        <Gallery />
                        {/* Equipo Talento Lab */}
                        <h2 style = {{textAlign: "center", marginTop: "20px"}}>Nuestro equipo</h2>
                        <div style = {{display: "flex", justifyContent: "center"}}>
                            <EquipoTalentoLab
                                nombre = "Juan"
                                rol = "Front-End dev"
                                imagen = "https://via.placeholder.com/150/0000FF"
                            />
                            <EquipoTalentoLab
                                nombre = "María"
                                rol = "Back-End dev"
                                imagen = "https://via.placeholder.com/150/FF0000"
                            />
                            <EquipoTalentoLab
                                nombre = "Leonardo"
                                rol = "UX designer"
                                imagen = "https://via.placeholder.com/150/00FF00"
                            />
                            <EquipoTalentoLab
                                nombre = "Ana"
                                rol = "Project manager"
                                imagen = "https://via.placeholder.com/150/00FF00"
                            />
                            {/*Tarjeta del Proyecto */}
                            <TarjetaProyecto
                                titulo = "Proyecto React"
                                descripcion = "Esta es una descripción TEST en React."
                                botonTexto = "Ver +"
                            /> 
                        </div>
                        {/*Galería de intereses */}
                        <div style = {{display: "flex", justifyContent: "center"}}>
                            {/* Pasa º array temas como prop 'arrayTemas' */}
                            <GaleriaInteres arrayTemas = {["React", "JS", "CSS", "Node.js"]} />
                        </div>
                        {/*Productos y carrito*/}
                        <div>
                            <h2 style = {{textAlign: "center", marginTop: "20px"}}>Productos</h2>
                            {/* Pasa est actual del 'carrito' y la func 'vaciarCarrito' como props. Carrito necesita ambos: saber qué mostrar (el estado 'carrito') y capacidad de vaciarse (la función). */}
                            <Carrito carrito = {carrito} vaciarCarrito = {vaciarCarrito} />
                        </div>  
                        <Footer />
                    </BrowserRouter>
                </ProductsProvider>
            </AuthProvider>
        </div>
    )
}

// Exporta componente App p/ser utilizado en punto de ent de la aplicación (main.jsx)
export default App;