// 初始化对象时定义属性

let user = {name:"小明"};
user.age = 18;

//或 user["age"] = 18 // 形式不同而已

/*
* 第一个参数是对象
* 第二个参数是属性名
* 第三个参数是描述符(也是一个对象)
* */
Object.defineProperty(user,"height",{
    enumerable:true, // 是否可以遍历
    configurable:true, // 是否可配置(能不能重新定义这个属性)
    value:170,
    writable:true, // 是否可写

});

for (const userKey in user) {
    console.log(userKey); // name age height
}
user.height =180; // 若writable为false 则这个设置会失效
console.log(user.height);

/*
Object.defineProperty(user,"height",{
    enumerable:true,
    configurable:true, // 若上面定义为false 这里会报错  Cannot redefine property: height
});
*/
let temp = 130;
Object.defineProperty(user,"weight",{
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

console.log(user.weight);
user.weight =62;
console.log(user.weight);
