// usePetSystem.ts
// Developer: Marcus Daley
// Date: 2026-04-03
// Purpose: React hook that bridges the PetEngine with React state. Primary interface
//          for components to interact with the pet system — initializes all subsystems
//          via dependency injection and syncs engine state with React on EventBus events.

'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { PetEngine } from '@/systems/PetEngine';
import { LearningClient } from '@/systems/LearningClient';
import { SplineController } from '@/systems/SplineController';
import { PetRepository } from '@/repositories/PetRepository';
import { EventBus } from '@/systems/EventBus';
import { EventType } from '@/types/events';
import {
  PetState,
  PetAction,
  LearningQuestion,
  LearningCategory,
  DEFAULT_PET_STATE,
} from '@/types/pet';

interface PetSystemState {
  pet: PetState;
  currentQuestion: LearningQuestion | null;
  isAnswering: boolean;
  lastResult: { correct: boolean; message: string } | null;
  pendingAction: PetAction | null;
}

export function usePetSystem() {
  const [state, setState] = useState<PetSystemState>({
    pet: DEFAULT_PET_STATE,
    currentQuestion: null,
    isAnswering: false,
    lastResult: null,
    pendingAction: null,
  });

  const engineRef = useRef<PetEngine | null>(null);
  const learningRef = useRef<LearningClient | null>(null);
  const splineRef = useRef<SplineController | null>(null);

  // Initialize systems
  useEffect(() => {
    const repository = new PetRepository();
    const engine = new PetEngine(repository);
    const learning = new LearningClient();
    const spline = new SplineController();

    engineRef.current = engine;
    learningRef.current = learning;
    splineRef.current = spline;

    engine.initialize();
    spline.initialize();

    // Sync React state with engine state
    const sub = EventBus.on(EventType.STATE_UPDATED, (event) => {
      const payload = event.payload as { state: PetState };
      setState((prev) => ({ ...prev, pet: payload.state }));
    });

    setState((prev) => ({ ...prev, pet: engine.getState() }));

    return () => {
      sub.unsubscribe();
      engine.destroy();
      spline.destroy();
    };
  }, []);

  // Request an action — triggers learning gate if needed
  const requestAction = useCallback(async (action: PetAction) => {
    const engine = engineRef.current;
    const learning = learningRef.current;
    if (!engine || !learning) return;

    const check = engine.canPerformAction(action);

    if (check.allowed) {
      engine.performAction(action);
      return;
    }

    if (check.reason === 'Answer a question first') {
      const question = await learning.getQuestion();
      setState((prev) => ({
        ...prev,
        currentQuestion: question,
        isAnswering: true,
        pendingAction: action,
        lastResult: null,
      }));
    }
  }, []);

  // Submit an answer to the learning question
  const submitAnswer = useCallback(async (answerIndex: number) => {
    const engine = engineRef.current;
    const learning = learningRef.current;
    if (!engine || !learning || !state.currentQuestion || !state.pendingAction) return;

    const result = await learning.validateAnswer(state.currentQuestion.id, answerIndex);

    if (result.correct) {
      engine.performAction(state.pendingAction, result);
      setState((prev) => ({
        ...prev,
        currentQuestion: null,
        isAnswering: false,
        pendingAction: null,
        lastResult: { correct: true, message: 'Correct! Action performed.' },
      }));
    } else {
      setState((prev) => ({
        ...prev,
        currentQuestion: null,
        isAnswering: false,
        pendingAction: null,
        lastResult: { correct: false, message: 'Incorrect. Try again!' },
      }));
    }

    // Clear result message after 3 seconds
    setTimeout(() => {
      setState((prev) => ({ ...prev, lastResult: null }));
    }, 3000);
  }, [state.currentQuestion, state.pendingAction]);

  const setSplineApp = useCallback((app: unknown) => {
    splineRef.current?.setSplineApp(app);
  }, []);

  return {
    pet: state.pet,
    currentQuestion: state.currentQuestion,
    isAnswering: state.isAnswering,
    lastResult: state.lastResult,
    requestAction,
    submitAnswer,
    setSplineApp,
  };
}
