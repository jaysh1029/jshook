
// 可能的检测点
// 1. 在mouseEvent中有个isusted属性,默认为true
// 2. 搜集的路径，可能会计算一个类似导数的平滑曲线，来判断是否为正常操作。

console.log("同步代码开始执行");
let list = [];
let encodeFunc = function(resultList){
    let result =[];
    for(let i=0;i<10;i++){
        result.push(resultList[i].clientX);
        result.push(resultList[i].clientY);
        result.push(resultList[i].timestamp);
    }
    let str = btoa(result.toString());
    console.log(str);
};

let mousemoveFunc = function(event){
    console.log("正在执行mousemove回调函数");
    list.push(event);
};

let mousedownFunc = function(event){
    console.log("正在执行mousedown回调函数");
    list.push(event);
};

let mouseupFunc = function(event){
    console.log("正在执行mouseup回调函数");
 list.push(event);
 let len = list.length;
 let resultList = [];
 for(let i=len-10;i<len;i++){
     resultList.push(list[i]);
 }
 encodeFunc(resultList);
};

let setTimeoutCallBack = function(){
    console.log("正在执行setTimeout回调函数");
    document.addEventListener("mousemove", mousemoveFunc);
    document.addEventListener("mousedown", mousedownFunc);
    document.addEventListener("mouseup", mouseupFunc);

};

// 这个函数一般不需要补环境
let unloadFunc = function(){
    console.log("正在执行unload回调函数");
    debugger;
};

let loadFunc = function(){
    console.log("正在执行load回调函数");
    //setTimeout(setTimeoutCallBack, 0);
}
setTimeout(setTimeoutCallBack, 0);
window.addEventListener("load", loadFunc);
window.addEventListener("unload", unloadFunc);

console.log("同步代码执行结束");

