import { useState, useEffect } from 'react';

export interface GeoLocation {
  countryCode: string;
  countryName: string;
  city?: string;
  detected: boolean;
}

export const useGeoLocation = () => {
  const [location, setLocation] = useState<GeoLocation>({
    countryCode: 'IN',
    countryName: 'India',
    detected: false,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const detectLocation = async () => {
      try {
        // Check if location is already stored
        const stored = localStorage.getItem('user-location');
        if (stored) {
          const parsed = JSON.parse(stored);
          setLocation({ ...parsed, detected: true });
          setLoading(false);
          return;
        }

        // Detect using ipapi.co (free, no API key required)
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();

        if (data.country_code) {
          const geoData = {
            countryCode: data.country_code,
            countryName: data.country_name,
            city: data.city,
            detected: true,
          };
          setLocation(geoData);
          localStorage.setItem('user-location', JSON.stringify(geoData));
        } else {
          // Fallback to India
          setLocation({
            countryCode: 'IN',
            countryName: 'India',
            detected: false,
          });
        }
      } catch (error) {
        console.error('Geo-location detection failed:', error);
        // Fallback to India
        setLocation({
          countryCode: 'IN',
          countryName: 'India',
          detected: false,
        });
      } finally {
        setLoading(false);
      }
    };

    detectLocation();
  }, []);

  const updateLocation = (countryCode: string, countryName: string) => {
    const newLocation = {
      countryCode,
      countryName,
      detected: true,
    };
    setLocation(newLocation);
    localStorage.setItem('user-location', JSON.stringify(newLocation));
  };

  return { location, loading, updateLocation };
};
