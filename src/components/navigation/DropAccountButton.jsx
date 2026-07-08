import AccountButton from "./AccountButton";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";


export default function DropAccountButton({setIsOpen}) {
    const {user, logoutUser} = useAuth();
    const nav = useNavigate();

    const viewAccount = () => {
        nav("/me");
        console.log("clicked view account");
    }
    
    const handleLogout = () => {
        setIsOpen(false);
        logoutUser();
    }

    return (
        <div className="flex flex-col">
            <button onClick={viewAccount}
                className="inline-block text-xl font-semibold text-white bg-black py-2 px-12 hover:bg-gray-800 active:bg-gray-700 transition-colors border-t border-gray-800"
            >
                Account
            </button>
            <button onClick={handleLogout}
                className="inline-block text-xl font-semibold text-white bg-black rounded-b-xl py-2 px-12 hover:bg-gray-800 active:bg-gray-700 transition-colors border-t border-gray-800"
            >
                Logout
            </button>
        </div>
    );
}