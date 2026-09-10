/*
* 原型链
* 1. 原型              -> 类 即一个模版
* 2. 原型对象           -> 类中属性与方法组成一个对象
* 3. 实例对象           -> 创建的实例
* 4. 如何相互转换
* */

// 原型是一个函数

function User(){

}

// 是一个函数
console.log("原型:",User); // 原型: [Function: User]


// User.prototype就是原型对象
// 如何给原型添加属性和方法？
// 通过给原型对象添加属性和方法
User.prototype.username="test";
User.prototype.password="123456";
User.prototype.login = function login(username,password){
    console.log(`${username}登录成功`);
}

// 从原型到原型对象
console.log("原型对象：",User.prototype); // 原型对象： { username: 'test', password: '123456', login: [Function: login] }

// 从原型到实例对象 使用new关键字
let user=  new User();

// 实例对象 本身是空对象  只是拥有并且可以使用原型的方法和属性
console.log(user); // User {}

user.login("xi","s");

// 从原型对象到原型 constructor
console.log(User.prototype.constructor === User); // true

// 从原型对象到实例对象 constructor
let user2 = new User.prototype.constructor();
console.log(user2); // User {}

// 从实例对象到原型对象__proto__   getPrototypeOf
console.log(user.__proto__ === User.prototype); // true
console.log(Object.getPrototypeOf(user) === User.prototype); // true

// 从实例对象到原型 constructor
console.log(user.__proto__.constructor===User); // true
console.log(Object.getPrototypeOf(user).constructor === User); // true


