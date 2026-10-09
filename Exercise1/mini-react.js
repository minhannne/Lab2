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