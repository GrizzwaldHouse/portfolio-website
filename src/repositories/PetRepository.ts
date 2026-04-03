// PetRepository.ts
// Developer: Marcus Daley
// Date: 2026-04-03
// Purpose: Repository pattern for pet state persistence. Abstracts localStorage storage
//          behind a clean interface so it can be swapped for an API or database later.

import { PetState } from '@/types/pet';

const STORAGE_KEY = 'portfolio_pet_state';

export class PetRepository {
  save(state: PetState): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error('[PetRepository] Failed to save:', error);
    }
  }

  load(): PetState | null {
    if (typeof window === 'undefined') return null;
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('[PetRepository] Failed to load:', error);
      return null;
    }
  }

  clear(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEY);
  }
}
