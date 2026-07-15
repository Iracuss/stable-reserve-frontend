import { Link } from "react-router-dom";
import AccountButton from "./AccountButton";

export default function TopBar() {
    return (
        <div className="flex flex-col">
            <div className="flex justify-between items-center bg-gray-100 shadow-md py-4 px-6 rounded-b-xl">
                <Link
                    to='/'
                >
                    <h1 className="text-2xl font-bold text-gray-800">Stable Reserve</h1>
                </Link>
                <AccountButton />
            </div>
        </div>
    );
}