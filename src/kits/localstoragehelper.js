// 定义全局Key
const KEY = 'buyGoods';

// 1.获取数据
export function getItem() {
    var jsonStr = localStorage.getItem(KEY);
    // 如果jsonStr则返回一个空对象
    if (!jsonStr) {
        return {};
    }
    return JSON.parse(jsonStr);
}

// 2.设置数据
export function setItem(newobj) {
    // 获取已经存在的对象 {gid:count==91:1},newobj:{gid:91,count:1}
    var obj = getItem();
    if (obj[newobj.gid]) {
        obj[newobj.gid] += newobj.count
    } else {
        obj[newobj.gid] = 1;
    };
    localStorage.setItem(KEY, JSON.stringify(obj));
}

// 3. 覆盖数据
export function setItemReplace(newobj) {
    var obj = getItem();
    obj[newobj.gid] = newobj.count;
    localStorage.setItem(KEY, JSON.stringify(obj));
}

// 4.删除数据
export function removeItem(goodsid) {
    var obj = getItem();
    delete obj[goodsid];
    localStorage.setItem(KEY, JSON.stringify(obj));
}