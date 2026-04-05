export interface ApprovedGame {
  slug: string;
  embedType: 'unity-webgl' | 'wasm' | 'canvas' | 'iframe';
  buildPath: string;
  width: number;
  height: number;
  mobileSupported: boolean;
  lastVerified: string;
}

export const approvedGames: ApprovedGame[] = [];

export function isGameApproved(slug: string): boolean {
  return approvedGames.some((g) => g.slug === slug);
}

export function getGameConfig(slug: string): ApprovedGame | undefined {
  return approvedGames.find((g) => g.slug === slug);
}
