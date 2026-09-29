/*
* 控制台输入 navigator.plugins查看浏览器插件,可以看到插件数组的结构
* 补环境需要创建Plugin对象
*
* 1. 补Plugin原型对象的环境
* 2. 补 PluginArray  MimeType  MimeTypeArray的原型环境
* 3. 设置plugin的原型属性 使用ldvm.toolsFunc.setProtoAtrr.call(plugin,"属性名",属性值);
* 4. plugin有几个索引对象，需要创建mimeType对象 并设置
* 5. 创建mimeType时，需要定义Mimetype对象的属性
* 通过Object.getOwnPropertyDescriptors(navigator.plugins[0]) 可以查看Mimetype对象的属性描述符
* 根据浏览器的属性描述符，设置Mimetype对象的属性
*
* */