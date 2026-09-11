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
                } else if (typeof result === "symbol") {
                    // symbol 类型的result 要进行toString 否则会报错
                    console.log(`{set | obj:[${objName}] -> prop:[${prop.toString()}], return:[${result.toString()}]}`);
                } else {
                    console.log(`{get | obj:[${objName}] -> prop:[${prop.toString()}], return:[${result}]}`);
                }

            } catch (e) {
                console.log(`{get error | obj:[${objName}] -> prop:[${prop.toString()}], error:[${e.message}]}`);
            }
            return result;
        }, set(target, prop, value, receiver) {
            let result;
            try {
                result = Reflect.set(target, prop, value, receiver);
                if (value instanceof Object) {
                    let type = ld.getType(value);
                    console.log(`{set | obj:[${objName}] -> prop:[${prop.toString()}], type:[${type}]}`);
                    // set 不需要递归代理，因为需要设置逻辑，这里不需要
                } else if (typeof value === "symbol") {
                    // symbol 类型的value 要进行toString 否则会报错
                    console.log(`{set | obj:[${objName}] -> prop:[${prop.toString()}], value:[${value.toString()}]}`);
                } else {
                    console.log(`{set | obj:[${objName}] -> prop:[${prop.toString()}], value:[${value}]}`);
                }

            } catch (e) {
                console.log(`{set error | obj:[${objName}] -> prop:[${prop.toString()}], error:[${e.message}]}`);
            }
            return result;
        }, // 当使用Object.getOwnPropertyDescriptor方式获取属性时拦截
        getOwnPropertyDescriptor(target, prop) {
            let result; // 返回结果是undefined或描述符对象
            try {
                result = Reflect.getOwnPropertyDescriptor(target, prop);
                let type = ld.getType(result);
                console.log(`{getOwnPropertyDescriptor | obj:[${objName}] -> prop:[${prop.toString()}], type:[${type}]}`);

                // 一般不需要拦截属性描述符，在需要的时候再拦截
                // if (typeof result !== "undefined") { // 对象没有这个属性
                //     result = ld.proxy(result, `${objName}.${prop.toString()}.PropertyDescriptor`);
                // }
            } catch (e) {
                console.log(`{getOwnPropertyDescriptor error | obj:[${objName}] -> prop:[${prop.toString()}], error:[${e.message}]}`);
            }

            return result;
        }, defineProperty(target, prop, descriptor) {
            let result;
            try {
                result = Reflect.defineProperty(target, prop, descriptor);
                let type = ld.getType(result);
                console.log(`{defineProperty | obj:[${objName}] -> prop:[${prop.toString()}]}`);
            } catch (e) {
                console.log(`{defineProperty error | obj:[${objName}] -> prop:[${prop.toString()}], error:[${e.message}]}`);
            }
            return result;
        }, /**
         *
         * @param target 函数对象
         * @param thisArg 调用函数的this指针
         * @param argumentsList 类数组，函数的入参组成的一个列表
         */
        apply(target, thisArg, argumentsList) {
            let result;
            try {
                result = Reflect.apply(target, thisArg, argumentsList);
                let type = ld.getType(result);
                if (result instanceof Object) {
                    // 输出结果尽量不要输出参数，因为不知道会遇到什么奇怪的类型，导致报错，在必要的时候再输出
                    //console.log(`{apply | function:[${objName}] -> args:[${argumentsList}], type:[${type}]}`);
                    console.log(`{apply | function:[${objName}], type:[${type}]}`);
                } else if (typeof result === "symbol") {
                    // 这里若输出 argumentsList会报错，Cannot convert a Symbol value to a string
                    // 这里result也要进行toString 否则也会报同样的错误
                    console.log(`{apply | function:[${objName}], result:[${result.toString()}]}`);
                } else {
                    //console.log(`{apply | function:[${objName}] -> args:[${argumentsList}], result:[${result}]}`);
                    console.log(`{apply | function:[${objName}], result:[${result}]}`);
                }

            } catch (e) {
                console.log(`{apply error | function:[${objName}], error:[${e.message}]}`);
            }

            return result;
        }, /**
         *
         * @param target 函数对象
         * @param argArray 参数列表
         * @param newTarget 代理对象
         * @returns {*}
         */
        construct(target, argArray, newTarget) {
            let result;
            try {
                result = Reflect.construct(target, argArray, newTarget);
                let type = ld.getType(result);
                console.log(`{construct | function:[${objName}], type:[${type}]}`);

            } catch (e) {
                console.log(`{construct error | function:[${objName}], error:[${e.message}]}`);
            }

            return result;
        }, deleteProperty: function (target, propKey) {
            let result = Reflect.deleteProperty(target, propKey);
            console.log(`{deleteProperty | obj:[${objName}] -> prop:[${propKey.toString()}], return:[${result}]}`);
            return result;
        }, has: function (target, propKey) { // 拦截 in 操作符
            let result = Reflect.has(target, propKey);
            console.log(`{has | obj:[${objName}] -> prop:[${propKey.toString()}], return:[${result}]}`);
            return result;
        },
        ownKeys: function (target) {
            let result = Reflect.ownKeys(target);
            console.log(`{ownKeys | obj:[${objName}]}`);
            return result;
        },
        getPrototypeOf: function (target) {
            let result = Reflect.getPrototypeOf(target);
            console.log(`{getPrototypeOf | obj:[${objName}]}`);
            return result;
        },
        setPrototypeOf: function (target, proto) {
            let result = Reflect.setPrototypeOf(target, proto);
            console.log(`{setPrototypeOf | obj:[${objName}]}`);
            return result;
        },
        preventExtensions: function (target) {
            let result = Reflect.preventExtensions(target);
            console.log(`{preventExtensions | obj:[${objName}]}`);
            return result;
        },
        isExtensible: function (target) {
            let result = Reflect.isExtensible(target);
            console.log(`{isExtensible | obj:[${objName}]}`);
            return result;
        }
    };
    return new Proxy(obj, handler);
}


let symbol = Symbol(123);

let user = {
    name: "小明",
    info: {
        name: "小明", age: 29
    }, [symbol]: "symbol123"

};

user = ld.proxy(user, "user");

console.log(Object.getOwnPropertyDescriptor(user, "name"));
user.hobby = "游泳";

function add(a, b) {
    return a;
}

add = ld.proxy(add, "add");
add(1, 2);
add({name: "Tom"}, 2);
add(Symbol(), 2);

function User() {

}

Object.defineProperty(User.prototype, Symbol.toStringTag, {
    value: "UserTest"
});
User = ld.proxy(User, "User");
let u = new User();

delete user.name;
delete user.aaaa;// 没有定义的属性也可以删除

Object.defineProperty(user, "abc", {
    configurable: false,
    value: 10,
    enumerable: true // 这里若为false 则Object.keys 是无法获取的 即 不可枚举
});
// configurable: false的属性描述符不能删除成功
delete user.abc; // {deleteProperty | obj:[user] -> prop:[abc], return:[false]}

console.log("age" in user); // false
console.log("abc" in user); // true

console.log(Object.keys(user));

console.log(user.__proto__);

let userProto = {
    sayHi() {
        console.log("Hello!");
    }
};
user.__proto__ = userProto;
