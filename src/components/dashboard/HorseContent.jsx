import { useState } from "react";
import HorseContentTitle from "./HorseContentTitle";
import HorseOverview from "./HorseOverview";
import { deleteHorse } from "../../api/horseService";

export default function HorseContent({horse, onDeleteSuccess}) {

    const [activeTab, setActiveTab] = useState('overview');
    const [delHorse, setDelHorse] = useState('false');

    if(!horse) {
        return (
            <main className="flex-1 p-6 bg-gray-50 flex items-center justify-center">
                <p className="text-xl text-gray-400 font-medium">
                    Select a horse from the sidebar to view details.
                </p>
            </main>
        );
    }

    const deleteCurrentHorse = async (horseId) => {
        try {
            console.log('clicked delete');
            // Need to make a thing to check if we are sure but later

            await deleteHorse(horseId);
            onDeleteSuccess(horseId);
        } catch(error) {
            console.error('Failed to delete horse:', error);
            throw error;
        }
    }

    return (
        <div key={horse.id} className="flex flex-col pt-8 pb-8 flex-1 items-center h-full overflow-y-auto">
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
                        onClick={() => deleteCurrentHorse(horse.id)}
                        className={`font-bold text-lg text-red-600 border-b-2 border-red-600 hover:text-red-500 hover:border-red-500 active:text-red-400 active:border-red-400 transition-colors`}
                    >
                        Delete
                    </button>
                </div>

                <div className="w-full bg-white shadow-sm rounded-xl border border-gray-200 p-8 min-h-[700px]">
                    {activeTab === 'overview' && <HorseOverview horse={horse} key={horse.id} />}
                </div>
            </div>
        </div>
    );
}