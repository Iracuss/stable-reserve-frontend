export default function CreateStableForm() {

    return (
        <div className="flex flex-col w-full max-w-2xl mx-auto gap-8 pb-4">
            {/* Header */}
            <div className="flex flex-col text-center">
                <h1 className="text-3xl font-bold text-gray-900">Create a New Stable</h1>
            </div>

            <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
                {/* Stable Name Input */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-gray-700 pl-1">
                        Stable Name <span className="text-red-500">*</span>
                    </label>
                    <input 
                        type="text" 
                        placeholder="e.g. Whispering Pines Equestrian"
                        required
                        className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                </div>

                {/* Preferences Section */}
                <div className="flex flex-col gap-4">
                    <h2 className="text-lg font-bold text-gray-800">Notification Preferences</h2>
                    
                    <div className="flex gap-6 w-full">
                        {/* Coggins */}
                        <div className="flex flex-col gap-2 w-1/2">
                            <label className="text-sm font-semibold text-gray-700 pl-1">
                                Coggins Renewal (Days)
                            </label>
                            <input 
                                type="number" 
                                placeholder="365" 
                                defaultValue={365}
                                required
                                className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                            <p className="text-xs text-gray-400 pl-1">Alert when Coggins is this old.</p>
                        </div>

                        {/* Farrier */}
                        <div className="flex flex-col gap-2 w-1/2">
                            <label className="text-sm font-semibold text-gray-700 pl-1">
                                Farrier Schedule (Days)
                            </label>
                            <input 
                                type="number" 
                                placeholder="42"
                                defaultValue={42} 
                                required
                                className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                            <p className="text-xs text-gray-400 pl-1">Alert when Farrier is this overdue.</p>
                        </div>
                    </div>

                    {/* Email Toggle */}
                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-between cursor-pointer hover:bg-gray-100 transition-colors">
                        <div className="flex flex-col">
                            <span className="font-semibold text-gray-800">Email Notifications</span>
                            <span className="text-sm text-gray-500">Send emails when records are overdue</span>
                        </div>
                        
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                                type="checkbox" 
                                className="sr-only peer" 
                                defaultChecked 
                            />
                            <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                    </div>
                </div>

                {/* Submit Button */}
                <button 
                    type="submit"
                    className="w-full mt-2 bg-blue-600 text-white font-bold text-lg py-4 rounded-xl hover:bg-blue-700 active:bg-blue-800 transition-colors shadow-sm shrink-0"
                >
                    Create Stable
                </button>
            </form>
        </div>
    );
}