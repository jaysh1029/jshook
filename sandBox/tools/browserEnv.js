// 获取原型环境代码
/*
* 补环境的时候，先拿到上层原型函数的代码，然后看看里面有没有继续设置原型，也就是看看有没有这样一行代码
* 比如：Object.setPrototypeOf(HTMLDocument.prototype, Document.prototype);
*
* 如果发现有，就继续补上层原型函数的代码，直到没有继续设置原型的代码
*
* 最后补实例对象的环境代码
* */

/**
 *
 * @param proto 原型函数
 * @param instanceObj 实例对象，可选参数
 */
getProtoEnvCode = function get(proto, instanceObj) {
    let code = "";
    let protoName = proto.name;
    // 添加注释
    code += `// ${protoName}对象\r\n`;


    // 定义原型
    code += `${protoName} = function ${protoName}() {\r\n`;

    // 实例化，如果报错，就加报错代码
    try {
        new proto;
    } catch (e) {
        code += `\treturn ldvm.toolsFunc.throwError("${e.name}", "${e.message}");\r\n`;
    }
    code += `}\r\n`;

    // 保护原型
    code += `ldvm.toolsFunc.safeProto(${protoName}, "${protoName}");\r\n`;

    // 设置原型链， 要看有没有上一层函数 通过判断上一层对象是否有Symbol.toStringTag属性来确定
    let protoObj = proto.prototype;
    let parentProtoName = Object.getPrototypeOf(protoObj)[Symbol.toStringTag];
    // console.log(parentProtoName);
    if (parentProtoName !== undefined) {
        code += `Object.setPrototypeOf(${protoName}.prototype, ${parentProtoName}.prototype);\r\n`;
    }
    // 设置原型属性
    for (const key in Object.getOwnPropertyDescriptors(proto)) {
        if (key === "arguments" || key === "caller" || key === "length" || key === "name" || key === "prototype") {
            continue;
        }
        let descriptor = getDescriptor(proto, key, protoName, protoName, instanceObj);
        code += `ldvm.toolsFunc.defineProperty(${protoName},"${key}",${descriptor});\r\n`;
    }
    // 设置原型对象的属性
    for (const key in Object.getOwnPropertyDescriptors(proto.prototype)) {
        if (key === "constructor") {
            continue;
        }
        let descriptor = getDescriptor(proto.prototype, key, `${protoName}.prototype`, protoName, instanceObj);
        code += `ldvm.toolsFunc.defineProperty(${protoName}.prototype,"${key}",${descriptor});\r\n`;
    }


    console.log(code);
    copy(code);
    //return code;
};

/**
 @param obj 对象
 @param objName 对象名称
 @param instanceObj 实例对象，可选参数 跟obj一样，如果传入，则获取默认值
 */
let getObjEnvCode = function getObjEnvCode(obj, objName, instanceObj) {
    let code = "";
    // 添加注释
    code += `// ${objName}对象\r\n`;
    // 定义对象
    code += `let ${objName} = {};\r\n`;
    // 设置原型
    let protoName = Object.getPrototypeOf(obj)[Symbol.toStringTag];
    if (protoName !== undefined) {
        code += `Object.setPrototypeOf(${objName}, ${protoName}.prototype);\r\n`;
    }
    for (const key in Object.getOwnPropertyDescriptors(obj)) {
        let discriptor = getDescriptor(obj, key, objName, objName, instanceObj);
        code += `ldvm.toolsFunc.defineProperty(${objName},"${key}",${discriptor});\r\n`;
    }
    console.log(code);
    return code;

};

// 获取属性描述符
let getDescriptor = function getDescriptor(obj, prop, objName, protoName, instanceObj) {
    let descriptor = Object.getOwnPropertyDescriptor(obj, prop);
    let configurable = descriptor.configurable;
    let enumerable = descriptor.enumerable;
    let code = `{configurable:${configurable},enumerable:${enumerable},`;
    if (descriptor.hasOwnProperty("writable")) {
        let writable = descriptor.writable;
        code += `writable:${writable},`;
    }
    if (descriptor.hasOwnProperty("value")) {
        let val = descriptor.value;
        if (val instanceof Object) {
            if (typeof val === "function") {
                code += `value: function () {
        // 分发器
        return ldvm.toolsFunc.dispatch(this,${objName},"${protoName}","${prop}",arguments);
    }`;
            } else {
                // 这个地方需要根据具体情况来写 有可能会遇到循环引用
                console.log("需要额外关注对象的value值：", val);
                // 如果是普通对象可以使用;
                //code +=`value:${JSON.stringify(val)}`;  // 这个遇到循环引用就会报错
                // 默认处理方式：给一个{} 但要特别关注
                code += `value:{}`;
            }
        } else if (typeof val === "symbol") {
            code += `value:${val.toString()}`;
        } else if (typeof val === "string") {
            code += `value:"${val.replaceAll("\"", "\\\"").replaceAll("\n", "\\n").replaceAll("\r", "\\r")}"`; // string的值 要带引号
        } else {
            code += `value:${val}`; // 普通类型 直接赋值
        }
    }
    // 没有value属性的，可能有get set函数

    if (descriptor.hasOwnProperty("get")) {
        let get = descriptor.get;
        if (typeof get === "function") {
            let defaultValue;
            try {
                defaultValue = get.call(instanceObj);
            } catch (error) {

            }
            // 若是undefined 或这是对象 就不传默认值
            if (defaultValue === undefined || defaultValue instanceof Object) {
                code += `get: function () {
        // 分发器
        return ldvm.toolsFunc.dispatch(this,${objName},"${protoName}","${prop}_get",arguments);
    },`;

            } else { // 说明有返回值 根据值的类型判断处理，最后作为默认值传递给分发器
                let defValType = typeof defaultValue;
                let defValResult = defaultValue;

                if (defValType === "string") {
                    defValResult = `"${defaultValue}"`; // string类型要带双引号
                } else if (defValType === "symbol") {
                    defValResult = defaultValue.toString();
                }

                code += `get: function () {
        // 分发器
        return ldvm.toolsFunc.dispatch(this,${objName},"${protoName}","${prop}_get",arguments,${defValResult});
    },`;
            }

        } else {
            code += `get:undefined,`;
        }
    }

    if (descriptor.hasOwnProperty("set")) {
        let set = descriptor.set;
        if (typeof set === "function") { // set 没有默认值，因此不用传递默认值
            code += `set: function () {
        // 分发器
        return ldvm.toolsFunc.dispatch(this,${objName},"${protoName}","${prop}_set",arguments);
    }`;
        } else {
            code += `set:undefined`;
        }
    }

    code += "}\r\n";
    return code;
}



// 使用方法
// getProtoEnvCode(Window); // 补原型
// getObjEnvCode(window,"window"); 补实例对象
