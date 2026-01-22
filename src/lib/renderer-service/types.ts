/**
 * 3D Renderer Service Types
 *
 * Architecture for a future paid-per-use 3D rendering service.
 * This defines the service boundaries and interfaces without implementing
 * the actual rendering logic (which would live in a separate service).
 *
 * CURRENT STATUS: Architectural stub
 * FUTURE: Backend service with usage metering
 */

// =============================================================================
// RENDERING CONFIGURATION
// =============================================================================

/**
 * Supported render output formats
 */
export type RenderFormat = 'png' | 'jpeg' | 'webp' | 'hdr';

/**
 * Quality presets for rendering
 */
export type RenderQuality = 'preview' | 'standard' | 'high' | 'ultra';

/**
 * Render job configuration
 */
export interface RenderConfig {
  // Output settings
  width: number;
  height: number;
  format: RenderFormat;
  quality: RenderQuality;

  // Scene settings
  scene: SceneConfig;

  // Camera settings
  camera: CameraConfig;

  // Lighting settings
  lighting: LightingConfig;

  // Post-processing
  postProcess?: PostProcessConfig;
}

export interface SceneConfig {
  // Model source (URL or uploaded file reference)
  modelUrl?: string;
  modelUploadId?: string;

  // Environment
  environmentMap?: string;
  backgroundColor?: string;
  showGrid?: boolean;
  showAxes?: boolean;
}

export interface CameraConfig {
  position: [number, number, number];
  target: [number, number, number];
  fov: number;
  near: number;
  far: number;
}

export interface LightingConfig {
  ambient: {
    color: string;
    intensity: number;
  };
  lights: Array<{
    type: 'directional' | 'point' | 'spot';
    position: [number, number, number];
    color: string;
    intensity: number;
    castShadow?: boolean;
  }>;
  environmentIntensity?: number;
}

export interface PostProcessConfig {
  bloom?: {
    enabled: boolean;
    intensity: number;
    threshold: number;
  };
  ssao?: {
    enabled: boolean;
    radius: number;
    intensity: number;
  };
  tonemap?: 'none' | 'aces' | 'reinhard' | 'filmic';
}

// =============================================================================
// SERVICE API TYPES
// =============================================================================

/**
 * Render job status
 */
export type JobStatus =
  | 'queued'
  | 'processing'
  | 'completed'
  | 'failed'
  | 'cancelled';

/**
 * Render job tracking
 */
export interface RenderJob {
  id: string;
  userId: string;
  config: RenderConfig;
  status: JobStatus;
  progress: number; // 0-100
  createdAt: string;
  startedAt?: string;
  completedAt?: string;
  error?: string;
  result?: RenderResult;
}

export interface RenderResult {
  imageUrl: string;
  thumbnailUrl: string;
  metadata: {
    renderTimeMs: number;
    triangleCount: number;
    textureMemoryMB: number;
  };
  expiresAt: string; // Results expire after 24h
}

// =============================================================================
// USAGE & BILLING TYPES
// =============================================================================

/**
 * Usage tiers for the rendering service
 */
export type UsageTier = 'free' | 'starter' | 'pro' | 'enterprise';

/**
 * Tier limits and pricing
 */
export interface TierConfig {
  tier: UsageTier;
  name: string;
  monthlyPrice: number; // USD, 0 for free
  limits: {
    rendersPerMonth: number;
    maxResolution: number;
    maxQuality: RenderQuality;
    maxFileSize: number; // MB
    concurrentJobs: number;
    retentionDays: number;
  };
  features: string[];
}

