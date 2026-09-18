// 全局对象配置
//debugger;
let ldvm = {
    // 功能函数相关
    toolsFunc: {},
    config: {
        proxy: true, // 是否开启代理
        print: true, // 是否打印日志
    },
    envFunc: {},// 具体环境实现相关
    memory: {
        symbolProxy: Symbol("proxy"), // 标记独一无二的属性，标记是否已代理
    },// 内存相关
};
// 需要过滤的代理属性
ldvm.memory.filterProxyProp = [ldvm.memory.symbolProxy, "eval"];