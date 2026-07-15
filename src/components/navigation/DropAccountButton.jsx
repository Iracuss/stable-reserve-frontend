import { useAuth } from "../auth/UseAuth";
import { useNavigate } from "react-router-dom";


export default function DropAccountButton({setIsOpen}) {
    const {logoutUser} = useAuth();
    const nav = useNavigate();

    const viewAccount = () => {
        setIsOpen(false);
        nav("/me");
        console.log("clicked view account");
    }
    
    const handleLogout = () => {
        setIsOpen(false);
        nav("/");
        logoutUser();
    }

    return (
        <div className="flex flex-col w-full">
            <button onClick={viewAccount}
                className="w-full text-xl font-semibold text-white bg-black py-2 px-12 hover:bg-gray-800 active:bg-gray-700 transition-colors border-t border-gray-800"
            >
                Account
            </button>
            <button onClick={handleLogout}
                className="w-full text-xl font-semibold text-white bg-black rounded-b-xl py-2 px-12 hover:bg-gray-800 active:bg-gray-700 transition-colors border-t border-gray-800"
            >
                Logout
            </button>
        </div>
    );
}