// 网页变量初始化
!function () {
    // hook时间随机数
    let onLeave = function (obj) {
        obj.result = 1789612712966;
    };
    let onLeaveForMath = function (obj) {
        obj.result = 0.5;
    };
    Date.now = ldvm.toolsFunc.hook(Date.now, undefined, false, function () {
    }, onLeave);
    Date.prototype.getTime = ldvm.toolsFunc.hook(Date.prototype.getTime, undefined, false, function () {
    }, onLeave);
    Math.random = ldvm.toolsFunc.hook(Math.random, undefined, false, function () {
    }, onLeaveForMath);
}();
