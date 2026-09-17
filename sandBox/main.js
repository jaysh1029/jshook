/*
* 入口
* 导入模块
* */

// VM 虚拟机
// 代码通过VMScript创建
// const {VM, VMScript} = require("vm2"); // 在有Proxy的对象时，无法使用，暂时弃用
const vm = require("vm");
const fs = require("fs"); // 文件操作
const user = require("./config/user.config");
const tools = require("./config/tools.config");
const env = require("./config/env.config");


// 网站名称
const siteName = "siteName";

// 清空日志
fs.writeFileSync(`./user/${siteName}/log.txt`, "");

// 全局对象配置
const configCode = fs.readFileSync("./config/config.js");

// 功能插件相关函数
const toolsCode = tools.getCode();

// 浏览器环境相关代码
const envCode = env.getCode();

// 全局初始化代码
const globalVarCode = tools.getFile("globalVar");

// 用户初始化代码
const userVarCode = user.getCode(siteName, "userVar");

// 设置代理对象
const proxyCode = tools.getFile("proxyObj");

// 需要调试的代码
const debugCode = user.getCode(siteName, "input");

// 最后才是异步执行的代码
const asyncCode = user.getCode(siteName, "async");

// 整合代码

const code = `${configCode}${toolsCode}${envCode}${globalVarCode}${userVarCode}${proxyCode}${debugCode}${asyncCode}`;

const logCode = fs.readFileSync("./tools/printLog.js");
const codeTest = `${configCode}${toolsCode}${logCode}${envCode}${globalVarCode}${userVarCode}${proxyCode}${debugCode}${asyncCode}`;

// 弃用vm2，因为vm2在有Proxy的对象时，无法使用，暂时弃用
// // 创建虚拟机
// const vm = new VM();
//
// // 创建脚本
// const script = new VMScript(code, "./debugJS.js");


try {

    // 运行脚本
    // 如果调试的时候在这里下断点，但new VMScript(code)中要加入要调试代码的路径
    // const result = vm.run(script);
    const context = vm.createContext({
        fs:fs,
        _siteName_: siteName,

    }); // 空 sandbox
    const script = new vm.Script(codeTest, {filename: "./debugJS.js"});
    const result = script.runInContext(context, {timeout: 1000});

    console.log("执行结果:", result);
} catch (err) {
    console.error("脚本执行出错:", err.message);
    console.error(err.stack);
}

// 输出文件
fs.writeFileSync(`./user/${siteName}/output.js`, code);
console.log("执行完成");






































