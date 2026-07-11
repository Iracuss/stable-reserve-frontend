import horseIcon from "../../assets/horse-icon.png"
import { isOverdue } from "../utils/dateHelper";

export default function HorseTab({horseData, onTabClick, onAddHorse}) {

    const cogginsWarning = isOverdue(horseData.lastCogginDate, 365);
    const farrierWarning = isOverdue(horseData.lastFarrierDate, 42);

    return (
        <div 
            onClick={() => {
                console.log("Clicked tab")
                onTabClick(horseData)
                onAddHorse(false)
            }}
            className={`bg-slate-100 rounded-2xl h-20 flex hover:bg-slate-300 items-center pl-5 pr-5 active:bg-gray-300 transition-colors 
                ${cogginsWarning ? 'border-2 border-orange-500' : ''} 
                ${farrierWarning ? 'border-2 border-orange-500' : ''}
                ${farrierWarning && cogginsWarning ? 'border-2 border-red-700' : ''}`}
        >

            <div className="w-14 h-14 bg-gray-300 rounded-full shrink-0">
                <img 
                    src={horseIcon}
                    className="w-14 h-14 border-2 border-black-700 bg-gray-300 rounded-full shrink-0"
                    alt="horse icon"
                />
            </div>

            <div className={`flex flex-col justify-center items-center w-full ${cogginsWarning && farrierWarning ? '-space-y-1' : ''}`}>
                <p className="flex-1 font-sans text-center text-xl font-medium text-gray-800">
                    {horseData.name}
                </p>

                <div className="flex flex-col justify-center items-center -space-y-1">
                    {cogginsWarning && farrierWarning ? (
                        <>
                            <h1 className="font-semibold text-red-800">Coggins Overdue</h1>
                            <h1 className="font-semibold text-red-800">Farrier Overdue</h1>
                        </>
                    ) : (
                        <>
                            {cogginsWarning && <h1 className="font-semibold text-orange-600">Coggins Overdue</h1>}
                            {farrierWarning && <h1 className="font-semibold text-orange-600">Farrier Overdue</h1>}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}