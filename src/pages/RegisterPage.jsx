import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { register } from "../api/authService";

export default function RegisterPage() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const nav = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const data = await register({username, email, password});

            nav('/auth');
        } catch(err) {
            setError('User with email or username already exists');
        } finally {
            setIsLoading(false)
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
                        type="text"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:border-black"
                        placeholder="Email"
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
                        Register
                    </button>
                </div>
            </form>
        </div>
    )
}