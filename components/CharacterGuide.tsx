import React from 'react';
import { Loader } from './ui/Loader';

interface CharacterGuideProps {
  imageUrl: string | null | undefined;
  message: string;
}

export const CharacterGuide: React.FC<CharacterGuideProps> = ({ imageUrl, message }) => {
  return (
    <div className="flex flex-col items-center gap-4 p-4 rounded-2xl bg-white shadow-lg sticky top-24">
      <div className="speech-bubble p-4 text-center w-full">
        <p className="font-semibold text-gray-700">{message || "..."}</p>
      </div>
      <div className="w-64 h-64 flex items-center justify-center">
        {imageUrl === undefined && <Loader message="Summoning guide..."/>}
        {imageUrl === null && (
          <div className="text-gray-400 text-center">
            <i className="fa-solid fa-user-slash text-6xl"></i>
            <p className="mt-2">Guide could not be loaded.</p>
          </div>
        )}
        {imageUrl && <img src={imageUrl} alt="Career Guide" className="max-w-full max-h-full object-contain animate-bounce-in" />}
      </div>
    </div>
  );
};
