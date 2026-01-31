# Match Original Site Design

## TL;DR

> **Quick Summary**: Replace text-based filter buttons with icon-based filters in Header, and modify ProductCard to show product name below the image instead of price overlay.
> 
> **Deliverables**:
> - Header with icon-based category/color filters (TShirt, Dress, GridFour icons + color circles)
> - ProductCard with name displayed below image (price overlay removed)
> - Updated tests for Header and ProductCard components
> 
> **Estimated Effort**: Medium (3-4 hours)
> **Parallel Execution**: YES - 2 waves
> **Critical Path**: Task 1 → Task 3 | Task 2 → Task 4

---

## Context

### Original Request
Modify existing React shopping website to match a reference original site. Key differences:
1. Header uses icon-based filters instead of text buttons
2. ProductCard shows name below image, not price overlay on image
3. Verify 5-column grid matches (already confirmed matching)

### Interview Summary
**Key Discussions**:
- Icon source: Use @phosphor-icons/react (already installed) - `TShirt`, `Dress`, `GridFour`
- Color filters: Use colored MUI Box circles (borderRadius: 50%)
- ProductCard layout: Name below image, card height increases to accommodate
- Test strategy: Add tests AFTER implementation

**Research Findings**:
- Phosphor icons confirmed available: `TShirt.es.js`, `Dress.es.js`, `GridFour.es.js`
- Current test baseline: 22 tests passing (8 test files)
- Grid columns already match: smallDesktop (1024-1439px) = 5 columns at zoom0
- Header already uses Phosphor: `Plus`, `ArrowLeft`, `ShoppingBag`

### Gap Analysis
**Verified**:
- Icon availability confirmed in node_modules
- Test infrastructure exists (vitest + @testing-library/react)
- All 22 existing tests pass as baseline

**Identified Issues to Address**:
- Header.test.jsx (lines 25-29) tests for text "All", "Men", "Women" - must update for icons
- ProductCard.test.jsx (lines 22-24, 30) tests for price "$89.99" - must update for name

---

## Work Objectives

### Core Objective
Transform the shopping site's Header and ProductCard components to match the original site's visual design using icons for filters and displaying product names below images.

### Concrete Deliverables
- `src/components/Header/Header.jsx` - Icon-based filter UI
- `src/components/ProductCard/ProductCard.jsx` - Name-below-image layout
- `src/components/Header/Header.test.jsx` - Updated tests for icon filters
- `src/components/ProductCard/ProductCard.test.jsx` - Updated tests for name display

### Definition of Done
- [x] Header displays: GridFour icon, TShirt icon, Dress icon, "all" text, white circle, black circle
- [x] ProductCard shows product name centered below image (no price overlay)
- [x] All tests pass: `pnpm test -- --run` → 22+ tests passing
- [x] Visual verification: `pnpm dev` → UI matches original reference

### Must Have
- Icon-based gender filters using Phosphor icons (TShirt, Dress, GridFour)
- Colored circle buttons for color filters (white, black with border)
- Product name typography below image area
- Existing filter functionality preserved (onFilterChange callbacks work)
- Existing hover/video behavior on ProductCard preserved

### Must NOT Have (Guardrails)
- NO changes to ProductDetailView component
- NO changes to grid column configuration (already matches)
- NO changes to cart functionality
- NO removal of existing animation behaviors
- NO modification of responsive breakpoints
- NO changes to product data structure
- NO price display in grid view (price only shown in detail view)

---

## Verification Strategy

### Test Decision
- **Infrastructure exists**: YES (vitest + @testing-library/react)
- **User wants tests**: YES (Tests after implementation)
- **Framework**: vitest

### Verification Approach
1. Implement component changes first
2. Update tests to match new UI
3. Run full test suite to verify

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Start Immediately):
├── Task 1: Header icon-based filters
└── Task 2: ProductCard name-below layout

Wave 2 (After Wave 1):
├── Task 3: Header tests update [depends: 1]
└── Task 4: ProductCard tests update [depends: 2]

Critical Path: Task 1 → Task 3 (Header flow)
              Task 2 → Task 4 (ProductCard flow)
