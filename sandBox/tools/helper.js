function getTagJson(tagStr) {
    let arrList = tagStr.match(/<(.*?)>/)[1].split(" ");
    let tagJson = {
        type: arrList[0],
        prop: {}
    };

    for (let i = 1; i < arrList.length; i++) {
        let item = arrList[i].split("=");
        let key = item[0];
        let value = item[1].replaceAll("\"", "").replaceAll("'", "");
        tagJson.prop[key] = value;
    }
    return tagJson;
}

console.log(getTagJson("<input type='text' id='inputTag' value='666'>"))


function parseUrl(url) {
    const options = {
        strictMode: false,
        key: ["href", "protocol", "host", "userInfo", "user", "password", "hostname", "port", "relative", "pathname", "directory", "file", "search", "hash"],
        q: {
            name: "queryKey",
            parser: /(?:^|&)([^&=]*)=?([^&]*)/g
        },

        parser: {
            // strict 严格模式：必须包含协议，例如 https://xxx
            strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:@\/]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
            // loose 宽松模式：支持相对路径、无协议url
            loose: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:@\/]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/
        }
    };


    if (!url) {
        return "";
    }
    const o = options;
    // 根据 strictMode 选择正则执行匹配
    const m = o.parser[o.strictMode ? "strict" : "loose"].exec(url);
    if (!m) {
        return "";
    }

    let urlJson = {};
    let i = 14;
    // 循环填充14个key，对应捕获组
    while (i--) {
        urlJson[o.key[i]] = m[i] || "";
    }

    // 解析query参数到 queryKey
    urlJson[o.q.name] = {};
    urlJson[o.key[12]].replace(o.q.parser, (match, key, value) => {
        if (key) {
            urlJson[o.q.name][key] = decodeURIComponent(value);
        }
    });


    delete urlJson["queryKey"];
    delete urlJson["userInfo"];
    delete urlJson["user"];
    delete urlJson["password"];
    delete urlJson["relative"];
    delete urlJson["directory"];
    delete urlJson["file"];

    // 组装 protocol、origin、search、hash
    if (urlJson.protocol) {
        urlJson.protocol += ":";
    }
    urlJson.origin = urlJson.protocol + "//" + urlJson.host;
    urlJson.search = urlJson.search ? "?" + urlJson.search : "";
    urlJson.hash = urlJson.hash ? "#" + urlJson.hash : "";

    return urlJson;
}


const res = parseUrl("https://www.baidu.com:8080/path/index.html?a=1&b=2#top");
console.log(res);

