/*
* 1. Proxy代理与Reflect反射
* proxy作用： 监控对象操作(获取、设置属性，监控方法)
* reflect作用：执行原始操作
* */
let symbol = Symbol(123);

let user = {
    name: "小明",
    1: 2,
    [symbol]: "symobl123", // 定义和使用Symbol类型 必须使用[]  否则 就是一个string类型的属性
    true:5,
    age:29,// 当原始对象没有age属性 在代理调用时会输出undefined，这时就需要在原始对象中补环境
};

// 第一个参数 user对象
// 第二个参数 handler 也是对象
let proxyUser = new Proxy(user, {
    /**
     *
     * @param target 原始对象 user
     * @param prop 属性 且只有string和symbol两种模式
     * @param receiver 代理后的对象
     */
    get(target, prop, receiver) {

        // 这里的prop若是Symbol类型会报错 Cannot convert a Symbol value to a string
        //console.log(`正在获取${prop}`);


        // 处理方式：
        // if (typeof prop === "string") {
        //     console.log(`正在获取${prop}`);
        // } else {
        //     console.log(`正在获取`, prop); // 这个是兼容老版本的方式
        // }
        // 也可以使用通用的方法
         console.log(`正在获取${prop.toString()}`);

        //console.log("typeof prop:",typeof prop,prop);

        //let result = target[prop]; // 不会递归 或者用下面的反射方法
        let result = Reflect.get(target, prop, receiver); // 反射 执行原始操作
        console.log(`返回值：${result}`);
        return result;
    },
})

console.log(proxyUser.name);
console.log(proxyUser[symbol]);
console.log(proxyUser[1]); // 这里的键名最终是以string方式
console.log(proxyUser[true]);
console.log(proxyUser.age); // 没有原始属性，返回undefined 此时我们就去要补环境的属性



// 若user 是document对象，那么user对象就是补环境用的
// 添加代理后，要把原始对象赋值为代理对象，这样其他地方使用user的地方，就会经过代理
user = proxyUser;




































































