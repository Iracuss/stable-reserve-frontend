import { Link } from "react-router-dom";

export default function StableButton() {
    return (
        <Link
            to='/stables'
        >
            <h1 className="text-xl font-semibold text-gray-800 active:text-gray-700 hover:border-b-2 transition-colors">
                Stables
            </h1>
        </Link>
    )
}