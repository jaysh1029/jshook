const fs = require("fs"); // 文件操作

/**
 * 读取对应网站下面的代码
 * @param fileName 文件名
 * @returns 返回代码内容
 *
 */
function getFile(fileName) {
    // 若文件不存在则返回空
    const codeFilePath = `./tools/${fileName}.js`;
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

function getCode() {
    let code = "";
    code += getFile("toolsFunc");
    code += getFile("envFunc");
    return code;
}

module.exports = {
    getCode,
    getFile
}
