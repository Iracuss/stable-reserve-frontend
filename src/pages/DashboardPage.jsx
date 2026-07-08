import { useEffect, useState } from 'react';
import { getAllHorses, createHorse, updateHorse } from '../api/horseService';
import TopApp from '../components/navigation/TopBar';
import SideBar from '../components/dashboard/SideBar';
import HorseContent from '../components/dashboard/HorseContent';
import AddHorse from '../components/dashboard/AddHorse';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './LoginPage';
import { useAuth } from '../components/AuthContext';

export default function DashboardPage() {
    const {user} = useAuth();

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
        getAllHorses()
        .then((data) => {
            setHorses(data);
            setIsLoading(false);
        })
        .catch((err) => {
            // Handle error
            console.error('Failed to get all horses:', err);
            setIsLoading(false);
        });
    }, [user]);

    const handleSaveHorse = (newHorseData) => {
        createHorse(newHorseData)
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
        <div className="flex flex-col h-screen bg-gray-50 overflow-hidden">
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