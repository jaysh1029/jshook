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



