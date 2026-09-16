// 需要代理的对象
// window = new Proxy(window, {});

window = ldvm.toolsFunc.proxy(window, "window");
