'use client';

import { motion } from 'framer-motion';
import { useGameStore } from '@/lib/store/gameStore';

export default function MainMenu() {
  const navigateTo = useGameStore(state => state.navigateTo);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center retro-grid"
         style={{ background: '#212529' }}>

      {/* Main Container */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl w-full px-4"
      >
        {/* Title */}
        <div className="text-center mb-12">
          <motion.h1
            className="text-4xl md:text-6xl mb-6 pixel-text"
            style={{ color: '#f7d51d', textShadow: '4px 4px 0px #000' }}
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            HERO COMIC RPG
          </motion.h1>

          <motion.div
            className="text-sm md:text-base pixel-text"
            style={{ color: '#92cc41' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            8-BIT EDITION
          </motion.div>
        </div>

        {/* Menu Box */}
        <motion.div
          className="nes-container is-dark with-title mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="title pixel-text text-sm" style={{ color: '#f7d51d' }}>MAIN MENU</p>

          <div className="flex flex-col gap-4 p-4">
            {/* New Game Button */}
            <button
              className="nes-btn is-primary pixel-text text-xs md:text-sm"
              onClick={() => navigateTo('class_select')}
            >
              ▶ NEW GAME
            </button>

            {/* Continue Button (Disabled) */}
            <button
              className="nes-btn is-disabled pixel-text text-xs md:text-sm"
              disabled
            >
              CONTINUE
            </button>

            {/* Leaderboard Button (Disabled) */}
            <button
              className="nes-btn is-disabled pixel-text text-xs md:text-sm"
              disabled
            >
              LEADERBOARD
            </button>

            {/* Settings Button (Disabled) */}
            <button
              className="nes-btn is-disabled pixel-text text-xs md:text-sm"
              disabled
            >
              SETTINGS
            </button>
          </div>
        </motion.div>

        {/* Stats Preview Box */}
        <motion.div
          className="nes-container is-dark mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center pixel-text text-xs">
            <div>
              <div style={{ color: '#92cc41' }}>CLASSES</div>
              <div style={{ color: '#fff' }}>5</div>
            </div>
            <div>
              <div style={{ color: '#92cc41' }}>STAGES</div>
              <div style={{ color: '#fff' }}>10</div>
            </div>
            <div>
              <div style={{ color: '#92cc41' }}>SKILLS</div>
              <div style={{ color: '#fff' }}>30+</div>
            </div>
            <div>
              <div style={{ color: '#92cc41' }}>BOSSES</div>
              <div style={{ color: '#fff' }}>10</div>
            </div>
          </div>
        </motion.div>

        {/* Pixel Art Hearts (Decorative) */}
        <div className="flex justify-center gap-4 mb-4">
          <motion.i
            className="nes-icon is-small heart"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <motion.i
            className="nes-icon is-small star"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
          />
          <motion.i
            className="nes-icon is-small heart"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
          />
        </div>

        {/* Credits */}
        <div className="text-center pixel-text text-xs" style={{ color: '#666' }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            v2.0 ALPHA | BUILT WITH NEXT.JS 15
          </motion.div>
          <motion.div
            className="mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            PRESS START <span className="blink">▶</span>
          </motion.div>
        </div>
      </motion.div>

      {/* Background Pixels (Animated) - Removed to fix hydration */}
    </div>
  );
}
