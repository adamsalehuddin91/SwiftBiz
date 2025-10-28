import { Player, Enemy, Skill, BattleState, DamageNumber, ComicEffect } from '@/types';

// ============================================
// COMBAT ENGINE
// ============================================

export class CombatEngine {
  // Calculate damage
  static calculateDamage(
    attacker: Player | Enemy,
    defender: Player | Enemy,
    skill?: Skill
  ): { damage: number; isCrit: boolean } {
    const baseAttack = 'class' in attacker ? attacker.attack : attacker.attack;
    const baseDefense = 'class' in defender ? defender.defense : defender.defense;

    let damage = baseAttack - (baseDefense * 0.5);

    // Apply skill multiplier
    if (skill?.damageMultiplier) {
      damage *= skill.damageMultiplier;
    }

    // Random variance (90-110%)
    damage *= (0.9 + Math.random() * 0.2);

    // Critical hit (20% chance, 1.5x damage)
    const isCrit = Math.random() < 0.2;
    if (isCrit) {
      damage *= 1.5;
    }

    return { damage: Math.floor(Math.max(1, damage)), isCrit };
  }

  // Execute player attack
  static playerAttack(
    battle: BattleState,
    targetEnemy: Enemy,
    skill: Skill
  ): BattleState {
    const player = battle.player;

    console.log('⚔️ COMBAT ENGINE - Target enemy:', targetEnemy.name, targetEnemy.id, 'HP:', targetEnemy.hp);

    // Check AP cost
    if (player.ap < skill.apCost) {
      console.log('❌ Not enough AP');
      return battle; // Not enough AP
    }

    // Check MP cost
    if (skill.mpCost && player.mp < skill.mpCost) {
      console.log('❌ Not enough MP');
      return battle; // Not enough MP
    }

    // Calculate damage
    const { damage, isCrit } = this.calculateDamage(player, targetEnemy, skill);
    console.log('💥 Calculated damage:', damage, isCrit ? 'CRIT!' : '');

    // Apply damage
    const newEnemyHp = Math.max(0, targetEnemy.hp - damage);
    console.log('🩸 New enemy HP:', newEnemyHp, 'was:', targetEnemy.hp);

    // Update enemy
    const updatedEnemies = battle.enemies.map(e => {
      if (e.id === targetEnemy.id) {
        console.log('✅ MATCHED enemy ID, updating HP from', e.hp, 'to', newEnemyHp);
        return { ...e, hp: newEnemyHp };
      }
      console.log('⏭️ SKIPPED enemy:', e.id, 'looking for:', targetEnemy.id);
      return e;
    });

    console.log('📊 Updated enemies:', updatedEnemies.map(e => `${e.name}:${e.hp}HP`));

    // Remove dead enemies
    const aliveEnemies = updatedEnemies.filter(e => e.hp > 0);
    console.log('💀 Alive enemies after filter:', aliveEnemies.map(e => `${e.name}:${e.hp}HP`));

    // Update player resources
    const newPlayerAp = player.ap - skill.apCost;
    const newPlayerMp = player.mp - (skill.mpCost || 0);

    // Combo system
    const isComboable = skill.comboable;
    const newComboCount = isComboable ? battle.comboCount + 1 : 0;
    const comboMultiplier = 1 + (newComboCount * 0.1); // +10% per combo

    // Create damage number
    const damageNumber: DamageNumber = {
      id: `dmg_${Date.now()}`,
      value: damage,
      x: 50,
      y: 50,
      isCrit,
      element: skill.element,
      timestamp: Date.now()
    };

    // Create comic effect
    const comicEffect: ComicEffect | null = isCrit ? {
      text: 'POW!',
      x: 50,
      y: 40,
      color: '#f7d51d',
      size: 48,
      timestamp: Date.now()
    } : null;

    // Combat log
    const logMessage = {
      id: `log_${Date.now()}`,
      message: `${player.name} uses ${skill.name}! ${damage} damage!${isCrit ? ' CRITICAL HIT!' : ''}`,
      type: 'attack' as const,
      timestamp: Date.now()
    };

    return {
      ...battle,
      player: {
        ...player,
        ap: newPlayerAp,
        mp: newPlayerMp
      },
      enemies: aliveEnemies,
      comboCount: newComboCount,
      comboMultiplier,
      lastAction: skill.id,
      damageNumbers: [...battle.damageNumbers, damageNumber],
      comicEffect,
      combatLog: [...battle.combatLog, logMessage],
      screenShake: isCrit,
      battleStatus: aliveEnemies.length === 0 ? 'victory' : 'active'
    };
  }

  // Check and update boss phase
  static checkBossPhase(enemy: Enemy): Enemy {
    if (!enemy.isBoss || !enemy.phases || enemy.currentPhase === undefined) {
      return enemy;
    }

    const hpPercent = (enemy.hp / enemy.maxHp) * 100;
    const currentPhaseIndex = enemy.currentPhase;
    const nextPhaseIndex = currentPhaseIndex + 1;

    // Check if should transition to next phase
    if (nextPhaseIndex < enemy.phases.length) {
      const nextPhase = enemy.phases[nextPhaseIndex];
      if (hpPercent <= nextPhase.hpThreshold) {
        return {
          ...enemy,
          currentPhase: nextPhaseIndex,
          aiPattern: nextPhase.aiPattern
        };
      }
    }

    return enemy;
  }

