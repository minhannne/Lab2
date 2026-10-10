# Project Rules — Exercise 3

## 1. Project Objective

Build a resilient data feed with four states, an animated skeleton loader,
readable error feedback, and a retry action.

Prevent outdated asynchronous responses from overwriting the latest UI state.

## 2. Technology and Files

- Use HTML, CSS, and vanilla JavaScript.
- `index.html`: semantic structure and accessible controls.
- `style.css`: responsive layout, focus indicators, and skeleton animation.
- `app.js`: state transitions, asynchronous loading, and rendering.
- Use simulated asynchronous data and connection failures for this exercise.
- Keep CSS and JavaScript in separate files.
- Use `addEventListener`; do not use inline event handlers.
- Do not add code comments.

## 3. State Machine

- Allow only `IDLE`, `LOADING`, `SUCCESS`, and `ERROR`.
- Store the current state in one state object.
- Update state through `setState`.
- Validate transitions against the transition map.
- Include data only in the `SUCCESS` state.
- Include an error message only in the `ERROR` state.

Allowed transitions:

- `IDLE` → `LOADING`
- `LOADING` → `LOADING`, `SUCCESS`, `ERROR`, or `IDLE`
- `SUCCESS` → `LOADING` or `IDLE`
- `ERROR` → `LOADING` or `IDLE`

## 4. Asynchronous Operations

- Assign an increasing ID to each loading request.
- Only the latest request may update the state.
- Ignore both successful and failed responses from outdated requests.
- Reset must invalidate pending requests and restore `IDLE`.
- Handle asynchronous failures with `try/catch`.

## 5. Rendering Rules

- `IDLE`: show instructions for loading data.
- `LOADING`: show animated CSS skeleton placeholders.
- `SUCCESS`: show the returned article list.
- `ERROR`: show a readable error and a Retry Connection button.
- Retry must start another loading attempt.
- In this demo, the error button simulates a failed request,
  while Retry Connection starts a simulated successful request.
- Remove outdated content and error messages when the state changes.
- Use `textContent` for data and error messages.

## 6. Accessibility — WCAG 2.2 AA Target

- Use semantic HTML, a main landmark, and logical heading levels.
- Set the page language to match its content.
- Use native buttons with descriptive labels.
- Support Tab, Shift + Tab, Enter, and Space.
- Provide visible focus indicators and prevent keyboard traps.
- Preserve focus when the retry button becomes hidden.
- Announce loading and completion through `role="status"`.
- Announce errors through `role="alert"`.
- Set `aria-busy` on the data container during loading.
- Hide decorative skeletons from assistive technology.
- Maintain text contrast of at least 4.5:1 for normal text
  and 3:1 for large text.
- Maintain at least 3:1 contrast for required control boundaries
  and focus indicators against adjacent colors.
- Use button targets of at least 44 × 44 CSS pixels.
- Support text resizing, increased text spacing, and narrow layouts
  without clipping or loss of functionality.
- Disable skeleton animation when `prefers-reduced-motion: reduce`
  is active.
- Verify applicable WCAG criteria with automated and manual checks.
- A Lighthouse score of 100 alone does not establish WCAG conformance.

## 7. Verification

Verify the following before considering the exercise complete:

- Initial view is `IDLE`.
- Loading shows skeletons before displaying `SUCCESS`.
- Simulated failure displays `ERROR` and the retry button.
- Retry returns to `LOADING`, then `SUCCESS`.
- Error followed quickly by load ends in `SUCCESS`.
- Load followed quickly by error ends in `ERROR`.
- Reset during loading remains `IDLE` after the old request finishes.
- All controls work with the keyboard.
- Focus remains visible and is not lost when retry disappears.
- Layout remains usable at 400% zoom.
- Increased text spacing does not hide or overlap content.
- Reduced-motion mode stops the skeleton animation.
- A screen reader announces loading, completion, and errors.
- The items below are verification requirements, not a record of completed checks.
- Mark a check as passed only after performing it.
## 8. Git Milestone

Commit the implementation with this exact message:

feat(ui): implement multi-state data component with skeleton feedback

Only stage files belonging to this exercise.
Do not commit secrets, environment files, or unrelated files.