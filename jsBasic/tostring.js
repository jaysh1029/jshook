/*
* valueOf()   toString()
* js自动调用，不需要我们主动调用，也可以主动调用
* */

let a = {};
console.log("================= a =================");
console.log(+a); // NaN
console.log(a + ""); // [object Object]
console.log(`${a}`);// [object Object]

// 由于是自动调用 valueOf和toString方法  但具体不确定是哪个方法
// 我们可以定义这个两个属性

let b = {
    toString: function () {
        console.log("执行toString");
        return "toString";
    },
    valueOf: function () {
        console.log("执行valueOf");
        return "valueOf";
    }
};
console.log("================= b =================");
console.log(+b); // 执行valueOf NaN 当没有valueOf的到时候 执行tostring
console.log(b + ""); // 执行valueOf valueOf 当没有valueOf的到时候 执行tostring
console.log(`${b}`);// 执行toString toString 不管什么情况都执行toString



// 当没有valueOf的到时候

let c = {
    toString: function () {
        console.log("执行toString");
        return "toString";
    }
};
console.log("================= c =================");
console.log(+c); // 执行toString NaN 当没有valueOf的到时候 执行tostring
console.log(c + ""); // 执行toString toString 当没有valueOf的到时候 执行tostring
console.log(`${c}`);// 执行toString toString 不管什么情况都执行toString

// NaN 非数字
console.log(NaN===NaN); // false  这个比较特殊
console.log(null ===null); // true
console.log(undefined ===null); // false
console.log(undefined ===undefined); // true
