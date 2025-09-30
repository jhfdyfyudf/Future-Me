
import React from 'react';
import type { Journal } from '../types';
import { CAREERS } from '../constants';
import { Card } from './ui/Card';

interface CareerJournalScreenProps {
  journal: Journal;
}

export const CareerJournalScreen: React.FC<CareerJournalScreenProps> = ({ journal }) => {
  const savedCareerDetails = CAREERS.filter(c => journal.savedCareers.includes(c.id));

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 mb-2">My Career Journal</h1>
        <p className="text-lg md:text-xl text-gray-600">A collection of your amazing explorations!</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center gap-3">
            <i className="fa-solid fa-heart"></i>
            My Dream Jobs
          </h2>
          {savedCareerDetails.length > 0 ? (
            <ul className="space-y-4">
              {savedCareerDetails.map(career => (
                <li key={career.id} className="flex items-center gap-4 p-3 bg-gray-100 rounded-lg">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${career.bgColor} ${career.color}`}>
                    <career.Icon />
                  </div>
                  <span className="text-lg font-semibold text-gray-700">{career.name}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">You haven't saved any careers yet. Go explore!</p>
          )}
        </Card>

        <Card>
          <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center gap-3">
            <i className="fa-solid fa-award"></i>
            My Badges
          </h2>
          {journal.badges.length > 0 ? (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
              {journal.badges.map(badgeId => {
                const career = CAREERS.find(c => c.id === badgeId);
                if (!career) return null;
                return (
                  <div key={badgeId} title={`Completed ${career.name} challenge!`} className="flex flex-col items-center gap-2">
                    <div className={`w-20 h-20 rounded-full flex items-center justify-center text-4xl ${career.bgColor} ${career.color} shadow-inner`}>
                      <career.Icon />
                    </div>
                    <span className="text-xs font-semibold text-gray-600">{career.name}</span>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-500">Complete challenges to earn badges!</p>
          )}
        </Card>
      </div>
    </div>
  );
};
