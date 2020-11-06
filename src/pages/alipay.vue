<template>
  <div class="ali-pay">
    <loading v-if="loading"></loading>
    <!-- 由于支付宝会返回一段html源码 -->
    <div class="form" v-html="content"></div>
  </div>
</template>
<script>
//引入加载过程
import Loading from "./../components/Loading";
export default {
  name: "alipay",
  components: {
    Loading,
  },
  data() {
    return {
      orderId: this.$route.query.orderId,
      content: "",
      loading: true,
    };
  },
  mounted() {
    this.paySubmit();
  },
  methods: {
    paySubmit() {
      this.axios
        .post("/pay", {
          orderId: this.orderId,
          orderName: "小米商城",
          amount: 0.01, //单位元
          payType: 1, //1支付宝，2微信
        })
        .then((res) => {
          this.content = res.content;
          // 渲染需要时间
          setTimeout(() => {
            document.forms[0].submit();
          }, 100);
        });
    },
  },
};
</script>