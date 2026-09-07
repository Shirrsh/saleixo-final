import { useState, useEffect } from 'react';

export type VisitorRegion = 'IN' | 'CN' | 'US' | 'GLOBAL';

const STORAGE_COUNTRY_KEY = 'saleixo_visitor_country';
const STORAGE_OVERRIDE_KEY = 'saleixo_visitor_region_override';

export function mapCountryToRegion(countryCode: string): VisitorRegion {
  const code = (countryCode || '').toUpperCase().trim();
  if (code === 'IN') return 'IN';
  if (['CN', 'HK', 'TW', 'MO'].includes(code)) return 'CN';
  if (['US', 'CA'].includes(code)) return 'US';
  return 'GLOBAL';
}

function getInitialRegionAndCountry(): { country: string; region: VisitorRegion } {
  // 1. Check if user manually selected a region override for previewing
  if (typeof window !== 'undefined') {
    const override = localStorage.getItem(STORAGE_OVERRIDE_KEY) as VisitorRegion | null;
    if (override && ['IN', 'CN', 'US', 'GLOBAL'].includes(override)) {
      const countryCode = override === 'IN' ? 'IN' : override === 'CN' ? 'CN' : override === 'US' ? 'US' : 'GLOBAL';
      return { country: countryCode, region: override };
    }

    // 2. Check cached country from previous IP lookup
    const cachedCountry = localStorage.getItem(STORAGE_COUNTRY_KEY);
    if (cachedCountry) {
      return {
        country: cachedCountry,
        region: mapCountryToRegion(cachedCountry),
      };
    }

    // 3. Instant 0ms heuristic via client timezone
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
      if (tz.includes('Calcutta') || tz.includes('Kolkata')) {
        return { country: 'IN', region: 'IN' };
      }
      if (
        tz.includes('Shanghai') ||
        tz.includes('Beijing') ||
        tz.includes('Chongqing') ||
        tz.includes('Urumqi') ||
        tz.includes('Hong_Kong') ||
        tz.includes('Taipei')
      ) {
        return { country: 'CN', region: 'CN' };
      }
      if (
        tz.includes('New_York') ||
        tz.includes('Chicago') ||
        tz.includes('Los_Angeles') ||
        tz.includes('Denver') ||
        tz.includes('Phoenix') ||
        tz.includes('Detroit') ||
        tz.includes('Boise') ||
        tz.includes('Anchorage') ||
        tz.includes('Honolulu') ||
        tz.includes('Toronto') ||
        tz.includes('Vancouver') ||
        tz.startsWith('America/')
      ) {
        return { country: 'US', region: 'US' };
      }
    } catch {
      // Heuristic failed, fall through to default
    }
  }

  return { country: 'US', region: 'GLOBAL' };
}

export function useVisitorGeo() {
  const [{ country, region }, setGeoState] = useState<{ country: string; region: VisitorRegion }>(
    getInitialRegionAndCountry
  );

  useEffect(() => {
    // If user has an explicit manual override, preserve it
    const override = localStorage.getItem(STORAGE_OVERRIDE_KEY) as VisitorRegion | null;
    if (override && ['IN', 'CN', 'US', 'GLOBAL'].includes(override)) {
      return;
    }

    // If country is already cached, no need to fetch again
    const cachedCountry = localStorage.getItem(STORAGE_COUNTRY_KEY);
    if (cachedCountry) {
      return;
    }

    // Background non-blocking IP lookup
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    fetch('https://api.country.is', { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error('Geo IP error');
        return res.json();
      })
      .then((data) => {
        if (data && typeof data.country === 'string') {
          const resolvedCountry = data.country.toUpperCase();
          localStorage.setItem(STORAGE_COUNTRY_KEY, resolvedCountry);
          setGeoState({
            country: resolvedCountry,
            region: mapCountryToRegion(resolvedCountry),
          });
        }
      })
      .catch(() => {
        // Silently fallback to timezone heuristic without disruption
      })
      .finally(() => {
        clearTimeout(timeoutId);
      });

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, []);

  const setRegionOverride = (newRegion: VisitorRegion | null) => {
    if (!newRegion) {
      localStorage.removeItem(STORAGE_OVERRIDE_KEY);
      const fallback = getInitialRegionAndCountry();
      setGeoState(fallback);
      return;
    }
    localStorage.setItem(STORAGE_OVERRIDE_KEY, newRegion);
    const mockCountry = newRegion === 'IN' ? 'IN' : newRegion === 'CN' ? 'CN' : newRegion === 'US' ? 'US' : 'GLOBAL';
    setGeoState({ country: mockCountry, region: newRegion });
  };

  return {
    country,
    region,
    isIN: region === 'IN',
    isCN: region === 'CN',
    isUS: region === 'US',
    isGlobal: region === 'GLOBAL',
    setRegionOverride,
  };
}
