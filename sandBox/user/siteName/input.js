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

// 字体指纹
// let fonts = [];
// let testFont = ['SimHei', 'SimSun', 'NSimSun', 'FangSong', 'KaiTi', 'abc', 'lll', 'kkk', 'mmm', 'ttt'];
// let divTag = document.createElement('div');
// divTag.innerHTML = '<span lang="zh" style="font-family: mmll;font-size: 160px;">fontTest</span>';
// document.body.appendChild(divTag);
// let span = divTag.children[0];
// let w = span.offsetWidth;
// let h = span.offsetHeight;
// for (let i = 0; i < testFont.length; i++) {
//     span.style.fontFamily = testFont[i];
//     let w2 = span.offsetWidth;
//     let h2 = span.offsetHeight;
//     if (w2 != w || h2 != h) {
//         fonts.push(testFont[i]);
//     }
// }
// let result = btoa(fonts.toString());
// console.log(result);
// document.body.removeChild(divTag);

// 通过浏览器接口导出加密结果

// // Hook XMLHttpRequest open
// const originOpen = XMLHttpRequest.prototype.open;
// XMLHttpRequest.prototype.open = function (method, url, async, user, password) {
//     // 简单加密参数
//     const sign = `_sign=${btoa('mySecretKey')}`;
//     let newUrl = url.includes('?') ? `${url}&${sign}` : `${url}?${sign}`;
//     return originOpen.call(this, method, newUrl, async, user, password);
// };
//
// // 封装简易http请求方法
// function httpRequest(method, url, data) {
//     const xhr = new XMLHttpRequest();
//     xhr.open(method, url, true);
//     xhr.setRequestHeader('Content-Type', 'application/json');
//     xhr.onload = function () {
//         if (xhr.status >= 200 && xhr.status < 300) {
//             console.log('响应：', JSON.parse(xhr.responseText));
//         } else {
//             console.error('请求失败', xhr.status);
//         }
//     };
//     xhr.onerror = function () {
//         console.error('网络错误');
//     };
//     if (method.toUpperCase() === 'POST') {
//         xhr.send(JSON.stringify(data));
//     } else {
//         xhr.send();
//     }
// }
//
// const xhr = new XMLHttpRequest();
// let lastUrl = xhr.open('GET', 'https://www.baidu.com/test/api');
// console.log(lastUrl);
// // https://www.baidu.com/test/api?_sign=bXlTZWNyZXRLZXk=
//
//
// // 使用示例
// // httpRequest('GET', 'https://example.com/api');
// // httpRequest('POST', 'https://example.com/api', {name:'test'});
//
//
// // setTimeout 实现思路
// function setTimeoutCallback() {
//     console.log("setTimeout回调函数正在执行");
// }
//
// console.log("同步代码开始执行");
// let timeoutId1 = setTimeout(setTimeoutCallback, 1);
// let timeoutId2 = setTimeout("!function(){console.log('code方式');}()", 1);
// console.log(timeoutId1);
// console.log(timeoutId2);
// console.log("同步代码结束执行");


// // clearTimeout 实现思路
// function setTimeoutCallback() {
//     console.log("setTimeout回调函数正在执行");
// }
// console.log("同步代码开始执行");
// let timeoutId1 = setTimeout(setTimeoutCallback, 1);
// console.log(timeoutId1);
// clearTimeout(timeoutId1);
// console.log("同步代码结束执行");


// // navigator.getBattery实现思路
// console.log("同步代码开始执行");
// navigator.getBattery().then(battery => {
//     console.log("charging:", battery.charging);
//     console.log("chargingTime:", battery.chargingTime);
//     console.log("level:", battery.level);
//     bResult = btoa("" + battery.charging + battery.chargingTime + battery.level);
//     console.log(bResult);
// });
//
// console.log("同步代码结束执行");

// // addEventListener实现思路
//
// console.log("同步代码开始执行");
// function  loadFunc() {
//     console.log("正在执行load事件");
// }
// window.addEventListener("load", loadFunc); // 这里是异步的
//
// console.log("同步代码结束执行");

// 鼠标路径实现思路


// // 可能的检测点
// // 1. 在mouseEvent中有个isusted属性,默认为true
// // 2. 搜集的路径，可能会计算一个类似导数的平滑曲线，来判断是否为正常操作。
//
// console.log("同步代码开始执行");
// let list = [];
// let encodeFunc = function (resultList) {
//     let result = [];
//     for (let i = 0; i < 10; i++) {
//         result.push(resultList[i].clientX);
//         result.push(resultList[i].clientY);
//         result.push(resultList[i].timeStamp);
//     }
//
//     let str = btoa(result.toString());
//     console.log(str);
// };
//
// let mousemoveFunc = function (event) {
//     //console.log("正在执行mousemove回调函数");
//     list.push(event);
// };
//
// let mousedownFunc = function (event) {
//     //console.log("正在执行mousedown回调函数");
//     list.push(event);
// };
//
// let mouseupFunc = function (event) {
//     //console.log("正在执行mouseup回调函数");
//     list.push(event);
//     let len = list.length;
//     if (len < 10) {
//         return;
//     }
//     let resultList = [];
//     for (let i = len - 10; i < len; i++) {
//         resultList.push(list[i]);
//     }
//     encodeFunc(resultList);
// };
//
// let setTimeoutCallBack = function () {
//     //console.log("正在执行setTimeout回调函数");
//     document.addEventListener("mousemove", mousemoveFunc);
//     document.addEventListener("mousedown", mousedownFunc);
//     document.addEventListener("mouseup", mouseupFunc);
//
// };
//
// // 这个函数一般不需要补环境
// let unloadFunc = function () {
//     console.log("正在执行unload回调函数");
//     debugger;
// };
//
// let loadFunc = function () {
//     console.log("正在执行load回调函数");
//     //setTimeout(setTimeoutCallBack, 0);
// }
// setTimeout(setTimeoutCallBack, 0);
// window.addEventListener("load", loadFunc);
// window.addEventListener("unload", unloadFunc);
//
// console.log("同步代码执行结束");

// document.all 环境检测  这个需要特殊定制的node环境

try {
    if (document.all.__proto__ === HTMLAllCollection.prototype) {
        if (document.all !== undefined) {
            if (document.all == undefined) { // 注意这里是两个等号
                console.log("环境正常");
            } else {
                console.log("环境异常3");
            }
        } else {
            console.log("环境异常2");
        }
    } else {
        console.log("环境异常1");
    }
} catch (e) {
    console.log("环境异常0");
}



























































