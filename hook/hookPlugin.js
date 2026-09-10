// 实现函数native化
// 自执行函数 内部的局部变量不会污染全局，是隔离沙箱
ld = {};
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
    ld.setNative = function (func, funcName) {
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

// 函数重命名
ld.reNameFunc = function reNameFunc(func,name){
    Object.defineProperty(func,"name",{
        configurable:true,
        enumerable:false,
        writable:false,
        value:name
    });
};


// 实现hook 插件


// IDE技巧：自动生成参数说明模版 在函数上方 输入/** 按Enter即可
// 若增加参数，则鼠标悬停参数上方 可以点击 更新参数文档，自动添加参数文档说明
// 若删除参数，则鼠标悬停在已删除的说明文档上，可以点击更新参数文档，删除参数说明

/**
 *
 * @param func 原函数
 * @param funcInfo 是一个对象，objName,funcName属性
 * @param isDegug 布尔类型，是否进行调试，关键点定位，回溯调用栈
 * @param onEnter 函数，原函数执行前执行的函数，修改原函数入参，或者输出入参
 * @param onLeave 函数， 原函数执行完之后执行的函数，改原函数的返回值，或者输出原函数的返回值
 * @param isExecute 布尔类型，是否执行原函数，比如：过掉无限debugger函数
 */
ld.hook = function (func, funcInfo, isDegug, onEnter, onLeave, isExecute) {
    // 默认参数处理
    if (typeof func !== 'function') {
        return func;
    }
    if (funcInfo === undefined) {
        funcInfo = {};
        funcInfo.objName = "globalThis";
        funcInfo.funcName = func.name || "";
    }

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
    if (isExecute == undefined) {
        isExecute = true;
    }

    // 替换函数，然后返回
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
    ld.setNative(hookFunc,funcInfo.funcName);
    ld.reNameFunc(hookFunc,funcInfo.funcName);
    return hookFunc;
}

function add(a, b) {
    console.log("正在执行原函数add方法");
    return a + b;
}

let funcInfo = {
    objName: "Obj",
    funcName: "add",
};
let onEnter = function (argObj) {
    console.log("正在执行onEnter", argObj.args);
    argObj.args[0] = 15;
};

let onLeave = function (argObj) {
    console.log("正在执行onLeave", argObj.result);
    argObj.result = 16;
}

add = ld.hook(add, funcInfo, true, onEnter, onLeave, true);
console.log(add(2, 3));
console.log(add.toString());
console.log(Function.prototype.toString.call(add));
console.log(add.name);

/*
add = function (a, b) {
    return a * b;
}*/
