// 1. 字面量方式
let obj = {};

// 2. 使用new关键字创建
let newObj = new Object();

// 3. 使用Object.create()方法

let cObj = Object.create(Object.prototype); // 参数为原型对象
let dObj = Object.create(Object); // 这里若传入对象类型 则创建的是函数对象
console.log(obj); // {}
console.log(newObj); // {}
console.log(cObj); // {}
console.log(dObj); // Function {}
