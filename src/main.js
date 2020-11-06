import Vue from 'vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
// 懒加载
import VueLazyLoad from 'vue-lazyload'
import VueCookie from 'vue-cookie'
import { Message } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
import App from './App.vue'
// import env from './env'
// mock开关
const mock = false;
if (mock) {
  require('./mock/api');
}
//这里根据前端的跨域方式做调整
axios.defaults.baseURL = '/api';
// 这里有错误哎 自己找找先
// axios.defaults.baseURL = 'http://mall-pre.springboot.cn';
// 超时
axios.defaults.timeout = 8000;
// 接口错误拦截
// .interceptors.是拦截器还有request拦截器
axios.interceptors.response.use(function (response) {
  let res = response.data;
  if (res.status == 0) {
    return res.data;
    //判断是否是首登录
  } else if (res.status == 10) {
    // 这里this没有指向vue不能用this跳转时候用全路径
    window.location.href = '/#/login';
    return Promise.reject(res);
  } else {
    Message.warning(res.msg);
    return Promise.reject(res);
  }
},
  //服务器不通时抑制错误（状态码为500）
  (error) => {
    let res = error.response;
    Message.error(res.data.message);
    return Promise.reject(error);
  });
// 通过Vue.use使用各种插件 把axios挂在上去
Vue.use(VueAxios, axios);
Vue.use(VueCookie);
Vue.use(VueLazyLoad, {
  loading: '/imgs/loading-svg/loading-bars.svg'
  //svg不会失真
})
Vue.prototype.$message = Message;
// 生产环境的的提示
Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
