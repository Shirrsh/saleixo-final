export type DealTier = 'core-7' | 'pro-7-2' | 'ultimate-7-2-1';

export type NicheCategory = 'frames' | 'hampers' | 'artisan';

export interface AssetSlot {
  id: number;
  slotType: 'core' | 'plus2' | 'video';
  slotNumber: string; // e.g. "Image 1 of 7", "A+ Bonus 1", "Reel Video"
  title: string;
  tagline: string;
  badge: string;
  categoryPurpose: string;
  imageUrl: string;
  dimensions: string;
  aspectRatio: string;
  keyElements: string[];
}

export interface NichePreset {
  id: NicheCategory;
  name: string;
  subtitle: string;
  description: string;
  badge: string;
  slots: AssetSlot[];
  videoUrl: string;
  videoPoster: string;
  videoTitle: string;
  videoDuration: string;
}

export interface DealPricing {
  core7Usd: number;
  core7Inr: number;
  plus2Usd: number;
  plus2Inr: number;
  reelVideoUsd: number;
  reelVideoInr: number;
}
