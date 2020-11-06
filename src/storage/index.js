/**
 * Storage封装
 */
const STORAGE_KEY = 'mall';
export default {
  // 存储值
  setItem(key, value, module_name) {
    if (module_name) {
      let val = this.getItem(module_name);
      val[key] = value;
      //递归插入 将带有新存储的覆盖掉原来没有存储的user
      this.setItem(module_name, val);
    } else {
      // 如果没有则创建并写入
      let val = this.getStorage();
      val[key] = value;
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(val));
    }
  },
  // 获取某一个模块下面的属性user下面的userName
  // module_name代表user key代表username
  // 如果查询到了就返回对应的username没查询到就说明获取的是user模块
  getItem(key, module_name) {
    if (module_name) {
      let val = this.getItem(module_name);
      if (val) return val[key];
    }
    //获取整个模块
    return this.getStorage()[key];
  },
  //获取内容
  getStorage() {
    //获取不到给个空对象
    return JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) || '{}');
  },
  clear(key, module_name) {
    let val = this.getStorage();
    if (module_name) {
      // 如果user下的东西没有则直接返回
      if (!val[module_name]) return;
      delete val[module_name][key];
    } else {
      delete val[key];
    }
    // 记得把值重新写进去val代表整个storage的信息
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(val));
  }
}