import { useState } from "react"
import { resetPassword } from "../api/authService";
import { useNavigate, useSearchParams } from "react-router-dom";
import horseRunning from '../assets/horse-running.jpg';

export default function ResetPasswordPage() {
    const [searchParam] = useSearchParams();
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const token = searchParam.get("token");

    const nav = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        try {
            await resetPassword({token, newPassword});

            nav("/auth");
            alert("Successfully reset password.");
        } catch(err) {
            setError("Invalid token or expired token.");

            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }

    if(!token) return <div className="p-10 text-center">Error: No reset token provided.</div>;
    if(isLoading) return <div className="p-10 text-center">Resetting password...</div>;

    return (
        <div className="flex flex-row w-full h-screen">

            <div className="flex flex-col flex-1 pb-30 pl-12 pr-12 items-center justify-center gap-8">

                <h2 className="font-semibold text-3xl">Reset Password</h2>
                {error == null 
                    ? <></> 
                    : <h2 className="text-red-700 font-semibold text-xl">{error}</h2>
                }

                <form onSubmit={handleSubmit} className="flex flex-col gap-8 w-full">
                    <div>
                        <input 
                            type="password"
                            required
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:border-black"
                            placeholder="New password"
                        />
                    </div>

                    <div className="flex gap-3 mt-2">
                        <button 
                            type="submit"
                            className="flex-1 h-11 bg-black hover:bg-gray-800 text-white font-medium rounded-xl transition-colors"
                        >
                            Reset Password
                        </button>
                    </div>
                </form>
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