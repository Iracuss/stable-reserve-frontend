import { useEffect, useState } from "react";
import StableCard from "../components/stables/StableCard";
import { deleteStable, getAllUserStables } from "../api/stableService";

import CreateStableForm from "../components/stables/CreateStableForm";
import EditStableForm from "../components/stables/EditStableForm";
import ConfirmPopup from "../components/general/ConfirmPopup";
import { useNavigate } from "react-router-dom";
import { acceptStableInvite } from "../api/inviteService";

export default function StablesPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [stables, setStables] = useState([]);
    
    const [isCreating, setIsCreating] = useState(false);
    const [editingStable, setEditingStable] = useState(null);
    const [stableToDelete, setStableToDelete] = useState(null);

    const nav = useNavigate();

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
        setEditingStable(stable);
    };

    const handleStableEdit = (editedStable) => {
        setStables(prevStables => prevStables.map(s => 
            s.id === editedStable.id ? editedStable : s
        ));
        setEditingStable(null);
    };

    // const handleDelete = (stable) => {
    //     console.log("Delete triggered for:", stable.name);
    // }

    const handleDeleteClick = (stable) => {

        setStableToDelete(stable);
    }

    const confirmDelete = async () => {
        if (!stableToDelete) return;
        
        try {
            await deleteStable(stableToDelete.id);
            console.log("Confirmed delete for:", stableToDelete.name);
            
            // Remove it from the local UI list
            setStables(prev => prev.filter(s => s.id !== stableToDelete.id));
            
            // Close the popup
            setStableToDelete(null);
        } catch (error) {
            console.error("Failed to delete", error);
            alert("Failed to delete", error.message);
            throw error;
        }
    }

    const handleLeave = async (stable) => {
        try{
            await acceptStableInvite(stable.id, {"accepted": false});
            console.log("Leave triggered for:", stable.name);
            setStables(prev => prev.filter(s => s.id !== stable.id));
        } catch(error) {
            console.error("Failed to leave", error);
            alert("Failed to leave", error.message);
            throw error;
        }
    }
    
    const handleInvite = (stable, email, role) => {
        console.log(`Sending invite to ${email} as ${role} for stable: ${stable.name}`);
    };

    const handleCreate = (savedStable) => {
        nav(`/dashboard/${savedStable.id}`);
        setStables([...stables, savedStable]);
        console.log('Creating stable');
    }

    const resetViews = () => {
        setIsCreating(false);
        setEditingStable(null);
    };

    if(isLoading) return <div className="p-10 text-center text-lg text-gray-600">Loading your stables...</div>;
    
    const isDefaultView = !isCreating && !editingStable;

    return (
        <div className="flex flex-col w-full h-full p-8 gap-8 justify-between bg-gray-50 overflow-hidden">
            
            {/* MAIN VIEWPORT */}
            <div className="flex flex-col border border-gray-200 bg-white shadow-md rounded-4xl flex-1 min-h-0 w-full p-8 gap-4 overflow-y-auto">
                {isCreating ? (
                        <CreateStableForm
                            onCreate={handleCreate}
                            setIsCreating={setIsCreating}
                        />

                ) : editingStable ? (
                        <EditStableForm 
                            onEdit={handleStableEdit}
                            editingStable={editingStable} 
                        />
                ) : (
                    <>
                        <h2 className="text-2xl font-bold mb-2">My Stables</h2>
                        {stables.length > 0 ? (
                            stables.map((stable) => (
                                <StableCard 
                                    key={stable.id}
                                    stable={stable} 
                                    onEdit={handleEdit}
                                    onDelete={handleDeleteClick}
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

            <ConfirmPopup 
                isOpen={!!stableToDelete}
                onClose={() => setStableToDelete(null)}
                onConfirm={confirmDelete}
                title="Delete Stable?"
                message={
                    <>
                        Are you sure you want to delete <span className="font-bold text-gray-900">"{stableToDelete?.name}"</span>? This action cannot be undone and will remove all associated horses and members.
                    </>
                }
            />

        </div>
    )
}