Parallel Speedup: ~50% faster than sequential
```

### Dependency Matrix

| Task | Depends On | Blocks | Can Parallelize With |
|------|------------|--------|---------------------|
| 1 | None | 3 | 2 |
| 2 | None | 4 | 1 |
| 3 | 1 | None | 4 |
| 4 | 2 | None | 3 |

### Agent Dispatch Summary

| Wave | Tasks | Recommended Agents |
|------|-------|-------------------|
| 1 | 1, 2 | `category="visual-engineering"` with `load_skills=["frontend-ui-ux"]` |
| 2 | 3, 4 | `category="quick"` (test updates are straightforward) |

---

## TODOs

- [x] 1. Replace Header text filters with icon-based filters
  
  **What to do**:
  - Import `TShirt`, `Dress`, `GridFour` from `@phosphor-icons/react`
  - Replace gender filter buttons (lines 80-101) with icon buttons:
    - `GridFour` icon for "all" category (or keep "all" text as per original)
    - `TShirt` icon for male filter
    - `Dress` icon for female filter
  - Replace color filter buttons (lines 106-127) with colored circle buttons:
    - "all" text label (as per original)
    - White circle (`backgroundColor: '#fff'`, `border: '1px solid #ccc'`)
    - Black/grey circle (`backgroundColor: '#333'` or `#000`)
  - Use IconButton component (already imported) instead of Button
  - Maintain active state styling (visual feedback for selected filter)
  - Preserve existing callback structure (`handleGenderFilter`, `handleColorFilter`)

  **Must NOT do**:
  - Do not modify zoom button behavior (left side)
  - Do not modify cart button (right side)
  - Do not change filter state management logic
  - Do not change responsive header padding/sizing

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: UI component modification requiring visual design sensibility
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Icon-based UI design, visual hierarchy, active states
  - **Skills Evaluated but Omitted**:
    - `frontend-design`: Not needed, this is modification not creation

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Task 2)
  - **Blocks**: Task 3
  - **Blocked By**: None (can start immediately)

  **References**:

  **Pattern References**:
  - `src/components/Header/Header.jsx:62-75` - Existing IconButton pattern for zoom button
  - `src/components/Header/Header.jsx:133-144` - Existing IconButton pattern for cart button
  - `src/components/Header/Header.jsx:7` - Current Phosphor import statement to extend

  **API/Type References**:
  - `src/components/Header/Header.jsx:14-15` - Filter state shape: `{ gender: 'all', color: 'all' }`
  - `src/components/Header/Header.jsx:33-39` - Filter callback signatures

  **External References**:
  - Phosphor Icons: `https://phosphoricons.com/` - Icon browser for TShirt, Dress, GridFour
  - MUI IconButton: `https://mui.com/material-ui/api/icon-button/` - API reference

  **WHY Each Reference Matters**:
  - Lines 62-75: Exact IconButton styling pattern to follow for consistency
  - Lines 133-144: Badge integration pattern (not needed here, but shows IconButton usage)
  - Line 7: Extend this import with new icons

  **Acceptance Criteria**:

  **Manual Execution Verification:**
  - [ ] Using dev server verification:
    - Run: `pnpm dev`
    - Navigate to: `http://localhost:5173`
    - Verify: Header center section shows icons instead of text buttons
    - Verify: TShirt icon visible, clicking filters to male products
    - Verify: Dress icon visible, clicking filters to female products  
    - Verify: GridFour or "all" text resets gender filter
    - Verify: White circle visible, clicking filters to white products
    - Verify: Black circle visible, clicking filters to black products
    - Verify: Active filter has visual distinction (darker background or border)

  **Evidence Required:**
  - [ ] Screenshot of header with icon filters
  - [ ] Console log showing filter state changes on click

  **Commit**: YES
  - Message: `feat(Header): replace text filters with icon-based filters`
  - Files: `src/components/Header/Header.jsx`
  - Pre-commit: `pnpm test -- --run`

---

