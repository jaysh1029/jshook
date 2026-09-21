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


    let meta1 = document.createElement("meta");
    let meta2 = document.createElement("meta");
    let head = document.createElement("head");
    meta2.content="YVc1cGRDQjBZV2";
    // 由于Node类下面的parentNode的set方法是null，所以不能直接赋值
    // meta2.parentNode = head;
    // 通过自定义的setProtoAtrr方法设置parentNode属性
    ldvm.toolsFunc.setProtoAtrr.call(meta2,"parentNode",head);
}();
