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
   return  ldvm.toolsFunc.throwError("TypeError", "Failed to construct 'Window': Illegal constructor");
};
// Window对象
Window = function Window() {
ldvm.toolsFunc.throwError("TypeError", "Failed to construct 'Window': Illegal constructor");
}
//ldvm.toolsFunc.safeProto(Window, "Window");


//window = globalThis;
// let window2 = {};
// Object.defineProperties(window2, Window.prototype);

// 这样定义 输出window的原型是Object 而 浏览器中的window的原型是 Window类(这里Window是大写的)，这就会被检测到
//console.log(window2, window2.__proto__); // {} [Object: null prototype] {}
//console.log(window2.toString()); // [object Object]

/*
// 修改对象名称
Object.defineProperty(Window.prototype, Symbol.toStringTag, {
    // 这里的参数要参考浏览器中调试输出的原始Window原型对象的Symbol.toStringTag属性
    // Object.getOwnPropertyDescriptors(Window.prototype,Symbol.toStringTag) 让这里补环境的属性跟原始的一样即可
    configurable: true,
    enumerable: false,
    value: "Window",
    writable: false,
});*/

//ldvm.toolsFunc.reNameObj(Window, "Window");
// 换成safeProto方法 同时调用reNameObj和setNative方法
ldvm.toolsFunc.safeProto(Window, "Window");


// 设置Window.prototype的原型对象
Object.setPrototypeOf(Window.prototype, WindowProperties.prototype);


//console.log(window, window.toString()); //Window {} [object Window] 这样原型链就跟浏览器中的window一致了

// 这里跟浏览器还不一样，所以需要进行函数native化
//console.log(Window.toString()); //function Window() {}
//ldvm.toolsFunc.setNative(Window,"Window");
// console.log(window.toString()); // [object Window]
// console.log(Window.toString()); //function Window() { [native code] }
// console.log(window.__proto__.toString()); // [object Window]

// 这段代码要注释，否则在main.js中会报错，因为在vm.run中 遇到这里会抛出异常
//console.log(new Window()); // Window {} 这个在浏览器中是不能new的，会报错：Uncaught TypeError: Failed to construct 'Window': Illegal constructor 这也是一个检测点
/*
* 若要补这个new Window()报错的环境 需要知道报错类型，在浏览器的控制台中利用try catch捕获报错类型
*
* try{
    new Window();
}catch(e){
    debugger; // 这里也可以断点调试，看实际类型
    console.log(e.__proto__);
}
输出的是以下类型
* Error {name: 'TypeError', message: ''}
constructor:TypeError()
message:""
name:"TypeError"
[[Prototype]]:Object
*
* 那就需要补TypeError这个类型的环境
* 在Window函数中 加入
* ldvm.toolsFunc.throwError("TypeError", "Illegal constructor");即可
*
* */


// console.log(atob("YWJj"));
// console.log(btoa("abc"));
// console.log(atob.toString(),btoa.toString());


// 补环境  Window原型的属性 在浏览器中可以通过 Object.getOwnPropertyDescriptors(Window) 来获取原型属性，然后对比着补环境
// Object.defineProperty(Window,"PERSISTENT",{
//     configurable:false,
//     enumerable:true,
//     value:1,
//     writable:false
// });
//
// Object.defineProperty(Window,"TEMPORARY",{
//     configurable:false,
//     enumerable:true,
//     value:0,
//     writable:false
// });

// 环境补完之后，可以在浏览器通过 dir(Window) 查看Window原型的属性值

// 上面的代码换成下面封装好的代码
ldvm.toolsFunc.defineProperty(Window,"PERSISTENT",{
    configurable:false,
    enumerable:true,
    value:1,
    writable:false
});

ldvm.toolsFunc.defineProperty(Window,"TEMPORARY",{
    configurable:false,
    enumerable:true,
    value:0,
    writable:false
});



// 补环境  Window.prototype原型对象的属性
/*
* 在浏览器中可以通过 Object.getOwnPropertyDescriptors(Window.prototype) 来获取原型属性，然后对比着补环境
* Symbol.toStringTag 不需要补了，已经在ldvm.toolsFunc.reNameObj中补了
* */

// Object.defineProperty(Window.prototype,"PERSISTENT",{
//     configurable:false,
//     enumerable:true,
//     value:1,
//     writable:false
// });
//
// Object.defineProperty(Window.prototype,"TEMPORARY",{
//     configurable:false,
//     enumerable:true,
//     value:0,
//     writable:false
// });

// 上面的代码换成下面封装好的代码

ldvm.toolsFunc.defineProperty(Window.prototype,"PERSISTENT",{
    configurable:false,
    enumerable:true,
    value:1,
    writable:false
});

ldvm.toolsFunc.defineProperty(Window.prototype,"TEMPORARY",{
    configurable:false,
    enumerable:true,
    value:0,
    writable:false
});

// 这些环境，其实是可以在浏览器中直接拿过来的，不需要自己去实现







