/**
 *  补EventTarget对象原型链
 */

EventTarget = function EventTarget() {
};
ldvm.toolsFunc.setNative(EventTarget);
ldvm.toolsFunc.reNameObj(EventTarget, "EventTarget");
// 补EventTarget的addEventListener方法
Object.defineProperty(EventTarget.prototype, "addEventListener", {
    value: function () {
    },
})




