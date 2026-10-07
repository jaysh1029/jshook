// 需要调试的代码

//debugger;
// let result = window.addEventListener("load", function () {
//
// });
// console.log(result);

// 如果补环境后还是不行，那就需要把对象，在执行用户代码之前打印出来，跟浏览器中的对象对比一下
// 然后根据对比结果，补环境


// 时间随机数
// console.log(Date.now());
// console.log(new Date().getTime());
// console.log(Math.random());

//console.log(function abc() {}, undefined, 123, null, Symbol(156), window);
//console.log(document.createElement.name,document.createElement.toString());
//console.log(document.createElement("div"))
//console.log(document.createElement === Document.prototype.createElement);
//console.log(Document.prototype.createElement.call(document, "div"));


// 代理器检测判断
//
// let user = {name: "小明"};
// puser = new Proxy(user, {});
// //console.log(user === puser); // false
//
// let obj01 = {};
// let obj02 = obj01;
// let obj03 = obj01;
// let obj04 = obj01;
// //console.log(obj02 === obj01); // true
//
// // window = new Proxy(window, {}); 这样会被检测
// // 使用连续赋值就不会被检测
// obj03 = obj02 = obj01 = new Proxy(obj01, {});
// //console.log(obj02 === obj01); // true
//
// // 如果是已代理的对象，就不能继续创建代理
//
// // 代理器失效问题
//
// // console.log(document.createElement === document.createElement);// 不开代理为true 开启代理为false
// //
// // console.log(eval.toString());
// // console.log(window.eval.toString());
// // console.log(window.toString());
// localStorage.setItem("name", "小明");
// localStorage.setItem("age", "18");
// localStorage.setItem("height", 160);
// console.log(localStorage.getItem("name"));
// //localStorage.removeItem("name");
// console.log(localStorage.getItem("name"));
// console.log(localStorage.key(1));
// console.log(localStorage.length);
// localStorage.clear();
// console.log(localStorage.getItem("name"));
//
// let divNode = document.createElement("div");
// console.log(divNode);
// divNode.xxxx = "123"; // 自定义增加的属性 定义后在属性描述符中查看,是有值的
// console.log(divNode.xxxx);
// // divNode 原型对象上 有一个align属性，如果直接设置，可以成功，但是属性描述符中没有值
// divNode.align = "center";
// console.log(divNode.align);
// console.log(divNode.__proto__.align);// undefined  这个跟浏览器中表现不一致 在浏览器中报错：Uncaught TypeError: Illegal invocation
//
// // document.getElementsByTagName 实现思路
//
// function getTag() {
//     let metas = document.getElementsByTagName("meta");
//     let meta = metas[metas.length - 1];
//     let val = meta.content || "YVc1cGRDQjBZV2";
//
//     meta.parentNode.removeChild(meta);
//
//     return atob(val + "NnYzNWalkyVnpjdz09");
// }
//
// let tagCon = getTag();
// console.log(atob(tagCon));
//
//
// document.write("<input type='hidden' id='test' name='inputTag' value='666'>");
//
// function getVal() {
//     let tag = document.getElementById("test");
//     return `name:${tag.name}, value:${tag.value}`;
// }
//
// debugger;
// console.log(getVal());
//
// document.cookie="aaaa";
// console.log(document.cookie);
// document.cookie="a=1";
// console.log(document.cookie);
// document.cookie="a=10";
// console.log(document.cookie);
// document.cookie="b=20";
// console.log(document.cookie);
//
// navigator.plugins
// //console.log(navigator.plugins.refresh());
// console.log(navigator.plugins.item(0));
// console.log(navigator.plugins.namedItem("PDF Viewer"));
// console.log(navigator.plugins[0].item(0));
// console.log(navigator.plugins[0].namedItem("text/pdf"));
//
// console.log(navigator.mimeTypes.item(0));
// console.log(navigator.mimeTypes.namedItem("text/pdf"));
//
// let canvas = document.createElement("canvas");
// canvas.width = 100;
// canvas.height = 100;
// console.log(canvas.style);
// let ctx = canvas.getContext("2d");
// console.log(ctx);
// let webglCtx = canvas.getContext("webgl");
// let buffer = webglCtx.createBuffer();
// let program = webglCtx.createProgram();
// webglCtx.canvas.toDataURL("image/png");
// console.log(webglCtx);


let fonts = [];
let testFont = ['SimHei', 'SimSun', 'NSimSun', 'FangSong', 'KaiTi', 'abc', 'lll', 'kkk', 'mmm', 'ttt'];
let divTag = document.createElement('div');
divTag.innerHTML = '<span lang="zh" style="font-family: mmll;font-size: 160px;">fontTest</span>';
document.body.appendChild(divTag);
let span = divTag.children[0];
let w = span.offsetWidth;
let h = span.offsetHeight;
for (let i = 0; i < testFont.length; i++) {
    span.style.fontFamily = testFont[i];
    let w2 = span.offsetWidth;
    let h2 = span.offsetHeight;
    if (w2 != w || h2 != h) {
        fonts.push(testFont[i]);
    }
}
let result = btoa(fonts.toString());
console.log(result);
document.body.removeChild(divTag);



