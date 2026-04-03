// PetEngine.ts
// Developer: Marcus Daley
// Date: 2026-04-03
// Purpose: Game engine for the Tamagotchi pet system. Manages pet state, action gating,
//          learning integration, stat decay, mood calculation, and level progression.
//          All state changes emit events through the EventBus.

import { EventBus } from './EventBus';
import { EventType } from '@/types/events';
import {
  PetState,
  PetMood,
  PetAction,
  LearningResult,
  DEFAULT_PET_STATE,
  XP_PER_LEVEL,
  ACTION_GATES,
} from '@/types/pet';
import { PetRepository } from '@/repositories/PetRepository';

export class PetEngine {
  private state: PetState;
  private repository: PetRepository;
  private decayInterval: ReturnType<typeof setInterval> | null = null;

  constructor(repository: PetRepository) {
    this.repository = repository;
    this.state = this.repository.load() ?? { ...DEFAULT_PET_STATE };
  }

  initialize(): void {
    this.startDecay();
    EventBus.emit(EventType.SYSTEM_INITIALIZED, { state: this.getState() }, 'PetEngine');
  }

  destroy(): void {
    if (this.decayInterval) {
      clearInterval(this.decayInterval);
      this.decayInterval = null;
    }
  }

  getState(): Readonly<PetState> {
    return { ...this.state };
  }

  canPerformAction(action: PetAction): { allowed: boolean; reason?: string } {
    const gate = ACTION_GATES.find((g) => g.action === action);
    if (!gate) return { allowed: false, reason: 'Unknown action' };

    if (this.state.level < gate.minimumLevel) {
      return { allowed: false, reason: `Requires level ${gate.minimumLevel}` };
    }

    if (gate.requiresLearning) {
      return { allowed: false, reason: 'Answer a question first' };
    }

    return { allowed: true };
  }

  performAction(action: PetAction, learningResult?: LearningResult): void {
    if (learningResult) {
      this.applyLearningResult(learningResult);
    }

    switch (action) {
      case PetAction.FEED:
        this.updateState({ hunger: Math.min(100, this.state.hunger + 25) });
        EventBus.emit(EventType.PET_FED, { state: this.getState() }, 'PetEngine');
        break;

      case PetAction.PLAY:
        this.updateState({
          happiness: Math.min(100, this.state.happiness + 20),
          energy: Math.max(0, this.state.energy - 15),
        });
        EventBus.emit(EventType.PET_PLAYED, { state: this.getState() }, 'PetEngine');
        break;

      case PetAction.TRAIN:
        this.updateState({
          intelligence: Math.min(100, this.state.intelligence + 10),
          energy: Math.max(0, this.state.energy - 20),
        });
        EventBus.emit(EventType.PET_TRAINED, { state: this.getState() }, 'PetEngine');
        break;

      case PetAction.REST:
        this.updateState({ energy: Math.min(100, this.state.energy + 30) });
        EventBus.emit(EventType.PET_RESTED, { state: this.getState() }, 'PetEngine');
        break;
    }

    this.updateMood();
    this.save();
  }

  private applyLearningResult(result: LearningResult): void {
    if (result.correct) {
      const newXp = this.state.xp + result.xpGained;
      const levelUp = newXp >= XP_PER_LEVEL;

      const boosted: Record<string, number> = {};
      for (const [key, val] of Object.entries(result.statBoosts)) {
        const current = (this.state as unknown as Record<string, unknown>)[key];
        if (typeof current === 'number') {
          boosted[key] = Math.min(100, Math.max(0, current + (val as number)));
        }
      }

      this.updateState({
        xp: levelUp ? newXp - XP_PER_LEVEL : newXp,
        level: levelUp ? this.state.level + 1 : this.state.level,
        ...boosted,
      });

      if (levelUp) {
        EventBus.emit(EventType.LEVEL_UP, { level: this.state.level }, 'PetEngine');
      }

      EventBus.emit(EventType.LEARNING_COMPLETED, { result }, 'PetEngine');
    } else {
      EventBus.emit(EventType.LEARNING_FAILED, { result }, 'PetEngine');
    }
  }

  private updateState(changes: Partial<PetState>): void {
    this.state = { ...this.state, ...changes, lastInteraction: Date.now() };
    EventBus.emit(EventType.STATE_UPDATED, { state: this.getState() }, 'PetEngine');
  }

  private updateMood(): void {
    const { hunger, happiness, energy } = this.state;

    if (energy < 20) {
      this.state.mood = PetMood.TIRED;
    } else if (hunger < 30) {
      this.state.mood = PetMood.HUNGRY;
    } else if (happiness < 30) {
      this.state.mood = PetMood.SAD;
    } else if (happiness > 80 && hunger > 60) {
      this.state.mood = PetMood.HAPPY;
    } else if (happiness > 90) {
      this.state.mood = PetMood.EXCITED;
    } else {
      this.state.mood = PetMood.CONTENT;
    }
  }

  private startDecay(): void {
    // Stats decay every 30 seconds (accelerated for demo purposes)
    this.decayInterval = setInterval(() => {
      this.updateState({
        hunger: Math.max(0, this.state.hunger - 1),
        happiness: Math.max(0, this.state.happiness - 0.5),
        energy: Math.max(0, this.state.energy - 0.5),
      });
      this.updateMood();
      this.save();
    }, 30000);
  }

  private save(): void {
    this.repository.save(this.state);
  }
}
