'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/lib/store/gameStore';
import SkillSelector from './SkillSelector';
import ItemSelector from './ItemSelector';
import DialogueBox from '@/components/DialogueBox';
import { soundManager } from '@/lib/audio/soundManager';
import { getDialogueByStageId } from '@/lib/data/dialogues';

export default function BattleScreen() {
  const battle = useGameStore(state => state.battle);
  const dialogue = useGameStore(state => state.dialogue);
  const executeAction = useGameStore(state => state.executeAction);
  const showDialogue = useGameStore(state => state.showDialogue);
  const closeDialogue = useGameStore(state => state.closeDialogue);

  const player = battle?.player;
  const enemies = battle?.enemies || [];
  const currentEnemy = enemies[0];

  const [showSkills, setShowSkills] = useState(false);
  const [showItems, setShowItems] = useState(false);
  const shownPhasesRef = useRef<Set<string>>(new Set());
  const hasShownIntroRef = useRef(false);
  const battleIdRef = useRef<string>('');

  // Show intro dialogue when battle starts (ONLY ONCE per battle)
  useEffect(() => {
    if (!battle) return;

    // TEMPORARILY DISABLED TO TEST COMBAT
    // Create unique battle ID
    // const currentBattleId = `${battle.stage.id}_${battle.turn}`;

    // // Only show intro if this is a NEW battle
    // if (battle.turn === 1 && !hasShownIntroRef.current && battleIdRef.current !== currentBattleId) {
    //   battleIdRef.current = currentBattleId;
    //   const stageDialogue = getDialogueByStageId(battle.stage.id);
    //   if (stageDialogue?.intro) {
    //     showDialogue(stageDialogue.intro, () => {
    //       // Continue to battle
    //     });
    //     hasShownIntroRef.current = true;
    //   }
    // }
  }, [battle?.stage.id, battle?.turn, showDialogue]);

  // Show boss phase dialogues based on HP (TEMPORARILY DISABLED)
  useEffect(() => {
    // TEMPORARILY DISABLED TO TEST COMBAT
    // if (!currentEnemy || !currentEnemy.isBoss || !battle || dialogue?.isActive) return;

    // const hpPercent = (currentEnemy.hp / currentEnemy.maxHp) * 100;
    // const stageDialogue = getDialogueByStageId(battle.stage.id);

    // if (!stageDialogue) return;

    // // Phase 1: 70% HP
    // if (hpPercent <= 70 && hpPercent > 40 && !shownPhasesRef.current.has('phase1')) {
    //   if (stageDialogue.phase1) {
    //     showDialogue(stageDialogue.phase1, () => {});
    //     shownPhasesRef.current.add('phase1');
    //   }
    // }

    // // Phase 2: 40% HP
    // if (hpPercent <= 40 && !shownPhasesRef.current.has('phase2')) {
    //   if (stageDialogue.phase2) {
    //     showDialogue(stageDialogue.phase2, () => {});
    //     shownPhasesRef.current.add('phase2');
    //   }
    // }
  }, [currentEnemy?.hp, battle?.stage.id, showDialogue, dialogue?.isActive]);

  if (!battle || !player) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <div className="pixel-text">Loading battle...</div>
      </div>
    );
  }

  const isPlayerTurn = battle.currentTurn === 'player';

  // Handle attack
  const handleAttack = () => {
    if (!isPlayerTurn) return;
    executeAction({ type: 'attack' });
  };

  // Handle guard
  const handleGuard = () => {
    if (!isPlayerTurn) return;
    executeAction({ type: 'guard' });
  };

  // Handle skill selection
  const handleSkillSelect = (skill: any) => {
    if (!isPlayerTurn) return;
    executeAction({ type: 'skill', skillId: skill.id });
    setShowSkills(false);
  };

  // Handle item selection
  const handleItemSelect = (itemId: string) => {
    if (!isPlayerTurn) return;
    executeAction({ type: 'item', itemId });
    setShowItems(false);
  };

  return (
    <div className="min-h-screen w-full flex flex-col retro-grid relative" style={{ background: '#212529' }}>

      {/* Damage Numbers Overlay */}
      <AnimatePresence>
        {battle.damageNumbers.map((dmg) => (
          <motion.div
            key={dmg.id}
            className="absolute damage-number pointer-events-none z-50"
            style={{
              left: `${dmg.x}%`,
              top: `${dmg.y}%`,
              color: dmg.isCrit ? '#f7d51d' : '#fff',
              fontSize: dmg.isCrit ? '48px' : '32px'
            }}
            initial={{ y: 0, opacity: 1, scale: dmg.isCrit ? 1.5 : 1 }}
            animate={{ y: -100, opacity: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            {dmg.value}
            {dmg.isCrit && <span className="ml-2">!</span>}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Comic Effect */}
      <AnimatePresence>
        {battle.comicEffect && (
          <motion.div
            key={battle.comicEffect.timestamp}
            className="absolute pixel-text pointer-events-none z-50"
            style={{
              left: `${battle.comicEffect.x}%`,
              top: `${battle.comicEffect.y}%`,
              color: battle.comicEffect.color,
              fontSize: `${battle.comicEffect.size}px`,
              textShadow: '4px 4px 0px #000'
            }}
            initial={{ scale: 0, rotate: -15 }}
            animate={{ scale: 1.5, rotate: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {battle.comicEffect.text}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Battle Arena */}
      <div className={`flex-1 flex flex-col md:flex-row items-center justify-between p-4 md:p-8 ${battle.screenShake ? 'screen-shake' : ''}`}>

        {/* Player Side */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="w-full md:w-1/3"
        >
          <div className="nes-container is-dark with-title">
            <p className="title pixel-text text-xs" style={{ color: '#92cc41' }}>{player.name}</p>

            <div className="p-4">
              {/* Class Icon */}
              <div className="text-6xl text-center mb-4">
                {player.class === 'warrior' && '⚔️'}
                {player.class === 'mage' && '🔮'}
                {player.class === 'rogue' && '🗡️'}
                {player.class === 'paladin' && '🛡️'}
                {player.class === 'ranger' && '🏹'}
              </div>

              {/* HP Bar */}
              <div className="mb-2">
                <div className="flex justify-between pixel-text text-xs mb-1">
                  <span style={{ color: '#e76e55' }}>HP</span>
                  <span>{player.hp}/{player.maxHp}</span>
                </div>
                <div className="hp-bar">
                  <motion.div
                    className="hp-bar-fill"
                    animate={{ width: `${(player.hp / player.maxHp) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              {/* MP Bar */}
              <div className="mb-2">
                <div className="flex justify-between pixel-text text-xs mb-1">
                  <span style={{ color: '#209cee' }}>MP</span>
                  <span>{player.mp}/{player.maxMp}</span>
                </div>
                <div className="mp-bar">
                  <motion.div
                    className="mp-bar-fill"
                    animate={{ width: `${(player.mp / player.maxMp) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              {/* AP Bar */}
              <div>
                <div className="flex justify-between pixel-text text-xs mb-1">
                  <span style={{ color: '#f7d51d' }}>AP</span>
                  <span>{player.ap}/{player.maxAp}</span>
                </div>
                <div className="ap-bar">
                  <motion.div
                    className="ap-bar-fill"
                    animate={{ width: `${(player.ap / player.maxAp) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              {/* Combo Counter */}
              {battle.comboCount > 0 && (
                <motion.div
                  className="text-center mt-2 pixel-text text-xs"
                  style={{ color: '#f7d51d' }}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  {battle.comboCount}x COMBO!
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>

        {/* VS */}
        <div className="text-6xl pixel-text my-4 md:my-0" style={{ color: '#f7d51d', textShadow: '4px 4px 0px #000' }}>
          VS
        </div>

        {/* Enemy Side */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="w-full md:w-1/3"
        >
          {currentEnemy && (
            <div className="nes-container is-dark with-title">
              <p className="title pixel-text text-xs" style={{ color: '#e76e55' }}>{currentEnemy.name}</p>

              <div className="p-4">
                {/* Enemy Sprite */}
                <motion.div
                  className="text-6xl text-center mb-4 enemy-sprite"
                  animate={battle.currentTurn === 'enemy' ? { x: [0, -10, 10, -10, 10, 0] } : {}}
                  transition={{ duration: 0.5 }}
                >
                  {currentEnemy.sprite}
                </motion.div>

                {/* HP Bar */}
                <div>
                  <div className="flex justify-between pixel-text text-xs mb-1">
                    <span style={{ color: '#e76e55' }}>HP</span>
                    <span>{currentEnemy.hp}/{currentEnemy.maxHp}</span>
                  </div>
                  <div className="hp-bar">
                    <motion.div
                      className="hp-bar-fill"
                      animate={{ width: `${(currentEnemy.hp / currentEnemy.maxHp) * 100}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>

                {/* Enemy Type */}
                <div className="text-center mt-4 pixel-text text-xs" style={{ color: currentEnemy.isBoss ? '#f7d51d' : '#92cc41' }}>
                  {currentEnemy.isBoss ? '👑 BOSS' : currentEnemy.type.toUpperCase()}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Battle UI */}
      <div className="p-4 md:p-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* Combat Log */}
          <div className="md:col-span-2 nes-container is-dark with-title" style={{ minHeight: '200px', maxHeight: '200px', overflow: 'auto' }}>
            <p className="title pixel-text text-xs" style={{ color: '#92cc41' }}>BATTLE LOG</p>
            <div className="p-2 pixel-text text-xs space-y-2">
              {battle.combatLog.slice(-5).map((log) => (
                <div key={log.id} style={{ color: log.type === 'damage' ? '#e76e55' : log.type === 'attack' ? '#92cc41' : '#fff' }}>
                  ▶ {log.message}
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="nes-container is-dark with-title">
            <p className="title pixel-text text-xs" style={{ color: '#f7d51d' }}>ACTIONS</p>
            <div className="flex flex-col gap-2 p-2">
              <button
                className={`nes-btn is-error pixel-text text-xs ${!isPlayerTurn || player.ap < 25 ? 'is-disabled' : ''}`}
                onClick={handleAttack}
                disabled={!isPlayerTurn || player.ap < 25}
              >
                ⚔ ATTACK (25 AP)
              </button>
              <button
                className={`nes-btn is-primary pixel-text text-xs ${!isPlayerTurn ? 'is-disabled' : ''}`}
                onClick={() => {
                  soundManager.playSFX('button');
                  setShowSkills(true);
                }}
                disabled={!isPlayerTurn}
              >
                🔮 SKILLS
              </button>
              <button
                className={`nes-btn is-success pixel-text text-xs ${!isPlayerTurn || player.ap < 30 ? 'is-disabled' : ''}`}
                onClick={handleGuard}
                disabled={!isPlayerTurn || player.ap < 30}
              >
                🛡 GUARD (30 AP)
              </button>
              <button
                className={`nes-btn is-warning pixel-text text-xs ${!isPlayerTurn ? 'is-disabled' : ''}`}
                onClick={() => {
                  soundManager.playSFX('button');
                  setShowItems(true);
                }}
                disabled={!isPlayerTurn}
              >
                🎒 ITEMS
              </button>
            </div>
          </div>
        </div>

        {/* Turn Indicator */}
        <div className="text-center mt-4 pixel-text text-sm" style={{ color: battle.currentTurn === 'player' ? '#92cc41' : '#e76e55' }}>
          {battle.currentTurn === 'player' ? '▶ YOUR TURN' : '▶ ENEMY TURN...'}
        </div>

        {/* Wave Info */}
        <div className="text-center mt-2 pixel-text text-xs" style={{ color: '#666' }}>
          WAVE {battle.currentWave + 1} / {battle.totalWaves}
        </div>
      </div>

      {/* Skill Selector Modal */}
      <AnimatePresence>
        {showSkills && (
          <SkillSelector
            skills={player.equippedSkills}
            playerAp={player.ap}
            playerMp={player.mp}
            onSelectSkill={handleSkillSelect}
            onClose={() => setShowSkills(false)}
          />
        )}
      </AnimatePresence>

      {/* Item Selector Modal */}
      <AnimatePresence>
        {showItems && (
          <ItemSelector
            inventory={player.inventory}
            onSelectItem={handleItemSelect}
            onClose={() => setShowItems(false)}
          />
        )}
      </AnimatePresence>

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
