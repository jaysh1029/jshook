/**
 *  补WindowProperties对象原型链
 */

WindowProperties = function WindowProperties() {
};
ldvm.toolsFunc.setNative(WindowProperties);
ldvm.toolsFunc.reNameObj(WindowProperties, "WindowProperties");

Object.setPrototypeOf(WindowProperties.prototype, EventTarget.prototype);





