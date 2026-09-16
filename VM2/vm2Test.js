const vm = require("vm");
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
//throwError(${JSON.stringify(errName)}, ${JSON.stringify(errMessage)});
var obj = {};
let proxy = new Proxy(obj, {})
`;

const context = vm.createContext({}); // 空 sandbox
const script = new vm.Script(code, { filename: "./debugJS.js" });

try {
    const result = script.runInContext(context, { timeout: 1000 });
    console.log(result);
} catch (err) {
    console.error("脚本执行出错:", err.message);
    console.error(err.stack);
}

console.log("执行完成");