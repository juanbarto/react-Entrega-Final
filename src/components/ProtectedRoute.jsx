import { Navigate } from "react-router-dom";
import { useAuth } from  "../context/AuthContext";

// =========================
// Componente ProtectedRoute
// =========================

// Componente que envuelve rutas para restringir acceso a usuarios no autenticados.
function ProtectedRoute({ children }) {
    // Usa el hook p/obtener el est actual del usuario (null si no está logueado).
    const { user } = useAuth();
    // Lógica de protección: 
    // Si 'user' existe (logueado) --> Renderiza componente hijo ('children', ej. Dashboard).
    // Si 'user'=null (NO logueado) --> Usa <Navigate> p/redirigir automáticamente a usuario a ruta /login.
    // 'return user ? children : <Navigate to="/login" />': 
    // Operador Condicional Ternario: Forma if/else en 1 sola línea, en lógica de renderizado. 
    // Condición (user): Dado que user=null (falso) o string del nombre de usuario (verdadero), evalúa autenticación. 
    // Valor True (children): Si user existe, retorna componente que fue pasado como hijo de <ProtectedRoute>. 
    // Valor False (<Navigate to="/login"/>): Si user=null, retorna el componente <Navigate>, que es  utilidad de react-router-dom p/cambiar programáticamente la URL de la ventana y redirigir al usuario.
    return user ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;