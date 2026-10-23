let symbol = Symbol("123");
let user = {
    name: "张三",
    1: 2,
    age: 20,
    true: 3,
    symbol: "123",
    [symbol]: "Symbol123",
};
/**
 * 给对象添加代理
 * user  要代理的原始对象
 * handler 定义要监控的方法
 */
user = new Proxy(user, {
    /**
     * 代理get方法，获取属性值
     * @param target 代理对象 这里是user
     * @param prop 属性名称
     * @param receiver 代理后的对象
     */
    get(target, prop, receiver) {

        console.log("====================================");
        console.log(`正在获取${prop.toString()}`);
        //let result = target[prop];
        let result = Reflect.get(target, prop, receiver);
        console.log(`获取结果：${result}`);
        return result;
    },
});

console.log(user.name);
console.log(user.symbol);
console.log(user[symbol]);
console.log(user[true]);
console.log(user[1]);

console.log(user.height);
user.height = 180;

console.log(user.height);