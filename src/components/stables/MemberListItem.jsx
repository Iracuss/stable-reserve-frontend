export default function MemberListItem({ member, currentUserRole, onKick }) {
    const canKick = (currentUserRole === "OWNER" || currentUserRole === "MANAGER") && member.role !== "OWNER";

    return (
        <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-gray-700 font-bold text-sm">
                    {member.username ? member.username.charAt(0).toUpperCase() : "?"}
                </div>
                <div className="flex flex-col">
                    <span className="text-sm font-bold text-gray-800">{member.username || member.email}</span>
                    <span className="text-xs text-gray-500">{member.email}</span>
                </div>
            </div>
            
            <div className="flex items-center gap-3">
                <span className={`px-2 py-1 text-xs font-bold uppercase tracking-wider rounded-md ${
                    member.role === 'OWNER' ? 'bg-purple-100 text-purple-800' :
                    member.role === 'MANAGER' ? 'bg-blue-100 text-blue-800' : 
                    'bg-gray-100 text-gray-700'
                }`}>
                    {member.role}
                </span>
                
                {/* Kick Button (Only renders if rules are met) */}
                {canKick && (
                    <button 
                        onClick={() => onKick(member.userId)}
                        className="px-3 py-1 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors"
                    >
                        Kick
                    </button>
                )}
            </div>
        </div>
    );
}