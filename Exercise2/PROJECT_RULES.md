# Project Rules — Exercise 2

## 1. Project Scope

Build a reactive Task Manager using a custom useState closure engine
and root event delegation.

Required features:
- Add tasks.
- Toggle task completion.
- Filter tasks by All, Active, and Completed.
- Update the UI immediately after state changes.

Do not replace the custom engine with React or another framework.

Data flow must remain unidirectional:
UI action → state setter → stateStore update → render → UI.

## 2. File Responsibilities

- index.html: document metadata, application root, persistent status region.
- reactive-engine.js: state storage, hooks, rendering, event delegation.
- app.js: task component, task operations, filters, DOM construction.
- style.css: layout, responsive behavior, contrast, focus styling.
- PROJECT.RULES.md: implementation and verification rules.

## 3. State Engine Rules

- Preserve stateStore between renders.
- Reset the cursor before each render without clearing stateStore.
- Call useState in the same order on every render.
- Do not call useState inside conditions or loops.
- Capture each state slot's index in its setter closure.
- Support direct values and functional state updates.
- Initialize each state slot only once.
- Allow undefined as a stored state value.
- Update arrays and objects immutably.
- Skip rendering when Object.is detects no state change.
- Give each task a stable unique ID.

## 4. Event Delegation Rules

- Attach exactly one click listener to the application root.
- Do not attach click listeners directly to task buttons.
- Do not use HTML onclick attributes.
- Store button handlers in a WeakMap.
- Prevent duplicate root listener attachment.
- Handle clicks on content nested inside buttons.
- Do not invoke disabled controls.
- Preserve the root element across renders.

## 5. Accessibility Rules

Target WCAG 2.2 Level AA.

- Declare the actual page language and provide a meaningful title.
- Use semantic main, headings, lists, and native buttons.
- Give every control a descriptive accessible name.
- Expose toggle states with aria-pressed and stable button names.
- Support Tab, Shift+Tab, Enter, and Space.
- Do not create keyboard traps.
- Keep keyboard focus visible and unobscured.
- Preserve focus after rendering.
- Move focus logically when a focused control disappears.
- Keep the live status region outside the replaced application subtree.
- Announce additions, completion changes, and filter changes politely.
- Provide at least 4.5:1 contrast for normal text.
- Provide at least 3:1 contrast for large text.
- Provide at least 3:1 contrast for required control boundaries and
  state indicators against adjacent colors.
- Do not communicate task state through color alone.
- Use a project minimum button size of 44 × 44 CSS pixels.
- Support text enlargement to 200% without loss of content or function.
- Support a viewport width of 320 CSS pixels without horizontal scrolling.
- Preserve content and operation with increased text spacing:
  - Line height: 1.5 times the font size.
  - Paragraph spacing: 2 times the font size.
  - Letter spacing: 0.12 times the font size.
  - Word spacing: 0.16 times the font size.
- Avoid unnecessary animation, flashing, and time limits.
- Evaluate every applicable WCAG 2.2 A and AA criterion before
  claiming full conformance.
- Record inapplicable criteria with a reason.
- Lighthouse Accessibility 100 does not prove full WCAG conformance.

## 6. Code Rules

- Use JavaScript modules with explicit imports and exports.
- Insert task text using textContent.
- Do not interpolate untrusted content into innerHTML.
- Keep JavaScript, HTML, and CSS free of explanatory comments.
- Keep implementation responsibilities in their designated files.
- Run the application through an HTTP server.

## 7. Verification Rules

Verify:
- Initial tasks and task count.
- Adding tasks and updating the count.
- Completing and reactivating tasks.
- All, Active, and Completed filters.
- Empty filter results.
- State preservation across repeated renders.
- Exactly one root click listener after repeated updates.
- Zero directly attached event listeners on task buttons.
- Keyboard operation and focus restoration.
- Focus behavior when a filtered task disappears.
- Narrow viewport, page zoom, text enlargement, and text spacing.
- Screen reader structure, names, states, and live announcements.
- Lighthouse Accessibility results and manual review items.
- Absence of unexpected browser console errors.

Record actual results. Do not mark untested checks as passed.

## 8. Required Git Milestones

Preserve these four atomic implementation commits in order:

1. feat(state): implement stateStore and resetCursor engine
2. feat(state): implement reactive useState dispatcher
3. feat(events): attach root event delegation listener
4. feat(ui): assemble reactive todo application

Commit documentation separately when needed.

Stage only files belonging to the intended change.
Do not commit secrets, credentials, environment files, or temporary artifacts.

## 9. Submission Evidence

- Task added with the updated count.
- Active filter showing incomplete tasks.
- Completed filter showing completed tasks.
- Console showing one root listener and zero button listeners
  after repeated state updates.
- Git history showing all four required implementation commits.
- Supporting accessibility evidence, including visible focus,
  enlarged layout, and Lighthouse results.

## 10. Guidance Workflow

- Give one instructional step at a time.
- Ask whether the step is complete.
- Wait for confirmation before continuing.
- Explain code outside code blocks.
- Keep new features within the assignment scope unless requested.