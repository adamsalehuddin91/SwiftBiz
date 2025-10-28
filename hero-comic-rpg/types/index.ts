// ============================================
// HERO COMIC RPG - TYPE DEFINITIONS
// ============================================

export type ClassType = 'warrior' | 'mage' | 'rogue' | 'paladin' | 'ranger';
export type ElementType = 'fire' | 'ice' | 'lightning' | 'water' | 'earth' | 'physical';
export type StanceType = 'aggressive' | 'defensive' | 'balanced' | 'arcane';
export type RarityType = 'common' | 'rare' | 'epic' | 'legendary';

// ============================================
// PLAYER
// ============================================

export interface Player {
  id: string;
  name: string;
  class: ClassType;
  level: number;
  exp: number;
  expToNext: number;

  // Stats
  hp: number;
  maxHp: number;
  mp: number;
  maxMp: number;
  ap: number; // Action Points (100 per turn)
  maxAp: number;

  attack: number;
  defense: number;
  magicPower: number;

  // Combat State
  stance: StanceType;
  buffs: StatusEffect[];
  debuffs: StatusEffect[];

  // Class-Specific Resources
  classResource: number; // Rage/Combo Points/Focus/Light/Spell Slots
  maxClassResource: number;

  // Equipment
  weapon: Weapon | null;
  armor: Armor | null;

  // Inventory
  inventory: InventoryItem[];
  gold: number;

  // Progression
  currentStage: number;
  highestStageCleared: number;
  totalRuns: number;
  totalWins: number;
  crystals: number;
  totalCrystalsEarned: number;

  // Skills
  equippedSkills: Skill[];
  unlockedSkills: string[];

  // Meta Upgrades
  metaUpgrades: MetaUpgrade[];
}

// ============================================
// ENEMY
// ============================================

export interface Enemy {
  id: string;
  name: string;
  type: 'swarm' | 'tank' | 'caster' | 'support' | 'elite' | 'boss';
  isBoss: boolean;

  // Stats
  hp: number;
  maxHp: number;
  mp: number;
  maxMp: number;
  attack: number;
  defense: number;
  magicPower: number;

  // AI Behavior
  aiPattern: AIPattern;
  currentPhase?: number;
  phases?: BossPhase[];

  // Combat
  element: ElementType;
  weaknesses: ElementType[];
  resistances: ElementType[];

  buffs: StatusEffect[];
  debuffs: StatusEffect[];

  // Loot
  expDrop: number;
  goldDrop: number;
  lootTable: LootDrop[];

  // Visual
  sprite: string;
  color: string;
}

export interface BossPhase {
  name: string;
  hpThreshold: number; // % HP when phase activates
  aiPattern: AIPattern;
  newAttacks?: string[];
  specialMechanic?: string;
}

export interface AIPattern {
  attackFrequency: number; // 0-100%
  skillFrequency: number;
  defensiveThreshold: number; // HP % when becomes defensive
  targetPriority: 'lowest_hp' | 'highest_threat' | 'random' | 'player';
}

// ============================================
// SKILLS
// ============================================

export interface Skill {
  id: string;
  name: string;
  description: string;
  icon: string;

  // Costs
  apCost: number;
  mpCost?: number;
  classResourceCost?: number;

  // Effects
  damageMultiplier?: number;
  element?: ElementType;
  healAmount?: number;
  buffEffect?: StatusEffect;
  debuffEffect?: StatusEffect;

  // Targeting
  targetType: 'single' | 'all' | 'self';
  hitCount: number; // For multi-hit attacks

  // Cooldown
  cooldown: number;
  currentCooldown: number;

  // Requirements
  requiredClass?: ClassType;
  requiredLevel?: number;

  // Special
  comboable: boolean; // Can be part of combo chain
  executeThreshold?: number; // HP % for execute mechanics
}

// ============================================
// STATUS EFFECTS
// ============================================

export interface StatusEffect {
  id: string;
  name: string;
  type: 'buff' | 'debuff';
  icon: string;

  // Stats Modifiers
  attackMod?: number;
  defenseMod?: number;
  speedMod?: number;

  // Damage Over Time
  damagePerTurn?: number;
  healPerTurn?: number;

