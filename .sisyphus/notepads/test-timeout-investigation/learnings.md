## React Side Effect Cleanup
- Always cleanup `requestAnimationFrame`, `setTimeout`, and `setInterval` in `useEffect` return functions.
- Vitest/JSDOM can hang if there are open handles or scheduled tasks that haven't completed, even if the tests themselves have finished.
- Use `useRef` to store the IDs of scheduled tasks so they can be accessed in cleanup functions.
