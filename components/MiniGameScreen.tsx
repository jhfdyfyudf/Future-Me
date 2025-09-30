import React, { useState, useEffect } from 'react';
import type { Career, InteractiveGame } from '../types';
import { generateInteractiveGame, generateChallengeImage } from '../services/geminiService';
import { Button } from './ui/Button';
import { Loader } from './ui/Loader';
import { Card } from './ui/Card';
import { SpeakButton } from './ui/SpeakButton';
import { ToolIcon } from './ui/ToolIcon';

interface MiniGameScreenProps {
  career: Career;
  onComplete: (success: boolean) => void;
}

const ProgressBar: React.FC<{ current: number, total: number }> = ({ current, total }) => (
  <div className="w-full bg-gray-200 rounded-full h-4 my-4">
    <div
      className="bg-green-500 h-4 rounded-full transition-all duration-500"
      style={{ width: `${(current / total) * 100}%` }}
    ></div>
  </div>
);

export const MiniGameScreen: React.FC<MiniGameScreenProps> = ({ career, onComplete }) => {
  const [game, setGame] = useState<InteractiveGame | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isStepComplete, setIsStepComplete] = useState(false);
  const [feedback, setFeedback] = useState<{ message: string; isCorrect: boolean } | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [incorrectDrop, setIncorrectDrop] = useState(false);

  useEffect(() => {
    const fetchGame = async () => {
      setLoading(true);
      setError(null);
      const data = await generateInteractiveGame(career.name);
      if (data && data.steps.length > 0) {
        setGame(data);
      } else {
        setError('Could not load the game. Please try again.');
      }
      setLoading(false);
    };
    fetchGame();
  }, [career.name]);

  useEffect(() => {
    if (!game) return;
    const fetchImage = async () => {
      setImageLoading(true);
      const currentStep = game.steps[currentStepIndex];
      const prompt = `First person view of a ${career.name}'s workspace. The task is: ${currentStep.description}. Show the scene before the action is taken.`;
      const imageData = await generateChallengeImage(prompt);
      setImage(imageData);
      setImageLoading(false);
    };
    fetchImage();
  }, [game, currentStepIndex, career.name]);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!isStepComplete) {
      setIsDraggingOver(true);
    }
  };
  
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingOver(false);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingOver(false);
    if (isStepComplete) return;

    const droppedTool = e.dataTransfer.getData('toolName');
    const correctTool = game!.steps[currentStepIndex].correctTool;

    if (droppedTool.toLowerCase() === correctTool.toLowerCase()) {
      setIsStepComplete(true);
      setFeedback({ message: game!.steps[currentStepIndex].explanation, isCorrect: true });
    } else {
      setFeedback({ message: "That's not the right tool. Let's try again!", isCorrect: false });
      setIncorrectDrop(true);
      setTimeout(() => {
        setIncorrectDrop(false);
        setFeedback(null);
      }, 1500);
    }
  };

  const handleNextStep = () => {
    if (currentStepIndex < game!.steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
      setIsStepComplete(false);
      setFeedback(null);
      setImage(null);
    } else {
      onComplete(true);
    }
  };

  if (loading) return <Loader message={`Building a POV challenge for a ${career.name}...`} />;
  if (error || !game) return <div className="text-center p-8 text-red-500 font-semibold">{error || 'Something went wrong.'}</div>;

  const currentStep = game.steps[currentStepIndex];

  return (
    <div className="container mx-auto p-4 md:p-8 flex items-center justify-center min-h-[80vh]">
      <Card className="w-full max-w-4xl text-center animate-fade-in">
        <h1 className={`text-3xl font-bold mb-2 ${career.color}`}>{game.title}</h1>
        <p className="text-gray-600 mb-4">{game.scenario}</p>
        <ProgressBar current={currentStepIndex + 1} total={game.steps.length} />
        
        <div key={currentStepIndex} className="animate-slide-in">
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`mb-6 h-56 md:h-80 flex items-center justify-center bg-gray-200 rounded-lg overflow-hidden relative transition-all duration-300 ${isDraggingOver ? 'drop-zone-active' : ''} ${incorrectDrop ? 'animate-shake' : ''}`}
          >
            {imageLoading && <Loader message="Setting the scene..." />}
            {image && !imageLoading && <img src={image} alt="Game scene" className="w-full h-full object-cover animate-fade-in" />}
            {!image && !imageLoading && <div className="text-gray-500 p-4"><i className="fa-solid fa-image-slash text-4xl"></i></div>}
          </div>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center justify-center gap-4">
            Step {currentStepIndex + 1}: {currentStep.description}
            <SpeakButton text={currentStep.description} />
          </h2>

          <Card className="bg-slate-100 mt-4">
            <h3 className="font-bold text-lg text-gray-700 mb-3">Your Toolbox</h3>
            <div className="grid grid-cols-3 gap-4">
              {currentStep.tools.map((tool, i) => (
                <ToolIcon key={i} toolName={tool} isDraggable={!isStepComplete} />
              ))}
            </div>
          </Card>
        </div>

        {feedback && (
          <div className={`p-4 rounded-lg mt-4 animate-fade-in ${feedback.isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
            <h3 className={`text-xl font-bold ${feedback.isCorrect ? 'text-green-800' : 'text-red-800'}`}>
              {feedback.isCorrect ? 'Great job!' : 'Not quite!'}
            </h3>
            <p className="mt-2 text-gray-700">{feedback.message}</p>
            {feedback.isCorrect && (
              <Button onClick={handleNextStep} className="mt-4" variant="secondary">
                {currentStepIndex === game.steps.length - 1 ? 'Finish Game!' : 'Next Step'}
              </Button>
            )}
          </div>
        )}
      </Card>
    </div>
  );
};
