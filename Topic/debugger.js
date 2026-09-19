/*
* 无限debugger
* */

// 单个debugger 断点
debugger;
eval("debugger;");

setTimeout(function () {
    debugger;
    console.log("hello world");
}, 1000);

// 定时器触发debugger 断点
setInterval(function () {
    debugger;
    console.log("hello world");
}, 1000);


setTimeout(function debug() {
    debugger;
    console.log("hello world");
    setTimeout(debug, 1000);
}, 1000);

// 原型链方式执行debugger

Function("debugger;").call();
Function("debugger;").apply();

Function.constructor("debugger;").call("action");
Function.constructor("debugger;").apply("action");

(function (){return !![];}["constructor"]("debugger;")["call"]("action"));

eval('(function (){return !![];}["constructor"]("debugger;")["call"]("action"));');

// 在调用堆栈上，或在第一行代码下断点，刷新页面，断点🚀后，在控制台重写setInterval方法
setInterval = function (){};

for(let i = 0; i < 100; i++){
    window.clearInterval(i);
    window.clearTimeout(i);
}

