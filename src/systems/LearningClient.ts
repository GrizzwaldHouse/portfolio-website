// LearningClient.ts
// Developer: Marcus Daley
// Date: 2026-04-03
// Purpose: Client for the Python learning microservice. Falls back to a local question
//          bank when the microservice is unavailable. Manages question cycling to avoid
//          repeats and validates answers with XP/stat reward calculation.

import { LearningQuestion, LearningCategory, LearningResult } from '@/types/pet';

// Local question bank — used as fallback when microservice is down
const LOCAL_QUESTIONS: LearningQuestion[] = [
  {
    id: 'q1',
    question: 'What is the primary role of a service dog?',
    options: [
      'To perform tricks for entertainment',
      'To assist a person with a disability',
      'To guard a property',
      'To compete in dog shows',
    ],
    correctIndex: 1,
    category: LearningCategory.SERVICE_DOG_BASICS,
    difficulty: 1,
  },
  {
    id: 'q2',
    question: 'Which of these is a key trait of a well-trained service dog?',
    options: [
      'Aggressive toward strangers',
      'Easily distracted by other animals',
      'Calm and focused in public settings',
      'Extremely vocal',
    ],
    correctIndex: 2,
    category: LearningCategory.TRAINING_TECHNIQUES,
    difficulty: 1,
  },
  {
    id: 'q3',
    question: 'What does "positive reinforcement" mean in dog training?',
    options: [
      'Punishing bad behavior',
      'Rewarding desired behavior to encourage repetition',
      'Ignoring the dog completely',
      'Using loud commands',
    ],
    correctIndex: 1,
    category: LearningCategory.TRAINING_TECHNIQUES,
    difficulty: 1,
  },
  {
    id: 'q4',
    question: 'How can you tell if a dog is stressed?',
    options: [
      'Wagging tail rapidly',
      'Panting, yawning, or lip licking',
      'Sitting calmly',
      'Eating enthusiastically',
    ],
    correctIndex: 1,
    category: LearningCategory.DOG_BEHAVIOR,
    difficulty: 2,
  },
  {
    id: 'q5',
    question: 'What is "task training" for a service dog?',
    options: [
      'Teaching the dog to fetch toys',
      'Training the dog to perform specific tasks related to the handler\'s disability',
      'General obedience training',
      'Agility course training',
    ],
    correctIndex: 1,
    category: LearningCategory.SERVICE_DOG_BASICS,
    difficulty: 2,
  },
  {
    id: 'q6',
    question: 'How often should a service dog visit the veterinarian?',
    options: [
      'Only when sick',
      'Once every 5 years',
      'At least once a year for regular checkups',
      'Every week',
    ],
    correctIndex: 2,
    category: LearningCategory.CARE_AND_HEALTH,
    difficulty: 1,
  },
  {
    id: 'q7',
    question: 'What law protects the rights of service dog handlers in public places in the US?',
    options: [
      'The Pet Protection Act',
      'The Americans with Disabilities Act (ADA)',
      'The Animal Welfare Act',
      'The Fair Housing Act only',
    ],
    correctIndex: 1,
    category: LearningCategory.SERVICE_DOG_BASICS,
    difficulty: 2,
  },
  {
    id: 'q8',
    question: 'What is "socialization" in the context of service dog training?',
    options: [
      'Teaching the dog to play with other dogs',
      'Exposing the dog to various environments, people, and situations',
      'Letting the dog roam freely',
      'Training the dog to bark at strangers',
    ],
    correctIndex: 1,
    category: LearningCategory.TRAINING_TECHNIQUES,
    difficulty: 2,
  },
];

export class LearningClient {
  private serviceUrl: string;
  private usedQuestionIds: Set<string> = new Set();

  constructor(serviceUrl: string = '/api/learning') {
    this.serviceUrl = serviceUrl;
  }

  async getQuestion(category?: LearningCategory): Promise<LearningQuestion> {
    try {
      const response = await fetch(`${this.serviceUrl}/question`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category }),
      });

      if (response.ok) {
        return await response.json();
      }
    } catch {
      // Microservice unavailable — fall through to local questions
    }

    return this.getLocalQuestion(category);
  }

  async validateAnswer(questionId: string, answerIndex: number): Promise<LearningResult> {
    try {
      const response = await fetch(`${this.serviceUrl}/validate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionId, answerIndex }),
      });

      if (response.ok) {
        return await response.json();
      }
    } catch {
      // Microservice unavailable — fall through to local validation
    }

    return this.validateLocally(questionId, answerIndex);
  }

  private getLocalQuestion(category?: LearningCategory): LearningQuestion {
    let pool = LOCAL_QUESTIONS;

    if (category) {
      pool = pool.filter((q) => q.category === category);
    }

    // Prefer unused questions
    const unused = pool.filter((q) => !this.usedQuestionIds.has(q.id));
    const source = unused.length > 0 ? unused : pool;

    // Reset if all questions used
    if (unused.length === 0) {
      this.usedQuestionIds.clear();
    }

    const question = source[Math.floor(Math.random() * source.length)];
    this.usedQuestionIds.add(question.id);
    return question;
  }

  private validateLocally(questionId: string, answerIndex: number): LearningResult {
    const question = LOCAL_QUESTIONS.find((q) => q.id === questionId);
    if (!question) {
      return { correct: false, xpGained: 0, statBoosts: {} };
    }

    const correct = question.correctIndex === answerIndex;
    return {
      correct,
      xpGained: correct ? 25 * question.difficulty : 0,
      statBoosts: correct
        ? {
            hunger: 10,
            happiness: 15,
            intelligence: 5 * question.difficulty,
          }
        : {},
    };
  }
}
