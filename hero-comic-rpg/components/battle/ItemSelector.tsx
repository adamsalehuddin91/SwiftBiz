'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Item, InventoryItem } from '@/types';
import { getItem } from '@/lib/data/items';

interface ItemSelectorProps {
  inventory: InventoryItem[];
  onSelectItem: (itemId: string) => void;
  onClose: () => void;
}

export default function ItemSelector({ inventory, onSelectItem, onClose }: ItemSelectorProps) {
  // Get full item details
  const itemsWithDetails = inventory
    .map(inv => {
      const item = getItem(inv.itemId);
      return item ? { ...item, quantity: inv.quantity } : null;
    })
    .filter((item): item is Item & { quantity: number } => item !== null);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return '#9ca3af';
      case 'uncommon': return '#10b981';
      case 'rare': return '#3b82f6';
      case 'epic': return '#a855f7';
      case 'legendary': return '#f59e0b';
      default: return '#fff';
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
        <p className="title pixel-text text-xs" style={{ color: '#92cc41' }}>SELECT ITEM</p>

        <div className="p-4 max-h-96 overflow-y-auto">
          {itemsWithDetails.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {itemsWithDetails.map((item) => (
                <motion.button
                  key={item.id}
                  className="nes-container is-dark text-left p-3 hover:bg-gray-800"
                  onClick={() => onSelectItem(item.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Item Header */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{item.icon}</span>
                      <div>
                        <div
                          className="pixel-text text-xs font-bold"
                          style={{ color: getRarityColor(item.rarity) }}
                        >
                          {item.name}
                        </div>
                        <div className="pixel-text text-xs text-gray-400">
                          x{item.quantity}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="pixel-text text-xs mb-2" style={{ color: '#999', fontSize: '8px' }}>
                    {item.description}
                  </div>

                  {/* Effect */}
                  {item.effect && (
                    <div className="pixel-text text-xs" style={{ color: '#92cc41' }}>
                      {item.effect.type === 'heal_hp' && `Heals ${item.effect.value} HP`}
                      {item.effect.type === 'heal_mp' && `Restores ${item.effect.value} MP`}
                      {item.effect.type === 'buff' && `Boosts ${item.effect.stat} for ${item.effect.duration} turns`}
                      {item.effect.type === 'full_restore' && 'Fully restores HP & MP'}
                      {item.effect.type === 'cleanse' && 'Removes all debuffs'}
                      {item.effect.type === 'revive' && 'Revive on defeat'}
                      {item.effect.type === 'damage_aoe' && `${item.effect.value} damage to all`}
                      {item.effect.type === 'extra_action' && '2 actions this turn'}
                    </div>
                  )}

                  {/* Rarity Badge */}
                  <div className="mt-2">
                    <span
                      className="pixel-text text-xs px-2 py-1 rounded"
                      style={{
                        background: getRarityColor(item.rarity) + '20',
                        color: getRarityColor(item.rarity),
                        border: `1px solid ${getRarityColor(item.rarity)}`
                      }}
                    >
                      {item.rarity.toUpperCase()}
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 pixel-text text-xs" style={{ color: '#666' }}>
              No items in inventory
            </div>
          )}
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
