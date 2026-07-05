import { useState } from "react"
import { login } from "../api/authService";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";
import { getMyAccount } from "../api/userService";

export default function LoginPage() {
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const {loginUser} = useAuth();
    const nav = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const data = await login({username, password});
            const user = await getMyAccount();

            loginUser(user);
            nav("/");
        } catch(err) {
            setError("Invalid credentials. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div>

            {error == null ? <></> : <h2>{error}</h2>}

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                    <input 
                        type="text"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:border-black"
                        placeholder="Username"
                    />
                </div>
                <div>
                    <input 
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:border-black"
                        placeholder="Password"
                    />
                </div>

                <div className="flex gap-3 mt-2">
                    <button 
                        type="submit" // Triggers the form's onSubmit handler
                        className="flex-1 h-11 bg-black hover:bg-gray-800 text-white font-medium rounded-xl transition-colors"
                    >
                        Login
                    </button>
                </div>
            </form>

            <h2>
                Not Registered?
            </h2>
            <Link
                to='/register'
            >
                Register now
            </Link>
        </div>
    )
}