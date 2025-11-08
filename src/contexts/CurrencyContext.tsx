import React, { createContext, useContext, ReactNode } from 'react';
import { useGeoLocation } from '@/hooks/useGeoLocation';

interface CurrencyContextType {
  countryCode: string;
  countryName: string;
  loading: boolean;
  updateCountry: (code: string, name: string) => void;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { location, loading, updateLocation } = useGeoLocation();

  const updateCountry = (code: string, name: string) => {
    updateLocation(code, name);
  };

  return (
    <CurrencyContext.Provider
      value={{
        countryCode: location.countryCode,
        countryName: location.countryName,
        loading,
        updateCountry,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within CurrencyProvider');
  }
  return context;
};
