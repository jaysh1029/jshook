/*
* vm2的安装和使用：整合JS，提供相对纯净的V8环境，方便我们调试
* 开源地址：https://github.com/patriksimek/vm2
* 安装命令：npm install vm2*
* */

// VM 虚拟机
// 代码通过VMScript创建
const {VM, VMScript} = require("vm2");
const fs = require("fs"); // 文件操作
// 创建虚拟机
const vm = new VM();
// 读取原始代码
const code = fs.readFileSync("./input.js");
// 创建脚本
const script = new VMScript(code, "./debugJS.js");

// 运行脚本
// 如果调试的时候在这里下断点，但new VMScript(code)中要加入要调试代码的路径
const result = vm.run(script);
console.log(result);
fs.writeFileSync("./output.js", code);








































