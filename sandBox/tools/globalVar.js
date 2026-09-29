// 全局变量初始化
!function (){
    let onEnter = function (obj){
        try{
            ldvm.toolsFunc.printLog(obj.args);
        }catch (err){
            //console.error(`打印日志失败：${err}`);
        }
    };
    console.log = ldvm.toolsFunc.hook(console.log,undefined,false,onEnter,function (){},ldvm.config.print);
    console.error = ldvm.toolsFunc.hook(console.error,undefined,false,onEnter,function (){},ldvm.config.print);

    let chromePlugin={
            description: "Portable Document Format",
            filename: "internal-pdf-viewer",
            name: "PDF Viewer",
            mimeTypes: [
                {
                    type: "application/pdf",
                    suffixes: "pdf",
                    description: "Portable Document Format",
                },
                {
                    type: "text/pdf",
                    suffixes: "pdf",
                    description: "Portable Document Format",
                },
            ]
        };

    ldvm.toolsFunc.createPlugin(chromePlugin);
    chromePlugin.name = "Chrome PDF Viewer";
    ldvm.toolsFunc.createPlugin(chromePlugin);
    chromePlugin.name = "Chromium PDF Viewer";
    ldvm.toolsFunc.createPlugin(chromePlugin);
    chromePlugin.name = "Microsoft Edge PDF Viewer";
    ldvm.toolsFunc.createPlugin(chromePlugin);
    chromePlugin.name = "WebKit built-in PDF";
    ldvm.toolsFunc.createPlugin(chromePlugin);

}();