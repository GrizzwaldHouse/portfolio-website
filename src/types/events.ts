// events.ts
// Developer: Marcus Daley
// Date: 2026-04-03
// Purpose: Core event types for the event-driven architecture — defines all system events,
//          the GameEvent interface, and handler/subscription types used by the EventBus.
export enum EventType {
  // Pet System Events
  PET_FED = 'PET_FED',
  PET_PLAYED = 'PET_PLAYED',
  PET_TRAINED = 'PET_TRAINED',
  PET_RESTED = 'PET_RESTED',
  STATE_UPDATED = 'STATE_UPDATED',
  LEVEL_UP = 'LEVEL_UP',

  // Learning System Events
  LEARNING_STARTED = 'LEARNING_STARTED',
  LEARNING_COMPLETED = 'LEARNING_COMPLETED',
  LEARNING_FAILED = 'LEARNING_FAILED',
  QUESTION_REQUESTED = 'QUESTION_REQUESTED',
  ANSWER_SUBMITTED = 'ANSWER_SUBMITTED',

  // UI Events
  ANIMATION_TRIGGERED = 'ANIMATION_TRIGGERED',
  SCENE_CHANGED = 'SCENE_CHANGED',
  THEME_CHANGED = 'THEME_CHANGED',

  // System Events
  SYSTEM_INITIALIZED = 'SYSTEM_INITIALIZED',
  SYSTEM_ERROR = 'SYSTEM_ERROR',
  SAVE_REQUESTED = 'SAVE_REQUESTED',
  LOAD_REQUESTED = 'LOAD_REQUESTED',
}

export interface GameEvent<T = unknown> {
  type: EventType;
  payload: T;
  timestamp: number;
  source: string;
}

export type EventHandler<T = unknown> = (event: GameEvent<T>) => void;

export interface EventSubscription {
  unsubscribe: () => void;
}
