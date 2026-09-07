export function openCalendarBooking() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('open-calendar-booking'));
  }
}
