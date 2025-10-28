import { Stage, Enemy } from '@/types';

// ============================================
// COMPLETE 10 STAGES WITH BOSSES
// ============================================

// Helper to create basic enemy
const enemy = (id: string, name: string, hp: number, atk: number, exp: number, gold: number, sprite: string): Enemy => ({
  id, name, type: 'swarm', isBoss: false,
  hp, maxHp: hp, mp: 20, maxMp: 20,
  attack: atk, defense: Math.floor(atk * 0.6), magicPower: Math.floor(atk * 0.5),
  aiPattern: { attackFrequency: 70, skillFrequency: 30, defensiveThreshold: 30, targetPriority: 'player' },
  element: 'physical', weaknesses: [], resistances: [],
  buffs: [], debuffs: [], expDrop: exp, goldDrop: gold,
  lootTable: [], sprite, color: '#888'
});

// ============================================
// STAGE 1: DARK FOREST
// ============================================
export const STAGE_1: Stage = {
  id: 1, name: 'Dark Forest', biome: 'forest',
  description: 'The forest whispers… but the Wolf Lord roars louder!',
  waves: [
    { enemies: [enemy('slime1', 'Forest Slime', 30, 5, 10, 5, '🟢'), enemy('slime2', 'Forest Slime', 30, 5, 10, 5, '🟢')], count: 2 },
    { enemies: [enemy('boar1', 'Wild Boar', 60, 8, 20, 10, '🐗')], count: 1 }
  ],
  boss: {
    id: 'wolf_lord', name: 'Wolf Lord', type: 'boss', isBoss: true,
    hp: 500, maxHp: 500, mp: 50, maxMp: 50,
    attack: 25, defense: 15, magicPower: 10,
    currentPhase: 0,
    phases: [
      { name: 'Phase 1', hpThreshold: 60, aiPattern: { attackFrequency: 70, skillFrequency: 30, defensiveThreshold: 30, targetPriority: 'player' } },
      { name: 'Summon Pack', hpThreshold: 30, aiPattern: { attackFrequency: 50, skillFrequency: 50, defensiveThreshold: 0, targetPriority: 'player' }, specialMechanic: 'Summons wolves' },
      { name: 'Berserk', hpThreshold: 0, aiPattern: { attackFrequency: 100, skillFrequency: 0, defensiveThreshold: 0, targetPriority: 'player' }, specialMechanic: '2x attacks' }
    ],
    aiPattern: { attackFrequency: 70, skillFrequency: 30, defensiveThreshold: 30, targetPriority: 'player' },
    element: 'physical', weaknesses: ['fire'], resistances: ['physical'],
    buffs: [], debuffs: [], expDrop: 100, goldDrop: 50,
    lootTable: [{ itemId: 'wolf_fang', dropChance: 100, quantity: 1, rarity: 'common' }],
    sprite: '🐺', color: '#8B4513'
  },
  introDialogue: 'The forest is alive with danger. Steel yourself, hero.',
  victoryDialogue: 'The Wolf Lord falls! The forest grows quiet.',
  unlockStage: 0, baseExp: 50, baseGold: 30, crystalReward: 10,
  bgImage: '/bg-forest.jpg', bgColor: '#2d5016', particleEffect: 'leaves'
};

// ============================================
// STAGE 2: ANCIENT CAVE
// ============================================
export const STAGE_2: Stage = {
  id: 2, name: 'Ancient Cave', biome: 'cave',
  description: 'Echoes of the past haunt these halls.',
  waves: [
    { enemies: [enemy('spider1', 'Cave Spider', 40, 6, 15, 8, '🕷️'), enemy('spider2', 'Cave Spider', 40, 6, 15, 8, '🕷️')], count: 2 },
    { enemies: [enemy('golem1', 'Crystal Golem', 100, 10, 30, 15, '💎')], count: 1 }
  ],
  boss: {
    id: 'echo_wraith', name: 'Echo Wraith', type: 'boss', isBoss: true,
    hp: 600, maxHp: 600, mp: 100, maxMp: 100,
    attack: 30, defense: 12, magicPower: 35,
    aiPattern: { attackFrequency: 50, skillFrequency: 50, defensiveThreshold: 30, targetPriority: 'player' },
    element: 'physical', weaknesses: ['lightning'], resistances: ['physical', 'fire'],
    buffs: [], debuffs: [], expDrop: 150, goldDrop: 75,
    lootTable: [{ itemId: 'spectral_essence', dropChance: 100, quantity: 1, rarity: 'rare' }],
    sprite: '👻', color: '#9370DB'
  },
  introDialogue: 'The cave echoes with lost souls. Tread carefully.',
  victoryDialogue: 'The wraith\'s cries fade into silence.',
  unlockStage: 1, baseExp: 75, baseGold: 50, crystalReward: 12,
  bgImage: '/bg-cave.jpg', bgColor: '#2c3e50'
};

