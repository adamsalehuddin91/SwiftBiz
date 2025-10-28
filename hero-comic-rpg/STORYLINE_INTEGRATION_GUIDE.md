# 🎭 Storyline Integration Guide - Hero Comic RPG

**Created**: 28 October 2025
**Status**: ✅ Complete - Ready for Integration

---

## 📋 What's Been Built

### ✅ 1. Rich Narrative System (dialogues.ts)
- **Epic 5-stage story arc**
- **Connected narrative** - Each stage builds on the last
- **Character development** - Hero learns the truth about the Dark Emperor
- **Boss personalities** - Each guardian has unique motivation and backstory
- **Emotional payoff** - Stage 5 reveals the Flame Lord is the Emperor's brother

### ✅ 2. DialogueBox Component
- **Typewriter effect** - Character-by-character text animation
- **Portrait system** - Emoji sprites with emotional states
- **Speaker colors** - Hero (green), Boss (red), Narrator (gold)
- **Progress indicator** - Shows current dialogue number
- **Skip functionality** - Skip single line or entire sequence
- **Auto-advance option** - For cinematic sequences

### ✅ 3. CSS Animations
- **Slide-up entrance** - Dialogue box animates from bottom
- **Blink cursor** - Classic typewriter cursor effect
- **Pixel borders** - 8-bit retro styling
- **Emotion filters** - Visual effects based on character emotion

---

## 🎯 How to Integrate (3 Steps)

### Step 1: Add Dialogue State to Game Store

**File**: `lib/store/gameStore.ts`

Add to state interface:
```typescript
import { DialogueLine, getDialogueByStageId } from '../data/dialogues';

// Add to GameState interface
dialogue: {
  isActive: boolean;
  currentDialogues: DialogueLine[];
  onComplete: (() => void) | null;
} | null;
```

Add actions:
```typescript
showDialogue: (dialogues: DialogueLine[], onComplete: () => void) => {
  set({ dialogue: { isActive: true, currentDialogues: dialogues, onComplete } });
},

closeDialogue: () => {
  const dialogue = get().dialogue;
  if (dialogue?.onComplete) dialogue.onComplete();
  set({ dialogue: null });
},
```

### Step 2: Add Dialogue Triggers in Battle

**File**: `components/battle/BattleScreen.tsx`

Import at top:
```typescript
import DialogueBox from '@/components/DialogueBox';
import { getDialogueByStageId } from '@/lib/data/dialogues';
```

Add state:
```typescript
const dialogue = useGameStore(state => state.dialogue);
const showDialogue = useGameStore(state => state.showDialogue);
const closeDialogue = useGameStore(state => state.closeDialogue);
```

Add dialogue triggers:
```typescript
// Show intro dialogue when battle starts
useEffect(() => {
  if (battle && !hasShownIntro) {
    const stageDialogue = getDialogueByStageId(battle.stage.id);
    if (stageDialogue) {
      showDialogue(stageDialogue.intro, () => {
        // Continue to battle
      });
      setHasShownIntro(true);
    }
  }
}, [battle]);

// Show boss phase dialogues based on HP
useEffect(() => {
  if (!currentEnemy || !currentEnemy.isBoss) return;

  const hpPercent = (currentEnemy.hp / currentEnemy.maxHp) * 100;
  const stageDialogue = getDialogueByStageId(battle.stage.id);

  if (hpPercent <= 70 && hpPercent > 40 && !shownPhases.has('phase1')) {
    if (stageDialogue?.phase1) {
      showDialogue(stageDialogue.phase1, () => {});
      setShownPhases(new Set([...shownPhases, 'phase1']));
    }
  }

  if (hpPercent <= 40 && !shownPhases.has('phase2')) {
    if (stageDialogue?.phase2) {
      showDialogue(stageDialogue.phase2, () => {});
      setShownPhases(new Set([...shownPhases, 'phase2']));
    }
  }
}, [currentEnemy?.hp]);
```

Add DialogueBox to render:
```typescript
return (
  <div>
    {/* Existing battle UI */}

    {/* Dialogue System */}
    {dialogue?.isActive && (
      <DialogueBox
        dialogues={dialogue.currentDialogues}
        onComplete={closeDialogue}
      />
    )}
  </div>
);
```

### Step 3: Add Victory Dialogue

**File**: `components/VictoryScreen.tsx`