  // Duration
  duration: number; // Turns remaining
  isPermanent?: boolean;

  // Special Effects
  stunned?: boolean;
  silenced?: boolean;
  invulnerable?: boolean;
}

// ============================================
// ITEMS
// ============================================

export interface InventoryItem {
  itemId: string;
  quantity: number;
}

export interface Item {
  id: string;
  name: string;
  description: string;
  type: 'consumable' | 'material' | 'weapon' | 'armor';
  rarity: RarityType;
  icon: string;
  price: number;

  // Effects (for consumables)
  effect?: ItemEffect;

  // Equipment Stats (for weapons/armor)
  stats?: ItemStats;
}

export interface ItemEffect {
  type: 'heal_hp' | 'heal_mp' | 'buff' | 'cleanse' | 'revive' | 'damage_aoe' | 'escape' | 'full_restore' | 'extra_action';
  value?: number;
  stat?: 'attack' | 'defense' | 'speed';
  duration?: number;
}

export interface ItemStats {
  attack?: number;
  defense?: number;
  magicPower?: number;
  hpBonus?: number;
  mpBonus?: number;
  critChance?: number;
  element?: ElementType;
}

export interface Weapon extends InventoryItem {
  type: 'weapon';
  stats: ItemStats;
}

export interface Armor extends InventoryItem {
  type: 'armor';
  stats: ItemStats;
}

export interface LootDrop {
  itemId: string;
  dropChance: number; // 0-100%
  quantity: number;
  rarity: RarityType;
}

// ============================================
// STAGES
// ============================================

export interface Stage {
  id: number;
  name: string;
  biome: string;
  description: string;

  // Waves
  waves: Wave[];

  // Boss
  boss: Enemy;

  // Dialogue
  introDialogue: string;
  victoryDialogue: string;

  // Requirements
  unlockStage: number; // Previous stage required

  // Rewards
  baseExp: number;
  baseGold: number;
  crystalReward: number;

  // Visuals
  bgImage: string;
  bgColor: string;
  particleEffect?: string;
}

export interface Wave {
  enemies: Enemy[];
  count: number;
}

// ============================================
// CHARACTER CLASSES
// ============================================

export interface CharacterClass {
  id: ClassType;
  name: string;
  description: string;
  playstyle: string;
  icon: string;

  // Base Stats
  baseHp: number;
  baseMp: number;
  baseAttack: number;
  baseDefense: number;
  baseMagicPower: number;

  // Unique Mechanic
  uniqueMechanic: string;
  mechanicDescription: string;
  resourceName: string; // "Rage", "Combo Points", etc.
  maxResource: number;

  // Starting Skills
  startingSkills: string[];

  // Specializations (unlocked at level 10)
  specializations: Specialization[];
}

export interface Specialization {
  id: string;
  name: string;
  description: string;
  bonuses: string[];
  unlockedSkills: string[];
}

// ============================================
// META PROGRESSION
// ============================================

export interface MetaUpgrade {
  id: string;
  name: string;
  description: string;
  cost: number; // Crystals
  tier: number;
  unlocked: boolean;
  effect: MetaEffect;
}

export interface MetaEffect {
  type: 'stat_boost' | 'starting_bonus' | 'unlock_feature' | 'discount';
  value: number;
  target?: string;
}

// ============================================
// COMBAT
// ============================================

export interface BattleState {
  player: Player;
  enemies: Enemy[];
  currentWave: number;
  totalWaves: number;
  stage: Stage;

  // Turn Management
  turn: number;
  currentTurn: 'player' | 'enemy';
  selectedEnemy: Enemy | null;

  // Combat Log
  combatLog: CombatMessage[];

  // Combo System
  comboCount: number;
  comboMultiplier: number;
  lastAction: string | null;

  // Visual Effects
  damageNumbers: DamageNumber[];
  comicEffect: ComicEffect | null;
  screenShake: boolean;

  // Battle Status
  battleStatus: 'active' | 'victory' | 'defeat' | 'boss_transition';
}

export interface CombatMessage {
  id: string;
  message: string;
  type: 'attack' | 'skill' | 'damage' | 'heal' | 'buff' | 'debuff' | 'system';
  timestamp: number;
}

