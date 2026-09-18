// 需要代理的对象
// window = new Proxy(window, {});
localStorage = ldvm.toolsFunc.proxy(localStorage, "localStorage");
sessionStorage = ldvm.toolsFunc.proxy(sessionStorage, "sessionStorage");
window = ldvm.toolsFunc.proxy(window, "window");
document = ldvm.toolsFunc.proxy(document, "document");
location = ldvm.toolsFunc.proxy(location, "location");



// 开启代理，是为了更好地辅助补环境，但所有环境补完之后，还是不行，那可能是Proxy被检测了，这就需要关掉代理