Show victory dialogue before victory screen:
```typescript
useEffect(() => {
  const stageDialogue = getDialogueByStageId(stageId);
  if (stageDialogue) {
    showDialogue(stageDialogue.victory, () => {
      // Show victory screen
    });
  }
}, []);
```

---

## 🎮 How It Works In-Game

### Stage Flow:

1. **Player selects stage from World Map**
2. **Intro Dialogue plays** (2-6 lines)
   - Sets up the story
   - Introduces the boss
   - Hero's motivation
3. **Battle begins** after dialogue complete
4. **Phase 1 Dialogue** (70% boss HP)
   - Boss shows personality
   - Story hints dropped
5. **Phase 2 Dialogue** (40% boss HP)
   - Major revelation
   - Boss backstory revealed
6. **Boss defeated**
7. **Victory Dialogue** (3-5 lines)
   - Boss redemption
   - Story progression
   - Hints for next stage

---

## 📖 The Complete Story Arc

### Stage 1: Dark Forest
**Theme**: The Beginning
**Boss**: Wolf Lord (corrupted guardian)
**Revelation**: Emperor has corrupted 4 more guardians
**Emotion**: Determination

### Stage 2: Ancient Cave
**Theme**: Lost Soul
**Boss**: Echo Wraith (wise scholar betrayed)
**Revelation**: Emperor promised knowledge but gave eternal regret
**Emotion**: Sorrow

### Stage 3: Desert Wastes
**Theme**: Fallen King
**Boss**: Scorpion King (pride exploited)
**Revelation**: Power corrupted him, made him hunt his own people
**Emotion**: Pride → Regret

### Stage 4: Frozen Peaks
**Theme**: Ancient Guardian
**Boss**: Frost Titan (magically bound)
**Revelation**: **THE FLAME LORD IS THE EMPEROR'S BROTHER!**
**Emotion**: Tragic Duty

### Stage 5: Volcanic Core (FINALE)
**Theme**: Redemption
**Boss**: Flame Lord / Prince Ignis
**Full Story**:
- Ignis and his brother were close
- Brother found the Shadow Crown artifact
- Crown corrupted brother instantly → Dark Emperor
- Ignis tried to stop him → imprisoned in volcano
- Forced to guard the evil he fought against
- Begs hero to destroy Shadow Crown and save his brother
- Dies asking hero to tell brother "I forgive him... I love him"

**Emotional Payoff**: The villain was a victim too. The true enemy is the Shadow Crown.

---

## 🎭 Dialogue Features

### Typewriter Effect
- 30ms per character
- Smooth, readable pace
- Can skip to full text instantly

### Speaker System
- **Hero** 🦸: Green color, determined/surprised emotions
- **Boss** 🐺🔥: Red color, angry/sad emotions
- **Narrator** ✨: Gold color, neutral emotion

### Emotion States
- `neutral`: Normal appearance
- `angry`: Red hue shift, saturated
- `sad`: Grayscale, dimmed
- `determined`: Bright, high contrast
- `surprised`: Color shift, brightness boost

### Portrait Sprites
- Hero: 🦸
- Wolf Lord: 🐺
- Echo Wraith: 👻
- Scorpion King: 🦂
- Frost Titan: 🧊
- Flame Lord: 🔥

---

## 🎨 Visual Style

