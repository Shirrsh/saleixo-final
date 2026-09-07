import { FrameFinish, FrameMaterialOption, FrameSize, PhotoPreset, WallEnvironment } from './types';

export const FRAME_MATERIALS: FrameMaterialOption[] = [
  {
    id: 'oak',
    name: 'Natural Oak Wood',
    subtitle: 'Warm organic grain & beveled miter',
    badge: 'Best Seller',
    colorSwatch: 'linear-gradient(135deg, #c89658, #946128)',
    borderStyle: 'border-[#a36e37]',
    priceMultiplier: 1.15,
    description: 'Sustainably sourced solid American oak with a silky satin lacquer and fine-mitered joinery.',
  },
  {
    id: 'black',
    name: 'Matte Modern Black',
    subtitle: 'Museum-grade minimalist edge',
    badge: 'Popular',
    colorSwatch: 'linear-gradient(135deg, #2b2b2f, #111113)',
    borderStyle: 'border-[#18181b]',
    priceMultiplier: 1.0,
    description: 'Anodized matte finish designed to disappear and let your photography speak with maximum contrast.',
  },
  {
    id: 'gold',
    name: 'Brushed Champagne Gold',
    subtitle: 'Luxurious metallic gallery luster',
    badge: 'Luxury',
    colorSwatch: 'linear-gradient(135deg, #ecc579, #c49942, #ffd98d)',
    borderStyle: 'border-[#d4af37]',
    priceMultiplier: 1.35,
    description: 'Electroplated brushed champagne alloy with a soft reflective sheen, ideal for portraits & wedding art.',
  },
  {
    id: 'acrylic',
    name: 'Floating Acrylic Standoff',
    subtitle: 'Ultra-contemporary borderless glass',
    badge: 'Modern',
    colorSwatch: 'linear-gradient(135deg, rgba(255,255,255,0.8), rgba(200,225,255,0.4))',
    borderStyle: 'border-white/50',
    priceMultiplier: 1.4,
    description: 'Optically clear 6mm cast acrylic with polished bevel edges and 4 brushed-steel wall standoffs.',
  },
  {
    id: 'canvas',
    name: 'Gallery Canvas Wrap',
    subtitle: 'Frameless 3D stretched cotton depth',
    badge: 'Classic',
    colorSwatch: 'linear-gradient(135deg, #f0ede6, #d9d4c7)',
    borderStyle: 'border-[#d9d4c7]',
    priceMultiplier: 1.1,
    description: 'Archival 380gsm poly-cotton canvas hand-stretched over 1.5" kiln-dried pine stretcher bars.',
  },
  {
    id: 'white',
    name: 'Scandi Minimalist White',
    subtitle: 'Crisp architectural gallery white',
    colorSwatch: 'linear-gradient(135deg, #ffffff, #e5e5ea)',
    borderStyle: 'border-[#eaeaea]',
    priceMultiplier: 1.0,
    description: 'Smooth satin white hardwood that complements bright, airy spaces and modern Scandinavian decor.',
  },
];

