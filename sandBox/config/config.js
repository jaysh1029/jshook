// 全局对象配置
//debugger;
let ldvm = {
    // 功能函数相关
    toolsFunc: {},
    config: {
        proxy: false, // 是否开启代理
        print: true, // 是否打印日志
    },
    envFunc: {},// 具体环境实现相关
    memory: {
        symbolProxy: Symbol("proxy"), // 标记独一无二的属性，标记是否已代理
        ID: 0, // 自增id
        tag:[], // 内存，存储tag标签
    },// 内存相关
};
// 需要过滤的代理属性
ldvm.memory.filterProxyProp = [ldvm.memory.symbolProxy, "eval"]; // 需要过滤的属性
ldvm.memory.symbolData = Symbol("data"); // 用来保存当前对象上的原型属性
