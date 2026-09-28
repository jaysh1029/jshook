// 在控制台创建a标签，看后查看a的原型
const a = document.createElement("a");
console.log(a);
console.log(a.__proto__);
console.log(a.__proto__.__proto__);
console.log(a.__proto__.__proto__.__proto__);


// 补环境 HTMLAnchorElement

// 开启代理，通过执行相关代码，发现很多属性没有实现，需要补环境
// 例如：href, target, rel, download, type, hreflang, lang, title, innerText, innerHTML, outerText, outerHTML

/*
* 1. 补location_protocol_get 和 location_protocol_set
* 2. 补location_hostname_get 和 location_hostname_set
* 3. 补HTMLAnchorElement_href_get 和 HTMLAnchorElement_href_set
* 通过dir(a) 查看a标签的所有属性  发现href是原型上的属性，所以补环境的时候，也要补到原型上
* 设置href和获取href的值，是不同的，需要特殊处理
* 比如 a.href="/a/test/"
* 但获取的时候，返回的是"https://www.baidu.com/a/test/"  因此设置的时候，需要加上协议和域名，还要做判断，设置的值，是否以http开头
* 例如：a.href="https://www.baidu.com/a/test/"
* 这样获取的时候，返回的就是"https://www.baidu.com/a/test/"
*
*
* 以下几个属性都不需要单独补set方法，都是在设置href的时候，自动设置的
*
* 4. 补HTMLAnchorElement_protocol_get 和 HTMLAnchorElement_protocol_set
* 在控制台创建一个a标签，然后用dir(a)观察，在设置href之前，protocol和hostname，href都是空，设置href之后，protocl和hostname都有值了，
* 因此这个设置的时机，在设置href的时候
*
* 5. 补HTMLAnchorElement_hostname_get 和 HTMLAnchorElement_hostname_set
* 6. 补HTMLAnchorElement_hash_get 和 HTMLAnchorElement_hash_set
* 7. 补HTMLAnchorElement_origin_get 和 HTMLAnchorElement_origin_set
* 8. 补HTMLAnchorElement_search_get 和 HTMLAnchorElement_search_set
*
*
* */