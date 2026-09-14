/*
* 入口
* 导入模块
* */

// VM 虚拟机
// 代码通过VMScript创建
// vm2已不再维护，换为官方的isolated-vm模块
//const {VM, VMScript} = require("vm2");
const ivm = require("isolated-vm");
const fs = require("fs"); // 文件操作
const user = require("./config/user.config");
const tools = require("./config/tools.config");
const env = require("./config/env.config");


// 网站名称
const siteName = "siteName";
// 创建虚拟机 放弃使用vm2模块，这个过时了
// const vm = new VM();

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


async function main_isolatedvm() {
// 1. 创建隔离环境（相当于 vm2 的 VM 实例，但是真正的 V8 Isolate，隔离性更强）
    const isolate = new ivm.Isolate({memoryLimit: 128}); //  128MB 内存上限，防止死循环/内存爆炸
// 2. 创建上下文（相当于沙箱的全局环境）
    const context = await isolate.createContext();
    const jail = context.global;
    await jail.set("global", jail.derefInto()); // 让沙箱内可以访问自己的 global


// 3. 编译脚本（对应 vm2 的 new VMScript(code, filename)）
    const script = await isolate.compileScript(code, {filename: "debugJS.js"});

// 4. 运行脚本，并设置超时（对应 vm2 的运行阶段，isolated-vm 原生支持超时防死循环）
    try {
        const result = await script.run(context, {timeout: 1000});
        console.log("执行结果:", result);
    } catch (err) {
        // 这里捕获到的就是脚本里 throw 出来的真实 Error，
        // isolated-vm 会把沙箱内的错误转换成普通的宿主 Error 对象（而不是像 vm2 那样包一层 Proxy）
        console.error("脚本执行出错:", err.message);
        console.error(err.stack);
    }

// 5. 释放资源（isolated-vm 需要手动释放，不然会有内存泄漏）
    context.release();
    isolate.dispose();


// 输出文件
    fs.writeFileSync(`./user/${siteName}/output.js`, code);
    console.log("执行完成");
}
main_isolatedvm().catch((err) => {
    console.error("main执行失败:", err.message);
    console.error(err.stack);
});







































