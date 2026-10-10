import {
    useState,
    renderApp,
    setClickHandler,
    attachEventDelegation
} from "./reactive-engine.js";

const root = document.getElementById("app");
const status = document.getElementById("status");

let nextTaskId = 3;

function createElement(tag, text) {
    const element = document.createElement(tag);

    if (text !== undefined) {
        element.textContent = text;
    }

    return element;
}

function createButton(id, text, handler) {
    const button = createElement("button", text);
    button.id = id;
    button.type = "button";
    setClickHandler(button, handler);
    return button;
}

function TaskApp() {
    const [tasks, setTasks] = useState([
        { id: 1, title: "Review PR", completed: false },
        { id: 2, title: "Verify AST", completed: false }
    ]);

    const [filter, setFilter] = useState("ALL");

    const main = createElement("main");
    main.className = "app-container";

    const heading = createElement("h1", "Reactive Task Manager");

    const description = createElement(
        "p",
        "Add tasks, mark them as completed, and filter the list."
    );

    const addButton = createButton("add-task", "Add Task", () => {
        const task = {
            id: nextTaskId++,
            title: `Task ${Date.now()}`,
            completed: false
        };

        setTasks(previousTasks => [...previousTasks, task]);
        status.textContent = `${task.title} added.`;
    });

    const filters = createElement("div");
    filters.className = "filters";
    filters.setAttribute("role", "group");
    filters.setAttribute("aria-label", "Filter tasks");

    const filterOptions = [
        ["ALL", "All"],
        ["ACTIVE", "Active"],
        ["COMPLETED", "Completed"]
    ];

    for (const [value, label] of filterOptions) {
        const button = createButton(
            `filter-${value}`,
            label,
            () => {
                setFilter(value);
                status.textContent = `Showing ${label.toLowerCase()} tasks.`;
            }
        );

        button.setAttribute("aria-pressed", String(filter === value));
        filters.append(button);
    }

    const visibleTasks = tasks.filter(task => {
        if (filter === "ACTIVE") {
            return !task.completed;
        }

        if (filter === "COMPLETED") {
            return task.completed;
        }

        return true;
    });

    const section = createElement("section");
    section.setAttribute("aria-labelledby", "tasks-heading");

    const tasksHeading = createElement(
        "h2",
        `Tasks: ${tasks.length} — Showing: ${visibleTasks.length}`
    );

    tasksHeading.id = "tasks-heading";
    section.append(tasksHeading);

    if (visibleTasks.length === 0) {
        section.append(createElement("p", "No tasks in this filter."));
    } else {
        const list = createElement("ul");
        list.className = "task-list";

        for (const task of visibleTasks) {
            const item = createElement("li");
            item.className = "task-item";

            const title = createElement("span", task.title);
            title.className = task.completed ? "task-title completed" : "task-title";

            const toggleId = `toggle-${task.id}`;

            const toggle = createButton(
                toggleId,
                `Completed: ${task.title}`,
                () => {
                    setTasks(previousTasks =>
                        previousTasks.map(currentTask =>
                            currentTask.id === task.id
                                ? {
                                    ...currentTask,
                                    completed: !currentTask.completed
                                }
                                : currentTask
                        )
                    );

                    status.textContent = `${task.title} marked ${
                        task.completed ? "active" : "completed"
                    }.`;

                    if (!document.getElementById(toggleId)) {
                        document.getElementById(`filter-${filter}`).focus();
                    }
                }
            );

            toggle.setAttribute("aria-pressed", String(task.completed));

            const state = createElement(
                "span",
                task.completed ? "Completed" : "Active"
            );

            state.className = "task-state";
            item.append(title, state, toggle);
            list.append(item);
        }

        section.append(list);
    }

    main.append(heading, description, addButton, filters, section);
    return main;
}

attachEventDelegation(root);
renderApp(TaskApp, root);