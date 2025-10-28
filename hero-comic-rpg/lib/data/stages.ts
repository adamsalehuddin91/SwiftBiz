import { Stage, Enemy, BossPhase } from '@/types';

// ============================================
// ENEMY TEMPLATES
// ============================================

const createEnemy = (
  id: string,
  name: string,
  type: Enemy['type'],
  hp: number,
  attack: number,
  element: Enemy['element'],
  expDrop: number,
  goldDrop: number
): Enemy => ({
  id,
  name,
  type,
  isBoss: false,
  hp,
  maxHp: hp,
  mp: 20,
  maxMp: 20,
  attack,
  defense: Math.floor(attack * 0.6),
  magicPower: Math.floor(attack * 0.5),
  aiPattern: {
    attackFrequency: 70,
    skillFrequency: 30,
    defensiveThreshold: 30,
    targetPriority: 'player'
  },
  element,
  weaknesses: [],
  resistances: [],
  buffs: [],
  debuffs: [],
  expDrop,
  goldDrop,
  lootTable: [],
  sprite: '',
  color: '#888'
});

// ============================================
// STAGE 1: DARK FOREST
// ============================================

const wolfLordBoss: Enemy = {
  id: 'wolf_lord',
  name: 'Wolf Lord',
  type: 'boss',
  isBoss: true,
  hp: 500,
  maxHp: 500,
  mp: 50,
  maxMp: 50,
  attack: 25,
  defense: 15,
  magicPower: 10,
  currentPhase: 0,
  phases: [
    {
      name: 'Phase 1',
      hpThreshold: 60,
      aiPattern: {
        attackFrequency: 70,
        skillFrequency: 30,
        defensiveThreshold: 30,
        targetPriority: 'player'
      }
    },
    {
      name: 'Summon Pack',
      hpThreshold: 30,
      aiPattern: {
        attackFrequency: 50,
        skillFrequency: 50,
        defensiveThreshold: 0,
        targetPriority: 'player'
      },
      specialMechanic: 'Summons 2 wolves, heals 10% HP/turn while they live'
    },
    {
      name: 'Berserk',
      hpThreshold: 0,
      aiPattern: {
        attackFrequency: 100,
        skillFrequency: 0,
        defensiveThreshold: 0,
        targetPriority: 'player'
      },
      specialMechanic: '2 attacks per turn, +30% damage, takes 2x fire damage'
    }
  ],
  aiPattern: {
    attackFrequency: 70,
    skillFrequency: 30,
    defensiveThreshold: 30,
    targetPriority: 'player'
  },
  element: 'physical',
  weaknesses: ['fire'],
  resistances: ['physical'],
  buffs: [],
  debuffs: [],
  expDrop: 100,
  goldDrop: 50,
  lootTable: [
    { itemId: 'wolf_fang', dropChance: 100, quantity: 1, rarity: 'common' },
    { itemId: 'wolf_pelt', dropChance: 50, quantity: 1, rarity: 'rare' }
  ],
  sprite: '🐺',
  color: '#8B4513'
};

export const STAGE_1: Stage = {
  id: 1,
  name: 'Dark Forest',
  biome: 'forest',
  description: 'The forest whispers… but the Wolf Lord roars louder!',
  waves: [
    {
      enemies: [
        createEnemy('forest_slime_1', 'Forest Slime', 'swarm', 80, 8, 'earth', 10, 5),
        createEnemy('forest_slime_2', 'Forest Slime', 'swarm', 80, 8, 'earth', 10, 5)
      ],
      count: 2
    },
    {
      enemies: [
        createEnemy('wild_boar_1', 'Wild Boar', 'tank', 150, 12, 'physical', 20, 10),
        createEnemy('wild_boar_2', 'Wild Boar', 'tank', 150, 12, 'physical', 20, 10)
      ],
      count: 2
    }
  ],
  boss: wolfLordBoss,
  introDialogue: 'The forest is alive with danger. Steel yourself, hero.',
  victoryDialogue: 'The Wolf Lord falls! The forest grows quiet once more.',
  unlockStage: 0,
  baseExp: 50,
  baseGold: 30,
  crystalReward: 10,
  bgImage: '/images/bg-forest.jpg',
  bgColor: '#2d5016',
  particleEffect: 'leaves'
};

// ============================================
// STAGE 2: ANCIENT CAVE
// ============================================

