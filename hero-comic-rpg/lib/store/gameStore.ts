import { create } from 'zustand';
import { GameState, Player, ClassType, BattleState, CombatAction, DialogueLine } from '@/types';
import { getClass } from '../data/classes';
import { getStageById } from '../data/stages-complete';
import { getStartingSkills } from '../data/skills';
import { soundManager } from '../audio/soundManager';

// ============================================
// GAME STATE STORE (Zustand)
// ============================================

export const useGameStore = create<GameState>((set, get) => ({
  // ============================================
  // STATE
  // ============================================
  player: null,
  battle: null,
  dialogue: null,
  currentScreen: 'menu',
  isLoading: false,

  settings: {
    sfxVolume: 0.7,
    bgmVolume: 0.5,
    screenShake: true,
    damageNumbers: true,
    animationSpeed: 1.0
  },

  // ============================================
  // ACTIONS
  // ============================================

  createPlayer: (name: string, classType: ClassType) => {
    const classData = getClass(classType);
    const startingSkills = getStartingSkills(classType);

    const newPlayer: Player = {
      id: `player_${Date.now()}`,
      name,
      class: classType,
      level: 1,
      exp: 0,
      expToNext: 100,

      // Stats
      hp: classData.baseHp,
      maxHp: classData.baseHp,
      mp: classData.baseMp,
      maxMp: classData.baseMp,
      ap: 100,
      maxAp: 100,
      attack: classData.baseAttack,
      defense: classData.baseDefense,
      magicPower: classData.baseMagicPower,

      // Combat
      stance: 'balanced',
      buffs: [],
      debuffs: [],

      // Class Resource
      classResource: 0,
      maxClassResource: classData.maxResource,

      // Equipment
      weapon: null,
      armor: null,

      // Inventory - Starting items
      inventory: [
        { itemId: 'health_potion_small', quantity: 5 },
        { itemId: 'mana_potion_small', quantity: 3 },
        { itemId: 'antidote', quantity: 2 }
      ],
      gold: 100,

      // Progression
      currentStage: 1,
      highestStageCleared: 0,
      totalRuns: 0,
      totalWins: 0,
      crystals: 0,
      totalCrystalsEarned: 0,

      // Skills
      equippedSkills: startingSkills,
      unlockedSkills: startingSkills.map(s => s.id),

      // Meta
      metaUpgrades: []
    };

    set({ player: newPlayer, currentScreen: 'world_map' });
  },

  startBattle: (stageId: number) => {
    const player = get().player;
    if (!player) return;

    const stage = getStageById(stageId);
    if (!stage) return;

    // Reset player for battle
    const battlePlayer: Player = {
      ...player,
      ap: 100,
      buffs: [],
      debuffs: []
    };

    // Get enemies from first wave (DEEP COPY to avoid mutating original stage data)
    const firstWave = stage.waves[0];
    const enemiesCopy = firstWave.enemies.map(enemy => ({
      ...enemy,
      buffs: [...enemy.buffs],
      debuffs: [...enemy.debuffs],
      lootTable: [...enemy.lootTable]
    }));

    const battleState: BattleState = {
      player: battlePlayer,
      enemies: enemiesCopy,
      currentWave: 0,
      totalWaves: stage.waves.length + 1, // +1 for boss
      stage,
      turn: 1,
      currentTurn: 'player',
      selectedEnemy: enemiesCopy[0],
      combatLog: [
        {
          id: `log_${Date.now()}`,
          message: `Battle Start! ${stage.name}`,
          type: 'system',
          timestamp: Date.now()
        }
      ],
      comboCount: 0,
      comboMultiplier: 1.0,
      lastAction: null,
      damageNumbers: [],
      comicEffect: null,
      screenShake: false,
      battleStatus: 'active'
    };

    set({
      battle: battleState,
      currentScreen: 'battle',
      player: battlePlayer
    });
  },

  executeAction: (action: CombatAction) => {
    const battle = get().battle;
    if (!battle || battle.battleStatus !== 'active') return;

    const { CombatEngine } = require('../game/combatEngine');

    let newBattle = battle;

    // Execute action based on type
    if (action.type === 'attack' || action.type === 'skill') {
      // ALWAYS use battle.enemies[0] to get the latest enemy state
      const targetEnemy = battle.enemies[0];
      if (!targetEnemy) return;

      console.log('🔴 BEFORE ATTACK - Enemy HP:', targetEnemy.hp, '/', targetEnemy.maxHp);
      console.log('🔴 BATTLE ENEMIES:', battle.enemies.map(e => `${e.name}:${e.hp}HP`));

      // Get skill (basic attack if no skill specified)
      const { SKILLS } = require('../data/skills');
      const skill = action.skillId ? SKILLS[action.skillId] : SKILLS['basic_attack'];

      // Play sound based on skill type
      if (action.skillId && action.skillId !== 'basic_attack') {
        soundManager.playSFX('skill');
      } else {
        soundManager.playSFX('attack');
      }

      // Execute attack
      newBattle = CombatEngine.playerAttack(battle, targetEnemy, skill);
      console.log('🟢 AFTER ATTACK - Enemy HP:', newBattle.enemies[0]?.hp, '/', newBattle.enemies[0]?.maxHp);

      // Play critical sound if crit
      if (newBattle.damageNumbers[newBattle.damageNumbers.length - 1]?.isCrit) {
        setTimeout(() => soundManager.playSFX('critical'), 100);
      }
    } else if (action.type === 'guard') {
      soundManager.playSFX('guard');
      newBattle = CombatEngine.playerGuard(battle);
    } else if (action.type === 'item' && action.itemId) {
      // Use item
      const { getItem } = require('../data/items');
      const item = getItem(action.itemId);
      if (!item) return;

      // Find item in inventory
      const player = get().player;
      if (!player) return;

      const invItem = player.inventory.find(i => i.itemId === action.itemId);
      if (!invItem || invItem.quantity <= 0) return;

      // Apply item effect
      let updatedPlayer = { ...battle.player };

      if (item.effect) {
        switch (item.effect.type) {
          case 'heal_hp':
            updatedPlayer.hp = Math.min(updatedPlayer.maxHp, updatedPlayer.hp + (item.effect.value || 0));
            soundManager.playSFX('heal');
            break;
          case 'heal_mp':
            updatedPlayer.mp = Math.min(updatedPlayer.maxMp, updatedPlayer.mp + (item.effect.value || 0));
            soundManager.playSFX('heal');
            break;
          case 'full_restore':
            updatedPlayer.hp = updatedPlayer.maxHp;
            updatedPlayer.mp = updatedPlayer.maxMp;
            soundManager.playSFX('heal');
            break;
          case 'cleanse':
            updatedPlayer.debuffs = [];
            soundManager.playSFX('heal');
            break;
        }
      }

      // Update battle with new player state
      newBattle = {
        ...battle,
        player: updatedPlayer
      };

      // Remove item from inventory
      const updatedInventory = player.inventory.map(i =>
        i.itemId === action.itemId
          ? { ...i, quantity: i.quantity - 1 }
          : i
      ).filter(i => i.quantity > 0);

      set({ player: { ...player, inventory: updatedInventory } });

      // Add combat log
      newBattle.combatLog.push({
        id: `log_${Date.now()}`,
        message: `Used ${item.name}!`,
        type: 'system',
        timestamp: Date.now()
      });
    }

    // Update battle state
    console.log('💾 SETTING BATTLE STATE - Enemy HP:', newBattle.enemies[0]?.hp);
    set({ battle: newBattle });

    // Check if wave is cleared
    if (newBattle.enemies.length === 0 && newBattle.battleStatus === 'victory') {
      setTimeout(() => {
        get().handleWaveComplete();
      }, 1500);
      return;
    }

    // Clean up effects after delay
    setTimeout(() => {
      const currentBattle = get().battle;
      console.log('🧹 CLEANUP - Enemy HP before:', currentBattle?.enemies[0]?.hp);
      if (currentBattle) {
        const cleanedBattle = CombatEngine.cleanupEffects(currentBattle);
        console.log('🧹 CLEANUP - Enemy HP after:', cleanedBattle.enemies[0]?.hp);
        set({ battle: cleanedBattle });
      }
    }, 1000);

    // End player turn
    setTimeout(() => {
      console.log('⏭️ END TURN - Enemy HP:', get().battle?.enemies[0]?.hp);
      get().endTurn();
    }, 1500);
  },

  handleWaveComplete: () => {
    const battle = get().battle;
    if (!battle) return;

    const { CombatEngine } = require('../game/combatEngine');

    // Check if this was the boss
    if (battle.currentWave >= battle.stage.waves.length) {
      // Stage complete!
      const player = get().player;
      if (!player) return;

      // Play victory sound
      soundManager.playSFX('victory');

      // Update player progress
      const updatedPlayer = {
        ...player,
        currentStage: Math.min(10, player.currentStage + 1),
        highestStageCleared: Math.max(player.highestStageCleared, battle.stage.id),
        exp: player.exp + battle.stage.baseExp,
        gold: player.gold + battle.stage.baseGold,
        crystals: player.crystals + battle.stage.crystalReward
      };

      set({
        player: updatedPlayer,
        currentScreen: 'victory',
        battle: null
      });
    } else {
      // Next wave
      const newBattle = CombatEngine.nextWave(battle);
      set({ battle: newBattle });
    }
  },

  endTurn: () => {
    const battle = get().battle;
    if (!battle) return;

    console.log('🔄 END TURN - Current turn:', battle.currentTurn, 'Enemy HP:', battle.enemies[0]?.hp);

    if (battle.currentTurn === 'player') {
      // Switch to enemy turn
      const updatedBattle = {
        ...battle,
        currentTurn: 'enemy' as const,
        player: {
          ...battle.player,
          ap: 100 // Reset AP for next turn
        }
      };
      console.log('🔄 SWITCHING TO ENEMY TURN - Enemy HP:', updatedBattle.enemies[0]?.hp);
      set({ battle: updatedBattle });

      // Execute enemy AI
      setTimeout(() => {
        get().executeEnemyTurn();
      }, 1000);
    } else {
      // Switch back to player
      set({
        battle: {
          ...battle,
          currentTurn: 'player',
          turn: battle.turn + 1
        }
      });
    }
  },

  executeEnemyTurn: () => {
    const battle = get().battle;
    if (!battle) return;

    // Simple enemy AI: Attack player
    const enemy = battle.enemies[0];
    if (!enemy) return;

    // Check for boss phase change
    if (enemy.isBoss) {
      const { BossAI } = require('../game/bossAI');
      if (BossAI.shouldChangePhase(enemy)) {
        const { boss: updatedBoss, message } = BossAI.changePhase(enemy);

        // Update enemy with new phase
        set({
          battle: {
            ...battle,
            enemies: [updatedBoss],
            combatLog: [
              ...battle.combatLog,
              {
                id: `log_${Date.now()}`,
                message,
                type: 'system',
                timestamp: Date.now()
              }
            ]
          }
        });

        // Play special sound for phase change
        soundManager.playSFX('skill');
        return; // Skip attack this turn
      }
    }

    // Play enemy attack sound
    soundManager.playSFX('damage');

    // Calculate damage (with boss AI if applicable)
    let damage: number;
    let attackMessage: string;

    if (enemy.isBoss) {
      const { BossAI } = require('../game/bossAI');
      const attackData = BossAI.executeBossAttack(battle);
      damage = attackData.damage;
      attackMessage = attackData.message;

      // Special effects
      if (attackData.specialEffect === 'multi_hit') {
        soundManager.playSFX('attack');
        setTimeout(() => soundManager.playSFX('damage'), 150);
      } else if (attackData.specialEffect === 'power_charge') {
        soundManager.playSFX('critical');
      }
    } else {
      damage = Math.floor(enemy.attack * (Math.random() * 0.5 + 0.75));
      attackMessage = `${enemy.name} attacks!`;
    }

    const newPlayerHp = Math.max(0, battle.player.hp - damage);

    // Add combat log
    const newLog = {
      id: `log_${Date.now()}`,
      message: `${attackMessage} ${damage} damage!`,
      type: 'damage' as const,
      timestamp: Date.now()
    };

    set({
      battle: {
        ...battle,
        player: {
          ...battle.player,
          hp: newPlayerHp
        },
        combatLog: [...battle.combatLog, newLog],
        battleStatus: newPlayerHp <= 0 ? 'defeat' : 'active'
      }
    });

    // Check defeat
    if (newPlayerHp <= 0) {
      soundManager.playSFX('defeat');
      setTimeout(() => {
        set({ currentScreen: 'defeat' });
      }, 2000);
    } else {
      // Switch back to player turn after enemy attack
      setTimeout(() => {
        get().endTurn();
      }, 1000);
    }
  },

  equipSkill: (skillId: string) => {
    const player = get().player;
    if (!player) return;

    // Skill equip logic
    console.log('Equip skill:', skillId);
  },

  buyMetaUpgrade: (upgradeId: string) => {
    const player = get().player;
    if (!player) return;

    // Meta upgrade logic
    console.log('Buy upgrade:', upgradeId);
  },

  // ============================================
  // DIALOGUE ACTIONS
  // ============================================

  showDialogue: (dialogues: DialogueLine[], onComplete: () => void) => {
    set({
      dialogue: {
        isActive: true,
        currentDialogues: dialogues,
        onComplete
      }
    });
    soundManager.playSFX('button'); // Optional sound effect
  },

  closeDialogue: () => {
    const dialogue = get().dialogue;
    if (dialogue?.onComplete) {
      dialogue.onComplete();
    }
    set({ dialogue: null });
  },

  navigateTo: (screen: GameState['currentScreen']) => {
    set({ currentScreen: screen });
  }
}));
