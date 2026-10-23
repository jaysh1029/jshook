//框架定义
let ld = {
    config: { // 配置
        proxy: true, // 是否开启代理
    }
};
// 获取对象的类型
ld.getType = function (obj) {
    return Object.prototype.toString.call(obj);
};

ld.proxy = function (obj, objName) {
    if (!ld.config.proxy) { // 若未开启代理，则返回原始对象
        return obj;
    }
    ;

    // 主要解决两个问题：1.防止报错 2. 递归代理
    let handler = {
        get: function (target, prop, receiver) {
            console.log("=============== get ===============");
            let result;
            // 加入try catch块 防止报错
            try {
                result = Reflect.get(target, prop, receiver);
                let resType = ld.getType(result);
                if (result instanceof Object) {
                    // 这里若是想输出result对象的值，不能用JSON.stringify 因为可能会有循环引用
                    console.log(`{get|obj:[${objName}] -> prop:[${prop.toString()}], type:[${resType}]}`);
                    // 递归代理对象属性
                    result = ld.proxy(result, `${objName}.${prop.toString()}`);
                } else {
                    console.log(`{get|obj:[${objName}] -> prop:[${prop.toString()}], ret:[${result}]}`);
                }

            } catch (e) {
                // 若报错，则输出错误信息
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