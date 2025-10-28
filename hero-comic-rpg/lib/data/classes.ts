import { CharacterClass } from '@/types';

// ============================================
// CHARACTER CLASS DEFINITIONS
// ============================================

export const CLASSES: Record<string, CharacterClass> = {
  warrior: {
    id: 'warrior',
    name: 'Warrior',
    description: 'The Unkillable Tank - High HP, sustain through damage',
    playstyle: 'Gain rage when taking damage, unleash devastating attacks',
    icon: '⚔️',

    // Base Stats
    baseHp: 150,
    baseMp: 30,
    baseAttack: 15,
    baseDefense: 12,
    baseMagicPower: 3,

    // Unique Mechanic
    uniqueMechanic: 'Rage Bar',
    mechanicDescription: 'Gain rage when taking damage (10 per hit). At 100 rage, unleash Wrath for massive AoE damage. Passive: 20% lifesteal on all attacks.',
    resourceName: 'Rage',
    maxResource: 100,

    // Starting Skills
    startingSkills: ['basic_attack', 'shield_bash', 'berserker_strike'],

    // Specializations (unlocked at level 10)
    specializations: [
      {
        id: 'juggernaut',
        name: 'Juggernaut',
        description: 'Become an unstoppable force',
        bonuses: ['+50% Max HP', 'Immune to stun and knockback', '+10% damage reduction'],
        unlockedSkills: ['earthquake', 'titans_grip']
      },
      {
        id: 'bladestorm',
        name: 'Bladestorm',
        description: 'Master of AoE combat',
        bonuses: ['Attacks hit all enemies for 70% damage', '+30% attack speed', 'Crits restore 5 rage'],
        unlockedSkills: ['whirlwind', 'cleaving_strike']
      }
    ]
  },

  mage: {
    id: 'mage',
    name: 'Mage',
    description: 'The Glass Cannon - High burst damage, low HP',
    playstyle: 'Cast powerful spells from spell slots, devastate with magic',
    icon: '🔮',

    // Base Stats
    baseHp: 80,
    baseMp: 100,
    baseAttack: 5,
    baseDefense: 5,
    baseMagicPower: 20,

    // Unique Mechanic
    uniqueMechanic: 'Spell Slots',
    mechanicDescription: '3 spell slots per battle. Cast powerful spells, then cooldown (3 turns to refill). Passive: Crits trigger free spell slot.',
    resourceName: 'Spell Slots',
    maxResource: 3,

    // Starting Skills
    startingSkills: ['basic_attack', 'fireball', 'ice_lance'],

    // Specializations
    specializations: [
      {
        id: 'pyromancer',
        name: 'Pyromancer',
        description: 'Master of fire magic',
        bonuses: ['Fire spells burn enemies (10 DMG/turn for 3 turns)', '+50% fire damage', 'Burn spreads to nearby enemies'],
        unlockedSkills: ['meteor_strike', 'flame_wall']
      },
      {
        id: 'archmage',
        name: 'Archmage',
        description: 'Ultimate magical power',
        bonuses: ['+1 spell slot (total 4)', 'MP regen 10/turn', '+20% all spell damage'],
        unlockedSkills: ['arcane_barrage', 'time_warp']
      }
    ]
  },

  rogue: {
    id: 'rogue',
    name: 'Rogue',
    description: 'The Combo Assassin - High crit, combo-focused',
    playstyle: 'Build combo points with light attacks, spend on devastating finishers',
    icon: '🗡️',

    // Base Stats
    baseHp: 100,
    baseMp: 50,
    baseAttack: 12,
    baseDefense: 8,
    baseMagicPower: 5,

    // Unique Mechanic
    uniqueMechanic: 'Combo Points',
    mechanicDescription: 'Light attacks grant 1 combo point (max 5). Spend 5 points on Finisher moves. Passive: 30% crit chance (50% from behind).',
    resourceName: 'Combo Points',
    maxResource: 5,

    // Starting Skills
    startingSkills: ['basic_attack', 'backstab', 'poison_blade'],

    // Specializations
    specializations: [
      {
        id: 'assassin',
        name: 'Assassin',
        description: 'Master of instant death',
        bonuses: ['Finishers refund 50 AP', '+20% crit damage', 'Execute kills instantly at <20% HP'],
        unlockedSkills: ['execute', 'shadow_strike']
      },
      {
        id: 'duelist',
        name: 'Duelist',
        description: 'Master of parrying and counters',
        bonuses: ['Parry: Reflect 50% damage when attacked', '+15% dodge chance', 'Counter attacks grant combo points'],
        unlockedSkills: ['riposte', 'blade_dance']
      }
    ]
  },

  paladin: {
    id: 'paladin',
    name: 'Paladin',
    description: 'The Holy Tank - Support tank, heal + damage hybrid',
    playstyle: 'Attacks generate light energy, spend on heals or damage boosts',
    icon: '🛡️',

    // Base Stats
    baseHp: 130,
    baseMp: 60,
    baseAttack: 10,
    baseDefense: 15,
    baseMagicPower: 10,

    // Unique Mechanic
    uniqueMechanic: 'Holy Light',
    mechanicDescription: 'Attacks generate light energy (10 per hit). Spend light on heals or damage boosts. Passive: Heal 5% HP when killing an enemy.',
    resourceName: 'Light',
    maxResource: 100,

    // Starting Skills
    startingSkills: ['basic_attack', 'holy_strike', 'divine_shield'],

    // Specializations
    specializations: [
      {
        id: 'crusader',
        name: 'Crusader',
        description: 'Holy warrior of justice',
        bonuses: ['Attacks heal nearby allies (multiplayer prep)', '+25% damage to undead/demons', 'Light energy generates 50% faster'],
        unlockedSkills: ['judgment', 'consecration']
      },
      {
        id: 'templar',
        name: 'Templar',
        description: 'Indestructible guardian',
        bonuses: ['Convert 50% damage taken into light energy', '+20% defense', 'Can spend light to revive with 50% HP'],
        unlockedSkills: ['aegis', 'sanctuary']
      }
    ]
  },

  ranger: {
    id: 'ranger',
    name: 'Ranger',
    description: 'The Precision Striker - Multi-hit, positioning-based',
    playstyle: 'Skip turn to gain focus, then unleash devastating precise strikes',
    icon: '🏹',

    // Base Stats
    baseHp: 110,
    baseMp: 40,
    baseAttack: 13,
    baseDefense: 9,
    baseMagicPower: 7,

    // Unique Mechanic
    uniqueMechanic: 'Focus Stacks',
    mechanicDescription: 'Skip turn to gain 1 focus (max 3). Next attack: +100% damage per focus stack. Passive: +20% damage to enemies above 70% HP.',
    resourceName: 'Focus',
    maxResource: 3,

    // Starting Skills
    startingSkills: ['basic_attack', 'rapid_fire', 'aimed_shot'],

    // Specializations
    specializations: [
      {
        id: 'sniper',
        name: 'Sniper',
        description: 'Master of one-shot kills',
        bonuses: ['Focus gained 2x faster (max 5 stacks)', '+30% crit damage', 'First shot always crits'],
        unlockedSkills: ['headshot', 'piercing_arrow']
      },
      {
        id: 'beastmaster',
        name: 'Beastmaster',
        description: 'Fight alongside animal companions',
        bonuses: ['Summon wolf companion (30% damage dealer)', 'Pet attacks don\'t cost AP', 'Pet can tank damage'],
        unlockedSkills: ['call_of_the_wild', 'pack_tactics']
      }
    ]
  }
};

// Helper function to get class by ID
export const getClass = (classId: string): CharacterClass => {
  return CLASSES[classId];
};

// Get all classes as array
export const getAllClasses = (): CharacterClass[] => {
  return Object.values(CLASSES);
};
