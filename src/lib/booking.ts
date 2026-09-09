export function openCalendarBooking() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('open-calendar-booking'));
  }
}

export function openQuickAudit() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('open-quick-audit'));
  }
}

