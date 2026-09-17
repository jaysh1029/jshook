// 需要调试的代码

debugger;
// let result = window.addEventListener("load", function () {
//
// });
// console.log(result);

// 如果补环境后还是不行，那就需要把对象，在执行用户代码之前打印出来，跟浏览器中的对象对比一下
// 然后根据对比结果，补环境


// 时间随机数
console.log(Date.now());
console.log(new Date().getTime());
console.log(Math.random());

console.log(function abc(){},undefined,123,null,Symbol(156),window);
