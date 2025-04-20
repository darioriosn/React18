// src/components/Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';
const Header: React.FC = () => {
    return (
        <header>
            <h1>Pet Veterinary Clinic</h1>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link>
                <Link to="/pets">Pets</Link>
            </nav>
        </header>
    );
};
export default Header;