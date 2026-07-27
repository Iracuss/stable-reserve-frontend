import { Link } from "react-router-dom";

export default function InviteButton() {
    return (
        <Link
            to='/invites'
        >
            <h1 className="text-xl font-semibold text-gray-800 active:text-gray-700 hover:border-b-2 transition-colors">Invites</h1>
        </Link>
    )
}