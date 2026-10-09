# Project Rules — Exercise 1: Mini-React

## 1. Project Scope
- Build a small VNode factory and DOM mounting engine from scratch.
- Implement createTextElement, createElement, and renderToDOM.
- Use plain JavaScript and browser DOM APIs.
- Do not use React or another rendering library.

## 2. File Structure
- index.html: HTML entry point and basic styling.
- mini-react.js: VNode creation and DOM rendering functions.
- test-runner.js: demonstration and verification tests.
- PROJECT_RULES.md: project development rules.

## 3. VNode Rules
- Each VNode must contain a type and a props object.
- props.children must be an array of child VNodes.
- Convert strings and numbers into TEXT_ELEMENT VNodes.
- Ignore null, undefined, and boolean children.
- Reject unsupported input types with TypeError.
- Validate VNodes before rendering.

## 4. DOM Rendering Rules
- Use document.createElement for HTML elements.
- Use document.createTextNode for text.
- Render child VNodes recursively.
- Map className to the HTML class attribute.
- Attach events with addEventListener.
- Mount the application with replaceChildren.
- The resulting DOM must match the VNode tree without extra nodes.

## 5. Semantic HTML
- Use meaningful elements such as main, header, section, and button.
- Do not use unnecessary div wrappers.
- Maintain a logical heading structure.
- Use native buttons for button actions.

## 6. Security
- Treat HTML strings passed as children as plain text.
- Do not use innerHTML, outerHTML, or document.write to render children.
- Do not use inline event-handler attributes.
- Event handlers must be functions.
- Verify that script and img test strings do not create HTML elements.
- Do not commit passwords, API keys, tokens, or other secrets.

## 7. Accessibility
- Target WCAG 2.2 Level AA.
- Provide a meaningful page title and correct document language.
- Support keyboard activation and visible focus.
- Avoid keyboard traps and obscured focus.
- Maintain sufficient text contrast.
- Preserve content and functionality at 200% zoom.
- Support reflow at a viewport width of 320 CSS pixels.
- Preserve content when users increase text spacing.
- Keep the demo button at least 44 × 44 CSS pixels.
- Provide correct accessible names and roles.
- Combine automated checks with manual verification.
- Do not claim full WCAG conformance based only on Lighthouse scores.

## 8. Verification
- Confirm that the application mounts successfully.
- Confirm that clicking the button logs "Ping".
- Confirm that HTML strings remain text and execute no scripts.
- Confirm that invalid inputs produce TypeError.
- Inspect the DOM structure in DevTools.
- Check accessibility using Lighthouse and manual tests.
- Remove temporary test styling after verification.

## 9. Git Rules
- Keep commits focused on a clear change.
- Required commit 1:
  feat(core): implement createElement factory
- Required commit 2:
  feat(core): implement renderToDOM
- Record later accessibility or documentation changes in separate commits.
- Review staged files before committing.

## 10. Evidence
- Capture the application and verification results.
- Capture the DOM tree in the Elements panel.
- Capture the required Git commits.
- Capture accessibility results when documenting those checks.
- Exclude sensitive information from screenshots.