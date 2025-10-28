'use client';

import { useState, useEffect } from 'react';
import { DialogueLine } from '@/lib/data/dialogues';

interface DialogueBoxProps {
  dialogues: DialogueLine[];
  onComplete: () => void;
  autoAdvance?: boolean;
  autoAdvanceDelay?: number;
}

export default function DialogueBox({
  dialogues,
  onComplete,
  autoAdvance = false,
  autoAdvanceDelay = 3000
}: DialogueBoxProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  const currentDialogue = dialogues[currentIndex];

  // Typewriter effect
  useEffect(() => {
    if (!currentDialogue) return;

    setIsTyping(true);
    setDisplayText('');

    let charIndex = 0;
    const text = currentDialogue.text;

    const interval = setInterval(() => {
      if (charIndex < text.length) {
        setDisplayText(text.slice(0, charIndex + 1));
        charIndex++;
      } else {
        setIsTyping(false);
        clearInterval(interval);

        // Auto-advance if enabled
        if (autoAdvance) {
          setTimeout(() => {
            handleNext();
          }, autoAdvanceDelay);
        }
      }
    }, 30); // 30ms per character for smooth typing

    return () => clearInterval(interval);
  }, [currentIndex, currentDialogue, autoAdvance, autoAdvanceDelay]);

  const handleNext = () => {
    if (isTyping) {
      // Skip typing animation
      setDisplayText(currentDialogue.text);
      setIsTyping(false);
      return;
    }

    if (currentIndex < dialogues.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onComplete();
    }
  };

  const handleSkipAll = () => {
    onComplete();
  };

  if (!currentDialogue) return null;

  // Get speaker styling
  const getSpeakerColor = () => {
    switch (currentDialogue.speaker) {
      case 'hero': return '#4CAF50'; // Green
      case 'boss': return '#f44336'; // Red
      case 'narrator': return '#FFD700'; // Gold
      default: return '#FFF';
    }
  };

  const getSpeakerName = () => {
    switch (currentDialogue.speaker) {
      case 'hero': return 'Hero';
      case 'boss': return 'Boss';
      case 'narrator': return 'Narrator';
      default: return '';
    }
  };

  const getEmotionStyle = () => {
    switch (currentDialogue.emotion) {
      case 'angry': return { filter: 'hue-rotate(350deg) saturate(200%)' };
      case 'sad': return { filter: 'grayscale(50%) brightness(80%)' };
      case 'determined': return { filter: 'brightness(120%) contrast(120%)' };
      case 'surprised': return { filter: 'hue-rotate(60deg) brightness(110%)' };
      default: return {};
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4 bg-black/70 backdrop-blur-sm">
      {/* Main dialogue box */}
      <div className="w-full max-w-4xl bg-gradient-to-br from-gray-900 to-black border-4 border-yellow-500 rounded-lg shadow-2xl pixel-borders animate-slideUp">

        {/* Portrait & Speaker */}
        <div className="flex items-start gap-4 p-6 border-b-2 border-yellow-500/30">
          {/* Portrait */}
          {currentDialogue.portrait && (
            <div
              className="text-6xl pixel-art flex-shrink-0 animate-pulse"
              style={getEmotionStyle()}
            >
              {currentDialogue.portrait}
            </div>
          )}

          {/* Speaker name */}
          <div className="flex-1">
            <div
              className="text-xl font-bold pixel-text mb-2 drop-shadow-lg"
              style={{ color: getSpeakerColor() }}
            >
              {getSpeakerName()}
            </div>

            {/* Dialogue text with typewriter */}
            <div className="text-lg text-white leading-relaxed pixel-text">
              {displayText}
              {isTyping && (
                <span className="inline-block w-2 h-5 ml-1 bg-white animate-blink" />
              )}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between p-4 bg-black/40">
          {/* Progress indicator */}
          <div className="text-sm text-gray-400 pixel-text">
            {currentIndex + 1} / {dialogues.length}
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleSkipAll}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white pixel-borders pixel-text text-sm transition-all hover:scale-105 active:scale-95"
            >
              Skip All
            </button>

            <button
              onClick={handleNext}
              className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-bold pixel-borders pixel-text transition-all hover:scale-105 active:scale-95 animate-pulse"
            >
              {isTyping ? 'Skip ▸' : currentIndex < dialogues.length - 1 ? 'Next ▸' : 'Continue ▸'}
            </button>
          </div>
        </div>

        {/* Instruction hint */}
        {!autoAdvance && (
          <div className="text-center text-xs text-gray-500 py-2 pixel-text">
            Press Next or click anywhere to continue
          </div>
        )}
      </div>
    </div>
  );
}
