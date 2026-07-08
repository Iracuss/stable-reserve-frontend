import { useAuth } from "../components/AuthContext";
import userIcon from "../assets/user-icon.png";

export default function AccountPage() {
    const {user} = useAuth();
    return (
        <div className="flex flex-col justify-start items-center h-screen p-4 gap-8">

            <div className="flex flex-row justify-between w-full bg-gray-200 shadow-lg rounded-xl max-w-8xl p-8 h-fit">
                <div className="flex flex-row items-center gap-5">
                    <div className="w-34 h-34 bg-gray-300 rounded-full shrink-0">
                        <img 
                            src={userIcon}
                            className="w-34 h-34 border-2 border-black-700 bg-gray-300 rounded-full shrink-0"
                            alt="user icon"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <h1 className="text-6xl font-bold">{user.username}</h1>
                        <h1 className="text-xl">{user.email}</h1>
                    </div>
                </div>
                <div className="flex flex-col justify-center gap-5 pr-4">
                    <button 
                        onClick={() => console.log('clicked edit user account')}
                        className="bg-black text-white py-2 px-4 text-2xl rounded-2xl font-semibold hover:bg-blue-400 hover:text-black active:bg-blue-300 transition-colors"
                    >
                        Edit Profile
                    </button>
                    <button 
                        onClick={() => console.log('clicked delete user account')}
                        className="bg-black text-white py-2 px-4 text-2xl rounded-2xl font-semibold hover:bg-red-500 hover:text-black active:bg-red-400 transition-colors"
                    >
                        Delete Profile
                    </button>
                </div>
            </div>
            
            <h1>Working on account page...</h1>

        </div>

    );
}