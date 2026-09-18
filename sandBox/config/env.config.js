const fs = require("fs"); // 文件操作

/**
 * 读取对应网站下面的代码
 * @param fileName 文件名
 * @returns 返回代码内容
 *
 */
function getFile(fileName) {
    // 若文件不存在则返回空
    const codeFilePath = `./env/${fileName}.js`;
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

function getHtmlElement() {
    try {
        let fileList = fs.readdirSync("./env/htmlElements");
        let code = "";
        for (let i = 0; i < fileList.length; i++) {
            code += fs.readFileSync(`./env/htmlElements/${fileList[i]}`) + "\r\n";
        }
        return code;

    } catch (error) {
        console.error(`读取./env/htmlElements目录下的文件失败`, error);
        return "";
    }
}

function getCode() {
    let code = "// env相关代码\r\n";
    code += getFile("EventTarget");
    code += getFile("WindowProperties"); // 因为window继承自WindowProperties，所以要先定义WindowProperties
    code += getFile("Window");
    code += getFile("Node");
    code += getFile("Element");
    code += getFile("HTMLElement");
    code += getHtmlElement();
    code += getFile("Document");
    code += getFile("HTMLDocument");
    code += getFile("Storage");
    code += getFile("Navigator");
    code += getFile("Location");
    code += getFile("GlobalThis"); // 全局环境放到最后
    return code;
}

module.exports = {
    getCode
}
