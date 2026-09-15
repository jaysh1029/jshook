// 删除浏览器中不存在的对象，这些可能会被检测到，如果有其他对象，继续删除即可
delete global;
delete Buffer;
delete WindowProperties;
let window = globalThis;
Object.setPrototypeOf(window, Window.prototype);

// 在这里定义window的对象

// atob  btoa 方法 在纯净的V8环境中是没有定义的，需要补环境
// 定义atob方法 解码base64字符串为普通字符串
Object.defineProperty(window,"atob",{
    value:function atob(base64String){
        return ldvm.toolsFunc.base64.base64Decode(base64String);
    }
});
//ldvm.toolsFunc.setNative(window.atob,"atob"); // native化 atob方法
// 换成safeFunc方法 同时调用setNative和reNameFunc方法
// 如果不保护方法的name，则atob.name的值会是value，而不是atob
ldvm.toolsFunc.safeFunc(window.atob, "atob");

// 定义btoa方法 编码普通字符串为base64字符串
Object.defineProperty(window,"btoa",{
    value:function btoa(normalString){
        return ldvm.toolsFunc.base64.base64Encode(normalString);
    }
});
//ldvm.toolsFunc.setNative(window.btoa,"btoa"); // native化 btoa方法
// 换成safeFunc方法 同时调用setNative和reNameFunc方法
// 如果不保护方法的name，则btoa.name的值会是value，而不是btoa
ldvm.toolsFunc.safeFunc(window.btoa, "btoa");
