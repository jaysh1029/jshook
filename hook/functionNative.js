// 自执行函数 内部的局部变量不会污染全局，是隔离沙箱
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
    globalThis.setNative = function (func, funcName) {
        set_native(func, symbol, `function ${funcName || func.name || ''}() { [native code] }`);
    };

    // 新增 unhook函数，还原被native化的函数
    globalThis.unhookFunctionToString = function(){
        delete Function.prototype.toString;
        Object.defineProperty(Function.prototype, "toString",{
            enumerable:false,
            configurable:true,
            writable:true,
            value:$toString
        });
       console.log("unhook done");
    }
}();

let add = function (a,b){
    return a+b;
};

console.log(add.toString()); // 打印源码
console.log(Function.prototype.toString.call(add)); // 打印源码

setNative(add,"add");

console.log(add.toString()); // function add() { [native code] }
console.log(Function.prototype.toString.call(add)); // function add() { [native code] }


// 自己思考的问题，若反爬技术，使用这个方法遍历，不就又检测出问题了吗
Object.getOwnPropertySymbols(add).forEach(function (key) {
    if(add[key].includes("[native code]")){
        console.log("检测到疑似hook行为");
    }
});