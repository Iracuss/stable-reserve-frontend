export default function ConfirmPopup({ 
    isOpen, 
    onClose, 
    onConfirm, 
    title, 
    message, 
    confirmText = "Yes, delete it",
    cancelText = "Cancel"
}) {
    // render nothing
    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            onClick={onClose}
        >
            <div 
                className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8"
                onClick={(e) => e.stopPropagation()} 
            >
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {title}
                </h3>
                
                <div className="text-gray-600 mb-6">
                    {message}
                </div>
                
                <div className="flex justify-end gap-3">
                    <button 
                        onClick={onClose}
                        className="px-5 py-2.5 font-semibold text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
                    >
                        {cancelText}
                    </button>
                    
                    <button 
                        onClick={onConfirm}
                        className="px-5 py-2.5 font-semibold text-white bg-red-600 rounded-xl hover:bg-red-700 transition-colors shadow-sm"
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}