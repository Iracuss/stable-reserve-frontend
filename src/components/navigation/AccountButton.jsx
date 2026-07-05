import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function AccountButton() {
    const {user, logoutUser} = useAuth();


    return (
        <div className="">
            {!user ? 
                <Link
                    to="/auth"
                    className="inline-block text-xl font-semibold text-white bg-black rounded-full py-2 px-6 hover:bg-gray-800 active:bg-gray-700 transition-colors"
                >
                    Login
                </Link> :
                <button onClick={logoutUser}
                >{user.username}</button>
            }

        </div>
    );
}