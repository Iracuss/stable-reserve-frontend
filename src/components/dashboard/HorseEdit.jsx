import { useState } from "react";
import { updateHorse } from "../../api/horseService";

export default function HorseEdit({horse, onEdit, setActiveTab}) {
    const [name, setName] = useState(horse.name);
    const [breed, setBreed] = useState(horse.breed);
    const [birthYear, setBirthYear] = useState(horse.birthYear);
    const [nickname, setNickname] = useState(horse.nickname);
    const [microchipId, setMicrochipId] = useState(horse.microchipId);
    const [isMdBred, setIsMdBred] = useState(horse.isMdBred);
    const [foalingState, setFoalingState] = useState(horse.foalingState);
    const [medicalNotes, setMedicalNotes] = useState(horse.medicalNotes);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const horseData = {
            id: horse.id,
            name: name,
            breed: breed,
            birthYear: Number(birthYear),
            nickname: nickname,
            microchipId: microchipId,
            isMdBred: isMdBred,
            foalingState: foalingState,
            medicalNotes: medicalNotes,
        }

        await updateHorse(horse.id, horseData);
        onEdit({...horse, ...horseData});
        setActiveTab('overview');
    }

    const handleMdBredChange = (e) => {
        const isChecked = e.target.checked;
        setIsMdBred(isChecked);

        if(isChecked) {
            setFoalingState("Maryland");
        } else {
            setFoalingState("");
        }
    }

    const handleStateChange = (e) => {
        const typedState = e.target.value;
        setFoalingState(typedState);

        if(typedState.toUpperCase() === "MD" || typedState.toUpperCase() === "MARYLAND") {
            setIsMdBred(true);
        } else {
            setIsMdBred(false);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Horse Name</label>
                    <input 
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:border-black"
                        placeholder="e.g. Oguri Cap"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Nickname</label>
                    <input 
                        type="text"
                        required
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:border-black"
                        placeholder="e.g. Grey Monster"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Breed</label>
                    <input 
                        type="text"
                        required
                        value={breed}
                        onChange={(e) => setBreed(e.target.value)}
                        className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:border-black"
                        placeholder="e.g. Thoroughbred"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Birth Year</label>
                    <input 
                        type="number" 
                        min="1900" 
                        max="2100" 
                        value={birthYear} 
                        onChange={(e) => setBirthYear(e.target.value)}
                        className="w-full border border-gray-300 rounded-xl p-2.5 focus:outline-none focus:border-black" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Microchip ID</label>
                    <input 
                        type="text"
                        value={microchipId}
                        onChange={(e) => setMicrochipId(e.target.value)}
                        className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:border-black"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Foaling State</label>
                    <input 
                        type="text"
                        required
                        value={foalingState}
                        onChange={handleStateChange}
                        className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:border-black"
                        placeholder="e.g. MD, KY"
                    />
                </div>

                <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <input 
                        type="checkbox" 
                        id="isMdBred"
                        checked={isMdBred} 
                        onChange={handleMdBredChange} // Grabs true/false from checked state
                        className="w-5 h-5 accent-black cursor-pointer"
                    />
                    <label htmlFor="isMdBred" className="text-sm font-medium text-gray-700 cursor-pointer select-none">
                        Is Maryland Bred? (MD Bred)
                    </label>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Medical Notes</label>
                    <textarea 
                        rows="3" 
                        value={medicalNotes} 
                        onChange={(e) => setMedicalNotes(e.target.value)}
                        className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:border-black resize-none"
                        placeholder="Enter any current medical conditions or allergies..."
                    />
                </div>

                <div className="flex gap-3 mt-2">
                    <button 
                        type="submit" // Triggers the form's onSubmit handler
                        className="flex-1 h-11 bg-black hover:bg-gray-800 text-white font-medium rounded-xl transition-colors"
                    >
                        Update Horse
                    </button>
                </div>
            </form>
        </div>
    );
}