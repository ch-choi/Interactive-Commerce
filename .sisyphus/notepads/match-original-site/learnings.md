## Learnings
- **Robust Selectors**: Avoid using fragile selectors like `[style*="aspect-ratio"]` or `document.querySelectorAll` in tests. They break easily when implementation details (like MUI's `sx` prop) change.
- **User-Centric Testing**: Prefer `screen.getByText` or `screen.getByRole` which mimic how a user interacts with the application.
- **Atomic Commits**: Grouping related changes (feature + test update) is good, but when regressions occur, fix them in a separate atomic commit to keep history clean.
- **Open Handles**: Tests passing but timing out is a classic sign of open handles (timers/listeners). React's `useEffect` cleanup is critical not just for app logic but for test harness stability.
- **Declarative vs Imperative Animations**: Refactoring imperative `requestAnimationFrame` loops (managed by event handlers) to declarative `useEffect` loops made cleanup trivial and robust.

## Patterns
- **MUI Icons**: Use `@phosphor-icons/react` for consistent iconography.
- **Test IDs**: Add `data-testid` to interactive elements (like filter buttons) to make tests resilient to styling changes.
- **Video Cleanup**: Always ensure `video.pause()` is called in cleanup, especially for JSDOM environments where media resource management is mocked/limited.

## ProductCard Testing
- When verifying the removal of an element (like price), use `screen.queryByText` and assert it is `toBeNull()`.
- Ensure tests reflect the actual DOM structure; clicking the product name element specifically is a robust way to test `onClick` when the container has padding or multiple elements.
- Vitest sometimes times out when using threads in certain environments; using `--pool=forks` can improve stability (though code cleanup was the root cause here).
