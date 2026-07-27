import { useEffect, useState } from "react";
import { acceptStableInvite, getAllUserInvites } from "../api/inviteService";

export default function InvitesPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [invites, setInvites] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        getAllUserInvites()
        .then((data) => {
            setInvites(data);
            setIsLoading(false);
        })
        .catch((err) => {
            console.error('Failed to get all invites:', err);
            setIsLoading(false);
        });
    }, []);

    // Handler that takes the boolean and the hidden stableId
    const handleInviteResponse = async (inviteId, stableId, isAccepted) => {
        try {
            const accept = {
                "accepted": isAccepted
            }
            await acceptStableInvite(stableId, accept);
            
            // Remove the invite from the UI after successfully responding
            setInvites((prevInvites) => prevInvites.filter((invite) => invite.id !== inviteId));
        } catch (error) {
            console.error(`Failed to ${isAccepted ? 'accept' : 'reject'} invite:`, error);
        }
    };

    if(isLoading) return <div className="p-10 text-center text-lg text-gray-600">Loading your invites...</div>;

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Your Invites</h1>
            
            {invites.length === 0 ? (
                <div className="p-10 text-center text-gray-500 bg-gray-50 rounded-lg border border-gray-200">
                    You have no pending invites.
                </div>
            ) : (
                <div className="space-y-4">
                    {invites.map(invite => (
                        <div 
                            key={invite.stableId}
                            className="flex flex-col sm:flex-row justify-between items-center p-5 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="mb-4 sm:mb-0 text-gray-700">
                                <span className="font-semibold text-gray-900">{invite.stableOwner}</span> invited you to join{' '}
                                <span className="font-semibold text-gray-900">{invite.stableName}</span> as a{' '}
                                <span className="font-semibold text-blue-600">{invite.stableRole}</span>.
                            </div>
                            
                            <div className="flex gap-3 w-full sm:w-auto">
                                <button 
                                    onClick={() => handleInviteResponse(invite.id, invite.stableId, false)}
                                    className="flex-1 sm:flex-none px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                                >
                                    Reject
                                </button>
                                <button 
                                    onClick={() => handleInviteResponse(invite.id, invite.stableId, true)}
                                    className="flex-1 sm:flex-none px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors"
                                >
                                    Accept
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}