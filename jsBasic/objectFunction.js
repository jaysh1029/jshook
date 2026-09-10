// Object常用方法 在浏览器运行

// 1. Object.create() 创建对象

let a = Object.create(Document.prototype);  // 传入原型对象

// 2. Object.is() 判断两个对象是否是同一个对象

Object.is(window,top) // true
let b = {};
let c = {};
Object.is(b,c) ; // false

// 3. obj.hasOwnProperty() 判断对象自身属性中是否有指定的属性
document.hasOwnProperty("location"); // true


document.hasOwnProperty("cookie"); // false

// 4. Object.getOwnProertyDescriptor() 返回指定对象上一个自有属性对应的属性描述符

Object.getOwnPropertyDescriptor(document,"location");


Object.getOwnPropertyDescriptor(document,"cookie"); // undefined

// 5. Object.getOwnPropertyDescriptors() 获取一个对象的所有自身属性的描述符

Object.getOwnPropertyDescriptors(Document.prototype);
Object.getOwnPropertyDescriptors(document.__proto__.__proto__);


// 6. Object.getPrototypeOf() 获取实例对象的原型对象
Object.getPrototypeOf(document);

// 7. Object.setPrototypeOf()  设置一个指定的对象的原型(可以先创建对象，然后设置原型)
let x ={};
Object.setPrototypeOf(x,Document.prototype);


// 8. Object.defineProperty() 直接在一个对象上定义一个新属性 或修改一个对象的现有属性 并返回此对象
// 也就是说，如果一个对象没有这个属性，就创建一个新的，如果有就重新定义(但又局限性，有时不一定能设置成功)
// 修改对象属性的前提是 这个属性必须是可配置的