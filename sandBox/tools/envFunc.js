// 浏览器接口具体实现


!function () {
    ldvm.envFunc.Storage_getItem = function Storage_getItem() {
        let keyName = arguments[0];
        if (keyName in this) {
            return this[keyName];
        }
        return null;
    };
    ldvm.envFunc.Storage_setItem = function Storage_setItem() {
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

    ldvm.envFunc.Storage_removeItem = function Storage_removeItem() {

        let keyName = arguments[0];
        delete this[keyName];
        // https://developer.mozilla.org/zh-CN/docs/Web/API/Storage/removeItem
        // 通过官方文档得知 没有返回值 所以这里不需要返回值
    };

    ldvm.envFunc.Storage_key = function Storage_key() {

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

    ldvm.envFunc.Storage_clear = function Storage_clear() {

        for (const key in this) {
            delete this[key];
        }

    };
    ldvm.envFunc.Storage_length_get = function Storage_length_get() {
        let i = 0;
        for (const key in Object.getOwnPropertyDescriptors(this)) {
            i++;
        }
        return i;

    };

    ldvm.envFunc.document_location_get = function document_location_get() {
        return location;
    };
    ldvm.envFunc.Document_createElement = function Document_createElement() {
        let tagName = arguments[0];
        let options = arguments[1];
        tagName = tagName.toLowerCase(); // 标签都转换为小写
        let tag = {};

        switch (tagName) {
            case "div":
                tag = ldvm.toolsFunc.createProxyObj(tag, HTMLDivElement, `Document_createElement_${tagName}`);
                ldvm.memory.tag.push(tag);
                break;
            case "meta":
                tag = ldvm.toolsFunc.createProxyObj(tag, HTMLMetaElement, `Document_createElement_${tagName}`);
                ldvm.memory.tag.push(tag);
                break;
            case "head":
                tag = ldvm.toolsFunc.createProxyObj(tag, HTMLHeadElement, `Document_createElement_${tagName}`);
                ldvm.memory.tag.push(tag);
                break;
            case "input":
                tag = ldvm.toolsFunc.createProxyObj(tag, HTMLInputElement, `Document_createElement_${tagName}`);
                ldvm.memory.tag.push(tag);
                break;
            case "a":
                tag = ldvm.toolsFunc.createProxyObj(tag, HTMLAnchorElement, `Document_createElement_${tagName}`);
                ldvm.memory.tag.push(tag);
                break;
            case "canvas":
                tag = ldvm.toolsFunc.createProxyObj(tag, HTMLCanvasElement, `Document_createElement_${tagName}`);
                ldvm.memory.tag.push(tag);
                break;
            case "body":
                tag = ldvm.toolsFunc.createProxyObj(tag, HTMLBodyElement, `Document_createElement_${tagName}`);
                ldvm.memory.tag.push(tag);
                break;
            case "span":
                tag = ldvm.toolsFunc.createProxyObj(tag, HTMLSpanElement, `Document_createElement_${tagName}`);
                ldvm.memory.tag.push(tag);
                break;
            default:
                console.log(`Document_createElement_${tagName}未实现`);
        }
        return tag;
    };
    ldvm.envFunc.Document_getElementsByTagName = function Document_getElementsByTagName() {
        // 查文档：https://developer.mozilla.org/zh-CN/docs/Web/API/Document/getElementsByTagName
        let tagName = arguments[0];
        tagName = tagName.toLowerCase(); // 标签都转换为小写
        let collection = [];
        switch (tagName) {
            case "meta":
                // [object HTMLMetaElement]  这个类型是通过浏览器控制台获取的 Object.prototype.toString.call(meta[0])
                collection = ldvm.toolsFunc.getCollection('[object HTMLMetaElement]');
                // 设置原型链
                ldvm.toolsFunc.createProxyObj(collection, HTMLCollection, `Document_getElementsByTagName_${tagName}`);

                break;
            default:
                console.log(`Document_getElementsByTagName_${tagName}未实现`);
                break;
        }
        return collection;

    };
    ldvm.envFunc.Document_getElementById = function Document_getElementsById() {
        // 查文档：https://developer.mozilla.org/zh-CN/docs/Web/API/Document/getElementById
        let id = arguments[0];
        let tagArr = ldvm.memory.tag;
        //debugger;
        for (let i = 0; i < tagArr.length; i++) {
            if (tagArr[i].id === id) {
                return tagArr[i];
            }
        }
        return null;

    };


// 实现EventTarget的addEventListener方法
    ldvm.envFunc.EventTarget_addEventListener = function EventTarget_addEventListener() {
        console.log(this === window);
        console.log(arguments);
        //debugger;
        return "666";
    };

    ldvm.envFunc.Document_write = function Document_write() {
        let tagStr = arguments[0];
        // 解析标签字符串


        let tagJson = ldvm.toolsFunc.getTagJson(tagStr);
        let tag = document.createElement(tagJson.type);
        for (const key in tagJson.prop) {
            tag[key] = tagJson.prop[key];
            if (tag[key] === undefined) {
                ldvm.toolsFunc.setProtoAtrr.call(tag, key, tagJson.prop[key]);
            }

        }
    };

    ldvm.envFunc.HTMLDivElement_align_get = function HTMLDivElement_align_get() {
        return ldvm.toolsFunc.getProtoAtrr.call(this, "align");
    };
    ldvm.envFunc.HTMLDivElement_align_set = function HTMLDivElement_align_set() {
        let align = arguments[0];
        ldvm.toolsFunc.setProtoAtrr.call(this, "align", align);
    };

    ldvm.envFunc.HTMLMetaElement_content_get = function HTMLMetaElement_content_get() {
        return ldvm.toolsFunc.getProtoAtrr.call(this, "content");
    };
    ldvm.envFunc.HTMLMetaElement_content_set = function HTMLMetaElement_content_set() {
        let val = arguments[0];
        ldvm.toolsFunc.setProtoAtrr.call(this, "content", val);
    };

    ldvm.envFunc.Node_parentNode_get = function Node_parentNode_get() {
        return ldvm.toolsFunc.getProtoAtrr.call(this, "parentNode");
    };
    ldvm.envFunc.Node_removeChild = function Node_removeChild() {
        // 从全局对象中移除这个标签即可
        let tagObj = arguments[0];
        // 从 ldvm.memory.tag 移除这个标签对象即可 可以在创建标签时加一个特征ID，这样方便识别
        // TODO
    };
    ldvm.envFunc.HTMLInputElement_type_get = function HTMLInputElement_type_get() {
        return ldvm.toolsFunc.getProtoAtrr.call(this, "type");
    };
    ldvm.envFunc.HTMLInputElement_type_set = function HTMLInputElement_type_set() {
        let val = arguments[0];
        ldvm.toolsFunc.setProtoAtrr.call(this, "type", val);
    };
    ldvm.envFunc.Element_id_get = function Element_id_get() {
        return ldvm.toolsFunc.getProtoAtrr.call(this, "id");
    };
    ldvm.envFunc.Element_id_set = function Element_id_set() {
        let val = arguments[0];
        ldvm.toolsFunc.setProtoAtrr.call(this, "id", val);
    };

    ldvm.envFunc.HTMLInputElement_name_get = function HTMLInputElement_name_get() {
        return ldvm.toolsFunc.getProtoAtrr.call(this, "name");
    };
    ldvm.envFunc.HTMLInputElement_name_set = function HTMLInputElement_name_set() {
        let val = arguments[0];
        ldvm.toolsFunc.setProtoAtrr.call(this, "name", val);
    };

    ldvm.envFunc.HTMLInputElement_value_get = function HTMLInputElement_value_get() {
        return ldvm.toolsFunc.getProtoAtrr.call(this, "value");
    };
    ldvm.envFunc.HTMLInputElement_value_set = function HTMLInputElement_value_set() {
        let val = arguments[0];
        ldvm.toolsFunc.setProtoAtrr.call(this, "value", val);
    };

    ldvm.envFunc.Document_cookie_get = function Document_cookie_get() {
        let jsonCookie = ldvm.memory.globalVar.jsonCookie;
        let cookieStr = "";
        for (let key in jsonCookie) {
            if (key === "") {
                cookieStr += `${jsonCookie[key]}; `;
            } else {
                cookieStr += `${key}=${jsonCookie[key]}; `;
            }
        }
        return cookieStr;
    };
    ldvm.envFunc.Document_cookie_set = function Document_cookie_set() {
        let cookieVal = arguments[0];
        let splitIndex = cookieVal.indexOf(";");
        if (splitIndex !== -1) {
            //document.cookie 设置值的时候，只有第一个分号前的值有效
            cookieVal = cookieVal.substring(0, splitIndex);
        }
        if (cookieVal.indexOf("=" === -1)) {
            ldvm.memory.globalVar.jsonCookie[""] = cookieVal.trim();
        } else {
            let cookieArr = cookieVal.split("=");
            ldvm.memory.globalVar.jsonCookie[cookieArr[0].trim()] = cookieArr[1].trim();
        }
    };
    ldvm.envFunc.location_protocol_get = function location_protocol_get() {
        return ldvm.toolsFunc.getProtoAtrr.call(this, "protocol");
    };
    ldvm.envFunc.location_protocol_set = function location_protocol_set() {
        let val = arguments[0];
        ldvm.toolsFunc.setProtoAtrr.call(this, "protocol", val);
    };

    ldvm.envFunc.location_hostname_get = function location_hostname_get() {
        return ldvm.toolsFunc.getProtoAtrr.call(this, "hostname");
    };
    ldvm.envFunc.location_hostname_set = function location_hostname_set() {
        let val = arguments[0];
        ldvm.toolsFunc.setProtoAtrr.call(this, "hostname", val);
    };

    ldvm.envFunc.HTMLAnchorElement_href_get = function HTMLAnchorElement_href_get() {
        return ldvm.toolsFunc.getProtoAtrr.call(this, "href");
    };
    ldvm.envFunc.HTMLAnchorElement_href_set = function HTMLAnchorElement_href_set() {
        let val = arguments[0];
        let url = val;
        if (val.indexOf("http") === -1) {
            url = location.protocol + "//" + location.hostname + val;
        }

        let urlJson = ldvm.toolsFunc.parseUrl(url);
        ldvm.toolsFunc.setProtoAtrr.call(this, "origin", urlJson["origin"]);
        ldvm.toolsFunc.setProtoAtrr.call(this, "protocol", urlJson["protocol"]);
        ldvm.toolsFunc.setProtoAtrr.call(this, "host", urlJson["host"]);
        ldvm.toolsFunc.setProtoAtrr.call(this, "hostname", urlJson["hostname"]);
        ldvm.toolsFunc.setProtoAtrr.call(this, "port", urlJson["port"]);
        ldvm.toolsFunc.setProtoAtrr.call(this, "pathname", urlJson["pathname"]);
        ldvm.toolsFunc.setProtoAtrr.call(this, "search", urlJson["search"]);
        ldvm.toolsFunc.setProtoAtrr.call(this, "hash", urlJson["hash"]);

        ldvm.toolsFunc.setProtoAtrr.call(this, "href", url);


    };
    ldvm.envFunc.HTMLAnchorElement_protocol_get = function HTMLAnchorElement_protocol_get() {
        return ldvm.toolsFunc.getProtoAtrr.call(this, "protocol");
    };
    // 这个在设置href的时候，已经设置了，所以这里不设置
    // ldvm.envFunc.HTMLAnchorElement_protocol_set = function HTMLAnchorElement_protocol_set() {
    //     let val = arguments[0];
    //     ldvm.toolsFunc.setProtoAtrr.call(this, "protocol", val);
    // };
    ldvm.envFunc.HTMLAnchorElement_hostname_get = function HTMLAnchorElement_hostname_get() {
        return ldvm.toolsFunc.getProtoAtrr.call(this, "hostname");
    };
    ldvm.envFunc.HTMLAnchorElement_hash_get = function HTMLAnchorElement_hash_get() {
        return ldvm.toolsFunc.getProtoAtrr.call(this, "hash");
    };
    ldvm.envFunc.HTMLAnchorElement_origin_get = function HTMLAnchorElement_origin_get() {
        return ldvm.toolsFunc.getProtoAtrr.call(this, "origin");
    };
    ldvm.envFunc.HTMLAnchorElement_search_get = function HTMLAnchorElement_search_get() {
        return ldvm.toolsFunc.getProtoAtrr.call(this, "search");
    };

    ldvm.envFunc.Navigator_plugins_get = function Navigator_plugins_get() {
        return ldvm.memory.globalVar.pluginArray;
    };


    ldvm.envFunc.MimeTypeArray_length_get = function MimeTypeArray_length_get() {
        return ldvm.toolsFunc.getProtoAtrr.call(this, "length");
    };

    ldvm.envFunc.MimeType_type_get = function MimeType_type_get() {
        return ldvm.toolsFunc.getProtoAtrr.call(this, "type");
    };

    ldvm.envFunc.PluginArray_length_get = function PluginArray_length_get() {
        return ldvm.toolsFunc.getProtoAtrr.call(this, "length");
    };

    ldvm.envFunc.Plugin_name_get = function Plugin_name_get() {
        return ldvm.toolsFunc.getProtoAtrr.call(this, "name");
    };

    ldvm.envFunc.Plugin_length_get = function Plugin_length_get() {
        return ldvm.toolsFunc.getProtoAtrr.call(this, "length");
    };

    ldvm.envFunc.Plugin_filename_get = function Plugin_filename_get() {
        return ldvm.toolsFunc.getProtoAtrr.call(this, "filename");
    };
    ldvm.envFunc.Plugin_description_get = function Plugin_description_get() {
        return ldvm.toolsFunc.getProtoAtrr.call(this, "description");
    };
    ldvm.envFunc.MimeType_enabledPlugin_get = function MimeType_enabledPlugin_get() {
        return ldvm.toolsFunc.getProtoAtrr.call(this, "enabledPlugin");
    };
    ldvm.envFunc.MimeType_suffixes_get = function MimeType_suffixes_get() {
        return ldvm.toolsFunc.getProtoAtrr.call(this, "suffixes");
    };
    ldvm.envFunc.MimeType_description_get = function MimeType_description_get() {
        return ldvm.toolsFunc.getProtoAtrr.call(this, "description");
    };
    ldvm.envFunc.Navigator_mimeTypes_get = function Navigator_mimeTypes_get() {
        return ldvm.memory.globalVar.mimeTypeArray;
    };

    // ldvm.envFunc.PluginArray_refresh = function PluginArray_refresh() {
    //     return;
    // };

    ldvm.envFunc.PluginArray_namedItem = function PluginArray_namedItem() {
        let name = arguments[0];
        return this[name];
    };

    ldvm.envFunc.PluginArray_item = function PluginArray_item() {
        let index = arguments[0];
        return this[index];
    };
    ldvm.envFunc.Plugin_namedItem = function Plugin_namedItem() {
        let name = arguments[0];
        return this[name];
    };

    ldvm.envFunc.Plugin_item = function Plugin_item() {
        let index = arguments[0];
        return this[index];
    };
    ldvm.envFunc.MimeTypeArray_namedItem = function MimeTypeArray_namedItem() {
        let name = arguments[0];
        return this[name];
    };

    ldvm.envFunc.MimeTypeArray_item = function MimeTypeArray_item() {
        let index = arguments[0];
        return this[index];
    };
    ldvm.envFunc.HTMLCanvasElement_width_get = function HTMLCanvasElement_width_get() {
        return ldvm.toolsFunc.getProtoAtrr.call(this, "width");
    };
    ldvm.envFunc.HTMLCanvasElement_width_set = function HTMLCanvasElement_width_set() {
        let val = arguments[0];
        ldvm.toolsFunc.setProtoAtrr.call(this, "width", val);
    };
    ldvm.envFunc.HTMLCanvasElement_height_get = function HTMLCanvasElement_height_get() {
        return ldvm.toolsFunc.getProtoAtrr.call(this, "height");
    };
    ldvm.envFunc.HTMLCanvasElement_height_set = function HTMLCanvasElement_height_set() {
        let val = arguments[0];
        ldvm.toolsFunc.setProtoAtrr.call(this, "height", val);
    };
    ldvm.envFunc.HTMLElement_style_get = function HTMLElement_style_get() {
        let style = ldvm.toolsFunc.getProtoAtrr.call(this, "style");
        if (style === undefined) {
            style = ldvm.toolsFunc.createProxyObj(style, CSSStyleDeclaration, "style");
        }

        return style;
    };

    ldvm.envFunc.HTMLCanvasElement_getContext = function HTMLCanvasElement_getContext() {
        let type = arguments[0];
        let context = {};
        switch (type) {
            case "2d":
                context = ldvm.toolsFunc.createProxyObj(context, CanvasRenderingContext2D, "context_2d");
                break;

            case "webgl":
                context = ldvm.toolsFunc.createProxyObj(context, WebGLRenderingContext, "context_webgl");
                break;
            // 未来避免代码臃肿，没有必要补所有的环境，要根据实际报错情况添加，最终能达到目的就行
            //  case "webgl2":
            //      context = ldvm.toolsFunc.createProxyObj(context,WebGL2RenderingContext,"context");
            //      break;
            //  case "bitmaprenderer":
            //      context = ldvm.toolsFunc.createProxyObj(context,ImageBitmapRenderingContext,"context");
            //      break;
            default:
                console.log(`HTMLCanvasElement_getContext_${type}未实现`);
                break;
        }
        // 为了后续调用 canvas 属性，需要设置 canvas 属性为 this 对象
        ldvm.toolsFunc.setProtoAtrr.call(context, "canvas", this);
        // 这里设置一个匿名属性Type，用于后续区分 context 是 2d 还是 webgl 比如调用toDataURL
        ldvm.toolsFunc.setProtoAtrr.call(this, "type", type);

        return context;
    };

    ldvm.envFunc.HTMLCanvasElement_toDataURL = function HTMLCanvasElement_toDataURL() {
        // 在浏览器中hook HTMLCanvasElement.prototype.toDataURL 方法(需要逆向的js代码) 找到对应的返回值

        // 调佣这个方法的对象类型可能是 2d 也可能是 webgl
        let type = ldvm.toolsFunc.getProtoAtrr.call(this, "type");
        let base64Img = "";
        // 在UserVar.js中设置全局的值，方便以后替换
        if (type === "2d") {
            //base64Img = "这里是hook的base64Img";

            base64Img = ldvm.memory.globalVar.canvas2d;
        } else if (type === "webgl") {
            //base64Img="这里是hook的base64Img_webgl";
            base64Img = ldvm.memory.globalVar.canvasWebgl;
        }
        return base64Img;
    };

    ldvm.envFunc.WebGLRenderingContext_createBuffer = function WebGLRenderingContext_createBuffer() {
        let buffer = {};
        buffer = ldvm.toolsFunc.createProxyObj(buffer, WebGLBuffer, "buffer");
        return buffer;
    };

    ldvm.envFunc.WebGLRenderingContext_createProgram = function WebGLRenderingContext_createProgram() {
        let program = {};
        program = ldvm.toolsFunc.createProxyObj(program, WebGLProgram, "program");
        return program;
    };

    ldvm.envFunc.WebGLRenderingContext_canvas_get = function WebGLRenderingContext_canvas_get() {
        return ldvm.toolsFunc.getProtoAtrr.call(this, "canvas");
    };


    ldvm.envFunc.Element_innerHTML_set = function Element_innerHTML_set() {
        let htmlStr = arguments[0];
        // 解析标签 <span lang="zh" style="font-family: mmll;font-size: 160px;">fontTest</span>
        // 在浏览器中模拟添加span标签后，通过dir(div.children[0])查看span属性，发现文本使用的属性是textContent

        // 如果没有通用的html解析标签的方法，这里就需要判断htmlStr 是否是自己要解析的标签内容
        let style = {
            "font-Size": "160px",
            "font-Family": "mmll",
            fontFamily: "mmll",
        };
        style = ldvm.toolsFunc.createProxyObj(style, CSSStyleDeclaration, "style");
        let tagJson = {
            type: "span",
            prop: {
                lang: "zh",
                style: style,
                textContent: "fontTest"
            }
        };

        let span = document.createElement(tagJson.type);
        //span标签上的属性，基本都是原型上的，所以要设置到原型上
        for (let key in tagJson.prop) {
            ldvm.toolsFunc.setProtoAtrr.call(span, key, tagJson.prop[key]);
        }
        let collection = [];
        collection.push(span);
        collection = ldvm.toolsFunc.createProxyObj(collection, HTMLCollection, "collection");
        ldvm.toolsFunc.setProtoAtrr.call(this, "children", collection);
    };
    ldvm.envFunc.Document_body_get = function Document_body_get() {
        let collection = ldvm.toolsFunc.getCollection('[object HTMLBodyElement]');
        return collection[0];
    };
    ldvm.envFunc.Node_appendChild = function Node_appendChild() {
        let tag = arguments[0];
        // 应该先获取children属性，再添加tag，这个children是一个HTMLCollection数组
        // 这里先简单实现
        let collection = [];
        collection.push(tag);
        collection = ldvm.toolsFunc.createProxyObj(collection, HTMLCollection, "collection");
        ldvm.toolsFunc.setProtoAtrr.call(this, "children", collection);
        return tag;
    };
    ldvm.envFunc.Element_children_get = function Element_children_get() {
        return ldvm.toolsFunc.getProtoAtrr.call(this, "children");
    };
    ldvm.envFunc.HTMLElement_offsetWidth_get = function HTMLElement_offsetWidth_get() {
        let font = this.style.fontFamily;
        if (ldvm.memory.globalVar.fontList.indexOf(font) !== -1) {
            return 1666; // 能够识别的字体，返回固定宽度
        }
        return 1999; // 不能识别的字体，返回固定宽度
        //return ldvm.toolsFunc.getProtoAtrr.call(this, "offsetWidth");
    };
    ldvm.envFunc.HTMLElement_offsetHeight_get = function HTMLElement_offsetHeight_get() {
        let font = this.style.fontFamily;
        if (ldvm.memory.globalVar.fontList.indexOf(font) !== -1) {
            return 666; // 能够识别的字体，返回固定高度
        }
        return 999; // 不能识别的字体，返回固定高度
        //return ldvm.toolsFunc.getProtoAtrr.call(this, "offsetWidth");
    };


}();

/*
* 在浏览器创建div标签
* document.createElement("div") // <div>
* Document.prototype.createElement("div") // 会报错TypeError: Illegal invocation
* 只能使用实例对象创建，但下面的代码输出true
* Document.prototype.createElement === document.createElement // true
* 但下面的代码是可以的
* Document.prototype.createElement.call(document,"div") // <div></div>
* */

