<template>
  <div class="nav-bar" :class="{ is_fixed: isFixed }">
    <div class="container">
      <div class="pro-title">
        {{ title }}
      </div>
      <div class="pro-param">
        <a href="javascript:;">概述</a><span>|</span>
        <a href="javascript:;">参数</a><span>|</span>
        <a href="javascript:;">用户评价</a>
        <slot name="buy"></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "nav-bar",
  props: {
    //从负组件中获取
    title: String,
  },
  data() {
    return {
      isFixed: false,
    };
  },
  mounted() {
    //在这里定义的意思是当其他页面的时候可以清除
    window.addEventListener("scroll", this.initHeight);
  },
  methods: {
    // 吸顶效果
    initHeight() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      this.isFixed = scrollTop > 152 ? true : false;
    },
  },
  //其他页面销毁
  destroyed() {
    //第三个参数代表行为方式true代表捕获false代表冒泡 默认为true
    window.removeEventListener("scroll", this.initHeight, false);
  },
};
</script>
<style lang="scss">
@import "./../assets/scss/config.scss";
@import "./../assets/scss/mixin.scss";
.nav-bar {
  height: 70px;
  line-height: 70px;
  border-top: 1px solid $colorH;
  background-color: $colorG;
  z-index: 10;
  &.is_fixed {
    position: fixed;
    top: 0;
    width: 100%;
    box-shadow: 0 5px 5px $colorE;
  }
  .container {
    @include flex();
    .pro-title {
      font-size: $fontH;
      color: $colorB;
      font-weight: bold;
    }
    .pro-param {
      font-size: $fontJ;
      span {
        margin: 0 10px;
      }
      a {
        color: $colorC;
      }
    }
  }
}
</style>