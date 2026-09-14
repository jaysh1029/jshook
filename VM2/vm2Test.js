const { VM, VMScript } = require("vm2");
const fs = require("fs");

const siteName = "mysite";       // 补上
const errName = "CustomError";
const errMessage = "出错了";

let code = `function throwError(name, message) {
    let error = new Error(message);
    error.name = name;
    error.message = message;
    error.stack = \`\${name}: \${message}\n    at <anonymous>:2:5\`;
    throw error;
}
//throwError(${JSON.stringify(errName)}, ${JSON.stringify(errMessage)});`;

const script = new VMScript(code, "./debugJS.js");
const vm = new VM({ timeout: 1000, sandbox: {} });

try {
    const result = vm.run(script);
    console.log(result);
    //console.log(code);
} catch (err) {
    console.error("脚本执行出错:", err.message);
    console.error(err.stack);
}

console.log("执行完成");