<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {},
  data() {
    return {};
  },
  mounted() {
    //不需要拉取不用执行 （没登陆也可以访问首页）
    if (this.$cookie.get("userId")) {
      this.getUser();
      this.getCartCount();
    }
  },
  methods: {
    //获取用户信息
    getUser() {
      //没有登录的时候保证代码不会报错（给了一个对象）
      this.axios.get("/user").then((res = {}) => {
        this.$store.dispatch("saveUserName", res.username);
      });
    },
    // 获取购物车
    getCartCount() {
      this.axios.get("/carts/products/sum").then((res = 0) => {
        this.$store.dispatch("saveCartCount", res);
      });
    },
  },
};
</script>

<style lang="scss">
@import "./assets/scss/reset.scss";
@import "./assets/scss/config.scss";
@import "./assets/scss/button.scss";
</style>
