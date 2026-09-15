// 插件功能相关

// 自执行函数 内部的局部变量不会污染全局，是隔离沙箱
!function () {

    // 定义对象属性 defineProperty
    ldvm.toolsFunc.defineProperty = function defineProperty(obj, prop, oldDescriptor)
    {
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
        Object.defineProperty(obj,prop,newDescriptor);
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


}();
