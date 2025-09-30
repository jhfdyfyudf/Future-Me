
import React from 'react';
import { CAREERS } from '../constants';
import type { Career } from '../types';
import { Card } from './ui/Card';

interface HomeScreenProps {
  onSelectCareer: (career: Career) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onSelectCareer }) => {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 mb-2">Welcome to Your Future!</h1>
        <p className="text-lg md:text-xl text-gray-600">Choose a career world to explore, play, and learn.</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
        {CAREERS.map((career) => (
          <Card key={career.id} onClick={() => onSelectCareer(career)}>
            <div className="flex flex-col items-center text-center gap-4">
              <div className={`w-24 h-24 rounded-full flex items-center justify-center text-5xl ${career.bgColor} ${career.color}`}>
                <career.Icon />
              </div>
              <h2 className="text-xl font-bold text-gray-800">{career.name}</h2>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
