// 插件功能相关

// 自执行函数 内部的局部变量不会污染全局，是隔离沙箱
!function () {


    // 定义对象属性 defineProperty
    ldvm.toolsFunc.defineProperty = function defineProperty(obj, prop, oldDescriptor) {
        let newDescriptor = {};
        // 这个属性如果需要代理，则必须为true
        newDescriptor.configurable = ldvm.config.proxy || oldDescriptor.configurable;
        newDescriptor.enumerable = oldDescriptor.enumerable;
        if (oldDescriptor.hasOwnProperty("writable")) {
            newDescriptor.writable = ldvm.config.proxy || oldDescriptor.writable;
        }
        if (oldDescriptor.hasOwnProperty("value")) {
            let val = oldDescriptor.value;
            if (typeof val === "function") {
                ldvm.toolsFunc.safeFunc(val, prop);
            }
            newDescriptor.value = val;
        }

        if (oldDescriptor.hasOwnProperty("get")) {
            let get = oldDescriptor.get;
            if (typeof get === "function") {
                ldvm.toolsFunc.safeFunc(get, `get ${prop}`);
            }
            newDescriptor.get = get;

        }
        if (oldDescriptor.hasOwnProperty("set")) {
            let set = oldDescriptor.set;
            if (typeof set === "function") {
                ldvm.toolsFunc.safeFunc(set, `set ${prop}`);
            }
            newDescriptor.set = set;
        }
        Object.defineProperty(obj, prop, newDescriptor);
    }

    // 函数native化
    !function () {
        // 保存原始原型函数toString
        const $toString = Function.prototype.toString;
        const symbol = Symbol(); // 创建独一无二的键,这个键就是自定义的toString的函数名，外界拿不到，就无法hook，但在内部可用
        const myToString = function () {
            // 若是函数调用了toString 则优先返回自定义的方法，若函数没有被native化，还调用原始的原型链方法toString
            return typeof this === "function" && this[symbol] || $toString.call(this);
        };

        // 给函数对象定义属性(可添加，可修改)
        function set_native(func, key, value) {
            Object.defineProperty(func, key, {
                enumerable: false,
                configurable: true,
                writable: true,
                value: value
            });
        }

        // 删除原始原型链的toString
        delete Function.prototype.toString;
        // 先把原型链的toString 重写了
        set_native(Function.prototype, "toString", myToString);

        // 原型链中toString方法本身也算是一个函数，倘若这个toString函数再调用一次toString() 那就变成myToString的源码了，而不是native
        // 这一步就是要防止对 Function.prototype.toString.toString()的检测
        set_native(Function.prototype.toString, symbol, "function toString() { [native code] }");

        // globalThis 在nodejs中就是global全局对象，在浏览器中就是window，这里把定义的私有函数导出开放给外界使用
        // 这里给函数定一个symbol键且值为native code 是在myToString()内部直接返回了
        // 也就是当这个函数调用toString方法就被myToString接管了
        // myToString 内部就返回这个键值  也就是 [native code]
        ldvm.toolsFunc.setNative = function (func, funcName) {
            set_native(func, symbol, `function ${funcName || func.name || ''}() { [native code] }`);
        };

        // 新增 unhook函数，还原被native化的函数
        ldvm.toolsFunc.unhookFunctionToString = function () {
            delete Function.prototype.toString;
            Object.defineProperty(Function.prototype, "toString", {
                enumerable: false,
                configurable: true,
                writable: true,
                value: $toString
            });
            console.log("unhook done");
        }
    }();

    // 对象重命名
    ldvm.toolsFunc.reNameObj = function reNameObj(obj, name) {
        Object.defineProperty(obj.prototype, Symbol.toStringTag, {
            // 这里的参数要参考浏览器中调试输出的原始Window原型对象的Symbol.toStringTag属性
            // Object.getOwnPropertyDescriptors(Window.prototype,Symbol.toStringTag) 让这里补环境的属性跟原始的一样即可
            configurable: true,
            enumerable: false,
            value: name,
            writable: false,
        });
    };

    // 函数重命名
    ldvm.toolsFunc.reNameFunc = function reNameFunc(func, name) {
        Object.defineProperty(func, "name", {
            configurable: true,
            enumerable: false,
            writable: false,
            value: name
        });
    };
    /**
     * 函数保护方法 就是把setNative 和 reNameFunc 合并起来，方便调用
     * @param func 函数对象
     * @param funcName 函数名
     */
    ldvm.toolsFunc.safeFunc = function safeFunc(func, funcName) {
        ldvm.toolsFunc.setNative(func, funcName);
        ldvm.toolsFunc.reNameFunc(func, funcName);
    };
    /**
     * 对象保护方法 就是把setNative 和 reNameObj 合并起来，方便调用
     * @param obj 对象对象
     * @param name 对象名
     */
    ldvm.toolsFunc.safeProto = function safeProto(obj, name) {
        ldvm.toolsFunc.setNative(obj, name);
        ldvm.toolsFunc.reNameObj(obj, name);
    };

    // 抛错函数
    ldvm.toolsFunc.throwError = function throwError(name, message) {

        let error = new Error(message);
        error.name = name;
        error.message = message;
        error.stack = `${name}: ${message}\n    at <anonymous>:2:5`;
        throw error;
    };

    // base64 编码和解码 以及与Hex互转函数
    !function () {
        ldvm.toolsFunc.base64 = {};
        let base64EncodeChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
            base64DecodeChars = new Array((-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), 62, (-1), (-1), (-1), 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, (-1), (-1), (-1), (-1), (-1), (-1), (-1), 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, (-1), (-1), (-1), (-1), (-1), (-1), 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, (-1), (-1), (-1), (-1), (-1));
        ldvm.toolsFunc.base64.base64Encode = function base64Encode(e) {
            let r, a, c, h, o, t;
            for (c = e.length, a = 0, r = ''; a < c;) {
                if (h = 255 & e.charCodeAt(a++), a == c) {
                    r += base64EncodeChars.charAt(h >> 2),
                        r += base64EncodeChars.charAt((3 & h) << 4),
                        r += '==';
                    break
                }
                if (o = e.charCodeAt(a++), a == c) {
                    r += base64EncodeChars.charAt(h >> 2),
                        r += base64EncodeChars.charAt((3 & h) << 4 | (240 & o) >> 4),
                        r += base64EncodeChars.charAt((15 & o) << 2),
                        r += '=';
                    break
                }
                t = e.charCodeAt(a++),
                    r += base64EncodeChars.charAt(h >> 2),
                    r += base64EncodeChars.charAt((3 & h) << 4 | (240 & o) >> 4),
                    r += base64EncodeChars.charAt((15 & o) << 2 | (192 & t) >> 6),
                    r += base64EncodeChars.charAt(63 & t)
            }
            return r
        }
        ldvm.toolsFunc.base64.base64Decode = function base64Decode(e) {
            let r, a, c, h, o, t, d;
            for (t = e.length, o = 0, d = ''; o < t;) {
                do r = base64DecodeChars[255 & e.charCodeAt(o++)];
                while (o < t && r == -1);
                if (r == -1) break;
                do a = base64DecodeChars[255 & e.charCodeAt(o++)];
                while (o < t && a == -1);
                if (a == -1) break;
                d += String.fromCharCode(r << 2 | (48 & a) >> 4);
                do {
                    if (c = 255 & e.charCodeAt(o++), 61 == c) return d;
                    c = base64DecodeChars[c]
                } while (o < t && c == -1);
                if (c == -1) break;
                d += String.fromCharCode((15 & a) << 4 | (60 & c) >> 2);
                do {
                    if (h = 255 & e.charCodeAt(o++), 61 == h) return d;
                    h = base64DecodeChars[h]
                } while (o < t && h == -1);
                if (h == -1) break;
                d += String.fromCharCode((3 & c) << 6 | h)
            }
            return d
        }
        ldvm.toolsFunc.base64.hexToBase64 = function hexToBase64(str) {
            return ldvm.toolsFunc.base64.base64Encode(String.fromCharCode.apply(null, str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" ")));
        }
        ldvm.toolsFunc.base64.Base64Tohex = function Base64Tohex(str) {
            for (let i = 0,
                     bin = ldvm.toolsFunc.base64.base64Decode(str.replace(/[ \r\n]+$/, "")), hex = []; i < bin.length; ++i) {
                let tmp = bin.charCodeAt(i).toString(16);
                if (tmp.length === 1) tmp = "0" + tmp;
                hex[hex.length] = tmp;
            }
            return hex.join("");
        }
    }();

    // env函数分发器
    ldvm.toolsFunc.dispatch = function dispatch(self, obj, objName, funcName, argList, defaultValue) {
        let envFuncName = `${objName}_${funcName}`; // EventTarget_addEventListener
        // if(Object.getOwnPropertyDescriptor(obj,Symbol.toStringTag)!==undefined){
        //     if(Object.getOwnPropertyDescriptor(self,Symbol.toStringTag)!==undefined){
        //         // self 不是示例对象
        //         return ldvm.toolsFunc.throwError("TypeError","Illegal invocation");
        //     }
        // }
        try {
            return ldvm.envFunc[envFuncName].apply(self, argList);
        } catch (error) {
            if (defaultValue === undefined) {
                console.error(`[${envFuncName}]正在执行，错误信息：${error.message}`);
            }
            return defaultValue;
        }
    };

    // 获取对象类型
    ldvm.toolsFunc.getType = function getType(obj) {
        return Object.prototype.toString.call(obj);
    }

    /**
     * 过滤代理属性
     * @param prop 属性名
     */
    ldvm.toolsFunc.filterProxyProp = function filterProxyProp(prop) {
        // for(let i=0;i<ldvm.memory.filterProxyProp.length;i++){
        //   if(ldvm.memory.filterProxyProp[i]===prop){
        //     return true;
        //   }
        //   return false;
        return ldvm.memory.filterProxyProp.includes(prop);
    };

    /**
     * proxy 代理器
     * @param obj 原始对象
     * @param objName 原始对象的名字
     */
    ldvm.toolsFunc.proxy = function proxy(obj, objName) {

        // 若不使用代理则直接返回原始对象
        if (!ldvm.config.proxy) {
            return obj;
        }
        // 若是已代理的对象，就不能继续创建代理
        if (ldvm.memory.symbolProxy in obj) {
            return obj[ldvm.memory.symbolProxy]; // 返回已代理的对象
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

                    if (ldvm.toolsFunc.filterProxyProp(prop)) {
                        return result;
                    }

                    if (ldvm.memory.symbolProxy === prop) { // 防止递归代理
                        return result;
                    }

                    // 当 result 是对象时 可以用JSON.stringfy 但是这个有bug：不能输出循环引用的对象，若有循环引用，会报错
                    // 如果是对象 我们返回类型即可
                    if (result instanceof Object) { // 不能用 typeof result === "object" 因为null也是object 用instanceof 就没事
                        let type = ldvm.toolsFunc.getType(result);
                        console.log(`{get | obj:[${objName}] -> prop:[${prop.toString()}], type:[${type}]}`);
                        // 递归代理
                        result = ldvm.toolsFunc.proxy(result, `${objName}.${prop.toString()}`);
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
            },
            set(target, prop, value, receiver) {
                let result;
                try {
                    result = Reflect.set(target, prop, value, receiver);
                    if (value instanceof Object) {
                        let type = ldvm.toolsFunc.getType(value);
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
                    let type = ldvm.toolsFunc.getType(result);
                    console.log(`{getOwnPropertyDescriptor | obj:[${objName}] -> prop:[${prop.toString()}], type:[${type}]}`);

                    // 一般不需要拦截属性描述符，在需要的时候再拦截
                    // if (typeof result !== "undefined") { // 对象没有这个属性
                    //     result = ldvm.toolsFunc.proxy(result, `${objName}.${prop.toString()}.PropertyDescriptor`);
                    // }
                } catch (e) {
                    console.log(`{getOwnPropertyDescriptor error | obj:[${objName}] -> prop:[${prop.toString()}], error:[${e.message}]}`);
                }

                return result;
            },
            defineProperty(target, prop, descriptor) {
                let result;
                try {
                    result = Reflect.defineProperty(target, prop, descriptor);
                    let type = ldvm.toolsFunc.getType(result);
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
                    let type = ldvm.toolsFunc.getType(result);
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
                    let type = ldvm.toolsFunc.getType(result);
                    console.log(`{construct | function:[${objName}], type:[${type}]}`);

                } catch (e) {
                    console.log(`{construct error | function:[${objName}], error:[${e.message}]}`);
                }

                return result;
            }, deleteProperty: function (target, propKey) {
                let result = Reflect.deleteProperty(target, propKey);
                console.log(`{deleteProperty | obj:[${objName}] -> prop:[${propKey.toString()}], return:[${result}]}`);
                return result;
            },
            has: function (target, propKey) { // 拦截 in 操作符
                let result = Reflect.has(target, propKey);
                if (propKey !== ldvm.memory.symbolProxy) {
                    console.log(`{has | obj:[${objName}] -> prop:[${propKey.toString()}], return:[${result}]}`);
                }
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
        let proxyObj = new Proxy(obj, handler);
        // 标记已代理
        Object.defineProperty(obj, ldvm.memory.symbolProxy, {
            configurable: false,
            enumerable: false,
            writable: false,
            value: proxyObj
        });

        return proxyObj;
    }

    /**
     *
     * @param func 原函数
     * @param funcInfo 是一个对象，objName,funcName属性
     * @param isDegug 布尔类型，是否进行调试，关键点定位，回溯调用栈
     * @param onEnter 函数，原函数执行前执行的函数，修改原函数入参，或者输出入参
     * @param onLeave 函数， 原函数执行完之后执行的函数，改原函数的返回值，或者输出原函数的返回值
     * @param isExecute 布尔类型，是否执行原函数，比如：过掉无限debugger函数
     */
    ldvm.toolsFunc.hook = function hook(func, funcInfo, isDegug, onEnter, onLeave, isExecute) {
        // 默认参数处理
        if (typeof func !== 'function') {
            return func;
        }
        if (funcInfo === undefined) {
            funcInfo = {};
            funcInfo.objName = "globalThis";
            funcInfo.funcName = func.name || "";
        }
        //console.log(isDegug);
        if (isDegug === undefined) {
            isDegug = false;
        }

        if (onEnter === undefined) {
            onEnter = function (argObj) {
                console.log(`{hook|${funcInfo.objName}[${funcInfo.funcName}]正在调用,参数是${JSON.stringify(argObj.args)}}`);
            };
        }
        if (onLeave === undefined) {
            onLeave = function (argObj) {
                console.log(`{hook|${funcInfo.objName}[${funcInfo.funcName}]正在调用,返回值是${JSON.stringify(argObj.result)}}`);
            };
        }
        if (isExecute === undefined) {
            isExecute = true;
        }

        // 用这个函数替换原函数(原函数 = hook后的函数)
        let hookFunc = function () {

            if (isDegug) {
                debugger;
            }
            let argObj = {};
            argObj.args = [];
            for (let i = 0; i < arguments.length; i++) {
                argObj.args[i] = arguments[i];
                // argObj.args.push(arguments[i]); 这里不能用push 有数组大小上限
            }

            // 原函数执行前
            onEnter.call(this, argObj);

            // 原函数正在执行
            let result;
            if (isExecute) {
                result = func.apply(this, argObj.args);
            }

            argObj.result = result;

            // 原函数执行后
            onLeave.call(this, argObj);

            return argObj.result;
        }
        // hook后的函数，进行native化
        ldvm.toolsFunc.setNative(hookFunc, funcInfo.funcName);
        ldvm.toolsFunc.reNameFunc(hookFunc, funcInfo.funcName);
        return hookFunc;
    }


    /**
     * hook 对象的属性，本质是替换属性描述符
     * @param obj 需要hook的对象
     * @param objName hook对象的名字
     * @param propName hook对象的属性名
     * @param isDebug 布尔 是否开启调试
     */
    ldvm.toolsFunc.hookObj = function hookObj(obj, objName, propName, isDebug) {
        let oldDescriptor = Object.getOwnPropertyDescriptor(obj, propName);
        let newDescriptor = {};
        // 若原来的属性不可配置，则无法hook，直接返回
        if (!oldDescriptor.configurable) {
            console.log(`属性无法hook，name:${oldDescriptor.name}, configurable为false`);
            return;
        }

        // 必须有的属性
        newDescriptor.configurable = true;
        newDescriptor.enumerable = oldDescriptor.enumerable;

        // 原有属性若是有writable属性，就设置
        if (oldDescriptor.hasOwnProperty("writable")) {
            newDescriptor.writable = oldDescriptor.writable;
        }
        if (oldDescriptor.hasOwnProperty("value")) {
            let val = oldDescriptor.value;
            // 判断value属性是不是函数
            // 若不是函数，就不需要修改或者hook 因为value是直接获取或设置了，不需要get，set
            if (typeof val !== 'function') {
                return;
            }
            let funcInfo = {
                objName: "objName",
                funcName: propName,
            }
            newDescriptor.value = ldvm.toolsFunc.hook(val, funcInfo, isDebug);
        }
        // 有的属性没有value属性，但有get和set
        if (oldDescriptor.hasOwnProperty("get")) {
            let get = oldDescriptor.get;
            let funcInfo = {
                objName: "objName",
                funcName: `get ${propName}`, // 这里要加一个get 补完整的函数名
            };
            // Object.getOwnPropertyDescriptor(Document.prototype,"cookie").get.name 输出的是 get cookie
            // Object.getOwnPropertyDescriptor(Document.prototype,"cookie").get.toString(); 输出的是 function get cookie() { [native code] }
            // 因此 这里定义函数名称的时候要get  下面的set也是一样

            newDescriptor.get = ldvm.toolsFunc.hook(get, funcInfo, isDebug);
        }
        if (oldDescriptor.hasOwnProperty("set")) {
            let set = oldDescriptor.set;
            let funcInfo = {
                objName: "objName",
                funcName: `set ${propName}`, // 这里要加一个set 补完整的函数名
            };

            newDescriptor.set = ldvm.toolsFunc.hook(set, funcInfo, isDebug);
        }
        // 到这里就可以真正hook这个属性了
        Object.defineProperty(obj, propName, newDescriptor);

    }

// 使用方法
// ldvm.toolsFunc.hookObj(Document.prototype, "Document.prototype", "cookie");
// document.cookie = "a=111";

    /**
     * hook 原型对象的所有属性
     * @param proto 函数原型(不是原型对象)  原型是函数名称 是类，原型对象是 (函数名.prototype)
     * @param isDebug 是否调试
     *
     */
    ldvm.toolsFunc.hookProto = function hookProto(proto, isDebug) {
        let protoObj = proto.prototype;
        let name = proto.name;
        let descriptors = Object.getOwnPropertyDescriptors(protoObj);
        for (const prop in descriptors) {
            ldvm.toolsFunc.hookObj(protoObj, `${name}.prototype`, prop, isDebug);
        }
        console.log(`hook ${name}.prototype`);
    }


}();
