export type FrameFinish = 
  | 'oak' 
  | 'black' 
  | 'gold' 
  | 'acrylic' 
  | 'canvas' 
  | 'white';

export type MatStyle = 'none' | 'ivory' | 'black';
export type MatWidth = 'slim' | 'classic' | 'wide';

export type WallEnvironment = 
  | 'living-room' 
  | 'gallery-dark' 
  | 'boho-studio' 
  | 'minimal-white';

export interface FrameSize {
  id: string;
  name: string;
  inches: string;
  cm: string;
  aspectRatio: number; // width / height
  orientation: 'portrait' | 'landscape' | 'square';
  baseUsdPrice: number;
  baseInrPrice: number;
}

export interface FrameMaterialOption {
  id: FrameFinish;
  name: string;
  subtitle: string;
  badge?: string;
  colorSwatch: string;
  borderStyle: string;
  priceMultiplier: number;
  description: string;
}

export interface PhotoPreset {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  defaultOrientation: 'portrait' | 'landscape' | 'square';
}
