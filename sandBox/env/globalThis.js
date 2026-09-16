// 删除浏览器中不存在的对象，这些可能会被检测到，如果有其他对象，继续删除即可
delete global;
delete Buffer;
delete WindowProperties;
let window = globalThis;
Object.setPrototypeOf(window, Window.prototype);

// 在这里定义window的对象

// atob  btoa 方法 在纯净的V8环境中是没有定义的，需要补环境
// 定义atob方法 解码base64字符串为普通字符串
ldvm.toolsFunc.defineProperty(window, "atob", {
    configurable: true,
    enumerable: true,
    writable: true,
    value: function atob(base64String) {
        return ldvm.toolsFunc.base64.base64Decode(base64String);
    }
});
//ldvm.toolsFunc.setNative(window.atob,"atob"); // native化 atob方法
// 换成safeFunc方法 同时调用setNative和reNameFunc方法
// 如果不保护方法的name，则atob.name的值会是value，而不是atob
// ldvm.toolsFunc.safeFunc(window.atob, "atob"); 上面使用封装好的代码已经做过保护了

// 定义btoa方法 编码普通字符串为base64字符串
ldvm.toolsFunc.defineProperty(window, "btoa", {
    configurable: true,
    enumerable: true,
    writable: true,
    value: function btoa(normalString) {
        return ldvm.toolsFunc.base64.base64Encode(normalString);
    }
});
//ldvm.toolsFunc.setNative(window.btoa,"btoa"); // native化 btoa方法
// 换成safeFunc方法 同时调用setNative和reNameFunc方法
// 如果不保护方法的name，则btoa.name的值会是value，而不是btoa
// ldvm.toolsFunc.safeFunc(window.btoa, "btoa"); 上面使用封装好的代码已经做过保护了

// Object.defineProperty(window,"name",{
//     configurable:true,
//     enumerable:true,
//     get:function get(){},
//     set:function set(){},
// });
//
// ldvm.toolsFunc.safeFunc(Object.getOwnPropertyDescriptor(window,"name").get, "get name");
// ldvm.toolsFunc.safeFunc(Object.getOwnPropertyDescriptor(window,"name").set, "set name");

// 上面的代码换成下面封装好的代码
ldvm.toolsFunc.defineProperty(window, "name", {
    configurable: true,
    enumerable: true,
    get: function get() {
    },
    set: function set() {
    },
});

// location对象的属性描述符，在浏览器中的configurable为false
Object.defineProperty(window, "location", {configurable: false});
