// 函数重命名
let add = function xxx(a,b){
    return a + b;
}
console.log(add.name); // xxx  这个函数名不是我们想要的

// 还有的函数名是带空格的 用[' dd dd']来访问的

//console.log(Object.getOwnPropertyDescriptor(Document.prototype,"cookie").get.toString()); // function get cookie() { [native code] }
//console.log(Object.getOwnPropertyDescriptor(Document.prototype,"cookie").get.name); // get cookie

// 函数重命名

reNameFunc = function reNameFunc(func,name){
    Object.defineProperty(func,"name",{
        configurable:true,
        enumerable:false,
        writable:false,
        value:name
    });
};

reNameFunc(add,"get add");
console.log(add.name); // get add



