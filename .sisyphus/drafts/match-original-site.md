# Draft: Match Original Site Design

## Requirements (confirmed)
- Replace text-based filter buttons with icon-based filters
- Remove price overlay from ProductCard
- Show product name BELOW image (not overlaid)
- Verify 5-column grid layout matches original

## Technical Findings

### Header.jsx (lines 78-130)
- Currently uses MUI Button components for filters
- Text-based: "All", "Men", "Women" | "All", "Black", "White"  
- Already uses @phosphor-icons/react for Plus, ArrowLeft, ShoppingBag
- Filter state: `{ gender: 'all', color: 'all' }`

### ProductCard.jsx (lines 113-133)
- Price overlay at bottom with gradient background
- Shows `${product.price.toFixed(2)}`
- Uses motion.div for animations
- aspect-ratio: 1/1 (square cards)

### responsive.js
- smallDesktop (1024-1439px): zoom0 = 5 columns ✓
- Grid column system already supports 5 columns at smallDesktop breakpoint

## Icon Requirements (from user description)
Original header icons (left to right):
1. "+" icon (already present)
2. Grid icon (category filter?)
3. T-shirt icon (male)
4. Dress icon (female)
5. "all" text
6. White circle (color filter)
7. Grey circle (color filter)
8. Cart icon (already present)

## Confirmed Decisions

### Icon Source (CONFIRMED)
- Use @phosphor-icons/react (already installed)
- `TShirt` icon for male filter
- `Dress` icon for female filter
- `SquaresFour` icon for grid/all category
- Colored `Box` circles for color filters (white, black)

### Product Name Layout (CONFIRMED)
- Name displayed BELOW the image (outside image area)
- Card total height increases to accommodate name
- Name should be centered, minimal style
- Image maintains aspect ratio, name adds to total height

### Test Strategy (CONFIRMED)
- Tests AFTER implementation
- Update existing test files for Header and ProductCard

## Scope Boundaries
- INCLUDE: Header icon filters, ProductCard layout changes, tests after
- EXCLUDE: Cart functionality, ProductDetailView, animations, grid column changes
