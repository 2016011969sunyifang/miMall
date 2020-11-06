// index为入口
import Vue from 'vue'
import Vuex from 'vuex'
//引入自己的模块要加./
import mutations from './mutations'
import actions from './action'
Vue.use(Vuex);

const state = {
  username: '',//登录用0
  cartCount: 0//购物车商品数量
}
export default new Vuex.Store({
  state,
  mutations,
  actions
});