export interface DamageNumber {
  id: string;
  value: number;
  x: number;
  y: number;
  isCrit: boolean;
  element?: ElementType;
  timestamp: number;
}

export interface ComicEffect {
  text: string; // "POW!", "BOOM!", etc.
  x: number;
  y: number;
  color: string;
  size: number;
  timestamp: number;
}

// ============================================
// GAME STATE (Zustand Store)
// ============================================

export interface GameState {
  // Player State
  player: Player | null;

  // Battle State
  battle: BattleState | null;

  // Dialogue State
  dialogue: DialogueState | null;

  // UI State
  currentScreen: 'menu' | 'class_select' | 'world_map' | 'battle' | 'victory' | 'defeat' | 'shop' | 'meta_upgrades';
  isLoading: boolean;

  // Settings
  settings: {
    sfxVolume: number;
    bgmVolume: number;
    screenShake: boolean;
    damageNumbers: boolean;
    animationSpeed: number;
  };

  // Actions
  createPlayer: (name: string, classType: ClassType) => void;
  startBattle: (stageId: number) => void;
  executeAction: (action: CombatAction) => void;
  endTurn: () => void;
  equipSkill: (skillId: string) => void;
  buyMetaUpgrade: (upgradeId: string) => void;

  // Dialogue Actions
  showDialogue: (dialogues: DialogueLine[], onComplete: () => void) => void;
  closeDialogue: () => void;

  // Navigation
  navigateTo: (screen: GameState['currentScreen']) => void;
}

export interface CombatAction {
  type: 'attack' | 'skill' | 'item' | 'guard' | 'change_stance';
  skillId?: string;
  itemId?: string;
  targetId?: string;
  stance?: StanceType;
}

// ============================================
// RANDOM EVENTS
// ============================================

export interface RandomEvent {
  id: string;
  name: string;
  description: string;
  type: 'merchant' | 'shrine' | 'treasure' | 'stranger' | 'alchemist';
  icon: string;

  // Choices
  choices: EventChoice[];
}

export interface EventChoice {
  id: string;
  text: string;
  cost?: number; // Gold cost
  risk?: number; // 0-100% chance of negative outcome

  // Possible Outcomes
  outcomes: EventOutcome[];
}

export interface EventOutcome {
  probability: number; // 0-100%
  description: string;

  // Effects
  goldChange?: number;
  hpChange?: number;
  mpChange?: number;
  itemReward?: string;
  buff?: StatusEffect;
  debuff?: StatusEffect;
}

// ============================================
// CHALLENGES
// ============================================

export interface Challenge {
  id: string;
  name: string;
  description: string;
  type: 'daily' | 'weekly';

  // Requirements
  objective: string;
  targetValue: number;

  // Rewards
  crystalReward: number;
  itemRewards?: string[];

  // Status
  progress: number;
  completed: boolean;
  expiresAt: Date;
}

export interface ChallengeModifier {
  id: string;
  name: string;
  description: string;

  // Effects
  playerHpMod?: number;
  playerDamageMod?: number;
  enemyHpMod?: number;
  enemyDamageMod?: number;
  timeLimit?: number;
  specialRule?: string;

  // Rewards
  expBonus: number;
  goldBonus: number;
  dropRateBonus: number;
}

// ============================================
// LEADERBOARD
// ============================================

export interface LeaderboardEntry {
  rank: number;
  playerId: string;
  playerName: string;
  score: number;
  category: 'fastest_clear' | 'highest_combo' | 'hitless_boss' | 'challenge_score' | 'total_crystals';
  metadata: {
    classUsed?: ClassType;
    stageCleared?: number;
    modifiers?: string[];
    timestamp: Date;
  };
}

// ============================================
// DIALOGUE SYSTEM
// ============================================

export interface DialogueLine {
  speaker: 'hero' | 'boss' | 'narrator';
  text: string;
  portrait?: string;
  emotion?: 'neutral' | 'angry' | 'sad' | 'determined' | 'surprised';
}

export interface DialogueState {
  isActive: boolean;
  currentDialogues: DialogueLine[];
  onComplete: (() => void) | null;
}
