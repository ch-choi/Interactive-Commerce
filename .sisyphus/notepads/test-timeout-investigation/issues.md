## Test Timeout Issue
- **Problem**: `pnpm test -- --run` was timing out despite all tests passing.
- **Root Cause**: Uncleaned side effects in React components. Specifically, `requestAnimationFrame` in `ProductCard.jsx` and `setTimeout` in `Matrix2DCarousel.jsx` were not cancelled/cleared on component unmount.
- **Solution**: Added `useEffect` cleanup functions to ensure all scheduled tasks are cancelled when components unmount.
- **Verification**: Tests now exit correctly in ~16s instead of timing out at 120s.
