import { useCurrency, CURRENCIES, CurrencyCode } from '@/context/CurrencyContext';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface CurrencyToggleProps {
  className?: string;
}

export default function CurrencyToggle({ className }: CurrencyToggleProps) {
  const { currency, setCurrency } = useCurrency();

  return (
    <Select value={currency} onValueChange={(v) => setCurrency(v as CurrencyCode)}>
      <SelectTrigger
        className={cn(
          'w-auto min-w-[160px] h-9 rounded-full border border-border bg-muted/40 px-4 text-xs font-semibold',
          className,
        )}
        aria-label="Select currency"
      >
        <SelectValue>
          {(() => {
            const meta = CURRENCIES.find((c) => c.code === currency);
            return meta ? `${meta.flag} ${meta.code}` : currency;
          })()}
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="max-h-72">
        {CURRENCIES.map((c) => (
          <SelectItem key={c.code} value={c.code} className="text-xs">
            <span className="mr-2">{c.flag}</span>
            {c.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
