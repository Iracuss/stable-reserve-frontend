import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export const useAuth = () => {
    const context = useContext(AuthContext);

    // console.log("Auth context:", context);

    return context;
}