- [x] 2. Modify ProductCard to show name below image
  
  **What to do**:
  - Remove price overlay section (lines 113-133)
  - Change card structure from overlaid content to stacked layout:
    - Image container: maintains 1:1 aspect ratio
    - Name container: below image, adds to total card height
  - Add Typography for product name below the image:
    - Text: `product.name`
    - Style: centered, minimal (small font, light weight)
    - Padding: small vertical padding (8-12px)
  - Modify motion.div structure to accommodate:
    - Remove `aspectRatio: '1/1'` from outer container
    - Add wrapper for image with `aspectRatio: '1/1'`
    - Add name section below wrapper
  - Preserve all hover/video behavior (handleMouseEnter, handleMouseLeave)
  - Preserve click behavior (handleClick)

  **Must NOT do**:
  - Do not remove video playback on hover
  - Do not remove jogging (reverse playback) animation
  - Do not change image aspect ratio (keep 1:1 for image)
  - Do not add price display anywhere
  - Do not modify animation states/transitions

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Layout restructuring with visual design considerations
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Card layout patterns, typography, visual hierarchy
  - **Skills Evaluated but Omitted**:
    - `frontend-design`: Not creating new component, just restructuring

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Task 1)
  - **Blocks**: Task 4
  - **Blocked By**: None (can start immediately)

  **References**:

  **Pattern References**:
  - `src/components/ProductCard/ProductCard.jsx:59-76` - Current motion.div structure to modify
  - `src/components/ProductCard/ProductCard.jsx:78-92` - Image rendering pattern to preserve
  - `src/components/ProductCard/ProductCard.jsx:95-111` - Video rendering pattern to preserve

  **API/Type References**:
  - `src/data/products.js` - Product shape with `name` property
  - `src/components/ProductCard/ProductCard.test.jsx:5-12` - mockProduct structure showing available fields

  **Test References**:
  - `src/components/ProductCard/ProductCard.test.jsx` - Tests to update in Task 4

  **External References**:
  - MUI Typography: `https://mui.com/material-ui/api/typography/` - API for text styling
  - Framer Motion layout: `https://www.framer.com/motion/layout-animations/` - Layout animation docs

  **WHY Each Reference Matters**:
  - Lines 59-76: This is the structure being modified, understand current layout
  - Lines 78-111: These sections MUST be preserved, only wrapper changes
  - mockProduct: Shows `name: 'White Hoodie'` available for display

  **Acceptance Criteria**:

  **Manual Execution Verification:**
  - [ ] Using dev server verification:
    - Run: `pnpm dev`
    - Navigate to: `http://localhost:5173`
    - Verify: Product cards show square image with name BELOW
    - Verify: No price visible on grid cards
    - Verify: Product name is centered and readable
    - Verify: Hover still triggers video playback
    - Verify: Mouse leave still triggers reverse jog animation
    - Verify: Click still navigates to detail view

  **Evidence Required:**
  - [ ] Screenshot of product grid showing name below images
  - [ ] Video/GIF of hover behavior working correctly

  **Commit**: YES
  - Message: `feat(ProductCard): display name below image, remove price overlay`
  - Files: `src/components/ProductCard/ProductCard.jsx`
  - Pre-commit: `pnpm test -- --run`

---

- [x] 3. Update Header tests for icon-based filters
  
  **What to do**:
  - Update test "renders filter buttons" (lines 25-30):
    - Remove assertions for text "All", "Men", "Women"
    - Add assertions for icon buttons presence (by role or test-id)
  - Update test "calls onFilterChange when filter clicked" (lines 32-37):
    - Change click target from `screen.getByText('Men')` to icon button
    - Consider adding `data-testid` to filter buttons for reliable selection
  - Add new test cases:
    - Test color filter icon/circle clicks
    - Test active state visual feedback

  **Must NOT do**:
  - Do not remove tests for zoom button functionality
  - Do not remove tests for onZoomChange callback
  - Do not change CartProvider wrapper pattern

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Test updates are straightforward, following existing patterns
  - **Skills**: []
    - No special skills needed, standard test updates
  - **Skills Evaluated but Omitted**:
    - `frontend-ui-ux`: Not relevant for test code

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Task 4)
  - **Blocks**: None
  - **Blocked By**: Task 1 (Header implementation must complete first)

  **References**:

  **Pattern References**:
  - `src/components/Header/Header.test.jsx:10-15` - Existing test pattern for button rendering
  - `src/components/Header/Header.test.jsx:17-23` - Existing callback testing pattern
  - `src/components/Header/Header.test.jsx:6-8` - CartProvider wrapper pattern

  **Test References**:
  - `src/components/ProductCard/ProductCard.test.jsx:27-31` - Example of click + callback test

  **External References**:
  - Testing Library queries: `https://testing-library.com/docs/queries/about/`

  **WHY Each Reference Matters**:
  - Lines 10-15: Pattern for testing button presence, adapt for icons
  - Lines 17-23: Pattern for testing click callbacks, need new selector
  - CartProvider wrapper: Must maintain for useCart hook

  **Acceptance Criteria**:

  **Test Execution Verification:**
  - [ ] `pnpm test -- --run src/components/Header/Header.test.jsx` → All tests pass
  - [ ] Tests cover: icon button rendering, gender filter clicks, color filter clicks
  - [ ] No regressions in zoom button tests

  **Evidence Required:**
  - [ ] Terminal output showing Header tests passing

  **Commit**: YES (groups with Task 4)
  - Message: `test(Header, ProductCard): update tests for new UI`
  - Files: `src/components/Header/Header.test.jsx`, `src/components/ProductCard/ProductCard.test.jsx`
  - Pre-commit: `pnpm test -- --run`