// STAGE 3-10: Similar pattern
export const STAGE_3: Stage = {
  id: 3, name: 'Desert Wastes', biome: 'desert',
  description: 'Heat and death—both sting the same.',
  waves: [{ enemies: [enemy('worm1', 'Sand Worm', 80, 12, 25, 12, '🪱'), enemy('cactus1', 'Cactus Beast', 70, 10, 20, 10, '🌵')], count: 2 }],
  boss: { id: 'scorpion_king', name: 'Scorpion King', type: 'boss', isBoss: true, hp: 800, maxHp: 800, mp: 50, maxMp: 50, attack: 35, defense: 20, magicPower: 15, aiPattern: { attackFrequency: 70, skillFrequency: 30, defensiveThreshold: 30, targetPriority: 'player' }, element: 'physical', weaknesses: ['ice'], resistances: ['fire'], buffs: [], debuffs: [], expDrop: 200, goldDrop: 100, lootTable: [], sprite: '🦂', color: '#DAA520' },
  introDialogue: 'The scorching sands hide deadly predators.', victoryDialogue: 'The Scorpion King\'s poison flows into the sand.',
  unlockStage: 2, baseExp: 100, baseGold: 70, crystalReward: 15, bgImage: '/bg-desert.jpg', bgColor: '#EDC9AF'
};

export const STAGE_4: Stage = {
  id: 4, name: 'Frozen Peaks', biome: 'snow', description: 'Even your courage freezes here, warrior.',
  waves: [{ enemies: [enemy('bat1', 'Ice Bat', 120, 16, 20, 10, '🦇'), enemy('golem2', 'Frost Golem', 300, 20, 35, 20, '❄️')], count: 2 }],
  boss: { id: 'frost_titan', name: 'Frost Titan', type: 'boss', isBoss: true, hp: 1000, maxHp: 1000, mp: 80, maxMp: 80, attack: 40, defense: 30, magicPower: 25, aiPattern: { attackFrequency: 60, skillFrequency: 40, defensiveThreshold: 40, targetPriority: 'player' }, element: 'ice', weaknesses: ['fire'], resistances: ['ice', 'physical'], buffs: [], debuffs: [], expDrop: 250, goldDrop: 150, lootTable: [], sprite: '🧊', color: '#87CEEB' },
  introDialogue: 'The cold bites deeper than any blade.', victoryDialogue: 'The titan shatters into a thousand ice shards.',
  unlockStage: 3, baseExp: 150, baseGold: 100, crystalReward: 20, bgImage: '/bg-snow.jpg', bgColor: '#E0F7FA'
};

export const STAGE_5: Stage = {
  id: 5, name: 'Volcanic Core', biome: 'volcano', description: 'Your courage burns bright… but I burn brighter!',
  waves: [{ enemies: [enemy('lava1', 'Lava Slime', 150, 25, 30, 15, '🔥'), enemy('magma1', 'Magma Golem', 400, 30, 45, 25, '🌋')], count: 2 }],
  boss: { id: 'flame_lord', name: 'Flame Lord', type: 'boss', isBoss: true, hp: 1200, maxHp: 1200, mp: 100, maxMp: 100, attack: 50, defense: 25, magicPower: 40, aiPattern: { attackFrequency: 50, skillFrequency: 50, defensiveThreshold: 30, targetPriority: 'player' }, element: 'fire', weaknesses: ['water', 'ice'], resistances: ['fire'], buffs: [], debuffs: [], expDrop: 300, goldDrop: 200, lootTable: [], sprite: '🔥', color: '#FF4500' },
  introDialogue: 'The flames roar with ancient fury.', victoryDialogue: 'The fire dims, but your legend grows.',
  unlockStage: 4, baseExp: 200, baseGold: 150, crystalReward: 25, bgImage: '/bg-volcano.jpg', bgColor: '#8B0000'
};

// ============================================
// REMOVED STAGES 6-10 - Game now has 5 stages total
// Final boss is now the Flame Lord at Stage 5
// ============================================

export const ALL_STAGES: Stage[] = [STAGE_1, STAGE_2, STAGE_3, STAGE_4, STAGE_5];

export const getStageById = (id: number): Stage | undefined => ALL_STAGES.find(s => s.id === id);
