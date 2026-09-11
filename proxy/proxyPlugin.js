// 代理器方法封装

ld = {};
ld.config = {}; // 配置
ld.config.proxy = true; // 是否使用代理

/**
 *
 * @param obj 原始对象
 * @param objName 原始对象的名字
 */
ld.proxy = function proxy(obj, objName) {

    // 若不使用代理则直接返回原始对象
    if (!ld.config.proxy) {
        return obj;
    }
    let handler = {
        /**
         *
         * @param target 原始对象 user
         * @param prop 属性 且只有string和symbol两种模式
         * @param receiver 代理后的对象
         */
        get(target, prop, receiver) {
            console.log(`${objName}正在获取${prop.toString()}`);
            //let result = target[prop]; // 不会递归 或者用下面的反射方法
            let result = Reflect.get(target, prop, receiver); // 反射 执行原始操作
            console.log(`返回值：${result}`);
            return result;
        },
    };
    return new Proxy(obj, handler);
}


let symbol = Symbol(123);

let user = {
    name: "小明",
    1: 2,
    [symbol]: "symobl123", // 定义和使用Symbol类型 必须使用[]  否则 就是一个string类型的属性
    true: 5,
    age: 29,// 当原始对象没有age属性 在代理调用时会输出undefined，这时就需要在原始对象中补环境
};
user = ld.proxy(user, "user");

console.log(user.name);
console.log(user[symbol]);

