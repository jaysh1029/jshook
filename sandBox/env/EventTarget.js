/**
 *  补EventTarget对象原型链
 */

EventTarget = function EventTarget() {
};
// ldvm.toolsFunc.setNative(EventTarget, "EventTarget");
//ldvm.toolsFunc.reNameObj(EventTarget, "EventTarget");
// 以上两行换成下面的方法
// 保护原型
ldvm.toolsFunc.safeProto(EventTarget, "EventTarget");


// 补EventTarget的addEventListener方法
// Object.defineProperty(EventTarget.prototype, "addEventListener", {
//     value: function () {
//     },
// })

// 对value进行保护，防止被检测到
//ldvm.toolsFunc.safeFunc(Object.getOwnPropertyDescriptor(EventTarget.prototype, "addEventListener").value, "addEventListener");

// 上面的代码换成下面封装好的代码
ldvm.toolsFunc.defineProperty(EventTarget.prototype, "addEventListener", {
    value: function () {
        // 分发器
        return ldvm.toolsFunc.dispatch(this,EventTarget.prototype,"EventTarget","addEventListener",arguments);
    },
});



