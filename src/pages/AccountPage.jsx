import { useAuth } from "../components/auth/UseAuth";
import userIcon from "../assets/user-icon.png";
import { getAllHorses } from "../api/horseService";
import { useEffect, useState } from "react";
import AccountHorseContainer from "../components/account/AccountHorseContainer";
import AccountEditForm from "../components/account/AccountEditForm";
import AccountDeleteButtons from "../components/account/AccountDeleteButtons";

export default function AccountPage() {
    const {user} = useAuth();

    const [horses, setHorses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        if(!user) {
            setHorses([]);
            setIsLoading(false);
            return;
        }
        setIsLoading(true);
        getAllHorses()
        .then((data) => {
            setHorses(data);
            setIsLoading(false);
        })
        .catch((err) => {
            // Handle error
            console.error('Failed to get all horses:', err);
            setIsLoading(false);
        });
    }, [user]);

    if(!user) {
        return (
            <div className="flex justify-center items-center h-screen">
                <h2 className="text-xl font-semibold">Please log in to view this page.</h2>
            </div>
        );
    }

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
                        onClick={() => setIsEditing(!isEditing)}
                        className="bg-black text-white py-2 px-4 text-2xl rounded-2xl font-semibold hover:bg-blue-400 hover:text-black active:bg-blue-300 transition-colors"
                    >
                        Edit Profile
                    </button>
                    <button 
                        onClick={() => setIsDeleting(!isDeleting)}
                        className="bg-black text-white py-2 px-4 text-2xl rounded-2xl font-semibold hover:bg-red-500 hover:text-black active:bg-red-400 transition-colors"
                    >
                        Delete Profile
                    </button>
                </div>
            </div>
            
            {!isEditing 
                ? <></> 
                : <AccountEditForm setIsEditing={setIsEditing} />
            }
            
            {!isDeleting 
                ? <></> 
                : <AccountDeleteButtons setIsDeleting={setIsDeleting} />
            }

            <h1 className="text-4xl font-bold border-b-3">Horses</h1>
            {isLoading 
                ? <main className="flex-1 flex pt-24 items-start justify-center">
                    <p className="text-xl text-gray-400 font-medium">
                        Loading horses...
                    </p>
                </main>
                : <AccountHorseContainer horses={horses} />
            }


        </div>

    );
}