import { Link } from "react-router-dom";
import AccountButton from "./AccountButton";
import StableButton from "./StableButton";
import { useAuth } from "../auth/UseAuth";

export default function TopBar() {
    const {user} = useAuth();

    return (
        <div className="flex flex-col relative z-10">
            <div className="flex justify-between items-center bg-gray-100 shadow-md py-4 px-6 rounded-b-xl">
                <Link
                    to='/'
                >
                    <h1 className="text-2xl font-bold text-gray-800 hover:border-b-2 border-gray-800">Stable Reserve</h1>
                </Link>

                <div className="flex flex-row justify-center items-center gap-10">
                    {!user 
                        ? <></>
                        : <StableButton />
                    }
                    
                    <AccountButton />
                </div>

            </div>
        </div>
    );
}