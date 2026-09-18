// 浏览器接口具体实现


!function () {
    ldvm.envFunc.Storage_getItem = function () {
        return null;
    };
    ldvm.envFunc.document_location_get = function () {
        return location;
    };
    ldvm.envFunc.Document_createElement = function () {
        return "<div></div>";
    };
    // 实现EventTarget的addEventListener方法
    ldvm.envFunc.EventTarget_addEventListener = function () {
        console.log(this === window);
        console.log(arguments);
        debugger;
        return "666";
    };
}();

/*
* 在浏览器创建div标签
* document.createElement("div") // <div>
* Document.prototype.createElement("div") // 会报错TypeError: Illegal invocation
* 只能使用实例对象创建，但下面的代码输出true
* Document.prototype.createElement === document.createElement // true
* 但下面的代码是可以的
* Document.prototype.createElement.call(document,"div") // <div></div>
* */

