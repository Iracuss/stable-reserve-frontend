import { useState } from "react";
import { updateHorse } from "../../api/horseService";

export default function HorseDates({horse, onEdit}) {
    const [cogginsDate, setCogginsDate] = useState('');
    const [farrierDate, setFarrierDate] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const horseDateEdit = {}

        const finalCoggins = cogginsDate || horse.lastCogginDate;
        const finalFarrier = farrierDate || horse.lastFarrierDate;

        if(finalCoggins) {
            horseDateEdit.lastCogginDate = finalCoggins;
        }

        if(finalFarrier) {
            horseDateEdit.lastFarrierDate = finalFarrier;
        }

        await updateHorse(horse.id, horseDateEdit);
        onEdit({...horse, ...horseDateEdit});
    }

    return (
        <div className="">
            <div className="flex flex-row justify-start pb-8">
                <h1 className="font-semibold w-full">
                    <span className="font-bold text-xl">Current latest Coggins: </span>
                    {!horse.lastCogginDate ? 'Not set yet' : horse.lastCogginDate}
                </h1>
                <h1 className="font-semibold w-full">
                    <span className="font-bold text-xl">Current latest Farrier: </span>
                    {!horse.lastFarrierDate ? 'Not set yet' : horse.lastFarrierDate}
                </h1>
            </div>

            {/* Edit form for the CaF */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 border-t-2 pt-6">
                <div className="flex flex-row gap-5">
                    <div className="flex-1 flex-col">
                        <h1 className="pb-1 font-semibold">Coggins</h1>
                        <input 
                            type="date"
                            value={cogginsDate}
                            onChange={(e) => setCogginsDate(e.target.value)}
                            className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:border-black"
                        />
                    </div>
                    <div className="flex-1 flex-col">
                        <h1 className="pb-1 font-semibold">Farrier</h1>
                        <input 
                            type="date"
                            value={farrierDate}
                            onChange={(e) => setFarrierDate(e.target.value)}
                            className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:border-black"
                        />
                    </div>
                </div>
                <button 
                    type="submit"
                    className="h-11 bg-black hover:bg-gray-800 text-white font-medium rounded-xl transition-colors"
                >
                    Update Dates
                </button>
            </form>
        </div>
    );
}