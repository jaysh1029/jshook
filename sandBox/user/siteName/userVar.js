// 网页变量初始化
window = globalThis;

window.localStorage = {
    getItem(key) {
        return null;
    }
};
window.name = "";
window.navigator = {};

// 检测原型链
window.navigator.__proto__.userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/153.0.0.0 Safari/537.36";
window.navigator.__proto__.webdriver = false;

delete Buffer; // 检测Node环境
//window.webdriver = false;

document = {};
document.cookie = "";