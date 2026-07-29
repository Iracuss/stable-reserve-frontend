import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendStableInvite } from "../../api/inviteService";
import MemberListItem from "./MemberListItem";
import { getAllUsersInStable, kickUserFromStable } from "../../api/stableService";

export default function StableCard({ stable, onEdit, onDelete, onInvite, onLeave }) {
    const navigate = useNavigate();
    
    // Form and List visibility state
    const [showInviteForm, setShowInviteForm] = useState(false);
    const [showUserList, setShowUserList] = useState(false);
    
    // Invite form state
    const [inviteEmail, setInviteEmail] = useState("");
    const [inviteRole, setInviteRole] = useState("STAFF");

    // Members list state
    const [members, setMembers] = useState([]);
    const [isLoadingMembers, setIsLoadingMembers] = useState(false);
    const [hasFetchedMembers, setHasFetchedMembers] = useState(false); // Tracks if we already fetched

    const ownerName = stable.ownerUsername || "Unknown";
    const memberCount = stable.memberCount || 0; 
    const horseCount = stable.horseCount || 0;
    
    const role = stable.currentUserRole;
    const isOwner = role === "OWNER";
    const canEdit = role === "OWNER" || role === "MANAGER";

    const handleCardClick = () => {
        if (!showInviteForm && !showUserList) {
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
        if (!showInviteForm) setShowUserList(false);
    };

    const handleKickUser = async (userIdToKick) => {
        // Optional: Add a standard browser confirmation window just so people don't misclick
        if (!window.confirm("Are you sure you want to kick this user?")) return;

        try {
            await kickUserFromStable(userIdToKick, stable.id);
            setMembers(prevMembers => prevMembers.filter(m => m.userId !== userIdToKick));
        } catch (error) {
            console.error("Failed to kick user:", error);
            alert("Failed to kick user. Please try again.");
        }
    };

    const toggleUserList = async (e) => {
        e.stopPropagation();
        
        // If we are about to open the list and haven't fetched members yet
        if (!showUserList && !hasFetchedMembers) {
            setIsLoadingMembers(true);
            try {

                const data = await getAllUsersInStable(stable.id);
                setMembers(data);
                
                setHasFetchedMembers(true);
            } catch (error) {
                console.error("Failed to load members", error);
            } finally {
                setIsLoadingMembers(false);
            }
        }
        
        setShowUserList(!showUserList);
        if (!showUserList) setShowInviteForm(false);
    };

    const handleSendInvite = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        if(onInvite) {
            const inviteData = {
                "email": inviteEmail,
                "role": inviteRole
            };
            await sendStableInvite(stable.id, inviteData);
            onInvite(stable, inviteEmail, inviteRole);
        }
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
                    <button 
                        onClick={toggleUserList}
                        className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${showUserList ? 'bg-gray-600 text-white' : 'text-gray-600 bg-gray-100 hover:bg-gray-200'}`}
                    >
                        {showUserList ? "Close" : "Members"}
                    </button>

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
                            Dashboard &rarr;
                        </span>
                    )}
                </div>
            </div>

            {/* INLINE USER LIST FORM (Scrollable container) */}
            {showUserList && (
                <div 
                    className="bg-gray-50 border-t border-gray-200 px-8 py-6 cursor-default max-h-72 overflow-y-auto"
                    onClick={(e) => e.stopPropagation()} 
                >
                    <h3 className="text-sm font-bold text-gray-600 uppercase tracking-wider mb-4">
                        Stable Members
                    </h3>
                    
                    <div className="flex flex-col gap-2">
                        {isLoadingMembers ? (
                            <div className="text-center py-4 text-gray-500 text-sm font-medium">
                                Loading members...
                            </div>
                        ) : members.length === 0 ? (
                            <div className="text-center py-4 text-gray-500 text-sm">
                                No members found.
                            </div>
                        ) : (
                            members.map(member => (
                                <MemberListItem 
                                    key={member.id} 
                                    member={member} 
                                    currentUserRole={role} 
                                    onKick={handleKickUser}
                                />
                            ))
                        )}
                    </div>
                </div>
            )}

            {/* INLINE INVITE FORM */}
            {showInviteForm && (
                <div 
                    className="bg-blue-50 border-t border-blue-100 px-8 py-4 flex gap-4 items-center justify-between cursor-default"
                    onClick={(e) => e.stopPropagation()} 
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