const echoWraithBoss: Enemy = {
  id: 'echo_wraith',
  name: 'Echo Wraith',
  type: 'boss',
  isBoss: true,
  hp: 600,
  maxHp: 600,
  mp: 100,
  maxMp: 100,
  attack: 30,
  defense: 12,
  magicPower: 35,
  currentPhase: 0,
  phases: [
    {
      name: 'Phase 1',
      hpThreshold: 70,
      aiPattern: {
        attackFrequency: 50,
        skillFrequency: 50,
        defensiveThreshold: 30,
        targetPriority: 'player'
      }
    },
    {
      name: 'Echo Form',
      hpThreshold: 40,
      aiPattern: {
        attackFrequency: 30,
        skillFrequency: 70,
        defensiveThreshold: 0,
        targetPriority: 'player'
      },
      specialMechanic: 'Creates 2 echoes. Attacking wrong one = counterattack (80 damage)'
    },
    {
      name: 'Desperation',
      hpThreshold: 0,
      aiPattern: {
        attackFrequency: 0,
        skillFrequency: 100,
        defensiveThreshold: 0,
        targetPriority: 'player'
      },
      specialMechanic: 'Casts powerful spells every turn, MP drain on player'
    }
  ],
  aiPattern: {
    attackFrequency: 50,
    skillFrequency: 50,
    defensiveThreshold: 30,
    targetPriority: 'player'
  },
  element: 'physical',
  weaknesses: ['lightning'],
  resistances: ['physical', 'fire'],
  buffs: [],
  debuffs: [],
  expDrop: 150,
  goldDrop: 75,
  lootTable: [
    { itemId: 'spectral_essence', dropChance: 100, quantity: 1, rarity: 'rare' },
    { itemId: 'echo_crystal', dropChance: 30, quantity: 1, rarity: 'epic' }
  ],
  sprite: '👻',
  color: '#9370DB'
};

export const STAGE_2: Stage = {
  id: 2,
  name: 'Ancient Cave',
  biome: 'cave',
  description: 'Echoes of the past haunt these halls.',
  waves: [
    {
      enemies: [
        createEnemy('cave_spider_1', 'Cave Spider', 'swarm', 100, 10, 'physical', 15, 8),
        createEnemy('cave_spider_2', 'Cave Spider', 'swarm', 100, 10, 'physical', 15, 8),
        createEnemy('cave_spider_3', 'Cave Spider', 'swarm', 100, 10, 'physical', 15, 8)
      ],
      count: 3
    },
    {
      enemies: [
        createEnemy('crystal_golem_1', 'Crystal Golem', 'tank', 250, 15, 'earth', 30, 15)
      ],
      count: 1
    }
  ],
  boss: echoWraithBoss,
  introDialogue: 'The cave echoes with lost souls. Tread carefully.',
  victoryDialogue: 'The wraith\'s cries fade into silence.',
  unlockStage: 1,
  baseExp: 75,
  baseGold: 50,
  crystalReward: 12,
  bgImage: '/images/bg-cave.jpg',
  bgColor: '#2c3e50',
  particleEffect: 'crystals'
};

// ============================================
// STAGE 3-10: ABBREVIATED (full version would be similar)
// ============================================

export const STAGE_3: Stage = {
  id: 3,
  name: 'Desert Wastes',
  biome: 'desert',
  description: 'Heat and death—both sting the same.',
  waves: [
    {
      enemies: [
        createEnemy('sand_worm_1', 'Sand Worm', 'elite', 200, 18, 'earth', 25, 12),
        createEnemy('cactus_beast_1', 'Cactus Beast', 'tank', 180, 14, 'earth', 20, 10)
      ],
      count: 2
    }
  ],
  boss: {
    ...wolfLordBoss,
    id: 'scorpion_king',
    name: 'Scorpion King',
    hp: 800,
    maxHp: 800,
    attack: 35,
    sprite: '🦂',
    color: '#DAA520'
  },
  introDialogue: 'The scorching sands hide deadly predators.',
  victoryDialogue: 'The Scorpion King\'s poison flows into the sand.',
  unlockStage: 2,
  baseExp: 100,
  baseGold: 70,
  crystalReward: 15,
  bgImage: '/images/bg-desert.jpg',
  bgColor: '#EDC9AF',
  particleEffect: 'sand'
};

// More stages... (abbreviated for space, pattern continues)

export const STAGES: Stage[] = [
  STAGE_1,
  STAGE_2,
  STAGE_3
  // Add STAGE_4 through STAGE_10 following same pattern
];

export const getStage = (stageId: number): Stage | undefined => {
  return STAGES.find(s => s.id === stageId);
};

export const getAllStages = (): Stage[] => {
  return STAGES;
};