export const FRAME_SIZES: FrameSize[] = [
  {
    id: '8x10-p',
    name: '8" × 10"',
    inches: '8 × 10 in',
    cm: '20 × 25 cm',
    aspectRatio: 8 / 10,
    orientation: 'portrait',
    baseUsdPrice: 49,
    baseInrPrice: 3999,
  },
  {
    id: '12x16-p',
    name: '12" × 16"',
    inches: '12 × 16 in',
    cm: '30 × 40 cm',
    aspectRatio: 12 / 16,
    orientation: 'portrait',
    baseUsdPrice: 79,
    baseInrPrice: 6499,
  },
  {
    id: '16x20-p',
    name: '16" × 20"',
    inches: '16 × 20 in',
    cm: '40 × 50 cm',
    aspectRatio: 16 / 20,
    orientation: 'portrait',
    baseUsdPrice: 119,
    baseInrPrice: 9499,
  },
  {
    id: '24x36-p',
    name: '24" × 36"',
    inches: '24 × 36 in',
    cm: '60 × 90 cm',
    aspectRatio: 24 / 36,
    orientation: 'portrait',
    baseUsdPrice: 189,
    baseInrPrice: 14999,
  },
  {
    id: '16x12-l',
    name: '16" × 12"',
    inches: '16 × 12 in',
    cm: '40 × 30 cm',
    aspectRatio: 16 / 12,
    orientation: 'landscape',
    baseUsdPrice: 79,
    baseInrPrice: 6499,
  },
  {
    id: '24x18-l',
    name: '24" × 18"',
    inches: '24 × 18 in',
    cm: '60 × 45 cm',
    aspectRatio: 24 / 18,
    orientation: 'landscape',
    baseUsdPrice: 129,
    baseInrPrice: 9999,
  },
  {
    id: '16x16-s',
    name: '16" × 16"',
    inches: '16 × 16 in',
    cm: '40 × 40 cm',
    aspectRatio: 1,
    orientation: 'square',
    baseUsdPrice: 89,
    baseInrPrice: 7299,
  },
];

export const PHOTO_PRESETS: PhotoPreset[] = [
  {
    id: 'portrait-wedding',
    title: 'Editorial Wedding Memory',
    category: 'Portrait & Keepsake',
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85',
    defaultOrientation: 'portrait',
  },
  {
    id: 'landscape-mountain',
    title: 'Alpine Mist Morning',
    category: 'Fine Art Landscape',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=85',
    defaultOrientation: 'landscape',
  },
  {
    id: 'minimal-architecture',
    title: 'Minimalist Spiral Geometry',
    category: 'Modern Architecture',
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=85',
    defaultOrientation: 'portrait',
  },
  {
    id: 'botanical-monstera',
    title: 'Organic Botanical Shadows',
    category: 'Home & Nature',
    imageUrl: 'https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=1200&q=85',
    defaultOrientation: 'portrait',
  },
  {
    id: 'abstract-terracotta',
    title: 'Modern Terracotta Curves',
    category: 'Abstract & Texture',
    imageUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=85',
    defaultOrientation: 'square',
  },
];

export interface WallEnvironmentOption {
  id: WallEnvironment;
  name: string;
  subtitle: string;
  wallBackground: string;
  accentElement: string;
  textColor: string;
}

export const WALL_ENVIRONMENTS: WallEnvironmentOption[] = [
  {
    id: 'living-room',
    name: 'Modern Living Room',
    subtitle: 'Warm off-white with natural lighting',
    wallBackground: 'radial-gradient(ellipse at 50% 20%, #f7f6f2 0%, #ebe7dc 65%, #dfdacd 100%)',
    accentElement: 'living-room-couch',
    textColor: 'text-zinc-800',
  },
  {
    id: 'gallery-dark',
    name: 'Luxury Dark Gallery',
    subtitle: 'Moody charcoal with museum spot lighting',
    wallBackground: 'radial-gradient(ellipse at 50% 30%, #2b2c32 0%, #17181c 65%, #0d0e11 100%)',
    accentElement: 'gallery-bench',
    textColor: 'text-zinc-100',
  },
  {
    id: 'boho-studio',
    name: 'Warm Bohemian Loft',
    subtitle: 'Warm beige plaster with plant shadows',
    wallBackground: 'radial-gradient(ellipse at 50% 25%, #f4ede4 0%, #e6dace 70%, #d8c7b8 100%)',
    accentElement: 'boho-plants',
    textColor: 'text-zinc-800',
  },
  {
    id: 'minimal-white',
    name: 'Clean Studio White',
    subtitle: 'Pure studio backdrop for cataloging',
    wallBackground: 'linear-gradient(180deg, #fafafa 0%, #f0f0f2 100%)',
    accentElement: 'clean-floor',
    textColor: 'text-zinc-900',
  },
];
