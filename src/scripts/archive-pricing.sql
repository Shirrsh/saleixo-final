-- Archive pricing data by marking all pricing tiers as inactive
-- This preserves historical data while removing it from public view

UPDATE pricing_tiers
SET is_active = FALSE
WHERE is_active = TRUE;

-- Query to verify all pricing is now inactive
-- SELECT * FROM pricing_tiers WHERE is_active = FALSE;
