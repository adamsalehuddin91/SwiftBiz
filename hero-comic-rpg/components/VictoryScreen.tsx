'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useGameStore } from '@/lib/store/gameStore';
import DialogueBox from '@/components/DialogueBox';
import { getDialogueByStageId } from '@/lib/data/dialogues';

export default function VictoryScreen() {
  const player = useGameStore(state => state.player);
  const battle = useGameStore(state => state.battle);
  const dialogue = useGameStore(state => state.dialogue);
  const navigateTo = useGameStore(state => state.navigateTo);
  const showDialogue = useGameStore(state => state.showDialogue);
  const closeDialogue = useGameStore(state => state.closeDialogue);

  const [hasShownVictoryDialogue, setHasShownVictoryDialogue] = useState(false);

  // Show victory dialogue on mount
  useEffect(() => {
    if (battle && !hasShownVictoryDialogue) {
      const stageDialogue = getDialogueByStageId(battle.stage.id);
      if (stageDialogue?.victory) {
        showDialogue(stageDialogue.victory, () => {
          // Dialogue complete, show victory screen
        });
        setHasShownVictoryDialogue(true);
      }
    }
  }, [battle, hasShownVictoryDialogue, showDialogue]);

  if (!player) return null;

  const handleContinue = () => {
    navigateTo('world_map');
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center retro-grid" style={{ background: '#212529' }}>
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', damping: 10 }}
        className="max-w-2xl w-full mx-4"
      >
        {/* Victory Banner */}
        <div className="nes-container is-dark with-title text-center mb-8">
          <motion.h1
            className="pixel-text text-6xl mb-4"
            style={{ color: '#f7d51d', textShadow: '4px 4px 0px #000' }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            VICTORY!
          </motion.h1>

          <div className="text-4xl mb-4">🏆</div>

          <div className="pixel-text text-sm" style={{ color: '#92cc41' }}>
            STAGE COMPLETE!
          </div>
        </div>

        {/* Rewards */}
        <div className="nes-container is-dark with-title mb-8">
          <p className="title pixel-text text-xs" style={{ color: '#f7d51d' }}>REWARDS</p>

          <div className="grid grid-cols-3 gap-4 p-4 pixel-text text-xs text-center">
            <div>
              <div style={{ color: '#92cc41' }} className="mb-2">EXP</div>
              <div className="text-2xl">{player.exp}</div>
            </div>
            <div>
              <div style={{ color: '#f7d51d' }} className="mb-2">GOLD</div>
              <div className="text-2xl">{player.gold}</div>
            </div>
            <div>
              <div style={{ color: '#a855f7' }} className="mb-2">CRYSTALS</div>
              <div className="text-2xl">{player.crystals}</div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="nes-container is-dark mb-8">
          <div className="flex justify-between items-center pixel-text text-xs p-4">
            <div>
              <div style={{ color: '#92cc41' }}>LEVEL</div>
              <div className="text-2xl">{player.level}</div>
            </div>
            <div className="text-center">
              <div style={{ color: '#92cc41' }}>NEXT STAGE</div>
              <div className="text-2xl">{player.currentStage}</div>
            </div>
            <div className="text-right">
              <div style={{ color: '#92cc41' }}>CLEARED</div>
              <div className="text-2xl">{player.highestStageCleared}</div>
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <button
          className="nes-btn is-success w-full pixel-text"
          onClick={handleContinue}
        >
          ▶ CONTINUE
        </button>

        {/* Achievement */}
        {player.highestStageCleared === 5 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mt-8 pixel-text text-sm"
            style={{ color: '#f7d51d' }}
          >
            🎉 CONGRATULATIONS! YOU FREED ALL 5 GUARDIANS! 🎉
            <div className="text-xs mt-2" style={{ color: '#92cc41' }}>
              THE JOURNEY IS COMPLETE!
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Dialogue System */}
      {dialogue?.isActive && (
        <DialogueBox
          dialogues={dialogue.currentDialogues}
          onComplete={closeDialogue}
        />
      )}
    </div>
  );
}
