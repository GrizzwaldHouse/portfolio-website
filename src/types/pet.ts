// pet.ts
// Developer: Marcus Daley
// Date: 2026-04-03
// Purpose: Pet state, actions, moods, learning types, and game configuration for the
//          Tamagotchi system. Defines all data contracts consumed by PetEngine and UI.

export interface PetState {
  hunger: number;       // 0-100, 0 = starving
  happiness: number;    // 0-100, 0 = miserable
  intelligence: number; // 0-100, grows with learning
  energy: number;       // 0-100, 0 = exhausted
  level: number;        // Current level
  xp: number;           // Experience points toward next level
  name: string;
  mood: PetMood;
  lastInteraction: number;
}

export enum PetMood {
  HAPPY = 'happy',
  CONTENT = 'content',
  HUNGRY = 'hungry',
  SAD = 'sad',
  TIRED = 'tired',
  EXCITED = 'excited',
}

export enum PetAction {
  FEED = 'feed',
  PLAY = 'play',
  TRAIN = 'train',
  REST = 'rest',
}

export interface ActionGate {
  action: PetAction;
  requiresLearning: boolean;
  minimumLevel: number;
}

export interface LearningQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  category: LearningCategory;
  difficulty: number;
}

export enum LearningCategory {
  SERVICE_DOG_BASICS = 'service_dog_basics',
  TRAINING_TECHNIQUES = 'training_techniques',
  DOG_BEHAVIOR = 'dog_behavior',
  CARE_AND_HEALTH = 'care_and_health',
}

export interface LearningResult {
  correct: boolean;
  xpGained: number;
  statBoosts: Partial<Pick<PetState, 'hunger' | 'happiness' | 'intelligence' | 'energy'>>;
}

export const DEFAULT_PET_STATE: PetState = {
  hunger: 70,
  happiness: 70,
  intelligence: 10,
  energy: 80,
  level: 1,
  xp: 0,
  name: 'Buddy',
  mood: PetMood.CONTENT,
  lastInteraction: Date.now(),
};

export const XP_PER_LEVEL = 100;

export const ACTION_GATES: ActionGate[] = [
  { action: PetAction.FEED, requiresLearning: true, minimumLevel: 1 },
  { action: PetAction.PLAY, requiresLearning: true, minimumLevel: 1 },
  { action: PetAction.TRAIN, requiresLearning: true, minimumLevel: 2 },
  { action: PetAction.REST, requiresLearning: false, minimumLevel: 1 },
];
