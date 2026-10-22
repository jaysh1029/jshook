let user = {
    name: "小明",
    1: 2,
    [Symbol(123)]: "symbol123"
};

console.log(user.name);
console.log(user[1]);
console.log(user[Symbol(123)]); // undefined 这里的Symbol(123) 跟定义时的属性是不一样的

let symbol = Symbol(123);
let user2 = {
    name: "小明",
    1: 2,
    true: 3,
    symbol: "strSymbol",
    [symbol]: "symbol123" // 这里要加中括号，否则就是属性名为字符串symbol的属性了
};

console.log(user2.name);
console.log(user2[1]);
console.log(user2.symbol); // strSymbol
console.log(user2["symbol"]); // strSymbol
console.log(user2[symbol]); // symbol123 这里的symbol就跟定义时的一致了 因为是提前定义好的引用


/**
 * 代理user对象
 * 第一个参数：原始对象
 * 第二个参数：handler，也是对象，定义要监控的方法
 */
let userProxy = new Proxy(user, {
    /**
     * 获取属性时调用
     * @param target 原始对象
     * @param prop 属性
     * @param receiver 代理后的对象
     */
    get: function (target, prop, receiver) {
        return "123";
    }
});

console.log(userProxy.name); // 123 在获取属性的时候被代理拦截了，因此返回123

console.log("================================");

let userProxy2 = new Proxy(user2, {
    get: function (target, prop, receiver) {
        // if (typeof prop === "string") {
        //     console.log(`正在获取${prop}`);
        // } else {
        //     console.log("正在获取", prop);
        // }
        console.log(`正在获取${prop.toString()}`);

        let result = target[prop]; // 不会递归
        console.log(`返回值：${result}`);
        return result;
    }
});
console.log(userProxy2.name);
console.log(userProxy2[symbol]);
console.log(userProxy2[1]);
console.log(userProxy2[true]);
/*
正在获取name
返回值：小明
小明
正在获取Symbol(123)
返回值：symbol123
symbol123
正在获取1
返回值：2
2
正在获取true
返回值：3
3

* */


let userProxy3 = new Proxy(user, {
    get: function (target, prop, receiver) {
        console.log(`正在获取${prop.toString()}`);
        // 使用Reflect反射来获取原始属性值
        let result = Reflect.get(target, prop, receiver);
        console.log(`返回值：${result}`);
        return result;
    }
});
console.log(userProxy3.name);

/*
* 正在获取name
* 返回值：小明
* 小明
* */

console.log(userProxy3.age); // 调用没有的属性，返回时undefined
/*
正在获取age
返回值：undefined
undefined
*/
// 我们把age属性加到user上，就相当于补环境
user.age = 12;
console.log(userProxy3.age); // 调用没有的属性，返回时undefined

/*
正在获取age
返回值：12
12
*/


console.log("=============================");
/*
* 正常的js代码执行流程
* 1. 原始js中定义了某个对象 如 user5
* 2. 添加代理，并且赋值给user5
* 3. js中其他调用的代码 还是user5这个对象，这样就代理成功了
* */


// 定义对象
let user5 = {
    name: "小明",
    1: 2,
    true: 3,
    symbol: "strSymbol",
    [symbol]: "symbol123" // 这里要加中括号，否则就是属性名为字符串symbol的属性了
};

// 给对象添加代理，并赋值给原始对象
user5 = new Proxy(user5, {
    get: function (target, prop, receiver) {
        console.log(`正在获取${prop.toString()}`);
        // 使用Reflect反射来获取原始属性值
        let result = Reflect.get(target, prop, receiver);
        console.log(`返回值：${result}`);
        return result;
    }
});

// 其他地方正常调用的代码 就会使用代理对象走我们自己的逻辑
console.log(user5.name);