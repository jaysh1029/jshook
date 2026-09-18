// 在浏览器中运行，得知 方法都在原型对象上
// Object.getOwnPropertyDescriptors(localStorage)
// Object.getOwnPropertyDescriptors(Storage.prototype)

/*
* 补环境原则
* 1. 函数的入参
* 2. 函数的返回值
* 3. 执行后对全局产生的影响
* */
// localStorage.setItem("name", "小明");
let ldvm = {
    envFunc: {},
};
ldvm.envFunc.Storage_setItem = function () {
    let keyName = arguments[0];
    let value = arguments[1];
    /*
    * 实现思路 参考 https://developer.mozilla.org/zh-CN/docs/Web/API/Storage/setItem
    * 在浏览器中调用localStorage.setItem("name","小明"); 返回undefined 也就是没有返回值 所以这里不需要返回值
    * 再看这个函数执行后 键值设置到哪里了 在浏览器中运行localStorage,发现多了一个属性name
    * 再运行Object.getOwnPropertyDescriptors(localStorage)，发现多了一个name属性描述符
    * 因此 我们需要在沙箱中实现一个set方法，将keyName和value设置到localStorage中 当前通过this获取localStorage
    * */
    this[keyName] = value; // 这样就补完了

};


ldvm.envFunc.Storage_getItem = function () {
    let keyName = arguments[0];
    if (keyName in this) {
        return this[keyName];
    }
    return null;
};


ldvm.envFunc.Storage_removeItem = function () {

    let keyName = arguments[0];
    delete this[keyName];
    // https://developer.mozilla.org/zh-CN/docs/Web/API/Storage/removeItem
    // 通过官方文档得知 没有返回值 所以这里不需要返回值
};

ldvm.envFunc.Storage_key = function () {

    let index = arguments[0];
    let i = 0;
    for (const key in this) {
        if (i === index) {
            return key;
        }
        i++;
    }
    return null; // 通过浏览器测试 发现默认返回null 所以这里也需要返回null

};

ldvm.envFunc.Storage_clear = function () {

    for (const key in this) {
        delete this[key];
    }

};
ldvm.envFunc.Storage_length_get = function () {
    let i = 0;
    for (const key in Object.getOwnPropertyDescriptors(this)) {
        i++;
    }
    return i;
};

// 这些方法要放到实际V8环境中调用 里面的this才是正常