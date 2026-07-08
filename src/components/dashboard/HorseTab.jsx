import horseIcon from "../../assets/horse-icon.png"

export default function HorseTab({horseData, onTabClick, onAddHorse}) {
    return (
        <div 
            onClick={() => {
                console.log("Clicked tab")
                onTabClick(horseData)
                onAddHorse(false)
            }}
            className="bg-slate-100 rounded-2xl h-20 flex hover:bg-slate-300 items-center pl-5 pr-5 active:bg-gray-300 transition-colors"
        >

            <div className="w-14 h-14 bg-gray-300 rounded-full shrink-0">
                <img 
                    src={horseIcon}
                    className="w-14 h-14 border-2 border-black-700 bg-gray-300 rounded-full shrink-0"
                />
            </div>

            <p className="flex-1 font-sans text-center text-xl font-medium text-gray-800">
                {horseData.name}
            </p>
        </div>
    );
}