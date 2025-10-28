'use client';

import { motion } from 'framer-motion';
import { useGameStore } from '@/lib/store/gameStore';
import { ALL_STAGES } from '@/lib/data/stages-complete';

export default function WorldMap() {
  const player = useGameStore(state => state.player);
  const startBattle = useGameStore(state => state.startBattle);

  if (!player) return null;

  return (
    <div className="min-h-screen w-full retro-grid p-4 md:p-8" style={{ background: '#212529' }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="nes-container is-dark with-title mb-8">
          <p className="title pixel-text text-sm" style={{ color: '#92cc41' }}>{player.name}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 pixel-text text-xs">
            <div>
              <div style={{ color: '#92cc41' }}>CLASS</div>
              <div>{player.class.toUpperCase()}</div>
            </div>
            <div>
              <div style={{ color: '#92cc41' }}>LEVEL</div>
              <div>{player.level}</div>
            </div>
            <div>
              <div style={{ color: '#92cc41' }}>GOLD</div>
              <div>{player.gold}</div>
            </div>
            <div>
              <div style={{ color: '#92cc41' }}>CRYSTALS</div>
              <div>{player.crystals}</div>
            </div>
          </div>
        </div>

        {/* Stage Selection */}
        <div className="nes-container is-dark with-title">
          <p className="title pixel-text text-sm" style={{ color: '#f7d51d' }}>SELECT STAGE</p>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 p-4">
            {ALL_STAGES.map((stage) => {
              const isUnlocked = stage.id <= player.currentStage;
              const isCleared = stage.id <= player.highestStageCleared;

              return (
                <motion.button
                  key={stage.id}
                  className={`nes-btn pixel-text text-xs p-4 ${isUnlocked ? (isCleared ? 'is-success' : 'is-primary') : 'is-disabled'}`}
                  onClick={() => isUnlocked && startBattle(stage.id)}
                  disabled={!isUnlocked}
                  whileHover={isUnlocked ? { scale: 1.05 } : {}}
                  whileTap={isUnlocked ? { scale: 0.95 } : {}}
                >
                  <div className="text-2xl mb-2">
                    {stage.id === 1 && '🌲'}
                    {stage.id === 2 && '🕳️'}
                    {stage.id === 3 && '🏜️'}
                    {stage.id === 4 && '🏔️'}
                    {stage.id === 5 && '🌋'}
                    {stage.id === 6 && '🌊'}
                    {stage.id === 7 && '🌑'}
                    {stage.id === 8 && '🏭'}
                    {stage.id === 9 && '🏰'}
                    {stage.id === 10 && '🔥'}
                  </div>
                  <div>STAGE {stage.id}</div>
                  <div className="text-xs mt-1" style={{ color: isCleared ? '#92cc41' : '#fff' }}>
                    {isCleared ? '✓ CLEARED' : isUnlocked ? stage.name : 'LOCKED'}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Hint */}
        <div className="text-center mt-4 pixel-text text-xs" style={{ color: '#666' }}>
          SELECT A STAGE TO BEGIN YOUR ADVENTURE
        </div>
      </div>
    </div>
  );
}
