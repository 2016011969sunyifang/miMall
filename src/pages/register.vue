<template>
  <div class="cont">
    <div class="reg" v-if="showreg == 1">
      <img src="/imgs/login-logo.png" alt="" />
      <p class="regf">注册小米账号</p>
      <div>
        <p>国家/地区</p>
        <input type="text" placeholder="中国" />
        <p>注册账号成功后，国家/地区将不能被修改</p>
      </div>
      <div class="phonen">
        <p>手机号码</p>
        <input type="text" />
      </div>
      <button class="btn" @click="res">立即注册</button>
      <p class="read">
        已阅读并同意：小米<a href="#javascript:;">用户协议</a>和<a
          href="#javascript:;"
          >隐私政策</a
        >
      </p>
    </div>
    <div class="reg" v-if="showreg == 2">
      <img src="/imgs/login-logo.png" alt="" />
      <p class="regf">注册小米账号</p>
      <div class="item reg">
        <input
          type="text"
          class="ipt"
          placeholder="用户名"
          v-model="user.username"
        />
        <input
          type="text"
          class="ipt"
          placeholder="密码"
          v-model="user.password"
        />
        <input
          type="text"
          class="ipt"
          placeholder="邮箱"
          v-model="user.email"
        />
        <button class="btn" @click="register">立即注册</button>
      </div>
    </div>
    <nav-footer></nav-footer>
  </div>
</template>
<script>
import NavFooter from "./../components/NavFooter";
export default {
  name: "register",
  data() {
    return {
      showreg: 1,
      user: {
        email: "",
        password: "",
        username: "",
      },
    };
  },
  components: {
    NavFooter,
  },
  methods: {
    register() {
      let { user } = this;
      //   解构个人信息
      let { username, password, email } = user;
      let errMsg = "";
      //   正则判断
      let reg = RegExp(
        "^\\s*\\w+(?:\\.{0,1}[\\w-]+)*@[a-zA-Z0-9]+(?:[-.][a-zA-Z0-9]+)*\\.[a-zA-Z]+\\s*$"
      );
      if (!username) {
        errMsg = "请输入姓名";
      } else if (!password || !/\w{11}/.test(password)) {
        errMsg = "请输入正确格式的密码";
      } else if (!reg.test(email)) {
        errMsg = "请输入正确格式的邮箱";
      }
      if (errMsg) {
        this.$message.error(errMsg);
        return;
      }
      this.axios
        .post("/user/register", {
          username,
          password,
          email,
        })
        .then(() => {
          this.$message.success("注册成功");
          this.$router.push({
            name: "login",
            params: {
              from: "register",
            },
          });
        });
    },
    res() {
      this.showreg = 2;
    },
  },
};
</script>

<style scoped  lang="scss">
@import "./../assets/scss/config.scss";
@import "./../assets/scss/button.scss";
.cont {
  padding-top: 150px;
}
.reg {
  margin: 0px auto;
  width: 600px;
  height: 500px;
  //   background-color: red;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: left;
  font-size: 16px;
  justify-content: space-between;
  margin-bottom: 100px;
  flex-wrap: nowrap;
  input {
    width: 300px;
    height: 40px;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  a {
    color: black;
  }
  .read {
    color: gray;
  }
  button {
    margin-top: 10px;
  }
  .regf {
    font-size: $fontD;
  }
}
</style>