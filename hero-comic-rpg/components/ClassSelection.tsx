'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useGameStore } from '@/lib/store/gameStore';
import { getAllClasses } from '@/lib/data/classes';
import { ClassType } from '@/types';

export default function ClassSelection() {
  const [selectedClass, setSelectedClass] = useState<ClassType | null>(null);
  const [heroName, setHeroName] = useState('HERO');
  const createPlayer = useGameStore(state => state.createPlayer);
  const navigateTo = useGameStore(state => state.navigateTo);

  const classes = getAllClasses();
  const selectedClassData = selectedClass ? classes.find(c => c.id === selectedClass) : null;

  const handleStart = () => {
    if (selectedClass) {
      createPlayer(heroName, selectedClass);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center retro-grid p-4"
         style={{ background: '#212529' }}>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-6xl w-full"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-5xl pixel-text mb-4" style={{ color: '#f7d51d', textShadow: '4px 4px 0px #000' }}>
            SELECT YOUR CLASS
          </h1>
        </div>

        {/* Class Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {classes.map((classData) => (
            <motion.div
              key={classData.id}
              className={`nes-container is-dark cursor-pointer ${selectedClass === classData.id ? 'is-centered' : ''}`}
              onClick={() => setSelectedClass(classData.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                borderColor: selectedClass === classData.id ? '#92cc41' : '#fff',
                borderWidth: selectedClass === classData.id ? '4px' : '4px'
              }}
            >
              {/* Class Icon */}
              <div className="text-center mb-2">
                <div className="text-5xl">{classData.icon}</div>
              </div>

              {/* Class Name */}
              <div className="text-center pixel-text text-xs" style={{ color: '#f7d51d' }}>
                {classData.name.toUpperCase()}
              </div>

              {/* Resource */}
              <div className="text-center text-xs mt-2" style={{ color: '#92cc41' }}>
                {classData.resourceName}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Selected Class Details */}
        {selectedClassData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="nes-container is-dark with-title mb-8"
          >
            <p className="title pixel-text text-sm" style={{ color: '#f7d51d' }}>
              {selectedClassData.name.toUpperCase()}
            </p>

            <div className="p-4">
              {/* Description */}
              <div className="mb-4 text-sm" style={{ color: '#fff' }}>
                {selectedClassData.description}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-4 pixel-text text-xs">
                <div>
                  <div style={{ color: '#e76e55' }}>HP</div>
                  <div>{selectedClassData.baseHp}</div>
                </div>
                <div>
                  <div style={{ color: '#209cee' }}>MP</div>
                  <div>{selectedClassData.baseMp}</div>
                </div>
                <div>
                  <div style={{ color: '#f7d51d' }}>ATK</div>
                  <div>{selectedClassData.baseAttack}</div>
                </div>
                <div>
                  <div style={{ color: '#92cc41' }}>DEF</div>
                  <div>{selectedClassData.baseDefense}</div>
                </div>
                <div>
                  <div style={{ color: '#a855f7' }}>MAG</div>
                  <div>{selectedClassData.baseMagicPower}</div>
                </div>
              </div>

              {/* Unique Mechanic */}
              <div className="nes-container is-rounded is-dark p-2 text-xs">
                <div style={{ color: '#92cc41' }} className="mb-1">
                  ⚡ {selectedClassData.uniqueMechanic}
                </div>
                <div style={{ color: '#ccc' }}>
                  {selectedClassData.mechanicDescription}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Name Input & Start Button */}
        <div className="nes-container is-dark mb-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Name Input */}
            <div className="flex-1 w-full">
              <label className="pixel-text text-xs mb-2 block" style={{ color: '#92cc41' }}>
                HERO NAME:
              </label>
              <input
                type="text"
                className="nes-input is-dark pixel-text text-xs"
                value={heroName}
                onChange={(e) => setHeroName(e.target.value.toUpperCase().slice(0, 12))}
                maxLength={12}
                placeholder="ENTER NAME"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                className="nes-btn pixel-text text-xs"
                onClick={() => navigateTo('menu')}
              >
                ◀ BACK
              </button>

              <button
                className={`nes-btn is-success pixel-text text-xs ${!selectedClass ? 'is-disabled' : ''}`}
                onClick={handleStart}
                disabled={!selectedClass}
              >
                START ▶
              </button>
            </div>
          </div>
        </div>

        {/* Hint */}
        <div className="text-center pixel-text text-xs" style={{ color: '#666' }}>
          SELECT A CLASS TO BEGIN YOUR ADVENTURE
        </div>
      </motion.div>
    </div>
  );
}
