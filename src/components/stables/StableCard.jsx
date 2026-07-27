import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendStableInvite } from "../../api/inviteService";

export default function StableCard({ stable, onEdit, onDelete, onInvite, onLeave }) {
    const navigate = useNavigate();
    
    // Local state to handle the inline invite form
    const [showInviteForm, setShowInviteForm] = useState(false);
    const [inviteEmail, setInviteEmail] = useState("");
    const [inviteRole, setInviteRole] = useState("STAFF");

    const ownerName = stable.ownerUsername || "Unknown";
    const memberCount = stable.memberCount || 0; 
    const horseCount = stable.horseCount || 0;
    
    const role = stable.currentUserRole;
    
    const isOwner = role === "OWNER";
    const canEdit = role === "OWNER" || role === "MANAGER";

    const handleCardClick = () => {
        // Don't navigate if they are interacting with the invite form
        if (!showInviteForm) {
            navigate(`/dashboard/${stable.id}`);
        }
    };

    const handleActionClick = (e, action) => {
        e.stopPropagation(); 
        if(action) action(stable);
    };

    const toggleInviteForm = (e) => {
        e.stopPropagation();
        setShowInviteForm(!showInviteForm);
    };

    const handleSendInvite = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        if(onInvite) {
            const inviteData = {
                "email": inviteEmail,
                "role": inviteRole
            }
            await sendStableInvite(stable.id, inviteData);
            onInvite(stable, inviteEmail, inviteRole);
        }

        // Reset and close after sending
        setInviteEmail("");
        setInviteRole("STAFF");
        setShowInviteForm(false);
    };

    return (
        <div 
            onClick={handleCardClick}
            className="shrink-0 flex flex-col w-full bg-white rounded-2xl border border-gray-200 shadow-sm hover:border-blue-300 hover:shadow-md transition-all cursor-pointer overflow-hidden group"
        >
            {/* MAIN CARD ROW */}
            <div className="flex w-full px-8 py-6 items-center justify-between">
                <div className="flex flex-col gap-1 w-1/3">
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors">
                            {stable.name}
                        </h1>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider rounded-md">
                            {role || "STAFF"}
                        </span>
                    </div>
                    <p className="text-gray-500 text-sm">
                        Managed by <span className="font-semibold text-gray-700">{ownerName}</span>
                    </p>
                </div>

                <div className="flex gap-8 w-1/3 justify-center border-x border-gray-100 px-6">
                    <div className="flex flex-col items-center">
                        <span className="text-2xl font-bold text-gray-800">{memberCount}</span>
                        <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Members</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-2xl font-bold text-gray-800">{horseCount}</span>
                        <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Horses</span>
                    </div>
                </div>

                <div className="flex w-1/3 justify-end items-center gap-3">
                    {canEdit && (
                        <>
                            <button 
                                onClick={toggleInviteForm}
                                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${showInviteForm ? 'bg-blue-600 text-white' : 'text-blue-600 bg-blue-50 hover:bg-blue-100'}`}
                            >
                                {showInviteForm ? "Cancel" : "Invite"}
                            </button>
                            <button 
                                onClick={(e) => handleActionClick(e, onEdit)}
                                className="px-4 py-2 text-sm font-semibold text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                            >
                                Edit
                            </button>
                        </>
                    )}

                    {isOwner ? (
                        <button 
                            onClick={(e) => handleActionClick(e, onDelete)}
                            className="px-4 py-2 text-sm font-semibold text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                        >
                            Delete
                        </button>
                    ) : (
                        <button 
                            onClick={(e) => handleActionClick(e, onLeave)}
                            className="px-4 py-2 text-sm font-semibold text-orange-600 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
                        >
                            Leave
                        </button>
                    )}

                    {!canEdit && (
                        <span className="text-blue-500 font-semibold group-hover:underline pr-2 ml-2">
                            View Dashboard &rarr;
                        </span>
                    )}
                </div>
            </div>

            {/* INLINE INVITE FORM (Drops down when Invite is clicked) */}
            {showInviteForm && (
                <div 
                    className="bg-blue-50 border-t border-blue-100 px-8 py-4 flex gap-4 items-center justify-between cursor-default"
                    onClick={(e) => e.stopPropagation()} // Stop typing from triggering the card link
                >
                    <div className="flex gap-4 w-full items-center">
                        <input 
                            type="email" 
                            placeholder="User's email address..." 
                            value={inviteEmail}
                            onChange={(e) => setInviteEmail(e.target.value)}
                            className="flex-grow px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <select 
                            value={inviteRole}
                            onChange={(e) => setInviteRole(e.target.value)}
                            className="px-4 py-2 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold text-gray-700"
                        >
                            <option value="STAFF">Staff</option>
                            <option value="MANAGER">Manager</option>
                        </select>
                        <button 
                            onClick={handleSendInvite}
                            disabled={!inviteEmail}
                            className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            Send Invite
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}