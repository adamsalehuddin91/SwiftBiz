// Dialogue types for the game store
export interface DialogueState {
  isActive: boolean;
  currentStageId: number | null;
  currentPhase: 'intro' | 'phase1' | 'phase2' | 'phase3' | 'victory' | null;
  hasShownIntro: boolean;
  shownPhases: Set<string>;
}
