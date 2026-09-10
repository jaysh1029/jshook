/*
* 判断对象的类型
* typeof
* Object.prototype.toString.call 优先使用这个 更精确
* */

console.log(1,typeof 1); // 1 number
console.log("1",typeof "1"); // 1 string
console.log({},typeof {}); // {} object
console.log(true,typeof true); // true boolean
console.log([],typeof []); // [] object
console.log(null,typeof null); // null object  这个比较特殊
console.log( undefined,typeof undefined); // undefined undefined
console.log(Symbol(),typeof Symbol()); // Symbol() symbol
console.log(function (){},typeof function (){}); // [Function (anonymous)] function

// 从以上输出 [] null {}类型都是object 所以判断具体类型不太精准

// 所以优先使用Object.prototype.toString.call()这个方法来判断类型

console.log(Object.prototype.toString.call(1)); // [object Number]
console.log(Object.prototype.toString.call("1")); // [object String]
console.log(Object.prototype.toString.call({})); // [object Object]
console.log(Object.prototype.toString.call(true)); // [object Boolean]
console.log(Object.prototype.toString.call([])); // [object Array]
console.log(Object.prototype.toString.call(null)); // [object Null]
console.log(Object.prototype.toString.call(undefined)); // [object Undefined]
console.log(Object.prototype.toString.call(Symbol())); // [object Symbol]
console.log(Object.prototype.toString.call(function () {})); // [object Function]



