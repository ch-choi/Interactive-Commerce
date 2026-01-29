# Product Detail View Implementation Plan

Based on the analysis of the `dynamic-grid` website and its codebase, this plan outlines the steps to implement the Product Detail (Quick View) feature. This feature allows users to view product images in a modal with a unique "2D Matrix" navigation system.

## 1. Overview
The target component is a full-screen or large overlay modal that displays product media. Key interactions include:
- **Horizontal Navigation**: Switch between images of the *same* product.
- **Vertical Navigation**: Switch between different products (Up/Down).
- **Keyboard & Wheel Support**: Navigation via arrow keys and mouse wheel.

## 2. Analyzed Components
The analysis identified the following key components:

### A. Core Components
1.  **`ProductDetailView`** (Container)
    -   **Role**: Manages the modal visibility, animation (enter/exit), and the close action.
    -   **Styling**: Fixed position, high z-index, semi-opaque white background (`rgba(255, 255, 255, 0.98)`).
    -   **Dependencies**: `framer-motion` for `AnimatePresence`.

2.  **`Matrix2DCarousel`** (Logic & Layout)
    -   **Role**: Handles the "2D" state logic (`productIndex` and `imageIndex`).
    -   **Interactions**:
        -   Left/Right: Change Image (`imageIndex`).
        -   Up/Down: Change Product (`productIndex`).
        -   Scroll: Change Product.
    -   **Layout**: Centers the `MediaRenderer` and positions arrow buttons.

### B. UI & Media Components
3.  **`MediaRenderer`**
    -   **Role**: Renders Image or Video based on file extension.
    -   **Animation**: Handles slide transitions (`enter`, `center`, `exit` variants) using `framer-motion`.

4.  **`ArrowButton`**
    -   **Role**: Circular navigation buttons with directional arrows (<, >, ^, v).
    -   **Styling**: Absolute positioning, hover effects.

5.  **`Indicator`**
    -   **Role**: Visual dots at the bottom indicating the current image index.

## 3. Implementation Steps

### Phase 1: Foundation (UI Components)
Create reusable UI atoms to ensure consistent styling.

1.  **Create `ArrowButton`**:
    -   **Path**: `src/common/ui/ArrowButton.jsx`
    -   Use `IconButton` (MUI) as the base.
    -   Accept `direction` prop ('left', 'right', 'up', 'down') to render appropriate icon/text.
    -   Implement absolute positioning logic based on direction.

2.  **Create `Indicator`**:
     -   **Path**: `src/common/ui/Indicator.jsx`
    -   Render a row of dots based on `total` count.
    -   Highlight the `current` dot.
    -   Allow clicking dots to jump to a specific index.

### Phase 2: Media Handling
Implement the display layer for product assets.

3.  **Create `MediaRenderer`**:
     -   **Path**: `src/common/media/MediaRenderer.jsx`
    -   Accept `src` and `type` (or auto-detect video).
    -   Wrap content in `motion.div` (or `motion.img`/`motion.video`).
    -   Define `variants` for slide animations (entering from left/right).

### Phase 3: Core Logic (The Matrix)
Implement the unique 2D navigation hook/component.

4.  **Develop `Matrix2DCarousel`**:
     -   **Path**: `src/components/Matrix2DCarousel/Matrix2DCarousel.jsx`
    -   **State**: `productIndex`, `imageIndex`, `direction`.
    -   **Handlers**:
        -   `goToNextImage`: `(imageIndex + 1) % distinctImages`.
        -   `goToNextProduct`: `(productIndex + 1) % products.length` (Reset `imageIndex` to 0).
    -   **Effects**:
        -   Listen for `keydown` (Arrows, Escape).
        -   Listen for `wheel` events (throttled) for product switching.

### Phase 4: Integration
Assemble the modal.

5.  **Build `ProductDetailView`**:
     -   **Path**: `src/components/ProductDetailView/ProductDetailView.jsx`
    -   Wrap `Matrix2DCarousel` in `AnimatePresence` + `motion.div`.
    -   Add a "Close" button (top-right).
    -   Manage open/closed state (or route).

## 4. Technical Requirements
-   **Framework**: React
-   **Styling**: MUI (Material UI) or Emotional/styled-components.
-   **Animation**: `framer-motion` (Critical for the smooth slide/fade effects).
-   **Icons**: `@phosphor-icons/react` (for the Close button: `X`).

## 5. Usage Example

```jsx
// Example usage in a parent component
<ProductDetailView
  products={allProducts}
  initialProductIndex={selectedId}
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  onProductChange={(product) => console.log('Switched to', product.name)}
/>
```
