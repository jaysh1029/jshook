!function () {
    ldvm.toolsFunc.printLog = function printLog(logList) {
        let log = "";
        for (let i = 0; i < logList.length; i++) {
            let item = logList[i];
            if (item instanceof Object) {
                if (typeof item === "function") {
                    // 函数 就输出函数体
                    log += item.toString() + " ";
                } else {
                    // 非函数 就输出类型
                    log += ldvm.toolsFunc.getType(item) + " ";
                }
            } else if (typeof item === "symbol") {
                log += item.toString() + " ";
            } else {
                log += item + " "; // 这种方式加空格，会自动转为字符串
            }
        }
        log += "\r\n";
        fs.appendFileSync(`./user/${_siteName_}/log.txt`, log);
        //console.log(log);
    };
}();