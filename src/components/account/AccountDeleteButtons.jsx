import { useNavigate } from "react-router-dom";
import { deleteAccount } from "../../api/userService";
import { useAuth } from "../AuthContext";

export default function AccountDeleteButtons({setIsDeleting}) {
    const {user, logoutUser} = useAuth();

    const nav = useNavigate();
    const handleCancel = () => {
        setIsDeleting(false);
    }

    const handleAccept = async () => {
        nav('/');
        await deleteAccount(user.id);
        logoutUser();

        // Display custom alert
    }

    return (
        <div className="flex flex-row w-1/2 ">
            <div className="w-1/2 px-2">
                <button 
                    onClick={() => handleCancel()}
                    className="bg-black text-white text-3xl w-full rounded-xl px-6 py-2 hover:bg-gray-800 active:bg-gray-700 transition-colors"
                >
                    Cancel
                </button>
            </div>
            <div className="w-1/2 px-2">
                <button 
                    onClick={() => handleAccept()}
                    className="bg-black text-white text-3xl w-full rounded-xl px-6 py-2 hover:bg-red-500 hover:text-black active:bg-red-400 transition-colors"
                >
                    Delete Account?
                </button>
            </div>
        </div>
    );
}