import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const savedUser = localStorage.getItem('user_info');
        if(savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const loginUser = (userData) => {
        setUser(userData);
    }

    const logoutUser = () => {
        setUser(null);
        localStorage.removeItem('user_info');
        localStorage.removeItem('jwt_token');
    }

    return (
        <AuthContext.Provider value={{user, loginUser, logoutUser}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);