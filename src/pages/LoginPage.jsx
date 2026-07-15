import { useState } from "react"
import { login } from "../api/authService";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../components/auth/UseAuth";
import { getMyAccount } from "../api/userService";
import horseRunning from '../assets/horse-running.jpg';

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
            await login({username, password});
            const user = await getMyAccount();

            loginUser(user);
            nav("/");
        } catch(err) {
            setError("Invalid credentials. Please try again.");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }

    if(isLoading) return <div className="p-10 text-center">Logging in...</div>;

    return (
        <div className="flex flex-row w-full h-screen">

            <div className="flex flex-col flex-1 pb-30 pl-12 pr-12 items-center justify-center gap-8">

                <h2 className="font-semibold text-3xl">Login</h2>
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
                            Login
                        </button>
                    </div>
                </form>
                <div className="flex flex-row gap-5">
                    <h2 className="font-bold">
                        Not Registered?
                    </h2>
                    <Link
                        to='/register'
                        className="text-blue-900 hover:text-blue-700 transition-colors underline"
                    >
                        Register now
                    </Link>
                </div>
            </div>

            <div className="w-1/2 h-full overflow-hidden">
                <img 
                    src={horseRunning} 
                    alt="Horse running"
                    className="w-full h-full object-cover" 
                />
            </div>

        </div>
    )
}