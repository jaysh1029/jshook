// hook 检测与保护
// toString() 方法

function atob(str) {
    console.log("正在执行atob");
}

console.log(atob.toString()); // 打印出了源代码
/*
function atob(str) {
    console.log("正在执行atob");
}
* */

// 若没有hook，在浏览器中返回的是 'function atob() { [native code] }'


// 检测点一：这样就容易被检测
// 既然检测是通过toString()方法，那么我们在hook的时候，就定义toString()方法并返回[native code]的格式即可

atob.toString = function () {
    return 'function atob() { [native code] }';
}
console.log(atob.toString());
// 检测点二： 这样做，还会被检测 因为上面的方式是给atob添加了一个属性方法，原型链上的还是不变
console.log( Function.prototype.toString.call(atob)); // 这里还会打印源码

Function.prototype.toString = function (){
    return 'function atob() { [native code] }';
};

console.log( Function.prototype.toString.call(atob)); // 这里就正常了


// 新问题：其他函数也会输出这个结果
function add(a, b) {}
console.log( Function.prototype.toString.call(add)); //function atob() { [native code] }

// 这样改造之后 就会自动替换方法名称了
Function.prototype.toString = function (){
    return `function ${this.name}() { [native code] }`;
}

console.log( Function.prototype.toString.call(add)); // function add() { [native code] }


