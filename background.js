// 获取当前选项卡的id
async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab.id;
}

const btn = document.querySelector("button")

// 监听按钮
btn.addEventListener("click", async function () {
    const tabId = await getCurrentTab()

    // 储存注入的函数
    let fn

    // 判断是显示答案还是隐藏答案
    if (this.innerText == '隐藏答案') {
        fn = hideContent
        this.innerHTML = '显示答案'
    }else{
        // 显示答案
        fn = showContent
        this.innerHTML = '隐藏答案'
    }

    chrome.scripting
        .executeScript({
            target: { tabId: tabId },
            func: fn,
        })
        .then(() => console.log("script injected"));
})


// 隐藏内容
function hideContent() {
    const answer = document.querySelectorAll('.Py_answer')

    // 遍历答案
    answer.forEach((a) => {
        a.style.visibility = 'hidden';
    })
}

// 显示内容
function showContent() {
    const answer = document.querySelectorAll('.Py_answer')

    // 遍历答案
    answer.forEach((a) => {
        a.style.visibility = 'visible';
    })
}