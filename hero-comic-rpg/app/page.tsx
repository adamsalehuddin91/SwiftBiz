'use client';

import { useGameStore } from '@/lib/store/gameStore';
import MainMenu from '@/components/MainMenu';
import ClassSelection from '@/components/ClassSelection';
import WorldMap from '@/components/WorldMap';
import BattleScreen from '@/components/battle/BattleScreen';
import VictoryScreen from '@/components/VictoryScreen';
import DefeatScreen from '@/components/DefeatScreen';

export default function Home() {
  const currentScreen = useGameStore(state => state.currentScreen);

  return (
    <div className="min-h-screen w-full">
      {currentScreen === 'menu' && <MainMenu />}
      {currentScreen === 'class_select' && <ClassSelection />}
      {currentScreen === 'world_map' && <WorldMap />}
      {currentScreen === 'battle' && <BattleScreen />}
      {currentScreen === 'victory' && <VictoryScreen />}
      {currentScreen === 'defeat' && <DefeatScreen />}
    </div>
  );
}
