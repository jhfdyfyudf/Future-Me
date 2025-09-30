import React, { useState, useEffect } from 'react';

export const SpeakButton: React.FC<{ text: string }> = ({ text }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const synth = window.speechSynthesis;

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (synth.speaking) {
      synth.cancel();
      setIsSpeaking(false);
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    synth.speak(utterance);
    setIsSpeaking(true);
  };
  
  useEffect(() => {
    return () => {
      if (synth.speaking) {
        synth.cancel();
      }
    };
  }, [synth]);

  return (
    <button onClick={handleSpeak} className="text-gray-500 hover:text-blue-500 transition-colors" title="Read aloud">
      <i className={`fa-solid ${isSpeaking ? 'fa-volume-off' : 'fa-volume-high'}`}></i>
    </button>
  );
};
