import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useCurrency } from '@/contexts/CurrencyContext';
import { COUNTRIES } from '@/config/pricing';

const CurrencySelector = () => {
  const { countryCode, countryName, updateCountry } = useCurrency();
  const currentCountry = COUNTRIES[countryCode] || COUNTRIES['IN'];

  const sortedCountries = Object.values(COUNTRIES).sort((a, b) => 
    a.name.localeCompare(b.name)
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Globe className="w-4 h-4" />
          <span className="hidden sm:inline">
            {currentCountry.flag} {currentCountry.name}
          </span>
          <span className="sm:hidden">
            {currentCountry.flag}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 max-h-96 overflow-y-auto bg-background" align="end">
        <div className="space-y-2">
          <div className="pb-2 border-b border-border">
            <h4 className="font-semibold text-sm text-foreground">Select Your Region</h4>
            <p className="text-xs text-muted-foreground">Prices will update automatically</p>
          </div>
          <div className="space-y-1">
            {sortedCountries.map((country) => (
              <button
                key={country.code}
                onClick={() => updateCountry(country.code, country.name)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                  country.code === countryCode
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-accent text-foreground'
                }`}
              >
                <span className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span>{country.flag}</span>
                    <span>{country.name}</span>
                  </span>
                  <span className="text-xs opacity-75">
                    {country.symbol}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default CurrencySelector;
