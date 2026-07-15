import { Link } from "react-router-dom";
import { useAuth } from "../auth/UseAuth";
import { useState } from "react";
import DropAccountButton from "./DropAccountButton";

export default function AccountButton() {
    const [isOpen, setIsOpen] = useState(false);
    const {user} = useAuth();

    return (
        <div className="relative">
            {!user ? 
                <Link
                    to="/auth"
                    className="inline-block text-xl font-semibold text-white bg-black rounded-xl py-2 px-12 hover:bg-gray-800 active:bg-gray-700 transition-colors"
                >
                    Login
                </Link> :
                <>
                    <div className="relative inline-block">
                        <button onClick={() => setIsOpen(!isOpen)}
                            className={`inline-block text-xl font-semibold text-white bg-black py-2 px-12 hover:bg-gray-800 active:bg-gray-700 transition-colors ${isOpen ? 'rounded-t-xl' : 'rounded-xl'}`}
                        >
                            {user.username}
                        </button>

                        {isOpen && (
                            <div className="absolute top-full w-full right-0 overflow-hidden z-50">
                                <DropAccountButton setIsOpen={setIsOpen} />
                            </div>
                        )}
                    </div>
                </>
            }
        </div>
    );
}