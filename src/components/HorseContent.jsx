import { useState } from "react";
import HorseContentTitle from "./HorseContentTitle";

export default function HorseContent({horse}) {

    const [activeTab, setActiveTab] = useState('overview')

    if(!horse) {
        return (
            <main className="flex-1 p-6 bg-gray-50 flex items-center justify-center">
                <p className="text-xl text-gray-400 font-medium">
                    Select a horse from the sidebar to view details.
                </p>
            </main>
        );
    }
    return (
        <div key={horse.id} className="flex flex-col pt-8 flex-1 items-center">
            <div className="w-full max-w-5xl flex flex-col gap-6 items-center">
                <div className="w-full bg-gray-200 shadow-lg rounded-xl max-w-5xl p-8 h-fit">
                    <HorseContentTitle horse={horse}/>
                </div>

                <div className="flex gap-8 pb-2">
                    <button
                        onClick={() => setActiveTab('overview')}
                        className={`font-bold text-lg ${activeTab === 'overview' ? 'text-black border-b-2 border-black' : 'text-gray-400'}`}
                    >
                        Overview
                    </button>
                    <button
                        onClick={() => setActiveTab('logs')}
                        className={`font-bold text-lg ${activeTab === 'logs' ? 'text-black border-b-2 border-black' : 'text-gray-400'}`}
                    >
                        Logs
                    </button>
                    <button
                        onClick={() => setActiveTab('health')}
                        className={`font-bold text-lg ${activeTab === 'health' ? 'text-black border-b-2 border-black' : 'text-gray-400'}`}
                    >
                        Health
                    </button>
                </div>

                <div className="w-full bg-white shadow-sm rounded-xl border border-gray-200 p-8 min-h-[300px]">
                    {activeTab === 'overview' && <p>Overview details coming soon...</p>}
                    {activeTab === 'logs' && <p>Log charts coming soon...</p>}
                    {activeTab === 'health' && <p>Health data coming soon...</p>}
                </div>
            </div>
        </div>
    );
}