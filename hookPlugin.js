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
let hook = function (func, funcInfo, isDegug, onEnter, onLeave, isExecute) {
    // 默认参数处理
    if (typeof func !== 'function') {
        return func;
    }
    if (!funcInfo) {
        funcInfo = {};
        funcInfo.objName = "globalThis";
        funcInfo.funcName = func.name || "";
    }

    if (!isDegug) {
        isDegug = false;
    }

    if (!onEnter) {
        onEnter = function (argObj) {
            console.log(`{hook|${funcInfo.objName}[${funcInfo.funcName}]正在调用,参数是${JSON.stringify(argObj.args)}}`);
        };
    }
    if (!onLeave) {
        onLeave = function (argObj) {
            console.log(`{hook|${funcInfo.objName}[${funcInfo.funcName}]正在调用,返回值是${JSON.stringify(argObj.result)}}`);
        };
    }
    if (!isExecute) {
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
            argObj.args.push(arguments[i]);
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

        return result;
    }

    return hookFunc;
}

function add(a, b) {
    return a + b;
}

let funcInfo = {
    objName: "Obj",
    funcName: "add",
};
add = hook(add,funcInfo);
console.log(add(2, 3));
console.log(add);

/*
add = function (a, b) {
    return a * b;
}*/
