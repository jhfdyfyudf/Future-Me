import React, { useState, useEffect, useMemo } from 'react';
import type { Career, CareerDetails } from '../types';
import { generateCareerDetails, generateCharacterImage } from '../services/geminiService';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { Loader } from './ui/Loader';
import { SpeakButton } from './ui/SpeakButton';
import { CharacterGuide } from './CharacterGuide';

interface CareerDetailScreenProps {
  career: Career;
  onStartGame: (career: Career) => void;
  onAddToJournal: (careerId: string) => void;
  isCareerInJournal: boolean;
}

const DetailSection: React.FC<{ title: string; icon: string; children: React.ReactNode; className?: string }> = ({ title, icon, children, className }) => (
  <Card className={`w-full ${className}`}>
    <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
      <i className={`fa-solid ${icon}`}></i>
      {title}
    </h3>
    {children}
  </Card>
);

export const CareerDetailScreen: React.FC<CareerDetailScreenProps> = ({ career, onStartGame, onAddToJournal, isCareerInJournal }) => {
  const [details, setDetails] = useState<CareerDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [guideMessage, setGuideMessage] = useState('');
  
  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      setGuideMessage('');
      
      const data = await generateCareerDetails(career.name);
      if (data) {
        setGuideMessage(data.storyIntro);
        const charImage = await generateCharacterImage(career.name);
        setDetails({ ...data, characterImage: charImage || undefined });
      } else {
        setError('Could not load career details. Please try again later.');
      }
      setLoading(false);
    };
    fetchDetails();
  }, [career.name]);

  const allTextToRead = useMemo(() => {
    if (!details) return '';
    return `${details.storyIntro} ${details.description} Tools used are ${details.tools.join(', ')}. Key skills are ${details.skills.join(', ')}. And some fun facts are ${details.funFacts.join(', ')}.`;
  }, [details]);

  if (loading) {
    return <Loader message={`Building the world of a ${career.name}...`} />;
  }

  if (error) {
    return <div className="text-center p-8 text-red-500 font-semibold">{error}</div>;
  }
  
  if (!details) return null;

  return (
    <div className="container mx-auto p-4 md:p-8 animate-fade-in">
      <header className="text-center mb-12">
        <div className={`inline-flex items-center justify-center w-32 h-32 rounded-full ${career.bgColor} ${career.color} text-6xl mb-4`}>
          <career.Icon />
        </div>
        <h1 className="text-5xl font-extrabold text-gray-800">{career.name}</h1>
        <p className={`text-xl font-medium ${career.color}`}>A Day in the Life</p>
      </header>
      
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/3">
          <CharacterGuide imageUrl={details.characterImage} message={guideMessage} />
        </div>

        <div className="w-full lg:w-2/3 flex flex-col gap-8">
          <Card>
            <h2 className="text-3xl font-bold text-gray-800 mb-3 flex justify-between items-center">
              Your Mission Begins!
              <SpeakButton text={allTextToRead} />
            </h2>
            <p className="text-lg text-gray-600 italic">{details.storyIntro}</p>
          </Card>

          <DetailSection title="Ask Me Anything!" icon="fa-comments">
            <div className="flex flex-col gap-2">
              {details.qna.map((item, i) => (
                <button
                  key={i}
                  onClick={() => setGuideMessage(item.answer)}
                  className="text-left p-3 bg-blue-50 hover:bg-blue-100 rounded-lg font-semibold text-blue-800 transition-colors"
                >
                  <i className="fa-solid fa-question-circle mr-2"></i>
                  {item.question}
                </button>
              ))}
            </div>
          </DetailSection>
          
          <DetailSection title="Job Description" icon="fa-clipboard-list">
            <p className="text-gray-700">{details.description}</p>
          </DetailSection>

          <div className="grid md:grid-cols-2 gap-8">
            <DetailSection title="Toolkit" icon="fa-toolbox">
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {details.tools.map((tool, i) => <li key={i}>{tool}</li>)}
              </ul>
            </DetailSection>
            <DetailSection title="Super Skills" icon="fa-brain">
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {details.skills.map((skill, i) => <li key={i}>{skill}</li>)}
              </ul>
            </DetailSection>
          </div>
          
          <DetailSection title="Fun Facts" icon="fa-lightbulb">
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {details.funFacts.map((fact, i) => <li key={i}>{fact}</li>)}
            </ul>
          </DetailSection>

          <div className="flex flex-col md:flex-row gap-4 justify-center mt-8">
            <Button onClick={() => onStartGame(career)} variant="secondary" className="flex-grow">
              <i className="fa-solid fa-gamepad mr-2"></i>
              Play a Challenge!
            </Button>
            <Button onClick={() => onAddToJournal(career.id)} variant="primary" disabled={isCareerInJournal}>
               {isCareerInJournal ? (
                  <>
                    <i className="fa-solid fa-check mr-2"></i>
                    Saved to Journal
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-book-medical mr-2"></i>
                    Add to My Journal
                  </>
                )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};