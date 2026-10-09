import { createElement, renderToDOM } from "./mini-react.js";

const vApp = createElement(
    "main",
    { id: "root-view", role: "main" },

    createElement(
        "header",
        { className: "hero" },
        createElement("h1", null, "Mini React Engine"),
        createElement("p", null, "<img onerror=alert(1)> Safe Text")
    ),

    createElement(
        "section",
        { "aria-labelledby": "security-title" },
        createElement("h2", { id: "security-title" }, "Security test"),
        createElement("p", null, "<script>alert(1)</script>")
    ),

    createElement(
        "button",
        {
            type: "button",
            onClick: () => console.log("Ping")
        },
        "Click"
    )
);

const root = document.getElementById("app");

root.replaceChildren(renderToDOM(vApp));

console.assert(
    root.querySelector("button") !== null,
    "Mount Failed"
);

console.assert(
    root.querySelector("img, script") === null,
    "HTML strings must remain plain text"
);

console.log("Rendered VNode tree:", vApp);
function expectTypeError(label, action) {
    try {
        action();
        console.error(`FAIL: ${label} — did not reject invalid input`);
    } catch (error) {
        if (error instanceof TypeError) {
            console.log(`PASS: ${label}`);
        } else {
            console.error(`FAIL: ${label}`, error);
        }
    }
}

expectTypeError("Invalid element type", () => {
    createElement(123, null, "Hello");
});

expectTypeError("Invalid props", () => {
    createElement("p", "invalid props", "Hello");
});

expectTypeError("Invalid child", () => {
    createElement("p", null, { invalid: true });
});

expectTypeError("Invalid VNode", () => {
    renderToDOM(null);
});