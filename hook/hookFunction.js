/*
* js hook的原理：重新定义函数，使得调用位置走我们重新定义的函数，改变执行流程
* js hook的作用：输出分析日志，定位关键点，改变返回结果
* 函数 hook
* */

// 定义函数
function add(a, b) {
    console.log("add正在执行");
    return a + b;
}

// 函数加载完成
// hook位置：必须是加载完需要hook的函数，即已经定义好的函数  ★★★
/*
* hook 步骤  ★★★
* 1. 保存原函数
* 2. 重写原函数
* 3. 在新函数内部下断点(debugger)，调用前输出参数
* 4. 调用原函数，拿到结果，也可以通过断点定位到上一层调用的关键点
* 5. 输出结果，或者在调用函数前后进行参数和结果的逻辑修改
* */

let _add = add;
add = function (a, b) {
    // 通过下断点，找到调用函数的上下文，可以定位到上一层调用的关键点  ★★★
    debugger;
    // 原函数调用前
    console.log("add调用前，参数：", a, b);
    // 改变参数，影响结果
    a = a + 2;
    // 调用原函数
    // 可以加条件再执行
    let result;
    if (false) { // 这个方法 可以hook掉无限debugger  ★★★
        result = _add(a, b);
    }


    // 原函数调用后
    console.log("add调用后，结果：", result);

    // 也可以自定义返回结果，写死返回值
    result =18;
    return result;
}

// 调用函数
console.log(add(1, 3));



