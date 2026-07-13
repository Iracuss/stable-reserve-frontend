import { useState } from "react"

export default function AddHorse({onSave, onCancel}) {
    const [name, setName] = useState('');
    const [breed, setBreed] = useState('');
    const [birthYear, setBirthYear] = useState(new Date().getFullYear());
    const [nickname, setNickname] = useState('');
    const [microchipId, setMicrochipId] = useState('');
    const [isMdBred, setIsMdBred] = useState(false);
    const [foalingState, setFoalingState] = useState('');
    const [medicalNotes, setMedicalNotes] = useState('');

    // There is some coggins and farrier things but I might get rid of them for hte horse

    const handleSubmit = (e) => {
        e.preventDefault();

        const horseData = {
            name: name,
            breed: breed,
            birthYear: Number(birthYear),
            nickname: nickname,
            microchipId: microchipId,
            isMdBred: isMdBred,
            foalingState: foalingState,
            medicalNotes: medicalNotes,
        }

        onSave(horseData);

        alert("Added horse");
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
        <div className="flex-1 p-6 bg-gray-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 w-full max-w-5xl max-h-[80vh] overflow-y-auto">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Create Horse</h2>
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
                            type="button" 
                            onClick={onCancel} // Closes the form without saving
                            className="flex-1 h-11 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors"
                        >
                            Cancel
                        </button>
                        
                        <button 
                            type="submit" // Triggers the form's onSubmit handler
                            className="flex-1 h-11 bg-black hover:bg-gray-800 text-white font-medium rounded-xl transition-colors"
                        >
                            Save Horse
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}