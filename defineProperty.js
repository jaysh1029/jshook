// 初始化对象时定义属性

let User = {name:"小明"};
User.age = 18;

//或 User["age"] = 18 // 形式不同而已

/*
* 第一个参数是对象
* 第二个参数是属性名
* 第三个参数是描述符(也是一个对象)
* */
Object.defineProperty(User,"height",{
    enumerable:true, // 是否可以遍历
    configurable:true, // 是否可配置(能不能重新定义这个属性)
    value:170,
    writable:true, // 是否可写

});

for (const userKey in User) {
    console.log(userKey); // name age height
}
User.height =180; // 若writable为false 则这个设置会失效
console.log(User.height);

/*
Object.defineProperty(User,"height",{
    enumerable:true,
    configurable:true, // 若上面定义为false 这里会报错  Cannot redefine property: height
});
*/
let temp = 130;
Object.defineProperty(User,"weight",{
    enumerable:true,
    configurable:true,
    get:function (){
        console.log("正在获取值");
        //return 150;
        return temp;
    },
    set:function (value){
        console.log("正在设置值");
        // this.weight = value; // 这里会无限递归
        // 需要借助临时变量
        temp = value;
    },
    // 下面两个属性是不能和get、set同时定义的
    // value:60,
    // writable:true,

});

console.log(User.weight);
User.weight =62;
console.log(User.weight);
