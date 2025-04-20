// src/pages/Pets.tsx
import React from 'react';
import PetList from '../components/PetList';
const Pets: React.FC = () => {
    return (
        <div>
            <h2>Our Pets</h2>
            <PetList />
        </div>
    );
};
export default Pets;