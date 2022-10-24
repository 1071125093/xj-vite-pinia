/*
 * @Author: XiaoJun
 * @Date: 2022-10-20 14:13:30
 * @LastEditors: XiaoJun
 * @LastEditTime: 2022-10-20 14:13:30
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/views/front/reborn/components/shard24/service/testvue2.js
 */
/*
 * @Author: XiaoJun
 * @Date: 2022-10-20 09:18:35
 * @LastEditors: XiaoJun
 * @LastEditTime: 2022-10-20 14:10:47
 * @Description: 弹窗测试
 * @FilePath: /fd-chuangguanjia-talent/src/views/demo/service/index.js
 */
import Vue, { h, render } from 'vue';
import app from '@/main.js'
console.log(app);
// #region ********** 弹窗组件安装 start **************/
/** 组件加载函数 */
/**
 * [loadComponent description] 初始化加载组件
 * @param  {[type]} Component [description] 传入组件
 * @return {[type]}           [description]
 */
const loadComponent = (Component) => {
  return new Promise((resolve) => {
    if (typeof Component === 'function') {
      Component().then((resp) => {
        resolve(resp.default);
      });
    } else {
      return resolve(Component);
    }
  });
};

// #endregion ******* 弹窗组件安装 ~end~ **************/

// Vue.use(theDialog);

/** 初始化开始 */

export let instance;

export const showDialog = async (Component, options) => {
  return new Promise(async (resolve, reject) => {
    Component = await loadComponent(Component);
    // Component.install = (Vue) => {
    getInstance = (options) => {
      const ComponentConstructor = Vue.extend(Component);
      return new ComponentConstructor({
        el: document.createElement('div'),
        propsData: options
      });
    };
    // };

    instance = getInstance(options);
    document.body.appendChild(instance.$el);
    setTimeout(() => {
      resolve();
    }, 3000);
  });
};

export const confirmDialog = () => {
  return;
};
export const cancelDialog = () => {
  instance.$el.remove();
};
