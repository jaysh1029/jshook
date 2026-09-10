// hook 浏览器环境 以函数atob为例

_atob = atob;
atob = function (str) {
    console.log("正在执行atob方法，参数：",str);
    let result = _atob(str);
    if(result === "name") { // 可以通过条件判断 精确定位关键点
        debugger;
    }
    console.log("执行完atob方法，返回值：",result);
}