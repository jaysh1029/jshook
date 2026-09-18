

console.log(eval.toString()); // function eval() { [native code] }

eval = new Proxy(eval, {});
console.log(eval.name); // eval
// eval代理之后，toString方法输出不一样 少一个函数名 这就是一个检测点
// 代理之后 this指针就会改变，在V8当中，无法干预
console.log(eval.toString()); // function () { [native code] }

// 以上是在nodejs中运行的结果
// 如果是在vm中运行，即使不代理，输出的也是 function () { [native code] }
// 因为在vm中，eval已经被代理了
// 解决方法 就是hook eval
eval = ldvm.toolsFunc.hook(eval, undefined,false,function () {},function () {});

// 其他的window下的属性或方法，也会出现这种问题，解决方法就是过滤这些方法
