/**
 * 3D Renderer Service Client
 *
 * Client-side interface for the rendering service.
 * Currently a stub - connects to mock data until backend is implemented.
 *
 * ARCHITECTURE:
 * - Client (this file) handles UI state and validation
 * - Service (future) handles actual GPU rendering
 * - Storage (future) handles model uploads and result delivery
 */

export * from './types';

import {
  RenderConfig,
  RenderJob,
  JobStatus,
  UsageRecord,
  UsageTier,
  TIER_CONFIGS,
  TierConfig,
  IRendererService,
  estimateRenderCost,
  canAccessRenderer,
} from './types';

// =============================================================================
// SERVICE STATUS
// =============================================================================

export const SERVICE_STATUS = {
  available: false,
  message: 'Renderer service coming soon',
  eta: 'Q2 2026',
} as const;

/**
 * Check if the rendering service is available
 */
export function isServiceAvailable(): boolean {
  return SERVICE_STATUS.available;
}

// =============================================================================
// MOCK IMPLEMENTATION
// =============================================================================

/**
 * Mock renderer service for development and UI testing
 */
class MockRendererService implements IRendererService {
  private jobs: Map<string, RenderJob> = new Map();
  private jobCounter = 0;

  async createJob(config: RenderConfig): Promise<RenderJob> {
    if (!SERVICE_STATUS.available) {
      throw new Error('Renderer service is not yet available');
    }

    const job: RenderJob = {
      id: `job_${++this.jobCounter}_${Date.now()}`,
      userId: 'mock_user',
      config,
      status: 'queued',
      progress: 0,
      createdAt: new Date().toISOString(),
    };

    this.jobs.set(job.id, job);

    // Simulate job processing
    this.simulateJobProgress(job.id);

    return job;
  }

  async getJob(jobId: string): Promise<RenderJob | null> {
    return this.jobs.get(jobId) || null;
  }

  async cancelJob(jobId: string): Promise<boolean> {
    const job = this.jobs.get(jobId);
    if (!job || job.status === 'completed' || job.status === 'failed') {
      return false;
    }
    job.status = 'cancelled';
    return true;
  }

  async listJobs(userId: string, limit = 10): Promise<RenderJob[]> {
    return Array.from(this.jobs.values())
      .filter(j => j.userId === userId)
      .slice(0, limit);
  }

  async uploadModel(_file: File): Promise<{ uploadId: string; previewUrl: string }> {
    if (!SERVICE_STATUS.available) {
      throw new Error('Upload service is not yet available');
    }
    return {
      uploadId: `upload_${Date.now()}`,
      previewUrl: '/placeholder-model.png',
    };
  }

  async deleteUpload(_uploadId: string): Promise<boolean> {
    return true;
  }

  async getUsage(_userId: string): Promise<UsageRecord> {
    return {
      userId: 'mock_user',
      tier: 'free',
      billingPeriodStart: new Date().toISOString(),
      billingPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      usage: {
        rendersUsed: 3,
        rendersLimit: 10,
        storageUsedMB: 15,
        storageLimitMB: 100,
      },
    };
  }

  async checkQuota(
    _userId: string,
    config: RenderConfig
  ): Promise<{ allowed: boolean; reason?: string; remaining?: number }> {
    const usage = await this.getUsage(_userId);
    const cost = estimateRenderCost(config);

    if (usage.usage.rendersUsed + cost.credits > usage.usage.rendersLimit) {
      return {
        allowed: false,
        reason: 'Monthly render quota exceeded',
        remaining: usage.usage.rendersLimit - usage.usage.rendersUsed,
      };
    }

    return {
      allowed: true,
      remaining: usage.usage.rendersLimit - usage.usage.rendersUsed - cost.credits,
    };
  }

  private simulateJobProgress(jobId: string) {
    const job = this.jobs.get(jobId);
    if (!job) return;

    // Simulate progress updates
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 20;

      if (progress >= 100) {
        job.status = 'completed';
        job.progress = 100;
        job.completedAt = new Date().toISOString();
        job.result = {
          imageUrl: '/placeholder-render.png',
          thumbnailUrl: '/placeholder-render-thumb.png',
          metadata: {
            renderTimeMs: 5000 + Math.random() * 10000,
            triangleCount: Math.floor(Math.random() * 1000000),
            textureMemoryMB: Math.random() * 256,
          },
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        };
        clearInterval(interval);
      } else {
        job.status = 'processing';
        job.progress = Math.min(progress, 99);
        if (!job.startedAt) {
          job.startedAt = new Date().toISOString();
        }
      }
    }, 500);
  }
}

// =============================================================================
// SERVICE INSTANCE
// =============================================================================

const mockService = new MockRendererService();

/**
 * Get the renderer service instance
 */
export function getRendererService(): IRendererService {
  // In production, this would return a real service client
  return mockService;
}

// =============================================================================
// UTILITY EXPORTS
// =============================================================================

export { estimateRenderCost, canAccessRenderer, TIER_CONFIGS };

/**
 * Get tier configuration by tier name
 */
export function getTierConfig(tier: UsageTier): TierConfig | undefined {
  return TIER_CONFIGS.find(t => t.tier === tier);
}

/**
 * Get the next tier upgrade option
 */
export function getUpgradeTier(currentTier: UsageTier): TierConfig | null {
  const tiers: UsageTier[] = ['free', 'starter', 'pro', 'enterprise'];
  const currentIndex = tiers.indexOf(currentTier);

  if (currentIndex < 0 || currentIndex >= tiers.length - 1) {
    return null;
  }

  return TIER_CONFIGS[currentIndex + 1];
}

// =============================================================================
// REACT HOOKS (STUBS)
// =============================================================================

/**
 * Hook placeholder for render job management
 * Will be implemented when React hooks are needed
 */
export const useRendererHooks = {
  /**
   * Track a render job's progress
   */
  useRenderJob: (jobId: string | null) => {
    // Placeholder - would use React Query or SWR in real implementation
    return {
      job: null as RenderJob | null,
      isLoading: false,
      error: null as Error | null,
      refetch: () => {},
    };
  },

  /**
   * Get current usage stats
   */
  useUsage: () => {
    // Placeholder
    return {
      usage: null as UsageRecord | null,
      isLoading: false,
      error: null as Error | null,
    };
  },

  /**
   * Create a new render job
   */
  useCreateRender: () => {
    // Placeholder
    return {
      createRender: async (_config: RenderConfig) => {
        throw new Error('Renderer service not available');
      },
      isLoading: false,
      error: null as Error | null,
    };
  },
};

// =============================================================================
// VALIDATION
// =============================================================================

/**
 * Validate a render configuration
 */
export function validateRenderConfig(config: Partial<RenderConfig>): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  // Check required fields
  if (!config.width || config.width < 1 || config.width > 8192) {
    errors.push('Width must be between 1 and 8192');
  }
  if (!config.height || config.height < 1 || config.height > 8192) {
    errors.push('Height must be between 1 and 8192');
  }

  // Check scene config
  if (!config.scene?.modelUrl && !config.scene?.modelUploadId) {
    errors.push('Either modelUrl or modelUploadId is required');
  }

  // Check camera config
  if (!config.camera?.position || config.camera.position.length !== 3) {
    errors.push('Camera position must be a 3D vector');
  }
  if (!config.camera?.target || config.camera.target.length !== 3) {
    errors.push('Camera target must be a 3D vector');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
