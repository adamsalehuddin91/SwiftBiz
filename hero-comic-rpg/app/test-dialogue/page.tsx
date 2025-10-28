'use client';

import { useState } from 'react';
import DialogueBox from '@/components/DialogueBox';
import { STAGE_1_DIALOGUE, STAGE_2_DIALOGUE, STAGE_3_DIALOGUE, STAGE_4_DIALOGUE, STAGE_5_DIALOGUE } from '@/lib/data/dialogues';

export default function TestDialoguePage() {
  const [activeDialogue, setActiveDialogue] = useState<'none' | 'stage1-intro' | 'stage1-victory' | 'stage2-intro' | 'stage3-intro' | 'stage4-intro' | 'stage5-intro' | 'stage5-phase2' | 'stage5-victory'>('none');

  const getDialogues = () => {
    switch (activeDialogue) {
      case 'stage1-intro': return STAGE_1_DIALOGUE.intro;
      case 'stage1-victory': return STAGE_1_DIALOGUE.victory;
      case 'stage2-intro': return STAGE_2_DIALOGUE.intro;
      case 'stage3-intro': return STAGE_3_DIALOGUE.intro;
      case 'stage4-intro': return STAGE_4_DIALOGUE.intro;
      case 'stage5-intro': return STAGE_5_DIALOGUE.intro;
      case 'stage5-phase2': return STAGE_5_DIALOGUE.phase2 || [];
      case 'stage5-victory': return STAGE_5_DIALOGUE.victory;
      default: return [];
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-yellow-500 mb-8 pixel-text text-center">
          🎭 Dialogue System Test
        </h1>

        <div className="bg-gray-800 p-6 rounded-lg mb-8">
          <h2 className="text-2xl text-white mb-4 pixel-text">Story Overview</h2>
          <div className="text-gray-300 space-y-2 text-sm">
            <p>📖 <strong>The Epic Journey:</strong> 5 corrupted guardians, each with unique backstory</p>
            <p>🐺 <strong>Stage 1:</strong> Wolf Lord - Corrupted forest protector</p>
            <p>👻 <strong>Stage 2:</strong> Echo Wraith - Betrayed scholar</p>
            <p>🦂 <strong>Stage 3:</strong> Scorpion King - Pride exploited</p>
            <p>🧊 <strong>Stage 4:</strong> Frost Titan - Reveals BIG TWIST about Flame Lord</p>
            <p>🔥 <strong>Stage 5:</strong> Flame Lord (Prince Ignis) - The Emperor's Brother! (Emotional finale)</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {/* Stage 1 */}
          <button
            onClick={() => setActiveDialogue('stage1-intro')}
            className="bg-green-600 hover:bg-green-700 text-white p-4 rounded pixel-borders pixel-text text-sm transition-all hover:scale-105"
          >
            🐺 Stage 1<br/>Intro
          </button>
          <button
            onClick={() => setActiveDialogue('stage1-victory')}
            className="bg-green-600 hover:bg-green-700 text-white p-4 rounded pixel-borders pixel-text text-sm transition-all hover:scale-105"
          >
            🐺 Stage 1<br/>Victory
          </button>

          {/* Stage 2 */}
          <button
            onClick={() => setActiveDialogue('stage2-intro')}
            className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded pixel-borders pixel-text text-sm transition-all hover:scale-105"
          >
            👻 Stage 2<br/>Intro
          </button>

          {/* Stage 3 */}
          <button
            onClick={() => setActiveDialogue('stage3-intro')}
            className="bg-yellow-600 hover:bg-yellow-700 text-white p-4 rounded pixel-borders pixel-text text-sm transition-all hover:scale-105"
          >
            🦂 Stage 3<br/>Intro
          </button>

          {/* Stage 4 */}
          <button
            onClick={() => setActiveDialogue('stage4-intro')}
            className="bg-cyan-600 hover:bg-cyan-700 text-white p-4 rounded pixel-borders pixel-text text-sm transition-all hover:scale-105"
          >
            🧊 Stage 4<br/>Intro (TWIST!)
          </button>

          {/* Stage 5 */}
          <button
            onClick={() => setActiveDialogue('stage5-intro')}
            className="bg-red-600 hover:bg-red-700 text-white p-4 rounded pixel-borders pixel-text text-sm transition-all hover:scale-105"
          >
            🔥 Stage 5<br/>Intro
          </button>
          <button
            onClick={() => setActiveDialogue('stage5-phase2')}
            className="bg-red-600 hover:bg-red-700 text-white p-4 rounded pixel-borders pixel-text text-sm transition-all hover:scale-105"
          >
            🔥 Stage 5<br/>Revelation
          </button>
          <button
            onClick={() => setActiveDialogue('stage5-victory')}
            className="bg-red-600 hover:bg-red-700 text-white p-4 rounded pixel-borders pixel-text text-sm transition-all hover:scale-105"
          >
            🔥 Stage 5<br/>Victory (FINALE)
          </button>
        </div>

        <div className="mt-8 bg-yellow-900/20 border-2 border-yellow-600 p-4 rounded">
          <h3 className="text-yellow-500 font-bold mb-2 pixel-text text-sm">🎯 Testing Instructions:</h3>
          <ul className="text-yellow-200 text-xs space-y-1">
            <li>✅ Click any button to see dialogue sequence</li>
            <li>✅ Watch typewriter effect (30ms per character)</li>
            <li>✅ Click "Next" to advance or skip typing</li>
            <li>✅ Try "Skip All" to close instantly</li>
            <li>✅ Notice speaker colors (Hero=green, Boss=red, Narrator=gold)</li>
            <li>✅ Check portrait emotions and animations</li>
            <li>🔥 <strong>Must see: Stage 5 Phase 2 & Victory for epic finale!</strong></li>
          </ul>
        </div>

        <div className="mt-4 text-center">
          <a
            href="/"
            className="inline-block bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded pixel-borders pixel-text text-sm transition-all hover:scale-105"
          >
            ← Back to Game
          </a>
        </div>
      </div>

      {/* Dialogue System */}
      {activeDialogue !== 'none' && (
        <DialogueBox
          dialogues={getDialogues()}
          onComplete={() => setActiveDialogue('none')}
        />
      )}
    </div>
  );
}
