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
        debugger;
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

