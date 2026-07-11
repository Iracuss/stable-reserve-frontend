import { useState } from "react";
import HorseContentTitle from "./HorseContentTitle";
import HorseOverview from "./HorseOverview";
import { deleteHorse } from "../../api/horseService";
import HorseEdit from "./HorseEdit";
import HorseDates from "./HorseDates";
import { isOverdue } from "../utils/dateHelper";

export default function HorseContent({horse, onDeleteSuccess, onEdit}) {

    const [activeTab, setActiveTab] = useState('overview');

    if(!horse) {
        return (
            <main className="flex-1 p-6 bg-gray-50 flex items-center justify-center">
                <p className="text-xl text-gray-400 font-medium">
                    Select a horse from the sidebar to view details.
                </p>
            </main>
        );
    }

    const cogginsWarning = isOverdue(horse.lastCogginDate, 365);
    const farrierWarning = isOverdue(horse.lastFarrierDate, 42);

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
        <div key={horse.id} className={`flex flex-col pt-${cogginsWarning || farrierWarning ? '6' : '8'} pb-8 flex-1 items-center h-full overflow-y-auto`}>
            <div className="w-full max-w-5xl flex flex-col gap-6 items-center">
                {cogginsWarning && farrierWarning ? (
                    <h1 className="font-bold text-2xl text-white bg-red-800 px-4 py-2 rounded-xl">Coggins and Farrier Overdue</h1>
                ) : (
                    <>
                        {cogginsWarning && <h1 className="font-bold text-2xl text-white bg-orange-600 px-4 py-2 rounded-xl">Coggins Overdue</h1>}
                        {farrierWarning && <h1 className="font-bold text-2xl text-white bg-orange-600 px-4 py-2 rounded-xl">Farrier Overdue</h1>}
                    </>
                )}
                <div className="w-full bg-gray-200 shadow-lg rounded-xl max-w-5xl p-8 h-fit">
                    <HorseContentTitle horse={horse}/>
                </div>

                <div className="flex gap-8 pb-2">
                    <button
                        onClick={() => setActiveTab('overview')}
                        className={`font-bold text-lg ${activeTab === 'overview' ? 'text-black border-b-2 border-black' : 'text-gray-400 hover:text-gray-500 transition-colors'}`}
                    >
                        Overview
                    </button>
                    <button
                        onClick={() => setActiveTab('dates')}
                        className={`font-bold text-lg ${activeTab === 'dates' ? 'text-black border-b-2 border-black' : 'text-gray-400 hover:text-gray-500 transition-colors'}`}
                    >
                        Coggins & Farrier
                    </button>
                    <button
                        onClick={() => setActiveTab('edit')}
                        className={`font-bold text-lg ${activeTab === 'edit' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-gray-500 transition-colors'}`}
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => deleteCurrentHorse(horse.id)}
                        className={`font-bold text-lg text-red-600 border-b-2 border-red-600 hover:text-red-500 hover:border-red-500 active:text-red-400 active:border-red-400 transition-colors`}
                    >
                        Delete
                    </button>
                </div>

                <div className="w-full bg-white shadow-sm rounded-xl border border-gray-200 p-8">
                    {activeTab === 'overview' && <HorseOverview horse={horse} key={horse.id} />}
                    {activeTab === 'dates' && <HorseDates horse={horse} key={horse.id} onEdit={onEdit} setActiveTab={setActiveTab} />}
                    {activeTab === 'edit' && <HorseEdit horse={horse} key={horse.id} onEdit={onEdit} />}
                </div>
            </div>
        </div>
    );
}