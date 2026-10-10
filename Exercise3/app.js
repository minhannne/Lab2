const loadButton = document.querySelector("#load-button");
const errorButton = document.querySelector("#error-button");
const resetButton = document.querySelector("#reset-button");
const retryButton = document.querySelector("#retry-button");
const statusMessage = document.querySelector("#status-message");
const feedContent = document.querySelector("#feed-content");
const errorMessage = document.querySelector("#error-message");

const transitions = {
    IDLE: ["LOADING"],
    LOADING: ["LOADING", "SUCCESS", "ERROR", "IDLE"],
    SUCCESS: ["LOADING", "IDLE"],
    ERROR: ["LOADING", "IDLE"]
};

let state = { status: "IDLE" };
let latestRequestId = 0;

function setState(nextState) {
    if (!transitions[state.status].includes(nextState.status)) {
        throw new Error("Chuyển trạng thái không hợp lệ.");
    }

    state = nextState;
    render();
}

function renderSkeleton() {
    const skeleton = document.createElement("div");
    skeleton.className = "skeleton-list";
    skeleton.setAttribute("aria-hidden", "true");

    for (let index = 0; index < 3; index += 1) {
        const card = document.createElement("div");
        card.className = "skeleton-card";

        for (const className of [
            "skeleton-line skeleton-title",
            "skeleton-line",
            "skeleton-line skeleton-short"
        ]) {
            const line = document.createElement("div");
            line.className = className;
            card.append(line);
        }

        skeleton.append(card);
    }

    feedContent.append(skeleton);
}

function renderData(items) {
    const list = document.createElement("ul");
    list.className = "feed-list";

    for (const item of items) {
        const entry = document.createElement("li");
        const article = document.createElement("article");
        const title = document.createElement("h3");
        const description = document.createElement("p");

        article.className = "card";
        title.textContent = item.title;
        description.textContent = item.description;

        article.append(title, description);
        entry.append(article);
        list.append(entry);
    }

    feedContent.append(list);
}

function render() {
    if (document.activeElement === retryButton && state.status !== "ERROR") {
        loadButton.focus();
    }

    retryButton.hidden = state.status !== "ERROR";
    feedContent.setAttribute(
        "aria-busy",
        String(state.status === "LOADING")
    );
    feedContent.replaceChildren();
    errorMessage.textContent = "";

    switch (state.status) {
        case "IDLE": {
            statusMessage.textContent = "IDLE — Chưa tải dữ liệu.";
            const message = document.createElement("p");
            message.textContent = "Nhấn “Tải dữ liệu” để bắt đầu.";
            feedContent.append(message);
            break;
        }

        case "LOADING":
            statusMessage.textContent = "LOADING — Đang tải dữ liệu.";
            renderSkeleton();
            break;

        case "SUCCESS":
            renderData(state.data);
            statusMessage.textContent =
                `SUCCESS — Đã tải ${state.data.length} bài viết.`;
            break;

        case "ERROR":
            statusMessage.textContent = "ERROR — Tải dữ liệu thất bại.";
            errorMessage.textContent = state.error;
            break;
    }
}

function fetchFeed(shouldFail) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldFail) {
                reject(new Error(
                    "Không thể tải dữ liệu do lỗi kết nối giả lập. " +
                    "Nhấn Retry Connection để thử lại."
                ));
                return;
            }

            resolve([
                {
                    title: "HTML Semantic",
                    description: "Sử dụng cấu trúc HTML có ý nghĩa."
                },
                {
                    title: "Keyboard Navigation",
                    description: "Điều khiển giao diện bằng bàn phím."
                },
                {
                    title: "Accessible Loading",
                    description: "Thông báo trạng thái tải dễ tiếp cận."
                }
            ]);
        }, 1800);
    });
}

async function loadData(shouldFail = false) {
    const requestId = ++latestRequestId;
    setState({ status: "LOADING" });

    try {
        const items = await fetchFeed(shouldFail);

        if (requestId !== latestRequestId) {
            return;
        }

        setState({ status: "SUCCESS", data: items });
    } catch (error) {
        if (requestId !== latestRequestId) {
            return;
        }

        setState({
            status: "ERROR",
            error: error instanceof Error
                ? error.message
                : "Đã xảy ra lỗi. Vui lòng thử lại."
        });
    }
}

loadButton.addEventListener("click", () => loadData());
errorButton.addEventListener("click", () => loadData(true));
retryButton.addEventListener("click", () => loadData());

resetButton.addEventListener("click", () => {
    latestRequestId += 1;

    if (state.status !== "IDLE") {
        setState({ status: "IDLE" });
    }
});

render();