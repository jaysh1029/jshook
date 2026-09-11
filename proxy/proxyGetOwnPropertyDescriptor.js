// 代理器方法封装

ld = {};
ld.config = {}; // 配置
ld.config.proxy = true; // 是否使用代理

// 获取对象类型
ld.getType = function getType(obj) {
    return Object.prototype.toString.call(obj);
}

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
            let result;
            // target可能会报错 要用try
            try {
                result = Reflect.get(target, prop, receiver);
                // 当 result 是对象时 可以用JSON.stringfy 但是这个有bug：不能输出循环引用的对象，若有循环引用，会报错
                // 如果是对象 我们返回类型即可
                if (result instanceof Object) { // 不能用 typeof result === "object" 因为null也是object 用instanceof 就没事
                    let type = ld.getType(result);
                    console.log(`{get | obj:[${objName}] -> prop:[${prop.toString()}], type:[${type}]}`);
                    // 递归代理
                    result = ld.proxy(result, `${objName}.${prop.toString()}`);
                } else {
                    console.log(`{get | obj:[${objName}] -> prop:[${prop.toString()}], return:[${result}]}`);
                }

            } catch (e) {
                console.log(`{get error | obj:[${objName}] -> prop:[${prop.toString()}], error:[${e.message}]}`);
            }
            return result;
        },
        set(target, prop, value, receiver) {
            let result;
            try {
                result = Reflect.set(target, prop, value, receiver);
                if (value instanceof Object) {
                    let type = ld.getType(value);
                    console.log(`{set | obj:[${objName}] -> prop:[${prop.toString()}], type:[${type}]}`);
                    // set 不需要递归代理，因为需要设置逻辑，这里不需要
                } else {
                    console.log(`{set | obj:[${objName}] -> prop:[${prop.toString()}], value:[${value}]}`);
                }

            } catch (e) {
                console.log(`{set error | obj:[${objName}] -> prop:[${prop.toString()}], error:[${e.message}]}`);
            }
            return result;
        },
        // 当使用Object.getOwnPropertyDescriptor方式获取属性时拦截
        getOwnPropertyDescriptor(target, prop) {
            let result; // 返回结果是undefined或描述符对象
            try {
                result = Reflect.getOwnPropertyDescriptor(target, prop);
                let type = ld.getType(result);
                console.log(`{getOwnPropertyDescriptor | obj:[${objName}] -> prop:[${prop.toString()}], type:[${type}]}`);

                if (typeof result !== "undefined") { // 对象没有这个属性
                    result = ld.proxy(result, `${objName}.${prop.toString()}.PropertyDescriptor`);
                }
            } catch (e) {
                console.log(`{getOwnPropertyDescriptor error | obj:[${objName}] -> prop:[${prop.toString()}], error:[${e.message}]}`);
            }

            return result;
        }
    };
    return new Proxy(obj, handler);
}


let symbol = Symbol(123);

let user = {
    name: "小明",
    info: {
        name: "小明",
        age: 29
    },
    [symbol]: "symbol123"

};

user = ld.proxy(user, "user");

console.log(Object.getOwnPropertyDescriptor(user, "name"));
console.log(Object.getOwnPropertyDescriptor(user, "age"));
