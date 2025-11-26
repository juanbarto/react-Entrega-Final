import { createContext, useContext, useState } from "react";

// ======================
// Componente AuthContext
// ======================

// Creación del Context: Objeto que permite compartir estados y funciones.
const AuthContext = createContext();
// Componente Provider: Envuelve a los componentes que necesiten acceder al contexto.
export function AuthProvider({children}) {
    // Est 'user': Almacena usuario autenticado (null si no hay login).
    const [user, setUser] = useState(null);
    // Func LOGIN simulada.
    const login = (username) => {
        // Crea un token falso. Si fuera 1 app real, vendría de un servidor.
        const token = `fake-token-${username}`;
        // Almacena el token en almacenamiento local del navegador p/"recordar" la sesión.
        localStorage.setItem("AuthToken", token);
        // Actualiza est del usuario, indicando que la sesión está activa.
        setUser(username);
    };
    // Func de LOGOUT.
    const logout = () => {
        // Elim el token de sesión del almacenamiento local.
        localStorage.removeItem("AuthToken");
        // Restablece est del usuario a null, cerrando la sesión.
        setUser(null);
    };

    return (
        // AuthContext.Provider: Componente que hace que vals (user, login, logout) estén disponibles para sus hijos.
        <AuthContext.Provider value = {{user,login,logout}}>
            {children}
        </AuthContext.Provider>
    );
}
// Custom Hook 'useAuth': Facilita acceso a vals del Context desde cualquier componente hijo.
export const useAuth = () => useContext(AuthContext);