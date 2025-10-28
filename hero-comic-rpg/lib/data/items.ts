import { Item } from '@/types';

// ============================================
// CONSUMABLE ITEMS
// ============================================

export const ITEMS: Record<string, Item> = {
  // Healing Items
  health_potion_small: {
    id: 'health_potion_small',
    name: 'Small Health Potion',
    description: 'Restores 50 HP',
    type: 'consumable',
    icon: '🧪',
    effect: {
      type: 'heal_hp',
      value: 50
    },
    price: 20,
    rarity: 'common'
  },

  health_potion_medium: {
    id: 'health_potion_medium',
    name: 'Health Potion',
    description: 'Restores 100 HP',
    type: 'consumable',
    icon: '🧪',
    effect: {
      type: 'heal_hp',
      value: 100
    },
    price: 50,
    rarity: 'uncommon'
  },

  health_potion_large: {
    id: 'health_potion_large',
    name: 'Large Health Potion',
    description: 'Restores 200 HP',
    type: 'consumable',
    icon: '🧪',
    effect: {
      type: 'heal_hp',
      value: 200
    },
    price: 100,
    rarity: 'rare'
  },

  // Mana Items
  mana_potion_small: {
    id: 'mana_potion_small',
    name: 'Small Mana Potion',
    description: 'Restores 30 MP',
    type: 'consumable',
    icon: '🔮',
    effect: {
      type: 'heal_mp',
      value: 30
    },
    price: 20,
    rarity: 'common'
  },

  mana_potion_medium: {
    id: 'mana_potion_medium',
    name: 'Mana Potion',
    description: 'Restores 60 MP',
    type: 'consumable',
    icon: '🔮',
    effect: {
      type: 'heal_mp',
      value: 60
    },
    price: 50,
    rarity: 'uncommon'
  },

  // Stat Boosters
  strength_tonic: {
    id: 'strength_tonic',
    name: 'Strength Tonic',
    description: 'Increases Attack by 20% for 3 turns',
    type: 'consumable',
    icon: '💪',
    effect: {
      type: 'buff',
      stat: 'attack',
      value: 0.2,
      duration: 3
    },
    price: 80,
    rarity: 'uncommon'
  },

  defense_tonic: {
    id: 'defense_tonic',
    name: 'Defense Tonic',
    description: 'Increases Defense by 30% for 3 turns',
    type: 'consumable',
    icon: '🛡️',
    effect: {
      type: 'buff',
      stat: 'defense',
      value: 0.3,
      duration: 3
    },
    price: 80,
    rarity: 'uncommon'
  },

  speed_tonic: {
    id: 'speed_tonic',
    name: 'Speed Tonic',
    description: 'Take 2 actions this turn',
    type: 'consumable',
    icon: '⚡',
    effect: {
      type: 'extra_action'
    },
    price: 120,
    rarity: 'rare'
  },

  // Special Items
  phoenix_feather: {
    id: 'phoenix_feather',
    name: 'Phoenix Feather',
    description: 'Revives with 50% HP when defeated',
    type: 'consumable',
    icon: '🪶',
    effect: {
      type: 'revive',
      value: 0.5
    },
    price: 200,
    rarity: 'epic'
  },

  elixir: {
    id: 'elixir',
    name: 'Elixir',
    description: 'Fully restores HP and MP',
    type: 'consumable',
    icon: '✨',
    effect: {
      type: 'full_restore'
    },
    price: 150,
    rarity: 'rare'
  },

  antidote: {
    id: 'antidote',
    name: 'Antidote',
    description: 'Removes all debuffs',
    type: 'consumable',
    icon: '💊',
    effect: {
      type: 'cleanse'
    },
    price: 30,
    rarity: 'common'
  },

  smoke_bomb: {
    id: 'smoke_bomb',
    name: 'Smoke Bomb',
    description: 'Escape from battle instantly',
    type: 'consumable',
    icon: '💨',
    effect: {
      type: 'escape'
    },
    price: 50,
    rarity: 'uncommon'
  },

  bomb: {
    id: 'bomb',
    name: 'Bomb',
    description: 'Deals 150 damage to all enemies',
    type: 'consumable',
    icon: '💣',
    effect: {
      type: 'damage_aoe',
      value: 150
    },
    price: 100,
    rarity: 'uncommon'
  }
};

// Starter items for new players
export const STARTER_ITEMS = [
  { itemId: 'health_potion_small', quantity: 3 },
  { itemId: 'mana_potion_small', quantity: 2 }
];

// Get item by ID
export function getItem(itemId: string): Item | undefined {
  return ITEMS[itemId];
}

// Get items by rarity
export function getItemsByRarity(rarity: Item['rarity']): Item[] {
  return Object.values(ITEMS).filter(item => item.rarity === rarity);
}

// Get consumable items only
export function getConsumableItems(): Item[] {
  return Object.values(ITEMS).filter(item => item.type === 'consumable');
}
