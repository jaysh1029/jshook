// call  apply arguments

function add(a, b) {
    console.log(a + b);
    return a + b;
}

// 直接调用
add(1, 2); // 3

// call 方法第一个参数是this指针，即调用者，第二个参数开始，是原函数的实际参数
add.call(null, 1, 2); // 3

// apply 方法第一个参数是this指针，即调用者，第二个参数是一个数组，把实际参数进行打包的一个数组
add.apply(null, [1, 2]); // 3

function info(name, age) {
    console.log(`${name} is ${age}`);
}

function info2(name, age) {
    console.log(`${this.name} is ${this.age}`);
}

function info3(height, weight) {
    console.log(`${this.name} is ${this.age}`);
    console.log(`${height}:${weight}`);
}

name = "小张";
age = 10;
info("小明", 30); // 小明 is 30
info(); // undefined is undefined 没有参数
info2(); //小张 is 10  这里的this默认为全局对象 window或global
let user = {name: "小王", age: 18};
info(user); // [object Object] is undefined 这样传递参数是无效的
info2.call(user); // 小王 is 18 this在这里被指定为user
info2.apply(user); // 小王 is 18 this在这里被指定为user

info3.call(user, 180, 62); // 小王 is 18 180:62
info3.apply(user, [178, 63]); // 小王 is 18 178:63

// arguments是一个类数组对象 不确定参数个数的时候，配合call和apply方法使用
function argTest() {
    let user = {name: "小王", age: 18};
    info3.apply(user, arguments); // 参数列表
}

argTest(160, 50); // 小王 is 18 160 is 50 通过arguments传参
