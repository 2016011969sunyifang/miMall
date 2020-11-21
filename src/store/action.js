/**
 * 商城Vuex-actions
 * context代表上下文
 * commit代表提交
 */
export default {
  saveUserName(context, username) {
    context.commit('saveUserName', username);
  },
  saveCartCount(context, count) {
    context.commit('saveCartCount', count);
  }
}