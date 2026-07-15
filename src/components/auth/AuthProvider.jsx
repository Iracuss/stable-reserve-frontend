import { useState } from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("user_info");
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const loginUser = (userData) => {
        setUser(userData);
    };

    const logoutUser = () => {
        setUser(null);
        localStorage.removeItem("user_info");
        localStorage.removeItem("jwt_token");
    };

    return (
        <AuthContext.Provider
            value={{ user, setUser, loginUser, logoutUser }}
        >
            {children}
        </AuthContext.Provider>
    );
};