function add(a, b) {
    return a + b;
}

add(1, 3);


const ivm = require("isolated-vm");
const fs = require("fs");
const path = require("path");

async function main() {
    // 要跑的脚本代码（保持和之前一致，末尾加一句实际调用，否则永远不会触发 throw）
    const errName = "CustomError";
    const errMessage = "出错了";

    let code = `function throwError(name, message) {
    let error = new Error(message);
    error.name = name;
    error.message = message;
    error.stack = \`\${name}: \${message}\n    at <anonymous>:2:5\`;
    throw error;
}`;

    // 1. 创建隔离环境（相当于 vm2 的 VM 实例，但是真正的 V8 Isolate，隔离性更强）
    const isolate = new ivm.Isolate({ memoryLimit: 128 }); // 128MB 内存上限，防止死循环/内存爆炸

    // 2. 创建上下文（相当于沙箱的全局环境）
    const context = await isolate.createContext();
    const jail = context.global;
    await jail.set("global", jail.derefInto()); // 让沙箱内可以访问自己的 global

    // 3. 编译脚本（对应 vm2 的 new VMScript(code, filename)）
    const script = await isolate.compileScript(code, { filename: "debugJS.js" });

    // 4. 运行脚本，并设置超时（对应 vm2 的运行阶段，isolated-vm 原生支持超时防死循环）
    try {
        const result = await script.run(context, { timeout: 1000 });
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

    // 6. 输出文件（这部分和沙箱无关，照旧）
    const siteName = "mysite"; // 之前缺失的变量，按需替换成实际值
    const outDir = `./user/${siteName}`;
    fs.mkdirSync(outDir, { recursive: true }); // 目录不存在时先创建，否则 writeFileSync 会报错
    fs.writeFileSync(path.join(outDir, "output.js"), code);
    console.log("执行完成");
}

main().catch((err) => {
    console.error("main 执行失败:", err);
});