  // Execute enemy attack
  static enemyAttack(battle: BattleState, enemy: Enemy): BattleState {
    const player = battle.player;

    // Check for boss phase transition
    const updatedEnemy = this.checkBossPhase(enemy);
    const phaseChanged = updatedEnemy.currentPhase !== enemy.currentPhase;

    // Calculate damage
    const { damage, isCrit } = this.calculateDamage(updatedEnemy, player);

    // Apply damage
    const newPlayerHp = Math.max(0, player.hp - damage);

    // Combat log messages
    const logMessages = [];

    // Phase transition message
    if (phaseChanged && updatedEnemy.phases && updatedEnemy.currentPhase !== undefined) {
      const newPhase = updatedEnemy.phases[updatedEnemy.currentPhase];
      logMessages.push({
        id: `log_${Date.now()}_phase`,
        message: `⚠️ ${updatedEnemy.name} enters ${newPhase.name}! ${newPhase.specialMechanic || ''}`,
        type: 'system' as const,
        timestamp: Date.now()
      });
    }

    // Attack message
    logMessages.push({
      id: `log_${Date.now()}`,
      message: `${updatedEnemy.name} attacks! ${damage} damage!${isCrit ? ' CRITICAL!' : ''}`,
      type: 'damage' as const,
      timestamp: Date.now()
    });

    // Damage number
    const damageNumber: DamageNumber = {
      id: `dmg_${Date.now()}`,
      value: damage,
      x: 30,
      y: 50,
      isCrit,
      timestamp: Date.now()
    };

    // Update enemies array with phase-updated enemy
    const updatedEnemies = battle.enemies.map(e =>
      e.id === enemy.id ? updatedEnemy : e
    );

    return {
      ...battle,
      player: {
        ...player,
        hp: newPlayerHp
      },
      enemies: updatedEnemies,
      damageNumbers: [...battle.damageNumbers, damageNumber],
      combatLog: [...battle.combatLog, ...logMessages],
      screenShake: isCrit || phaseChanged,
      battleStatus: newPlayerHp <= 0 ? 'defeat' : 'active'
    };
  }

  // Guard action
  static playerGuard(battle: BattleState): BattleState {
    const player = battle.player;

    // Restore MP
    const newMp = Math.min(player.maxMp, player.mp + 20);

    // Add guard buff
    const guardBuff = {
      id: 'guard',
      name: 'Guarding',
      type: 'buff' as const,
      icon: '🛡️',
      defenseMod: 0.5, // Block 50% damage
      duration: 1
    };

    const logMessage = {
      id: `log_${Date.now()}`,
      message: `${player.name} takes a defensive stance! (+20 MP)`,
      type: 'system' as const,
      timestamp: Date.now()
    };

    return {
      ...battle,
      player: {
        ...player,
        ap: player.ap - 30, // Guard costs 30 AP
        mp: newMp,
        buffs: [...player.buffs, guardBuff]
      },
      combatLog: [...battle.combatLog, logMessage]
    };
  }

  // Clean up old visual effects
  static cleanupEffects(battle: BattleState): BattleState {
    const now = Date.now();
    const damageNumbers = battle.damageNumbers.filter(d => now - d.timestamp < 1000);
    const comicEffect = battle.comicEffect && now - battle.comicEffect.timestamp < 500 ? battle.comicEffect : null;

    return {
      ...battle,
      damageNumbers,
      comicEffect,
      screenShake: false
    };
  }

  // Advance to next wave or boss
  static nextWave(battle: BattleState): BattleState {
    const nextWaveIndex = battle.currentWave + 1;

    // Check if boss wave
    if (nextWaveIndex >= battle.stage.waves.length) {
      // Boss wave (DEEP COPY to avoid mutating original stage data)
      const bossCopy = {
        ...battle.stage.boss,
        buffs: [...battle.stage.boss.buffs],
        debuffs: [...battle.stage.boss.debuffs],
        lootTable: [...battle.stage.boss.lootTable],
        phases: battle.stage.boss.phases ? [...battle.stage.boss.phases] : undefined
      };

      return {
        ...battle,
        enemies: [bossCopy],
        currentWave: nextWaveIndex,
        battleStatus: 'boss_transition',
        combatLog: [
          ...battle.combatLog,
          {
            id: `log_${Date.now()}`,
            message: `⚠️ BOSS APPROACHING: ${battle.stage.boss.name}!`,
            type: 'system',
            timestamp: Date.now()
          }
        ]
      };
    }

    // Next wave (DEEP COPY to avoid mutating original stage data)
    const nextWave = battle.stage.waves[nextWaveIndex];
    const enemiesCopy = nextWave.enemies.map(enemy => ({
      ...enemy,
      buffs: [...enemy.buffs],
      debuffs: [...enemy.debuffs],
      lootTable: [...enemy.lootTable]
    }));

    return {
      ...battle,
      enemies: enemiesCopy,
      currentWave: nextWaveIndex,
      combatLog: [
        ...battle.combatLog,
        {
          id: `log_${Date.now()}`,
          message: `Wave ${nextWaveIndex + 1} incoming!`,
          type: 'system',
          timestamp: Date.now()
        }
      ]
    };
  }
}
