import { Skill } from '@/types';

// ============================================
// SKILL DEFINITIONS
// ============================================

export const SKILLS: Record<string, Skill> = {
  // ============================================
  // UNIVERSAL SKILLS
  // ============================================
  basic_attack: {
    id: 'basic_attack',
    name: 'Attack',
    description: 'Basic attack dealing normal damage',
    icon: '⚔️',
    apCost: 25,
    damageMultiplier: 1.0,
    element: 'physical',
    targetType: 'single',
    hitCount: 1,
    cooldown: 0,
    currentCooldown: 0,
    comboable: true
  },

  guard: {
    id: 'guard',
    name: 'Guard',
    description: 'Block 50% damage next turn, restore 20 MP',
    icon: '🛡️',
    apCost: 30,
    targetType: 'self',
    hitCount: 0,
    cooldown: 0,
    currentCooldown: 0,
    comboable: false,
    buffEffect: {
      id: 'guarding',
      name: 'Guarding',
      type: 'buff',
      icon: '🛡️',
      defenseMod: 0.5,
      duration: 1
    }
  },

  // ============================================
  // WARRIOR SKILLS
  // ============================================
  shield_bash: {
    id: 'shield_bash',
    name: 'Shield Bash',
    description: 'Stun enemy for 1 turn',
    icon: '🛡️',
    apCost: 40,
    damageMultiplier: 1.2,
    element: 'physical',
    targetType: 'single',
    hitCount: 1,
    cooldown: 2,
    currentCooldown: 0,
    requiredClass: 'warrior',
    comboable: true,
    debuffEffect: {
      id: 'stunned',
      name: 'Stunned',
      type: 'debuff',
      icon: '💫',
      stunned: true,
      duration: 1
    }
  },

  berserker_strike: {
    id: 'berserker_strike',
    name: 'Berserker Strike',
    description: 'Damage scales with missing HP (up to 4x)',
    icon: '⚔️',
    apCost: 60,
    damageMultiplier: 2.5, // Base, scales up to 4x
    element: 'physical',
    targetType: 'single',
    hitCount: 1,
    cooldown: 3,
    currentCooldown: 0,
    requiredClass: 'warrior',
    comboable: true
  },

  wrath: {
    id: 'wrath',
    name: 'Wrath',
    description: 'Unleash rage for 5x AoE damage (requires 100 rage)',
    icon: '💢',
    apCost: 100,
    classResourceCost: 100,
    damageMultiplier: 5.0,
    element: 'physical',
    targetType: 'all',
    hitCount: 1,
    cooldown: 0,
    currentCooldown: 0,
    requiredClass: 'warrior',
    comboable: false
  },

  last_stand: {
    id: 'last_stand',
    name: 'Last Stand',
    description: 'Survive lethal hit with 1 HP, gain 5 turns invulnerability',
    icon: '💪',
    apCost: 100,
    targetType: 'self',
    hitCount: 0,
    cooldown: 10,
    currentCooldown: 0,
    requiredClass: 'warrior',
    requiredLevel: 5,
    comboable: false,
    buffEffect: {
      id: 'last_stand',
      name: 'Last Stand',
      type: 'buff',
      icon: '💪',
      invulnerable: true,
      duration: 5
    }
  },

  // ============================================
  // MAGE SKILLS
  // ============================================
  fireball: {
    id: 'fireball',
    name: 'Fireball',
    description: '3x fire damage',
    icon: '🔥',
    apCost: 60,
    mpCost: 20,
    classResourceCost: 1, // 1 spell slot
    damageMultiplier: 3.0,
    element: 'fire',
    targetType: 'single',
    hitCount: 1,
    cooldown: 0,
    currentCooldown: 0,
    requiredClass: 'mage',
    comboable: true
  },

  ice_lance: {
    id: 'ice_lance',
    name: 'Ice Lance',
    description: '2x damage + slow enemy (lose 30 AP next turn)',
    icon: '❄️',
    apCost: 40,
    mpCost: 15,
    classResourceCost: 1,
    damageMultiplier: 2.0,
    element: 'ice',
    targetType: 'single',
    hitCount: 1,
    cooldown: 0,
    currentCooldown: 0,
    requiredClass: 'mage',
    comboable: true,
    debuffEffect: {
      id: 'slowed',
      name: 'Slowed',
      type: 'debuff',
      icon: '❄️',
      speedMod: -0.3,
      duration: 1
    }
  },

  meteor_strike: {
    id: 'meteor_strike',
    name: 'Meteor Strike',
    description: '6x AoE damage, uses all spell slots',
    icon: '☄️',
    apCost: 100,
    mpCost: 40,
    classResourceCost: 3, // All spell slots
    damageMultiplier: 6.0,
    element: 'fire',
    targetType: 'all',
    hitCount: 1,
    cooldown: 0,
    currentCooldown: 0,
    requiredClass: 'mage',
    requiredLevel: 10,
    comboable: false
  },

  // ============================================
  // ROGUE SKILLS
  // ============================================
  backstab: {
    id: 'backstab',
    name: 'Backstab',
    description: '2x damage + gain 1 combo point',
    icon: '🗡️',
    apCost: 30,
    damageMultiplier: 2.0,
    element: 'physical',
    targetType: 'single',
    hitCount: 1,
    cooldown: 0,
    currentCooldown: 0,
    requiredClass: 'rogue',
    comboable: true
  },

  poison_blade: {
    id: 'poison_blade',
    name: 'Poison Blade',
    description: '1.5x damage + poison (20 DMG/turn for 5 turns)',
    icon: '☠️',
    apCost: 50,
    damageMultiplier: 1.5,
    element: 'physical',
    targetType: 'single',
    hitCount: 1,
    cooldown: 2,
    currentCooldown: 0,
    requiredClass: 'rogue',
    comboable: true,
    debuffEffect: {
      id: 'poisoned',
      name: 'Poisoned',
      type: 'debuff',
      icon: '☠️',
      damagePerTurn: 20,
      duration: 5
    }
  },

  execute: {
    id: 'execute',
    name: 'Execute',
    description: 'Instant kill if enemy HP < 30% (costs 5 combo points)',
    icon: '💀',
    apCost: 50,
    classResourceCost: 5,
    damageMultiplier: 10.0, // Massive damage for <30% HP execute
    element: 'physical',
    targetType: 'single',
    hitCount: 1,
    cooldown: 0,
    currentCooldown: 0,
    requiredClass: 'rogue',
    requiredLevel: 10,
    executeThreshold: 30,
    comboable: false
  },

  shadow_strike: {
    id: 'shadow_strike',
    name: 'Shadow Strike',
    description: 'Teleport and strike for 3x damage (costs 5 combo points)',
    icon: '🌑',
    apCost: 50,
    classResourceCost: 5,
    damageMultiplier: 3.5,
    element: 'physical',
    targetType: 'single',
    hitCount: 1,
    cooldown: 0,
    currentCooldown: 0,
    requiredClass: 'rogue',
    requiredLevel: 5,
    comboable: false
  },

  // ============================================
  // PALADIN SKILLS
  // ============================================
  holy_strike: {
    id: 'holy_strike',
    name: 'Holy Strike',
    description: '2x damage + heal 10% HP',
    icon: '✨',
    apCost: 50,
    damageMultiplier: 2.0,
    element: 'physical',
    targetType: 'single',
    hitCount: 1,
    cooldown: 1,
    currentCooldown: 0,
    requiredClass: 'paladin',
    comboable: true
  },

  divine_shield: {
    id: 'divine_shield',
    name: 'Divine Shield',
    description: 'Immune to damage for 1 turn (costs 30 light)',
    icon: '🛡️',
    apCost: 30,
    classResourceCost: 30,
    targetType: 'self',
    hitCount: 0,
    cooldown: 5,
    currentCooldown: 0,
    requiredClass: 'paladin',
    comboable: false,
    buffEffect: {
      id: 'divine_shield',
      name: 'Divine Shield',
      type: 'buff',
      icon: '🛡️',
      invulnerable: true,
      duration: 1
    }
  },

  judgment: {
    id: 'judgment',
    name: 'Judgment',
    description: '5x damage + heal 30% HP (costs 100 light)',
    icon: '⚡',
    apCost: 100,
    classResourceCost: 100,
    damageMultiplier: 5.0,
    element: 'physical',
    targetType: 'single',
    hitCount: 1,
    cooldown: 0,
    currentCooldown: 0,
    requiredClass: 'paladin',
    requiredLevel: 10,
    comboable: false
  },

  // ============================================
  // RANGER SKILLS
  // ============================================
  rapid_fire: {
    id: 'rapid_fire',
    name: 'Rapid Fire',
    description: 'Hit 3 times for 0.8x damage each (total 2.4x)',
    icon: '🏹',
    apCost: 40,
    damageMultiplier: 0.8,
    element: 'physical',
    targetType: 'single',
    hitCount: 3,
    cooldown: 0,
    currentCooldown: 0,
    requiredClass: 'ranger',
    comboable: true
  },

  aimed_shot: {
    id: 'aimed_shot',
    name: 'Aimed Shot',
    description: '4x damage, always crits (costs 1 focus)',
    icon: '🎯',
    apCost: 60,
    classResourceCost: 1,
    damageMultiplier: 4.0,
    element: 'physical',
    targetType: 'single',
    hitCount: 1,
    cooldown: 0,
    currentCooldown: 0,
    requiredClass: 'ranger',
    comboable: true
  },

  arrow_storm: {
    id: 'arrow_storm',
    name: 'Arrow Storm',
    description: 'Hit all enemies for 3x damage (costs 3 focus)',
    icon: '🌪️',
    apCost: 100,
    classResourceCost: 3,
    damageMultiplier: 3.0,
    element: 'physical',
    targetType: 'all',
    hitCount: 1,
    cooldown: 0,
    currentCooldown: 0,
    requiredClass: 'ranger',
    requiredLevel: 10,
    comboable: false
  },

  focus: {
    id: 'focus',
    name: 'Focus',
    description: 'Skip turn to gain 1 focus stack',
    icon: '🎯',
    apCost: 0,
    targetType: 'self',
    hitCount: 0,
    cooldown: 0,
    currentCooldown: 0,
    requiredClass: 'ranger',
    comboable: false
  }
};

// Helper functions
export const getSkill = (skillId: string): Skill => {
  return SKILLS[skillId];
};

export const getSkillsByClass = (classType: string): Skill[] => {
  return Object.values(SKILLS).filter(
    skill => !skill.requiredClass || skill.requiredClass === classType
  );
};

export const getStartingSkills = (classType: string): Skill[] => {
  const classData = require('./classes').getClass(classType);
  return classData.startingSkills.map((id: string) => SKILLS[id]);
};
