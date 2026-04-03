// SplineController.ts
// Developer: Marcus Daley
// Date: 2026-04-03
// Purpose: Adapter between the EventBus and Spline 3D scenes. Maps game events to
//          3D animations and scene changes. Decoupled from the Spline SDK — the SDK
//          is injected via setSplineApp() and lazy-loaded to avoid blocking initial render.

import { EventBus } from './EventBus';
import { EventType } from '@/types/events';
import { SplineAnimation, SplineControllerState } from '@/types/spline';
import { PetMood } from '@/types/pet';

export class SplineController {
  private state: SplineControllerState = {
    currentAnimation: SplineAnimation.IDLE_LOOP,
    isLoaded: false,
    isVisible: false,
  };

  private splineApp: unknown = null;
  private subscriptions: Array<{ unsubscribe: () => void }> = [];

  initialize(): void {
    this.subscriptions.push(
      EventBus.on(EventType.PET_FED, () => {
        this.playAnimation(SplineAnimation.EAT_ANIMATION);
      }),
      EventBus.on(EventType.PET_PLAYED, () => {
        this.playAnimation(SplineAnimation.HAPPY_BOUNCE);
      }),
      EventBus.on(EventType.LEVEL_UP, () => {
        this.playAnimation(SplineAnimation.LEVEL_UP);
      }),
      EventBus.on(EventType.PET_RESTED, () => {
        this.playAnimation(SplineAnimation.SLEEP);
      }),
      EventBus.on(EventType.STATE_UPDATED, (event) => {
        const payload = event.payload as { state: { mood: PetMood } };
        this.updateMoodAnimation(payload.state.mood);
      })
    );
  }

  destroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    this.subscriptions = [];
  }

  setSplineApp(app: unknown): void {
    this.splineApp = app;
    this.state.isLoaded = true;
  }

  getState(): Readonly<SplineControllerState> {
    return { ...this.state };
  }

  private playAnimation(animation: SplineAnimation): void {
    this.state.currentAnimation = animation;
    EventBus.emit(
      EventType.ANIMATION_TRIGGERED,
      { animation },
      'SplineController'
    );

    if (this.splineApp) {
      // Spline API: trigger animation by name
      // (this.splineApp as any).emitEvent('mouseDown', animation);
    }

    // Return to idle after animation completes
    setTimeout(() => {
      if (this.state.currentAnimation === animation) {
        this.state.currentAnimation = SplineAnimation.IDLE_LOOP;
      }
    }, 2000);
  }

  private updateMoodAnimation(mood: PetMood): void {
    switch (mood) {
      case PetMood.HAPPY:
      case PetMood.EXCITED:
        this.playAnimation(SplineAnimation.HAPPY_BOUNCE);
        break;
      case PetMood.SAD:
      case PetMood.HUNGRY:
        this.playAnimation(SplineAnimation.SAD_IDLE);
        break;
      case PetMood.TIRED:
        this.playAnimation(SplineAnimation.SLEEP);
        break;
      default:
        this.state.currentAnimation = SplineAnimation.IDLE_LOOP;
    }
  }
}
