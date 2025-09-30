
import React from 'react';

interface HeaderProps {
  onHomeClick: () => void;
  onJournalClick: () => void;
  journalItemCount: number;
}

export const Header: React.FC<HeaderProps> = ({ onHomeClick, onJournalClick, journalItemCount }) => {
  return (
    <header className="bg-white/80 backdrop-blur-sm shadow-md sticky top-0 z-10 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div 
          className="text-3xl font-bold text-blue-600 cursor-pointer flex items-center gap-2"
          onClick={onHomeClick}
        >
          <i className="fa-solid fa-star-of-life"></i>
          <span>FutureMe</span>
        </div>
        <button 
          onClick={onJournalClick}
          className="relative text-gray-600 hover:text-blue-500 transition-colors"
          aria-label="Open Career Journal"
        >
          <i className="fa-solid fa-book-bookmark text-3xl"></i>
          {journalItemCount > 0 && (
            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {journalItemCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
