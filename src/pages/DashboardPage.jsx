import { useEffect, useState } from 'react';
import { getAllHorsesInStable, createHorse } from '../api/horseService';
import SideBar from '../components/dashboard/SideBar';
import HorseContent from '../components/dashboard/HorseContent';
import AddHorse from '../components/dashboard/AddHorse';
import { useAuth } from '../components/auth/UseAuth';
import { useParams } from 'react-router-dom';

export default function DashboardPage() {
    const {user} = useAuth();

    const {stableId} = useParams();
    const [horses, setHorses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedHorse, setSelectedHorse] = useState(null);
    const [isCreating, setIsCreating] = useState(false);

    const handleHorseDelete = (deletedHorseId) => {
        setHorses(prevHorses => prevHorses.filter(h => h.id !== deletedHorseId));
        if(selectedHorse.id === deletedHorseId) {
            setSelectedHorse(null);
        }
    }

    const handleHorseEdit = (editedHorseData) => {
        setHorses(prevHorses => prevHorses.map(h => 
            h.id === editedHorseData.id ? editedHorseData : h
        ));
        setSelectedHorse(editedHorseData);
        console.log(`clicked edit on ${editedHorseData}`)
    }

    useEffect(() => {
        if(!user) {
            setHorses([]);
            setIsLoading(false);
            return;
        }
        setIsLoading(true);
        getAllHorsesInStable(stableId)
        .then((data) => {
            setHorses(data);
            setIsLoading(false);
        })
        .catch((err) => {
            // Handle error
            console.error('Failed to get all horses:', err);
            setIsLoading(false);
        });
    }, [user, stableId]);

    const handleSaveHorse = (newHorseData) => {
        createHorse(stableId, newHorseData)
            .then((savedHorse) => {
                setHorses([...horses, savedHorse]);
                setSelectedHorse(savedHorse);
                setIsCreating(false);
            })
            .catch((err) => {
                console.error("Failed to save horse to database:", err)
                alert("Could not save horse. Make sure your backend server is running!");
            })
    };

    if(isLoading) return <div className="p-10 text-center">Loading your stable...</div>;

    return (
        <div className="flex flex-col h-full bg-gray-50 overflow-hidden">
            <div className="flex flex-1 overflow-hidden">
                <SideBar 
                    horses={horses} 
                    onSelectedHorse={setSelectedHorse} 
                    onAddHorse={setIsCreating}
                />
                {isCreating ? 
                <AddHorse 
                    onSave={handleSaveHorse} 
                    onCancel={() => setIsCreating(false)} /> : 
                <HorseContent 
                    horse={selectedHorse}
                    onDeleteSuccess={handleHorseDelete}
                    onEdit={handleHorseEdit}
                />}
                
            </div>
        </div>
    )
}