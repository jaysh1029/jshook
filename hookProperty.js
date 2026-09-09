// hook对象属性，对赋值和获取操作

let user = {
    name:"小明"
};

// hook的时机：对象已经定义或已经加载   ★★★


// 保存原始属性值   ★★★
let _name = user.name;

Object.defineProperty(user, "name", {
    get(){ // 获取属性值时执行
        console.log("正在获取name属性值");
        return _name;
    },
    set (value){ // 设置属性值的时候执行
        console.log("正在设置name属性值");
        debugger; // 通过下断点，可以定位到设置值前后的关键点
        _name = value;
    }
});
// 获取属性值的操作
console.log(user.name);

// 设置属性值的操作
user.name="小王";

// 重新获取
console.log(user.name);

// hook 原本没有的属性，相当于给对象添加一个新属性
// 步骤不变，也要保存原始值
let _age = 0;
Object.defineProperty(user, "age", {
    get(){ // 获取属性值时执行
        console.log("正在获取age属性值");
        return _age;
    },
    set (value){ // 设置属性值的时候执行
        console.log("正在设置age属性值");
        debugger; // 通过下断点，可以定位到设置值前后的关键点
        _age = value;
    }
});
console.log("===============================");

// 获取属性值的操作
console.log(user.age);

// 设置属性值的操作
user.age=12;

// 重新获取
console.log(user.age);