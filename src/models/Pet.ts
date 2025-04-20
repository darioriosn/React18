// src/models/Pet.ts
export interface Pet {
    id: number;
    name: string;
    type: string; // e.g., Dog, Cat
    age: number; // in years
    owner: string;
  }