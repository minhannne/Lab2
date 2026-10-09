export function createTextElement(value) {
    if (typeof value !== "string" && typeof value !== "number") {
        throw new TypeError("Text must be a string or number");
    }

    return {
        type: "TEXT_ELEMENT",
        props: {
            nodeValue: String(value),
            children: []
        }
    };
}
export function createElement(type, props, ...children) {
    if (typeof type !== "string" || type.trim() === "") {
        throw new TypeError("Element type must be a non-empty string");
    }

    if (
        props !== null &&
        props !== undefined &&
        (typeof props !== "object" || Array.isArray(props))
    ) {
        throw new TypeError("Props must be an object or null");
    }

    const normalizedChildren = children
        .flat(Infinity)
        .filter(child =>
            child !== null &&
            child !== undefined &&
            typeof child !== "boolean"
        )
        .map(child => {
            if (typeof child === "string" || typeof child === "number") {
                return createTextElement(child);
            }

            if (
                typeof child === "object" &&
                typeof child.type === "string" &&
                child.props !== null &&
                typeof child.props === "object" &&
                Array.isArray(child.props.children)
            ) {
                return child;
            }

            throw new TypeError("Child must be text, a number, or a VNode");
        });

    return {
        type,
        props: {
            ...props,
            children: normalizedChildren
        }
    };
}
export function renderToDOM(vnode) {
    if (
        vnode === null ||
        typeof vnode !== "object" ||
        typeof vnode.type !== "string" ||
        vnode.props === null ||
        typeof vnode.props !== "object" ||
        !Array.isArray(vnode.props.children)
    ) {
        throw new TypeError("Invalid VNode");
    }

    if (vnode.type === "TEXT_ELEMENT") {
        if (typeof vnode.props.nodeValue !== "string") {
            throw new TypeError("Text nodeValue must be a string");
        }

        return document.createTextNode(vnode.props.nodeValue);
    }

    const element = document.createElement(vnode.type);

    for (const [name, value] of Object.entries(vnode.props)) {
        if (name === "children") {
            continue;
        }

        if (/^on/i.test(name)) {
            if (typeof value !== "function") {
                throw new TypeError("Event handler must be a function");
            }

            const eventName = name.slice(2).toLowerCase();
            element.addEventListener(eventName, value);
            continue;
        }

        if (value === null || value === undefined || value === false) {
            continue;
        }

        const attributeName = name === "className" ? "class" : name;

        element.setAttribute(
            attributeName,
            value === true ? "" : String(value)
        );
    }

    for (const child of vnode.props.children) {
        element.appendChild(renderToDOM(child));
    }

    return element;
}