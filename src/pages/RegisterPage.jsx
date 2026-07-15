import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { register } from "../api/authService";
import horseBarn from "../assets/horse-barn.jpg"

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
            await register({username, email, password});

            nav('/auth');
        } catch(err) {
            setError('User with email or username already exists');
            console.error(err);
        } finally {
            setIsLoading(false)
        }

    }

    if(isLoading) return <div className="p-10 text-center">Registering account...</div>;

    return (
        <div className="flex flex-row w-full h-screen">
            
            <div className="flex flex-col flex-1 pb-25 pl-12 pr-12 items-center justify-center gap-8">
                <h2 className="font-semibold text-3xl">Register</h2>
                {error == null 
                    ? <></> 
                    : <h2 className="text-red-700 font-semibold text-xl">{error}</h2>
                }
       
                <form onSubmit={handleSubmit} className="flex flex-col gap-8 w-full">
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
                            type="submit"
                            className="flex-1 h-11 bg-black hover:bg-gray-800 text-white font-medium rounded-xl transition-colors"
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>

            <div className="w-1/2 h-full overflow-hidden">
                <img 
                    src={horseBarn}
                    alt="Horse in a barn"
                    className="w-full h-full object-cover" 
                />
            </div>
        </div>
    )
}