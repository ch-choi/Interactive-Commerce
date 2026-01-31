### Patterns and Conventions
- Using `screen.getByText` or other robust RTL selectors is preferred over `document.querySelectorAll` with CSS property selectors, especially when using libraries like MUI that might abstract styles into classes.
- MUI's `sx` prop might not always render as inline styles, making attribute selectors like `[style*="aspect-ratio"]` unreliable in tests.

### Successful Approaches
- Replaced fragile DOM selectors with semantic text-based selectors from React Testing Library.
- Verified that clicking on nested text triggers parent `onClick` handlers as expected due to event bubbling.
