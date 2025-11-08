export type Currency = 'USD' | 'GBP' | 'EUR' | 'CAD' | 'AUD' | 'SGD' | 'AED' | 'THB' | 'PHP' | 'INR';

export type PricingTier = 'premium' | 'mid-premium' | 'premium-emerging' | 'entry' | 'base';

export interface CountryConfig {
  code: string;
  name: string;
  currency: Currency;
  symbol: string;
  tier: PricingTier;
  multiplier: number;
  flag: string;
}

export interface PricingPackage {
  id: string;
  name: string;
  basePrice: number; // Base price in INR
  features: string[];
  popular?: boolean;
}

export const COUNTRIES: Record<string, CountryConfig> = {
  // TIER 1 - PREMIUM
  US: { code: 'US', name: 'United States', currency: 'USD', symbol: '$', tier: 'premium', multiplier: 6.0, flag: '🇺🇸' },
  GB: { code: 'GB', name: 'United Kingdom', currency: 'GBP', symbol: '£', tier: 'premium', multiplier: 4.68, flag: '🇬🇧' },
  DE: { code: 'DE', name: 'Germany', currency: 'EUR', symbol: '€', tier: 'premium', multiplier: 5.4, flag: '🇩🇪' },
  FR: { code: 'FR', name: 'France', currency: 'EUR', symbol: '€', tier: 'premium', multiplier: 5.4, flag: '🇫🇷' },
  NL: { code: 'NL', name: 'Netherlands', currency: 'EUR', symbol: '€', tier: 'premium', multiplier: 5.4, flag: '🇳🇱' },
  
  // TIER 2 - MID-PREMIUM
  CA: { code: 'CA', name: 'Canada', currency: 'CAD', symbol: 'C$', tier: 'mid-premium', multiplier: 5.5, flag: '🇨🇦' },
  AU: { code: 'AU', name: 'Australia', currency: 'AUD', symbol: 'A$', tier: 'mid-premium', multiplier: 5.5, flag: '🇦🇺' },
  SG: { code: 'SG', name: 'Singapore', currency: 'SGD', symbol: 'S$', tier: 'mid-premium', multiplier: 5.0, flag: '🇸🇬' },
  
  // TIER 3 - PREMIUM EMERGING
  AE: { code: 'AE', name: 'UAE', currency: 'AED', symbol: 'AED', tier: 'premium-emerging', multiplier: 4.0, flag: '🇦🇪' },
  SA: { code: 'SA', name: 'Saudi Arabia', currency: 'AED', symbol: 'AED', tier: 'premium-emerging', multiplier: 4.0, flag: '🇸🇦' },
  
  // TIER 4 - ENTRY
  TH: { code: 'TH', name: 'Thailand', currency: 'THB', symbol: '฿', tier: 'entry', multiplier: 3.0, flag: '🇹🇭' },
  PH: { code: 'PH', name: 'Philippines', currency: 'PHP', symbol: '₱', tier: 'entry', multiplier: 2.8, flag: '🇵🇭' },
  VN: { code: 'VN', name: 'Vietnam', currency: 'THB', symbol: '฿', tier: 'entry', multiplier: 2.5, flag: '🇻🇳' },
  
  // TIER 5 - BASE
  IN: { code: 'IN', name: 'India', currency: 'INR', symbol: '₹', tier: 'base', multiplier: 1.0, flag: '🇮🇳' },
};

export const CURRENCY_RATES: Record<Currency, number> = {
  USD: 0.012, // 1 INR = 0.012 USD
  GBP: 0.0094,
  EUR: 0.011,
  CAD: 0.0162,
  AUD: 0.018,
  SGD: 0.0163,
  AED: 0.044,
  THB: 0.41,
  PHP: 0.65,
  INR: 1.0,
};

export const PACKAGES: PricingPackage[] = [
  {
    id: 'starter',
    name: 'Starter Pack',
    basePrice: 41500,
    features: [
      '1 Service (Photography/Design/Marketing)',
      '20 Product Images or 10 Designs',
      '2 Revisions',
      '5-7 Day Delivery',
      'Basic Support',
    ],
  },
  {
    id: 'growth',
    name: 'Growth Pack',
    basePrice: 124500,
    popular: true,
    features: [
      '2 Services Combined',
      '50 Product Images + 20 Designs',
      'Unlimited Revisions',
      '3-5 Day Delivery',
      'Priority Support',
      'Free Brand Consultation',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise Pack',
    basePrice: 290500,
    features: [
      'All 3 Services',
      '100+ Product Images',
      '50+ Custom Designs',
      'Unlimited Revisions',
      '24-48hr Rush Delivery',
      'Dedicated Account Manager',
      'Monthly Strategy Calls',
    ],
  },
];

export function getConvertedPrice(basePriceINR: number, countryCode: string): number {
  const country = COUNTRIES[countryCode] || COUNTRIES['IN'];
  const currency = country.currency;
  const rate = CURRENCY_RATES[currency];
  
  // Convert INR to target currency and apply tier multiplier
  return Math.round((basePriceINR * rate * country.multiplier) / 10) * 10;
}

export function formatPrice(price: number, countryCode: string): string {
  const country = COUNTRIES[countryCode] || COUNTRIES['IN'];
  return `${country.symbol}${price.toLocaleString()}`;
}
