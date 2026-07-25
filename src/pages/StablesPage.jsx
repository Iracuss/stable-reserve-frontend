import { useEffect, useState } from "react";
import StableCard from "../components/stables/StableCard";
import { getAllUserStables } from "../api/StableService";

import CreateStableForm from "../components/stables/CreateStableForm";
import EditStableForm from "../components/stables/EditStableForm";

export default function StablesPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [stables, setStables] = useState([]);
    
    const [isCreating, setIsCreating] = useState(false);
    const [editingStable, setEditingStable] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        getAllUserStables()
        .then((data) => {
            setStables(data);
            setIsLoading(false);
        })
        .catch((err) => {
            console.error('Failed to get all stables:', err);
            setIsLoading(false);
        });
    }, []);

    const handleEdit = (stable) => {
        setEditingStable(stable)
    };

    const handleDelete = (stable) => {
        console.log("Delete triggered for:", stable.name);
    }
    
    const handleLeave = (stable) => {
        console.log("Leave triggered for:", stable.name);
    }
    
    const handleInvite = (stable, email, role) => {
        console.log(`Sending invite to ${email} as ${role} for stable: ${stable.name}`);
    };

    const resetViews = () => {
        setIsCreating(false);
        setEditingStable(null);
    };

    if(isLoading) return <div className="p-10 text-center text-lg text-gray-600">Loading your stables...</div>;
    
    const isDefaultView = !isCreating && !editingStable;

    return (
        <div className="flex flex-col w-screen h-screen p-8 gap-8 justify-between bg-gray-50 overflow-hidden">
            
            {/* MAIN VIEWPORT */}
            <div className="flex flex-col border border-gray-200 bg-white shadow-md rounded-4xl flex-1 min-h-0 w-full p-8 gap-4 overflow-y-auto">
                {isCreating ? (
                        <CreateStableForm />

                ) : editingStable ? (
                        <EditStableForm editingStable={editingStable} />
                ) : (
                    <>
                        <h2 className="text-2xl font-bold mb-2">My Stables</h2>
                        {stables.length > 0 ? (
                            stables.map((stable) => (
                                <StableCard 
                                    key={stable.id}
                                    stable={stable} 
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                                    onLeave={handleLeave}
                                    onInvite={handleInvite}
                                />
                            ))
                        ) : (
                            <div className="flex justify-center items-center h-full text-gray-500 italic">
                                You don't have any stables yet. Click below to create one!
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* BOTTOM ACTION BUTTON */}
            <div className="flex justify-center items-center px-12 shrink-0">
                {isDefaultView ? (
                    <button 
                        onClick={() => setIsCreating(true)}
                        className="w-1/2 p-4 font-semibold text-xl rounded-2xl bg-blue-100 hover:bg-blue-200 text-blue-900 transition-colors shadow-sm"
                    >
                        Create New Stable
                    </button>
                ) : (
                    <button 
                        onClick={resetViews}
                        className="w-1/2 p-4 font-semibold text-xl rounded-2xl bg-gray-200 hover:bg-gray-300 text-gray-800 transition-colors shadow-sm"
                    >
                        &larr; Back to My Stables
                    </button>
                )}
            </div>

        </div>
    )
}