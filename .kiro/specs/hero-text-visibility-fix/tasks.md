# Implementation Plan

- [ ] 1. Write bug condition exploration test
  - **Property 1: Bug Condition** - Hero Text Contrast Visibility Test
  - **CRITICAL**: This test MUST FAIL on unfixed code - failure confirms the bug exists
  - **DO NOT attempt to fix the test or the code when it fails**
  - **NOTE**: This test encodes the expected behavior - it will validate the fix when it passes after implementation
  - **GOAL**: Surface counterexamples that demonstrate the text visibility bug exists
  - **Scoped PBT Approach**: For deterministic bugs, scope the property to the concrete failing case(s) to ensure reproducibility
  - Test that hero text elements (main heading, subtitle, eyebrow badge) have insufficient contrast against animated backgrounds
  - Verify contrast ratios are below WCAG AA standard (4.5:1) for normal text
  - Test both dark mode and light mode scenarios where text appears faint or invisible
  - Run test on UNFIXED code
  - **EXPECTED OUTCOME**: Test FAILS (this is correct - it proves the bug exists)
  - Document counterexamples found to understand root cause (missing text shadows, insufficient background separation, competing visual elements)
  - Mark task complete when test is written, run, and failure is documented
  - _Requirements: 1.1, 1.2, 1.3, 1.4_

- [ ] 2. Write preservation property tests (BEFORE implementing fix)
  - **Property 2: Preservation** - Background Animation Integrity Test
  - **IMPORTANT**: Follow observation-first methodology
  - Observe behavior on UNFIXED code for background animation elements (metallic textures, auras, blob animations)
  - Write property-based tests capturing observed behavior patterns from Preservation Requirements
  - Test that metallic gradient textures and background animations display exactly as before
  - Test that aura glows and morphing blob animations remain unchanged in timing, colors, and effects
  - Test that theme switching between light and dark modes continues to work with existing background styling
  - Test that button hover effects, stats animations, and scrolling gallery columns remain unaffected
  - Property-based testing generates many test cases for stronger guarantees
  - Run tests on UNFIXED code
  - **EXPECTED OUTCOME**: Tests PASS (this confirms baseline behavior to preserve)
  - Mark task complete when tests are written, run, and passing on unfixed code
  - _Requirements: 3.1, 3.2, 3.3, 3.4_

- [-] 3. Fix for hero text visibility issues

  - [ ] 3.1 Implement enhanced text shadows and contrast improvements
    - Add CSS text-shadow properties to all text elements in Hero.tsx
    - Dark mode: Add blue/white glow shadows for separation from dark backgrounds
    - Light mode: Add subtle dark shadows for depth and contrast
    - Strengthen background glow by increasing radial gradient opacity from 0.06-0.18 to 0.15-0.35
    - Add additional backdrop blur effects for text isolation using backdrop-filter
    - Implement semi-transparent backdrop elements behind text sections
    - Optimize z-index values to guarantee text appears above all background elements
    - Add theme-specific enhancements: enhanced glow effects for dark mode, improved background separation for light mode
    - _Bug_Condition: isBugCondition(input) where input.textType IN ['main-heading', 'subtitle', 'eyebrow-badge'] AND input.hasAnimatedBackground = true AND input.contrastRatio < 4.5_
    - _Expected_Behavior: expectedTextVisibility(result) where result maintains high contrast and readability regardless of background animations_
    - _Preservation: Preservation Requirements - metallic textures, auras, blob animations, and theme-based styling remain unchanged_
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 3.1, 3.2, 3.3, 3.4_

  - [ ] 3.2 Verify bug condition exploration test now passes
    - **Property 1: Expected Behavior** - Hero Text Contrast Visibility Test
    - **IMPORTANT**: Re-run the SAME test from task 1 - do NOT write a new test
    - The test from task 1 encodes the expected behavior
    - When this test passes, it confirms the expected behavior is satisfied
    - Run bug condition exploration test from step 1
    - **EXPECTED OUTCOME**: Test PASSES (confirms bug is fixed)
    - Verify that hero text elements now have sufficient contrast ratios (≥4.5:1) against animated backgrounds
    - Confirm text shadows and backdrop effects provide adequate separation
    - _Requirements: Expected Behavior Properties from design - high contrast text visibility in both themes_

  - [ ] 3.3 Verify preservation tests still pass
    - **Property 2: Preservation** - Background Animation Integrity Test
    - **IMPORTANT**: Re-run the SAME tests from task 2 - do NOT write new tests
    - Run preservation property tests from step 2
    - **EXPECTED OUTCOME**: Tests PASS (confirms no regressions)
    - Confirm all background animations (metallic textures, auras, blobs) continue working identically after fix
    - Verify theme switching maintains background styling transitions correctly
    - Ensure mouse interaction parallax effects and hover states continue working
    - Confirm all tests still pass after fix (no regressions)

- [ ] 4. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise
  - Verify hero text is clearly readable in both light and dark themes
  - Confirm background animations and visual effects remain unchanged
  - Test cross-browser compatibility for text shadows and backdrop filters
  - Validate WCAG AA contrast ratio compliance for all text elements