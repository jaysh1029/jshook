// 需要调试的代码

debugger;
let result = window.addEventListener("load", function () {

});
console.log(result);

// 如果补环境后还是不行，那就需要把对象，在执行用户代码之前打印出来，跟浏览器中的对象对比一下
// 然后根据对比结果，补环境


// 时间随机数
console.log(Date.now());
console.log(new Date().getTime());
console.log(Math.random());

//console.log(function abc() {}, undefined, 123, null, Symbol(156), window);
//console.log(document.createElement.name,document.createElement.toString());
//console.log(document.createElement("div"))
//console.log(document.createElement === Document.prototype.createElement);
//console.log(Document.prototype.createElement.call(document, "div"));


// 代理器检测判断

let user = {name: "小明"};
puser = new Proxy(user, {});
//console.log(user === puser); // false

let obj01 = {};
let obj02 = obj01;
let obj03 = obj01;
let obj04 = obj01;
//console.log(obj02 === obj01); // true

// window = new Proxy(window, {}); 这样会被检测
// 使用连续赋值就不会被检测
obj03 = obj02 = obj01 = new Proxy(obj01, {});
//console.log(obj02 === obj01); // true

// 如果是已代理的对象，就不能继续创建代理

// 代理器失效问题

// console.log(document.createElement === document.createElement);// 不开代理为true 开启代理为false
//
// console.log(eval.toString());
// console.log(window.eval.toString());
// console.log(window.toString());
localStorage.setItem("name","小明");
localStorage.setItem("age","18");
localStorage.setItem("height",160);
console.log(localStorage.getItem("name"));
//localStorage.removeItem("name");
console.log(localStorage.getItem("name"));
console.log(localStorage.key(1));
console.log(localStorage.length);
localStorage.clear();
console.log(localStorage.getItem("name"));

let divNode = document.createElement("div");
console.log(divNode);
divNode.xxxx = "123";
console.log(divNode.xxxx);

