// hook cookie

// 浏览器环境 document 在页面加载前就存在了 不需要定义了
// 但保存原始cookie
let _cookie =document.cookie;
Object.defineProperty(document,"cookie",{
    get(){
        debugger;
        console.log("正在获取cookie",_cookie);
        return _cookie;
    },
    set(value){
        console.log("正在设置cookie",value);
        _cookie=value;
    }
});