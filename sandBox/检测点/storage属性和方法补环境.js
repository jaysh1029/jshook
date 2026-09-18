// 在浏览器中运行，得知 方法都在原型对象上
// Object.getOwnPropertyDescriptors(localStorage)
// Object.getOwnPropertyDescriptors(Storage.prototype)

/*
* 补环境原则
* 1. 函数的入参
* 2. 函数的返回值
* 3. 执行后对全局产生的影响
* */
localStorage.setItem("name","小明");
localStorage.setItem = function(name, value) {

}


