// EventBus.ts
// Developer: Marcus Daley
// Date: 2026-04-03
// Purpose: Central event bus implementing the Observer pattern. All system communication
//          flows through this singleton — no polling, no global mutable state. Provides
//          emit/subscribe/unsubscribe with error isolation and event logging.

import { EventType, GameEvent, EventHandler, EventSubscription } from '@/types/events';

class EventBusImpl {
  private handlers: Map<EventType, Set<EventHandler>> = new Map();
  private eventLog: GameEvent[] = [];
  private maxLogSize = 100;

  emit<T = unknown>(type: EventType, payload: T, source: string): void {
    const event: GameEvent<T> = {
      type,
      payload,
      timestamp: Date.now(),
      source,
    };

    this.log(event);

    const typeHandlers = this.handlers.get(type);
    if (typeHandlers) {
      typeHandlers.forEach((handler) => {
        try {
          handler(event as GameEvent);
        } catch (error) {
          console.error(`[EventBus] Handler error for ${type}:`, error);
          this.emit(EventType.SYSTEM_ERROR, { originalEvent: type, error }, 'EventBus');
        }
      });
    }
  }

  on<T = unknown>(type: EventType, handler: EventHandler<T>): EventSubscription {
    if (!this.handlers.has(type)) {
      this.handlers.set(type, new Set());
    }

    const typedHandler = handler as EventHandler;
    this.handlers.get(type)!.add(typedHandler);

    return {
      unsubscribe: () => {
        this.handlers.get(type)?.delete(typedHandler);
      },
    };
  }

  off(type: EventType, handler: EventHandler): void {
    this.handlers.get(type)?.delete(handler);
  }

  getRecentEvents(count: number = 10): GameEvent[] {
    return this.eventLog.slice(-count);
  }

  clear(): void {
    this.handlers.clear();
    this.eventLog = [];
  }

  private log(event: GameEvent): void {
    this.eventLog.push(event);
    if (this.eventLog.length > this.maxLogSize) {
      this.eventLog = this.eventLog.slice(-this.maxLogSize);
    }
  }
}

// Singleton instance
export const EventBus = new EventBusImpl();
