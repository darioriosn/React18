// src/components/PetList.tsx
import React from 'react';
interface Pet {
    id: number;
    name: string;
    type: string;
}
const PetList: React.FC = () => {
    const pets: Pet[] = [
        { id: 1, name: 'Buddy', type: 'Dog' },
        { id: 2, name: 'Mittens', type: 'Cat' },
        // Add more pets as needed
    ];
    return (
        <ul>
            {pets.map(pet => (
                <li key={pet.id}>{pet.name} - {pet.type}</li>
            ))}
        </ul>
    );
};
export default PetList;