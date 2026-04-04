/**
 * Portfolio Deployment Observer
 *
 * Implements the Observer pattern with re-entrancy guard for portfolio events.
 * Uses Promise.allSettled for resilient event dispatching and queues events
 * that arrive while another emit is in progress.
 *
 * Inspired by smolagents best practices (huggingface.co/docs/smolagents):
 * - Detailed error logging on observer execution failures
 * - Retry mechanism for transient failures
 * - Simplified information flow (grouped operations, clear event context)
 * - Tool-agnostic design: observers are decoupled from event sources
 */

export type PortfolioEventType =
  | 'BUILD_STARTED'
  | 'BUILD_SUCCEEDED'
  | 'BUILD_FAILED'
  | 'DEPLOYMENT_STATUS'
  | 'CONFIG_UPDATED'
  | 'THEME_CHANGED'
  | 'PROJECT_MODIFIED';

export interface PortfolioEvent {
  type: PortfolioEventType;
  timestamp: Date;
  source?: string;
  data?: Record<string, unknown>;
}

export type Observer = (event: PortfolioEvent) => void | Promise<void>;

export interface ObserverResult {
  observer: Observer;
  status: 'fulfilled' | 'rejected';
  error?: Error;
}

class DeploymentObserver {
  private observers: Set<Observer> = new Set();
  private emitting = false;
  private eventQueue: PortfolioEvent[] = [];
  private maxRetries = 1;

  /**
   * Subscribe an observer to portfolio events.
   * Returns an unsubscribe function.
   *
   * smolagents principle: tool-agnostic design — any observer can subscribe
   * regardless of implementation. This parallels smolagents' support for
   * tools from MCP servers, LangChain, or Hub Spaces.
   */
  subscribe(observer: Observer): () => void {
    this.observers.add(observer);
    return () => {
      this.observers.delete(observer);
    };
  }

  /**
   * Emit an event to all subscribed observers.
   * Uses Promise.allSettled so a single failing observer does not
   * prevent others from receiving the event.
   *
   * Re-entrancy guard: if emit is called while another emit is in
   * progress, the event is queued and dispatched after the current
   * emit completes.
   *
   * smolagents principles applied:
   * - Detailed error logging: each observer failure is logged with context
   * - Retry mechanism: transient failures get one automatic retry
   * - Information flow: results include per-observer status for debugging
   */
  async emit(event: PortfolioEvent): Promise<ObserverResult[]> {
    if (this.emitting) {
      this.eventQueue.push(event);
      return [];
    }

    this.emitting = true;
    const results: ObserverResult[] = [];

    try {
      const observerList = Array.from(this.observers);

      const settled = await Promise.allSettled(
        observerList.map(async (observer) => {
          try {
            await observer(event);
            return { observer, status: 'fulfilled' as const };
          } catch (err) {
            // smolagents pattern: log detail on execution errors
            const error = err instanceof Error ? err : new Error(String(err));
            console.error(
              `[DeploymentObserver] Observer failed for ${event.type}:`,
              error.message
            );

            // Retry once for transient failures
            if (this.maxRetries > 0) {
              try {
                await observer(event);
                return { observer, status: 'fulfilled' as const };
              } catch (retryErr) {
                const retryError = retryErr instanceof Error ? retryErr : new Error(String(retryErr));
                console.error(
                  `[DeploymentObserver] Retry failed for ${event.type}:`,
                  retryError.message
                );
                return { observer, status: 'rejected' as const, error: retryError };
              }
            }

            return { observer, status: 'rejected' as const, error };
          }
        })
      );

      for (const result of settled) {
        if (result.status === 'fulfilled') {
          results.push(result.value);
        }
      }
    } finally {
      this.emitting = false;
    }

    // Drain the queue of events that arrived during emission
    while (this.eventQueue.length > 0) {
      const queued = this.eventQueue.shift();
      if (queued) {
        await this.emit(queued);
      }
    }

    return results;
  }

  /**
   * Returns the current number of subscribed observers.
   */
  getSubscriberCount(): number {
    return this.observers.size;
  }

  /**
   * Helper to create a typed event with automatic timestamp.
   * smolagents principle: simplify the workflow — reduce boilerplate
   * for event creation so callers don't need to assemble events manually.
   */
  static createEvent(
    type: PortfolioEventType,
    data?: Record<string, unknown>,
    source?: string
  ): PortfolioEvent {
    return {
      type,
      timestamp: new Date(),
      source,
      data,
    };
  }
}

/** Singleton instance for use across the portfolio. */
export const deploymentObserver = new DeploymentObserver();

export default DeploymentObserver;
