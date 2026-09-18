// 参考文档 https://developer.mozilla.org/zh-CN/docs/Web/API/Document/createElement

// 浏览器运行
a = document.createElement("div")
dir(a) // 查看a的类型
a.__proto__

/*
* createElement补环境
* 1. 首先补HTMLDivElement 从获取环境的脚本中生成补环境代码
* 2. 发现HTMLDivElement的上面还有原型链，继续补HTMLElement
* 3. 发现HTMLElement的上面还有原型链，继续补Element
* 4. 发现Element的上面还有原型链，继续补Node(Node之前已经补过了)
* 5. 然后去实现createElement方法
* 6. 下面方法中只是实现了div标签，其他标签需要根据需要实现
*
* */

ldvm.envFunc.Document_createElement = function () {
    let tagName = arguments[0];
    let options = arguments[1];
    tagName = tagName.toLowerCase(); // 标签都转换为小写
    let tag = {};

    switch (tagName) {
        case "div":
            tag = ldvm.toolsFunc.createProxyObj(tag, HTMLDivElement, `Document_createElement_${tagName}`);
            break;
        default:
            console.log(`Document_createElement_${tagName}未实现`);
    }
    return tag;
};