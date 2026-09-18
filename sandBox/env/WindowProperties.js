/**
 *  补WindowProperties对象原型链
 */

WindowProperties = function WindowProperties() {
};
// 函数native化
ldvm.toolsFunc.setNative(WindowProperties);
// 修改对象名称
ldvm.toolsFunc.reNameObj(WindowProperties, "WindowProperties");
// 删除构造方法 在浏览器中这个类在控制台输出 会报错：Uncaught ReferenceError: WindowProperties is not define
delete WindowProperties.prototype.constructor;

Object.setPrototypeOf(WindowProperties.prototype, EventTarget.prototype);

// WindowProperties对象在浏览器中是不存在的，所以在设置原型链之后，要删除这个对象
delete WindowProperties.prototype;

// 这个环境，其实无法从浏览器中直接拿过来，需要自己去实现




