// 框架定义
ld = {
    config: { // 配置
        proxy: true, // 是否开启代理
    }

};

ld.proxy = function (obj, objName) {
    if (!ld.config.proxy) { // 未开启代理的，返回原始对象
        return obj;
    }
    // 代理的监控方法
    let handler = {
        get(target, prop, receiver) {
            console.log("=============== get ===============");
            console.log(`${objName}正在获取${prop.toString()}`);
            // 反射获取原始对象属性值
            let result = Reflect.get(target, prop, receiver);
            console.log(`返回值：${result}`);
            return result;
        },
    };
    return new Proxy(obj, handler);
};

// 原始代码
let symbol = Symbol("123");
let user = {
    name: "张三",
    1: 2,
    true: 3,
    symbol: "symbolStr", // 这里的字符串symbol跟name类似，是字符串属性名
    [symbol]: "symbol123Prop", // 这里加了方括号，代表是一个Symbol对象作为属性名
};

// 给对象添加代理
user = ld.proxy(user, "user");

// js执行代码
console.log(user.name);
console.log(user.symbol);
console.log(user[symbol])
console.log(user[1]);
console.log(user[true]);
console.log(user.age); // 获取不存在的属性值  undefined

user.age = 20; // 补上这个环境
console.log(user.age); // 再次获取就已经被代理上了

