const fs = require("fs"); // 文件操作

/**
 * 读取对应网站下面的代码
 * @param siteName 网站名称
 * @param type 具体代码文件名称(一般有三个文件原始、用户、异步)
 * @returns 返回代码内容
 */
function getCode(siteName, type) {
    // 若文件不存在则返回空
    const codeFilePath = `./user/${siteName}/${type}.js`;
    if (!fs.existsSync(codeFilePath)) {
        console.error(`文件${codeFilePath}不存在`);
        return "";
    }
    // 处理异常情况
    try {
        return fs.readFileSync(codeFilePath) + "\r\n";
    } catch (error) {
        console.error(`读取文件${codeFilePath}失败`, error);
        return "";
    }
}

module.exports = {
    getCode
}
