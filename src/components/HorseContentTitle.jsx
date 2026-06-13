export default function HorseContentTitle({horse}) {
    return (
        <div className="flex flex-row gap-6 justify-between">
            <div className="flex-col flex items-center">
                <h2 className="text-5xl text-gray-700 font-sans font-bold pl-12 pr-12 pb-6">{horse.name}</h2>
                <p><span className="font-bold text-gray-900">Nickname:</span> {horse.nickname}</p>
            </div>
            <div className="flex flex-col gap-2 text-lg text-gray-700 items-end pr-12">
                <p><span className="font-bold text-gray-900">Breed:</span> {horse.breed}</p>
                <p><span className="font-bold text-gray-900">Birth Year:</span> {horse.birthYear}</p>
                <p><span className="font-bold text-gray-900">Born in: </span> {horse.foalingState}</p>
            </div>
        </div>

    );
}