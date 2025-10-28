'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Skill } from '@/types';

interface SkillSelectorProps {
  skills: Skill[];
  playerAp: number;
  playerMp: number;
  onSelectSkill: (skill: Skill) => void;
  onClose: () => void;
}

export default function SkillSelector({ skills, playerAp, playerMp, onSelectSkill, onClose }: SkillSelectorProps) {
  const canUseSkill = (skill: Skill) => {
    if (playerAp < skill.apCost) return false;
    if (skill.mpCost && playerMp < skill.mpCost) return false;
    return true;
  };

  const getElementColor = (element?: string) => {
    switch (element) {
      case 'fire': return '#e76e55';
      case 'ice': return '#209cee';
      case 'lightning': return '#f7d51d';
      case 'holy': return '#92cc41';
      case 'dark': return '#a855f7';
      default: return '#fff';
    }
  };

  const getElementIcon = (element?: string) => {
    switch (element) {
      case 'fire': return '🔥';
      case 'ice': return '❄️';
      case 'lightning': return '⚡';
      case 'holy': return '✨';
      case 'dark': return '🌑';
      default: return '⚔️';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.8)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
        className="nes-container is-dark with-title max-w-2xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="title pixel-text text-xs" style={{ color: '#f7d51d' }}>SELECT SKILL</p>

        <div className="p-4 max-h-96 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {skills.map((skill) => {
              const canUse = canUseSkill(skill);
              const elementColor = getElementColor(skill.element);

              return (
                <motion.button
                  key={skill.id}
                  className={`nes-container is-dark text-left p-3 ${canUse ? 'hover:bg-gray-800' : 'opacity-50'}`}
                  disabled={!canUse}
                  onClick={() => canUse && onSelectSkill(skill)}
                  whileHover={canUse ? { scale: 1.02 } : {}}
                  whileTap={canUse ? { scale: 0.98 } : {}}
                >
                  {/* Skill Name */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="pixel-text text-xs" style={{ color: elementColor }}>
                      {getElementIcon(skill.element)} {skill.name}
                    </div>
                    {skill.isBurst && (
                      <span className="pixel-text text-xs" style={{ color: '#f7d51d' }}>⭐</span>
                    )}
                  </div>

                  {/* Description */}
                  <div className="pixel-text text-xs mb-2" style={{ color: '#999', fontSize: '8px' }}>
                    {skill.description}
                  </div>

                  {/* Costs */}
                  <div className="flex gap-3 pixel-text text-xs">
                    <div style={{ color: playerAp >= skill.apCost ? '#f7d51d' : '#e76e55' }}>
                      AP: {skill.apCost}
                    </div>
                    {skill.mpCost && skill.mpCost > 0 && (
                      <div style={{ color: playerMp >= skill.mpCost ? '#209cee' : '#e76e55' }}>
                        MP: {skill.mpCost}
                      </div>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="flex gap-3 pixel-text text-xs mt-2">
                    {skill.damageMultiplier && (
                      <div style={{ color: '#92cc41' }}>
                        DMG: {(skill.damageMultiplier * 100).toFixed(0)}%
                      </div>
                    )}
                    {skill.healMultiplier && (
                      <div style={{ color: '#92cc41' }}>
                        HEAL: {(skill.healMultiplier * 100).toFixed(0)}%
                      </div>
                    )}
                    {skill.hits && skill.hits > 1 && (
                      <div style={{ color: '#f7d51d' }}>
                        {skill.hits}x HITS
                      </div>
                    )}
                  </div>

                  {/* Cooldown */}
                  {skill.cooldown && skill.cooldown > 0 && (
                    <div className="pixel-text text-xs mt-1" style={{ color: '#666' }}>
                      CD: {skill.cooldown} turns
                    </div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Close Button */}
        <div className="p-4 pt-0">
          <button
            className="nes-btn w-full pixel-text text-xs"
            onClick={onClose}
          >
            ◀ BACK
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
