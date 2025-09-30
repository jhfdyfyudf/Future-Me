
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { HomeScreen } from './components/HomeScreen';
import { CareerDetailScreen } from './components/CareerDetailScreen';
import { MiniGameScreen } from './components/MiniGameScreen';
import { CareerJournalScreen } from './components/CareerJournalScreen';
import type { Career, Journal } from './types';

type View = 'home' | 'career' | 'game' | 'journal';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedCareer, setSelectedCareer] = useState<Career | null>(null);
  const [journal, setJournal] = useState<Journal>({ savedCareers: [], badges: [] });

  const handleSelectCareer = useCallback((career: Career) => {
    setSelectedCareer(career);
    setCurrentView('career');
  }, []);

  const handleStartGame = useCallback((career: Career) => {
    setSelectedCareer(career);
    setCurrentView('game');
  }, []);

  const handleGameComplete = useCallback((success: boolean) => {
    if (success && selectedCareer) {
      setJournal(prev => ({
        ...prev,
        badges: [...new Set([...prev.badges, selectedCareer.id])]
      }));
    }
    setCurrentView('career');
  }, [selectedCareer]);

  const handleAddToJournal = useCallback((careerId: string) => {
    setJournal(prev => ({
      ...prev,
      savedCareers: [...new Set([...prev.savedCareers, careerId])]
    }));
  }, []);

  const navigateToHome = () => {
    setCurrentView('home');
    setSelectedCareer(null);
  };
  
  const navigateToJournal = () => {
    setCurrentView('journal');
    setSelectedCareer(null);
  };

  const renderContent = () => {
    switch (currentView) {
      case 'career':
        if (selectedCareer) {
          return (
            <CareerDetailScreen
              career={selectedCareer}
              onStartGame={handleStartGame}
              onAddToJournal={handleAddToJournal}
              isCareerInJournal={journal.savedCareers.includes(selectedCareer.id)}
            />
          );
        }
        return <HomeScreen onSelectCareer={handleSelectCareer} />; // Fallback
      case 'game':
        if (selectedCareer) {
          return (
            <MiniGameScreen
              career={selectedCareer}
              onComplete={handleGameComplete}
            />
          );
        }
        return <HomeScreen onSelectCareer={handleSelectCareer} />; // Fallback
      case 'journal':
        return <CareerJournalScreen journal={journal} />;
      case 'home':
      default:
        return <HomeScreen onSelectCareer={handleSelectCareer} />;
    }
  };
  
  const journalItemCount = journal.savedCareers.length + journal.badges.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 font-sans">
      <Header onHomeClick={navigateToHome} onJournalClick={navigateToJournal} journalItemCount={journalItemCount} />
      <main>
        {renderContent()}
      </main>
      <footer className="text-center p-4 text-gray-500 text-sm mt-auto">
        <p>Built with ❤️ for the innovators of tomorrow. Powered by AI.</p>
      </footer>
    </div>
  );
};

export default App;