### Dialogue Box
- **Background**: Dark gradient (gray-900 to black)
- **Border**: 4px yellow (#FFD700)
- **Shadow**: Heavy drop shadow
- **Animation**: Slides up from bottom (0.4s)

### Text
- **Font**: Press Start 2P (8-bit pixel font)
- **Size**: 18px for text, 24px for speaker name
- **Shadow**: 2px drop shadow for readability

### Buttons
- **Next**: Yellow button, pulsing animation
- **Skip All**: Red button
- **Pixel borders**: Inset shadows for 3D effect

---

## 💡 Usage Examples

### Example 1: Show Intro Dialogue
```typescript
const stageDialogue = getDialogueByStageId(1);
showDialogue(stageDialogue.intro, () => {
  console.log('Intro complete, start battle');
});
```

### Example 2: Boss Phase Trigger
```typescript
if (bossHP < 70% && !shownPhase1) {
  const stageDialogue = getDialogueByStageId(currentStageId);
  if (stageDialogue.phase1) {
    showDialogue(stageDialogue.phase1, () => {
      // Resume battle
    });
  }
}
```

### Example 3: Victory Dialogue
```typescript
if (battleWon) {
  const stageDialogue = getDialogueByStageId(currentStageId);
  showDialogue(stageDialogue.victory, () => {
    // Show victory screen
    navigateToVictoryScreen();
  });
}
```

---

## 🧪 Testing Checklist

- [ ] Stage 1 intro dialogue shows before battle
- [ ] Wolf Lord speaks at 70% HP (phase 1)
- [ ] Wolf Lord final words at victory
- [ ] Stage 2-4 dialogues trigger correctly
- [ ] Stage 5 full emotional arc plays out
- [ ] Typewriter effect works smoothly
- [ ] Skip button skips typing animation
- [ ] Skip All closes dialogue immediately
- [ ] Speaker colors display correctly
- [ ] Boss portraits show correct emotions
- [ ] Dialogue box animates smoothly
- [ ] Can progress through all 5 stages with full story

---

## 🎯 Quick Integration (Copy-Paste Ready)

### gameStore.ts - Add This
```typescript
// Add to imports
import { DialogueLine } from '../data/dialogues';

// Add to state
dialogue: {
  isActive: boolean;
  currentDialogues: DialogueLine[];
  onComplete: (() => void) | null;
} | null;

// Add to actions
showDialogue: (dialogues: DialogueLine[], onComplete: () => void) => {
  set({ dialogue: { isActive: true, currentDialogues: dialogues, onComplete } });
  soundManager.play('select'); // Optional sound effect
},

closeDialogue: () => {
  const dialogue = get().dialogue;
  if (dialogue?.onComplete) dialogue.onComplete();
  set({ dialogue: null });
},
```

### BattleScreen.tsx - Add This
```typescript
// Add imports
import DialogueBox from '@/components/DialogueBox';
import { getDialogueByStageId } from '@/lib/data/dialogues';

// Add state
const [hasShownIntro, setHasShownIntro] = useState(false);
const [shownPhases, setShownPhases] = useState<Set<string>>(new Set());
const dialogue = useGameStore(state => state.dialogue);
const showDialogue = useGameStore(state => state.showDialogue);
const closeDialogue = useGameStore(state => state.closeDialogue);

// Add before return
useEffect(() => {
  if (battle && !hasShownIntro) {
    const stageDialogue = getDialogueByStageId(battle.stage.id);
    if (stageDialogue?.intro) {
      showDialogue(stageDialogue.intro, () => {});
      setHasShownIntro(true);
    }
  }
}, [battle, hasShownIntro]);

// Add to JSX before closing div
{dialogue?.isActive && (
  <DialogueBox
    dialogues={dialogue.currentDialogues}
    onComplete={closeDialogue}
  />
)}
```

---

## 🚀 Future Enhancements

### Easy Additions:
- [ ] Sound effects for dialogue (text beep, confirm sound)
- [ ] Character portraits (PNG images instead of emojis)
- [ ] Dialogue choices (branching paths)
- [ ] Voice acting (Web Speech API)
- [ ] Dialogue history/log

### Advanced Features:
- [ ] Cutscenes between stages
- [ ] Animated character sprites
- [ ] Multiple camera angles
- [ ] Dialogue shake effects
- [ ] Character relationships system

---

## 📚 Files Created

1. **lib/data/dialogues.ts** (23KB) - All 5 stage stories
2. **components/DialogueBox.tsx** (4KB) - Dialogue UI component
3. **app/globals.css** (updated) - Dialogue animations
4. **types/dialogue.ts** (200B) - TypeScript types
5. **STORYLINE_INTEGRATION_GUIDE.md** (this file) - Complete guide

---

## ✅ Benefits

### Player Experience:
- 🎭 **Engaging story** - Not just random battles
- 💔 **Emotional connection** - Boss redemption arcs
- 🤯 **Plot twists** - Stage 4 revelation, Stage 5 climax
- 🎮 **Replay value** - Want to experience story again

### Game Quality:
- ⭐ **Professional polish** - AAA-style presentation
- 📖 **World-building** - Rich lore and backstory
- 🎬 **Cinematic feel** - Dialogue sequences break up combat
- 🏆 **Memorable moments** - Flame Lord's final words

---

**Ready to integrate! Just follow the 3 steps above and you'll have a complete storyline system!** 🎉

*Built with Tokwi v4.0 - Vibe Coding Powerhouse* 💜
