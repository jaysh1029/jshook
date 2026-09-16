// 浏览器接口具体实现

// 实现EventTarget的addEventListener方法
ldvm.envFunc.EventTarget_addEventListener = function () {
    console.log(this === window);
    console.log(arguments);
    debugger;
    return "666";
};

!function () {
    ldvm.envFunc.Storage_getItem = function () {
        return null;
    };
}();

