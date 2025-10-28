'use client';

import { motion } from 'framer-motion';
import { useGameStore } from '@/lib/store/gameStore';

export default function DefeatScreen() {
  const navigateTo = useGameStore(state => state.navigateTo);

  const handleRetry = () => {
    navigateTo('world_map');
  };

  const handleMainMenu = () => {
    navigateTo('menu');
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center retro-grid" style={{ background: '#212529' }}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full mx-4"
      >
        {/* Defeat Banner */}
        <div className="nes-container is-dark text-center mb-8">
          <motion.h1
            className="pixel-text text-6xl mb-4"
            style={{ color: '#e76e55', textShadow: '4px 4px 0px #000' }}
          >
            DEFEAT
          </motion.h1>

          <div className="text-4xl mb-4">💀</div>

          <div className="pixel-text text-sm" style={{ color: '#666' }}>
            YOU HAVE FALLEN IN BATTLE
          </div>
        </div>

        {/* Message */}
        <div className="nes-container is-dark mb-8">
          <div className="pixel-text text-xs text-center p-4" style={{ color: '#fff' }}>
            THE DARKNESS CLAIMS ANOTHER SOUL...
            <div className="mt-4" style={{ color: '#92cc41' }}>
              BUT HEROES NEVER GIVE UP!
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-4">
          <button
            className="nes-btn is-error w-full pixel-text"
            onClick={handleRetry}
          >
            🔄 TRY AGAIN
          </button>

          <button
            className="nes-btn w-full pixel-text"
            onClick={handleMainMenu}
          >
            ◀ MAIN MENU
          </button>
        </div>

        {/* Hint */}
        <div className="text-center mt-8 pixel-text text-xs" style={{ color: '#666' }}>
          TIP: USE GUARD TO RESTORE MP AND REDUCE DAMAGE
        </div>
      </motion.div>
    </div>
  );
}
