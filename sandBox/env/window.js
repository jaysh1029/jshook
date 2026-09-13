/**
 *  Window对象
 * 1. window原型链
 *  window.__proto__ === Window.prototype
 *  window.__proto__.__proto__ 是  WindowProperties 但因为是Symbol无法访问 prototype
 *  window.__proto__.__proto__.__proto__ === EventTarget.prototype
 *  window.__proto__.__proto__.__proto__.__proto__ === Object.prototype
 *
 *  补windows的原型链补到EventTarget即可
 *  很多爬虫 / 反爬会遍历原型链，逐级校验每一层 constructor、原型上属性描述符
 *  window上的很多方法都是继承自EventTarget 所以有方法归属校验，因此要补原型链环境到EventTarget
 *  Object.prototype：所有 JS 对象的基原型，几乎所有环境自带，一般不用手动伪造
 *  默认不补环境，则检测的时候 Window对象的父类直接就是Object，一下子就检测出来了
  */



Window = function Window() {
};
window = globalThis;
Object.defineProperties(window, Window.prototype);
// 这样定义 输出window.toString()的时候结果是[object object]
console.log(window);