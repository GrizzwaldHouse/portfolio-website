// spline.ts
// Developer: Marcus Daley
// Date: 2026-04-03
// Purpose: Type definitions for Spline 3D integration — animation enums, scene config,
//          and controller state used by the SplineController adapter.

export enum SplineAnimation {
  IDLE_LOOP = 'IdleLoop',
  EAT_ANIMATION = 'EatAnimation',
  HAPPY_BOUNCE = 'HappyBounce',
  SAD_IDLE = 'SadIdle',
  LEVEL_UP = 'LevelUp',
  SLEEP = 'Sleep',
}

export interface SplineSceneConfig {
  sceneUrl: string;
  objects: SplineObject[];
  maxObjects: number;
  lightingMode: 'minimal' | 'standard';
}

export interface SplineObject {
  name: string;
  type: 'pet' | 'food' | 'environment' | 'effect';
  visible: boolean;
}

export interface SplineControllerState {
  currentAnimation: SplineAnimation;
  isLoaded: boolean;
  isVisible: boolean;
}
