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
            let result;
            // 加入try catch 防止意外出错
            try {
                console.log("=============== get ===============");
                console.log(`${objName}正在获取${prop.toString()}`);
                // 反射获取原始对象属性值
                result = Reflect.get(target, prop, receiver);
                console.log(`返回值：${result}`);

            } catch (e) {
                // 报错后，输出错误信息
                console.log(`{get|obj:[${objName}] -> prop:[${prop.toString()}], error:[${e.message}]}`);
            }

            return result;
        },
    };
    return new Proxy(obj, handler);
};


// 原始js代码
let symbol = Symbol("123");
let user = {
    name: "小明",
    1: 2,
    true: 3,
    symbol: "strSymbol",
    [symbol]: "symbol123Prop",
    info: {
        name: "height",
        height: 180
    }
};

// 给对象添加代理

user = ld.proxy(user, "user");

// js执行代码
console.log(user.name);
console.log(user.symbol);
console.log(user[symbol])
console.log(user[1]);
console.log(user[true]);

console.log(user.info);
console.log(user.info.name);

console.log(user.age); // 获取不存在的属性值  undefined
user.age = 20; // 补上这个环境
console.log(user.age); // 再次获取就已经被代理上了
