import { useRef, useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useCurrency, CURRENCIES, CurrencyCode } from '@/context/CurrencyContext';
import { cn } from '@/lib/utils';

interface CurrencyToggleProps {
  className?: string;
}

export default function CurrencyToggle({ className }: CurrencyToggleProps) {
  const { currency, setCurrency } = useCurrency();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = CURRENCIES.find((c) => c.code === currency)!;

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  return (
    <div ref={ref} className={cn('relative inline-block', className)}>
      {/* Trigger pill */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Select currency"
        className={cn(
          'inline-flex items-center gap-2 h-9 px-4 rounded-full text-sm font-medium',
          'border border-border/60 bg-background/80 backdrop-blur-sm',
          'text-foreground shadow-sm',
          'transition-all duration-200',
          'hover:border-primary/40 hover:bg-muted/60 hover:shadow-md',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30',
          open && 'border-primary/40 bg-muted/60 shadow-md',
        )}
      >
        <span className="text-base leading-none">{selected.flag}</span>
        <span className="tracking-wide">{selected.code}</span>
        <ChevronDown
          className={cn(
            'w-3.5 h-3.5 text-muted-foreground transition-transform duration-200',
            open && 'rotate-180',
          )}
          strokeWidth={2}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div
          role="listbox"
          aria-label="Currency options"
          className={cn(
            'absolute z-50 mt-2 w-52 rounded-xl border border-border/60',
            'bg-background/95 backdrop-blur-md shadow-xl shadow-black/10',
            'py-1.5 overflow-y-auto max-h-72',
            // Position: center below trigger
            'left-1/2 -translate-x-1/2',
          )}
        >
          {CURRENCIES.map((c) => {
            const isActive = c.code === currency;
            return (
              <button
                key={c.code}
                role="option"
                aria-selected={isActive}
                type="button"
                onClick={() => {
                  setCurrency(c.code as CurrencyCode);
                  setOpen(false);
                }}
                className={cn(
                  'w-full flex items-center gap-3 px-3.5 py-2 text-sm text-left',
                  'transition-colors duration-150',
                  isActive
                    ? 'bg-primary/8 text-primary font-semibold'
                    : 'text-foreground hover:bg-muted/70',
                )}
              >
                <span className="text-base w-5 text-center leading-none">{c.flag}</span>
                <span className="flex-1 truncate">{c.label}</span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
