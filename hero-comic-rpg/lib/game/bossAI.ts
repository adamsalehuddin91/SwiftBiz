import { Enemy, BattleState } from '@/types';

// ============================================
// BOSS AI & PHASE SYSTEM
// ============================================

export class BossAI {
  // Check if boss should change phase
  static shouldChangePhase(boss: Enemy): boolean {
    if (!boss.isBoss || !boss.phases) return false;

    const currentPhase = boss.currentPhase || 0;
    const nextPhase = boss.phases[currentPhase + 1];

    if (!nextPhase) return false;

    const hpPercent = (boss.hp / boss.maxHp) * 100;
    return hpPercent <= nextPhase.hpThreshold;
  }

  // Trigger phase change
  static changePhase(boss: Enemy): { boss: Enemy; message: string } {
    const currentPhase = (boss.currentPhase || 0) + 1;
    const phase = boss.phases?.[currentPhase];

    if (!phase) return { boss, message: '' };

    // Update boss with new phase
    const updatedBoss = {
      ...boss,
      currentPhase,
      aiPattern: phase.aiPattern
    };

    const message = `⚠️ ${boss.name} enters ${phase.name}! ${phase.specialMechanic || ''}`;

    return { boss: updatedBoss, message };
  }

  // Execute boss attack with phase-based behavior
  static executeBossAttack(battle: BattleState): {
    damage: number;
    message: string;
    specialEffect?: string;
  } {
    const boss = battle.enemies[0];
    if (!boss || !boss.isBoss) {
      return { damage: 0, message: '' };
    }

    const currentPhase = boss.currentPhase || 0;
    const phase = boss.phases?.[currentPhase];

    // Base damage with phase multiplier
    let baseDamage = boss.attack * (Math.random() * 0.5 + 0.75);

    // Phase-specific mechanics
    if (phase) {
      const hpPercent = (boss.hp / boss.maxHp) * 100;

      // Enraged state (low HP = more damage)
      if (hpPercent < 30) {
        baseDamage *= 1.5;
      }

      // Multi-attack in later phases
      if (currentPhase >= 2 && Math.random() < 0.3) {
        return {
          damage: Math.floor(baseDamage * 0.7),
          message: `${boss.name} unleashes a MULTI-STRIKE!`,
          specialEffect: 'multi_hit'
        };
      }

      // Power charge
      if (hpPercent < 50 && Math.random() < 0.2) {
        return {
          damage: Math.floor(baseDamage * 2),
          message: `${boss.name} charges a DEVASTATING ATTACK!`,
          specialEffect: 'power_charge'
        };
      }
    }

    return {
      damage: Math.floor(baseDamage),
      message: `${boss.name} attacks!`
    };
  }

  // Get boss phase display info
  static getBossPhaseInfo(boss: Enemy): {
    phaseName: string;
    phaseNumber: number;
    totalPhases: number;
    hpThreshold: number;
  } | null {
    if (!boss.isBoss || !boss.phases) return null;

    const currentPhase = boss.currentPhase || 0;
    const phase = boss.phases[currentPhase];

    return {
      phaseName: phase?.name || 'Phase 1',
      phaseNumber: currentPhase + 1,
      totalPhases: boss.phases.length,
      hpThreshold: phase?.hpThreshold || 100
    };
  }
}