---

- [x] 4. Update ProductCard tests for name display
  
  **What to do**:
  - Update test "shows price" (lines 22-25):
    - Rename to "shows product name"
    - Change assertion from `$89.99` to `White Hoodie` (mockProduct.name)
  - Update test "calls onClick when clicked" (lines 27-31):
    - Change click target from price text to product name or card element
    - Use `screen.getByText('White Hoodie')` or container query
  - Ensure "renders product image" test still passes (should work as-is)

  **Must NOT do**:
  - Do not change mockProduct definition
  - Do not remove any existing test coverage
  - Do not add price-related assertions

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Simple test updates with clear before/after
  - **Skills**: []
    - No special skills needed
  - **Skills Evaluated but Omitted**:
    - All skills: Simple text replacement in test file

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Task 3)
  - **Blocks**: None
  - **Blocked By**: Task 2 (ProductCard implementation must complete first)

  **References**:

  **Pattern References**:
  - `src/components/ProductCard/ProductCard.test.jsx:22-25` - Test to modify (price → name)
  - `src/components/ProductCard/ProductCard.test.jsx:27-31` - Test to modify (click target)
  - `src/components/ProductCard/ProductCard.test.jsx:5-12` - mockProduct with `name: 'White Hoodie'`

  **Test References**:
  - `src/components/Header/Header.test.jsx:32-37` - Similar callback test pattern

  **WHY Each Reference Matters**:
  - Lines 22-25: Direct modification target, change `$89.99` to `White Hoodie`
  - Lines 27-31: Click target needs updating from price to name
  - mockProduct: Source of expected name value

  **Acceptance Criteria**:

  **Test Execution Verification:**
  - [ ] `pnpm test -- --run src/components/ProductCard/ProductCard.test.jsx` → All tests pass
  - [ ] Test "shows product name" passes with `White Hoodie` assertion
  - [ ] Test "calls onClick when clicked" passes with new click target
  - [ ] No regressions in image rendering test

  **Evidence Required:**
  - [ ] Terminal output showing ProductCard tests passing

  **Commit**: YES (groups with Task 3)
  - Message: `test(Header, ProductCard): update tests for new UI`
  - Files: `src/components/Header/Header.test.jsx`, `src/components/ProductCard/ProductCard.test.jsx`
  - Pre-commit: `pnpm test -- --run`

---

## Commit Strategy

| After Task | Message | Files | Verification |
|------------|---------|-------|--------------|
| 1 | `feat(Header): replace text filters with icon-based filters` | Header.jsx | `pnpm test -- --run` |
| 2 | `feat(ProductCard): display name below image, remove price overlay` | ProductCard.jsx | `pnpm test -- --run` |
| 3+4 | `test(Header, ProductCard): update tests for new UI` | Header.test.jsx, ProductCard.test.jsx | `pnpm test -- --run` |

---

## Success Criteria

### Verification Commands
```bash
# Run all tests
pnpm test -- --run
# Expected: 22+ tests passing (0 failures)

# Start dev server for visual verification
pnpm dev
# Navigate to http://localhost:5173
# Expected: Icon filters in header, names below product images
```

### Final Checklist
- [x] Header shows icon-based filters (TShirt, Dress, GridFour/all, color circles)
- [x] ProductCard shows name below image (no price overlay)
- [x] All filter callbacks work correctly
- [x] All hover/video behaviors preserved
- [x] All 22+ tests pass
- [x] Visual appearance matches original reference
