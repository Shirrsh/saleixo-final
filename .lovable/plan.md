

## Remove Stats Counter Section from /design Page

### Change
Remove the animated Stats Counter bar (showing 500+ Clients, 1000+ Campaigns, 10 Cr+ Revenue, 15+ Years) from the `/design` page.

### Technical Details

**File modified:** `src/pages/Design.tsx`
- Remove the `import StatsCounter` line
- Remove `<StatsCounter />` from the JSX

**Files deleted:**
- `src/components/design/StatsCounter.tsx` (no longer needed)

**Files left untouched:**
- `src/hooks/useAnimatedCounter.tsx` -- kept since it may be used elsewhere in the future

The page flow will go directly from the Hero section into the Core Services grid.

