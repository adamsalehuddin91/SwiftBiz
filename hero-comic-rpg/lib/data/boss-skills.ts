import { Skill } from '@/types';

// ============================================
// BOSS SPECIAL SKILLS
// ============================================

export const BOSS_SKILLS: Record<string, Skill[]> = {
  // Stage 1: Wolf Lord
  wolf_lord: [
    {
      id: 'howl',
      name: 'Howling Rage',
      description: 'Intimidating howl that increases attack power',
      apCost: 40,
      mpCost: 20,
      damageMultiplier: 1.3,
      element: 'physical',
      animation: 'slash',
      icon: '🐺',
      comboable: false,
      aoeTarget: false
    },
    {
      id: 'pack_summon',
      name: 'Summon Wolf Pack',
      description: 'Calls reinforcements from the forest',
      apCost: 50,
      mpCost: 30,
      damageMultiplier: 0.8,
      element: 'physical',
      animation: 'summon',
      icon: '🐺',
      comboable: false,
      aoeTarget: false
    },
    {
      id: 'berserk_fury',
      name: 'Berserk Fury',
      description: 'Wild rapid attacks with increased damage',
      apCost: 60,
      mpCost: 10,
      damageMultiplier: 2.0,
      element: 'physical',
      animation: 'slash',
      icon: '💢',
      comboable: false,
      aoeTarget: false
    }
  ],

  // Stage 10: Dark Emperor
  dark_emperor: [
    {
      id: 'throne_blast',
      name: 'Imperial Throne Blast',
      description: 'Devastating magic from the throne of darkness',
      apCost: 50,
      mpCost: 40,
      damageMultiplier: 1.5,
      element: 'dark',
      animation: 'magic',
      icon: '👑',
      comboable: false,
      aoeTarget: true
    },
    {
      id: 'chaos_field',
      name: 'Chaos Field',
      description: 'Creates a field that drains magic power',
      apCost: 40,
      mpCost: 50,
      damageMultiplier: 1.2,
      element: 'dark',
      animation: 'magic',
      icon: '🌀',
      comboable: false,
      aoeTarget: false
    },
    {
      id: 'winged_strike',
      name: 'Celestial Wing Strike',
      description: 'Swift aerial assault from winged form',
      apCost: 60,
      mpCost: 30,
      damageMultiplier: 1.8,
      element: 'holy',
      animation: 'slash',
      icon: '🪽',
      comboable: false,
      aoeTarget: false
    },
    {
      id: 'enraged_barrage',
      name: 'Enraged Barrage',
      description: 'Relentless fury in final form',
      apCost: 80,
      mpCost: 0,
      damageMultiplier: 2.5,
      element: 'dark',
      animation: 'slash',
      icon: '💥',
      comboable: false,
      aoeTarget: true
    }
  ],

  // Add skills for other bosses
  echo_wraith: [
    {
      id: 'spectral_wail',
      name: 'Spectral Wail',
      description: 'Soul-piercing scream',
      apCost: 45,
      mpCost: 35,
      damageMultiplier: 1.4,
      element: 'dark',
      animation: 'magic',
      icon: '👻',
      comboable: false,
      aoeTarget: true
    }
  ],

  scorpion_king: [
    {
      id: 'poison_sting',
      name: 'Venom Strike',
      description: 'Poisonous stinger attack',
      apCost: 50,
      mpCost: 20,
      damageMultiplier: 1.6,
      element: 'physical',
      animation: 'slash',
      icon: '🦂',
      comboable: false,
      aoeTarget: false
    }
  ],

  frost_titan: [
    {
      id: 'blizzard',
      name: 'Eternal Blizzard',
      description: 'Freezing storm',
      apCost: 55,
      mpCost: 40,
      damageMultiplier: 1.5,
      element: 'ice',
      animation: 'magic',
      icon: '❄️',
      comboable: false,
      aoeTarget: true
    }
  ],

  flame_lord: [
    {
      id: 'inferno',
      name: 'Infernal Blast',
      description: 'Volcanic eruption',
      apCost: 60,
      mpCost: 50,
      damageMultiplier: 1.7,
      element: 'fire',
      animation: 'magic',
      icon: '🔥',
      comboable: false,
      aoeTarget: true
    }
  ],

  leviathan: [
    {
      id: 'tidal_wave',
      name: 'Crushing Tidal Wave',
      description: 'Massive water attack',
      apCost: 65,
      mpCost: 45,
      damageMultiplier: 1.6,
      element: 'water',
      animation: 'magic',
      icon: '🌊',
      comboable: false,
      aoeTarget: true
    }
  ],

  reaper_knight: [
    {
      id: 'death_scythe',
      name: 'Reaper\'s Scythe',
      description: 'Deathly blade swing',
      apCost: 70,
      mpCost: 40,
      damageMultiplier: 1.8,
      element: 'dark',
      animation: 'slash',
      icon: '💀',
      comboable: false,
      aoeTarget: false
    }
  ],

  mecha_overlord: [
    {
      id: 'laser_cannon',
      name: 'Photon Laser Cannon',
      description: 'High-tech destruction',
      apCost: 75,
      mpCost: 35,
      damageMultiplier: 1.9,
      element: 'lightning',
      animation: 'magic',
      icon: '⚡',
      comboable: false,
      aoeTarget: true
    }
  ],

  vampire_lord: [
    {
      id: 'blood_drain',
      name: 'Vampiric Drain',
      description: 'Life-stealing attack',
      apCost: 60,
      mpCost: 50,
      damageMultiplier: 1.5,
      element: 'dark',
      animation: 'magic',
      icon: '🩸',
      comboable: false,
      aoeTarget: false
    }
  ]
};

export const getBossSkills = (bossId: string): Skill[] => {
  return BOSS_SKILLS[bossId] || [];
};
