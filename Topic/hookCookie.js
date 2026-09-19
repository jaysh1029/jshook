// ==UserScript==
// 重写cookie属性，实现cookie的缓存
// @name  Hook document.cookie
// @namespace http://tampermonkey.net/
// @version 1.0
// @description 重写cookie属性，实现cookie的缓存
// @author 小明
// @match *://*/*
// @grant none
// ==/UserScript==
(function () {
    var cookie_cache = document.cookie;
    Object.defineProperty(document, "cookie", {
        get: function () {
            console.log("get cookie", cookie_cache);
            return cookie_cache;
        },
        set: function (val) {
            console.log("setting cookie:", val);
            debugger;
            let cookie = val.split(";")[0];
            let ncookie = cookie.split("=");
            let flag = false;
            let cache = cookie_cache.split(";");
            cache = cache.map(function (a) {
                if (a.split("=")[0] == ncookie[0]) {
                    flag = true;
                    return cookie;
                }
                return a;
            });
            cookie_cache = cache.join("; ");
            if (!flag) {
                cookie_cache += cookie + ";";
            }
            this._value = val;
            return cookie_cache;
        }
    })


})();