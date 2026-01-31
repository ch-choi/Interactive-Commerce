# Learnings from Test Timeout Investigation

## Issue
`pnpm test -- --run` was timing out (hanging) instead of exiting after tests passed. This indicates "open handles" - resources like timers, event listeners, or animation frames that were not cleaned up when components unmounted.

## Root Causes Identified
1. **`MediaRenderer.jsx`**:
   - The `useEffect` handling video autoplay called `video.play()` but had NO cleanup function to call `video.pause()`.
   - In JSDOM/Node environment, this might leave the media element in a state that prevents process exit.

2. **`useResponsive.js`**:
   - Used a `debounce` utility that created a `setTimeout` but did not expose a way to clear it.
   - The `useEffect` cleanup removed the event listener but could NOT clear the pending timeout if a resize event happened just before unmount.

3. **`ProductCard.jsx`**:
   - Used a complex manual `requestAnimationFrame` loop triggered by event handlers (`onMouseLeave`).
   - While it attempted to clean up in `useEffect`, the logic was scattered and potentially fragile (e.g., if unmount happened exactly between frames or logic execution).

## Fixes Applied
1. **`MediaRenderer.jsx`**:
   - Added a cleanup function to the `useEffect` that calls `video.pause()`.

2. **`useResponsive.js`**:
   - Refactored to define the debounced function *inside* the `useEffect` scope.
   - Used a local `timeoutId` variable that is cleared in the cleanup function.

3. **`ProductCard.jsx`**:
   - Refactored the "jogging" animation to use a declarative `useEffect` that depends on `isJogging` state.
   - This ensures the animation loop is automatically started/stopped/cleaned up by React's lifecycle, removing the need for manual ref management in event handlers.

## Result
Tests now pass and exit cleanly in ~15 seconds.
