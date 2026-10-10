const stateStore = [];
let cursor = 0;

let appComponent = null;
let appRoot = null;

export function resetCursor() {
    cursor = 0;
}

export function useState(initialValue) {
    const index = cursor;
    cursor += 1;

    if (!(index in stateStore)) {
        stateStore[index] =
            typeof initialValue === "function"
                ? initialValue()
                : initialValue;
    }

    function setState(nextValue) {
        const previousValue = stateStore[index];

        const newValue =
            typeof nextValue === "function"
                ? nextValue(previousValue)
                : nextValue;

        if (Object.is(previousValue, newValue)) {
            return;
        }

        stateStore[index] = newValue;
        renderApp();
    }

    return [stateStore[index], setState];
}

export function renderApp(component, root) {
    if (component !== undefined) {
        appComponent = component;
    }

    if (root !== undefined) {
        appRoot = root;
    }

    if (typeof appComponent !== "function" || !appRoot) {
        throw new Error("Call renderApp with a component and root first.");
    }

    const activeElement = document.activeElement;
    const focusedId = appRoot.contains(activeElement)
        ? activeElement.id
        : null;

    resetCursor();

    const nextTree = appComponent();
    appRoot.replaceChildren(nextTree);

    if (focusedId) {
        const nextFocusedElement = document.getElementById(focusedId);

        if (nextFocusedElement && appRoot.contains(nextFocusedElement)) {
            nextFocusedElement.focus({ preventScroll: true });
        }
    }
}