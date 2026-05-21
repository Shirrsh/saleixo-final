import { createContext, useContext, useState, ReactNode } from 'react';

// ── Supported currencies ──────────────────────────────────────────────────────

export const CURRENCIES = [
  { code: 'USD', symbol: '$',  label: 'USD – US Dollar',          flag: '🇺🇸', rate: 1 },
  { code: 'INR', symbol: '₹',  label: 'INR – Indian Rupee',        flag: '🇮🇳', rate: 95.3 },
  { code: 'GBP', symbol: '£',  label: 'GBP – British Pound',       flag: '🇬🇧', rate: 0.79 },
  { code: 'EUR', symbol: '€',  label: 'EUR – Euro',                flag: '🇪🇺', rate: 0.93 },
  { code: 'AUD', symbol: 'A$', label: 'AUD – Australian Dollar',   flag: '🇦🇺', rate: 1.55 },
  { code: 'CAD', symbol: 'C$', label: 'CAD – Canadian Dollar',     flag: '🇨🇦', rate: 1.38 },
  { code: 'SGD', symbol: 'S$', label: 'SGD – Singapore Dollar',    flag: '🇸🇬', rate: 1.35 },
  { code: 'AED', symbol: 'د.إ', label: 'AED – UAE Dirham',         flag: '🇦🇪', rate: 3.67 },
  { code: 'SAR', symbol: '﷼',  label: 'SAR – Saudi Riyal',         flag: '🇸🇦', rate: 3.75 },
  { code: 'JPY', symbol: '¥',  label: 'JPY – Japanese Yen',        flag: '🇯🇵', rate: 155 },
  { code: 'CNY', symbol: '¥',  label: 'CNY – Chinese Yuan',        flag: '🇨🇳', rate: 7.25 },
  { code: 'MYR', symbol: 'RM', label: 'MYR – Malaysian Ringgit',   flag: '🇲🇾', rate: 4.72 },
  { code: 'BDT', symbol: '৳',  label: 'BDT – Bangladeshi Taka',    flag: '🇧🇩', rate: 110 },
  { code: 'PKR', symbol: '₨',  label: 'PKR – Pakistani Rupee',     flag: '🇵🇰', rate: 278 },
  { code: 'LKR', symbol: 'Rs', label: 'LKR – Sri Lankan Rupee',    flag: '🇱🇰', rate: 305 },
] as const;

export type CurrencyCode = typeof CURRENCIES[number]['code'];

// ── Context ───────────────────────────────────────────────────────────────────

interface CurrencyContextValue {
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
  /**
   * Format a price. Pass the USD base price; the context converts it.
   * For INR, pass the hand-crafted INR price as the second arg (used as-is).
   * For all other currencies, the USD value is converted via exchange rate.
   */
  fmt: (usd: number | null | undefined, inr?: number | null | undefined) => string;
  symbol: string;
}

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

const STORAGE_KEY = 'saleixo_currency';

// ── Provider ──────────────────────────────────────────────────────────────────

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as CurrencyCode | null;
    if (saved && CURRENCIES.some((c) => c.code === saved)) return saved;
    return 'USD';
  });

  const setCurrency = (c: CurrencyCode) => {
    localStorage.setItem(STORAGE_KEY, c);
    setCurrencyState(c);
  };

  const currencyMeta = CURRENCIES.find((c) => c.code === currency)!;

  const fmt = (usd: number | null | undefined, inr?: number | null | undefined): string => {
    if (usd == null) return 'Custom';

    // INR: use the hand-crafted price if provided, otherwise convert
    if (currency === 'INR') {
      const amount = inr ?? Math.round(usd * currencyMeta.rate);
      return `₹${amount.toLocaleString('en-IN')}`;
    }

    // JPY / CNY — no decimal places
    const converted = usd * currencyMeta.rate;
    const noDecimals = currency === 'JPY' || currency === 'CNY';
    const formatted = noDecimals
      ? Math.round(converted).toLocaleString()
      : converted.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 });

    return `${currencyMeta.symbol}${formatted}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, fmt, symbol: currencyMeta.symbol }}>
      {children}
    </CurrencyContext.Provider>
  );
}

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useCurrency(): CurrencyContextValue {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error('useCurrency must be used inside CurrencyProvider');
  return ctx;
}
