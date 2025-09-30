
import React from 'react';
import type { Career } from './types';

const DoctorIcon: React.FC<{ className?: string }> = ({ className }) => (
  <i className={`fa-solid fa-user-doctor ${className}`}></i>
);
const AstronautIcon: React.FC<{ className?: string }> = ({ className }) => (
  <i className={`fa-solid fa-rocket ${className}`}></i>
);
const ChefIcon: React.FC<{ className?: string }> = ({ className }) => (
  <i className={`fa-solid fa-utensils ${className}`}></i>
);
const ArtistIcon: React.FC<{ className?: string }> = ({ className }) => (
  <i className={`fa-solid fa-palette ${className}`}></i>
);
const EngineerIcon: React.FC<{ className?: string }> = ({ className }) => (
  <i className={`fa-solid fa-gears ${className}`}></i>
);
const PoliceIcon: React.FC<{ className?: string }> = ({ className }) => (
  <i className={`fa-solid fa-building-shield ${className}`}></i>
);
const TeacherIcon: React.FC<{ className?: string }> = ({ className }) => (
  <i className={`fa-solid fa-chalkboard-user ${className}`}></i>
);

export const CAREERS: Career[] = [
  { id: 'doctor', name: 'Doctor', Icon: DoctorIcon, color: 'text-red-500', bgColor: 'bg-red-100' },
  { id: 'astronaut', name: 'Astronaut', Icon: AstronautIcon, color: 'text-indigo-500', bgColor: 'bg-indigo-100' },
  { id: 'chef', name: 'Chef', Icon: ChefIcon, color: 'text-orange-500', bgColor: 'bg-orange-100' },
  { id: 'artist', name: 'Artist', Icon: ArtistIcon, color: 'text-purple-500', bgColor: 'bg-purple-100' },
  { id: 'engineer', name: 'Engineer', Icon: EngineerIcon, color: 'text-gray-600', bgColor: 'bg-gray-200' },
  { id: 'police', name: 'Police Officer', Icon: PoliceIcon, color: 'text-blue-500', bgColor: 'bg-blue-100' },
  { id: 'teacher', name: 'Teacher', Icon: TeacherIcon, color: 'text-green-500', bgColor: 'bg-green-100' },
];