export const TIER_CONFIGS: TierConfig[] = [
  {
    tier: 'free',
    name: 'Free',
    monthlyPrice: 0,
    limits: {
      rendersPerMonth: 10,
      maxResolution: 1280,
      maxQuality: 'standard',
      maxFileSize: 10,
      concurrentJobs: 1,
      retentionDays: 1,
    },
    features: [
      '10 renders per month',
      'Up to 1280x720 resolution',
      'Standard quality',
      '24-hour result retention',
    ],
  },
  {
    tier: 'starter',
    name: 'Starter',
    monthlyPrice: 9,
    limits: {
      rendersPerMonth: 100,
      maxResolution: 2560,
      maxQuality: 'high',
      maxFileSize: 50,
      concurrentJobs: 2,
      retentionDays: 7,
    },
    features: [
      '100 renders per month',
      'Up to 2560x1440 resolution',
      'High quality rendering',
      '7-day result retention',
      'Priority queue',
    ],
  },
  {
    tier: 'pro',
    name: 'Pro',
    monthlyPrice: 29,
    limits: {
      rendersPerMonth: 500,
      maxResolution: 4096,
      maxQuality: 'ultra',
      maxFileSize: 200,
      concurrentJobs: 5,
      retentionDays: 30,
    },
    features: [
      '500 renders per month',
      'Up to 4K resolution',
      'Ultra quality with ray tracing',
      '30-day result retention',
      'Priority queue',
      'Batch processing',
      'API access',
    ],
  },
  {
    tier: 'enterprise',
    name: 'Enterprise',
    monthlyPrice: 99,
    limits: {
      rendersPerMonth: -1, // Unlimited
      maxResolution: 8192,
      maxQuality: 'ultra',
      maxFileSize: 1000,
      concurrentJobs: 20,
      retentionDays: 90,
    },
    features: [
      'Unlimited renders',
      'Up to 8K resolution',
      'Ultra quality with ray tracing',
      '90-day result retention',
      'Dedicated queue',
      'Batch processing',
      'Full API access',
      'Custom integrations',
      'SLA guarantee',
    ],
  },
];

/**
 * Usage tracking for a user
 */
export interface UsageRecord {
  userId: string;
  tier: UsageTier;
  billingPeriodStart: string;
  billingPeriodEnd: string;
  usage: {
    rendersUsed: number;
    rendersLimit: number;
    storageUsedMB: number;
    storageLimitMB: number;
  };
}

// =============================================================================
// SERVICE INTERFACE
// =============================================================================

/**
 * Renderer Service API interface
 *
 * This would be implemented by a backend service (e.g., Cloudflare Worker,
 * AWS Lambda, or dedicated GPU server).
 */
export interface IRendererService {
  // Job management
  createJob(config: RenderConfig): Promise<RenderJob>;
  getJob(jobId: string): Promise<RenderJob | null>;
  cancelJob(jobId: string): Promise<boolean>;
  listJobs(userId: string, limit?: number): Promise<RenderJob[]>;

  // File management
  uploadModel(file: File): Promise<{ uploadId: string; previewUrl: string }>;
  deleteUpload(uploadId: string): Promise<boolean>;

  // Usage & billing
  getUsage(userId: string): Promise<UsageRecord>;
  checkQuota(userId: string, config: RenderConfig): Promise<{
    allowed: boolean;
    reason?: string;
    remaining?: number;
  }>;
}

// =============================================================================
// CLIENT-SIDE HOOKS (STUBS)
// =============================================================================

/**
 * Feature gate check for renderer access
 */
export function canAccessRenderer(tier: UsageTier, feature: string): boolean {
  const tierIndex = ['free', 'starter', 'pro', 'enterprise'].indexOf(tier);
  const featureRequirements: Record<string, number> = {
    'basic-render': 0, // free
    'high-quality': 1, // starter+
    'ray-tracing': 2, // pro+
    'batch-processing': 2, // pro+
    'api-access': 2, // pro+
    'custom-integration': 3, // enterprise
  };

  const requiredTier = featureRequirements[feature] ?? 3;
  return tierIndex >= requiredTier;
}

/**
 * Calculate estimated render cost
 */
export function estimateRenderCost(config: RenderConfig): {
  credits: number;
  estimatedTimeSeconds: number;
} {
  const baseCredits = 1;
  const qualityMultiplier = {
    preview: 0.5,
    standard: 1,
    high: 2,
    ultra: 4,
  }[config.quality];

  const resolutionMultiplier = (config.width * config.height) / (1920 * 1080);

  const credits = Math.ceil(baseCredits * qualityMultiplier * resolutionMultiplier);
  const estimatedTimeSeconds = credits * 10; // Rough estimate

  return { credits, estimatedTimeSeconds };
}
