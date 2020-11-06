<template>
  <div class="login">
    <div class="container">
      <a href="/#/index"><img src="/imgs/login-logo.png" alt="" /></a>
    </div>
    <div class="wrapper">
      <div class="container">
        <div class="login-form">
          <h3>
            <span class="checked" @click="showLog = 1">帐号登录</span
            ><span class="sep-line">|</span
            ><span @click="showLog = 2">扫码登录</span>
          </h3>
          <div v-if="showLog == 1">
            <div name="fade" class="input">
              <input type="text" placeholder="请输入帐号" v-model="username" />
            </div>
            <div class="input">
              <input
                type="password"
                placeholder="请输入密码"
                v-model="password"
              />
            </div>
            <div name="fade" class="btn-box">
              <a href="javascript:;" class="btn" @click="login">登录</a>
            </div>
          </div>
          <div v-if="showLog == 2" class="sao">
            <img src="/imgs/loading-svg/loading-bars.svg" alt="" />
          </div>
          <div class="outer">
            <div class="tips">
              <div class="sms" @click="register">手机短信登录/注册</div>
              <div class="reg">
                <a href="javascript:;" @click="regt"> 立即注册</a
                ><span>|</span>忘记密码？
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="footer-link">
        <a
          href="https://blog.csdn.net/s2422617864?spm=1001.2014.3001.5113"
          target="_blank"
          >小米商城</a
        ><span>|</span>
        <a
          href="https://blog.csdn.net/s2422617864?spm=1001.2014.3001.5113"
          target="_blank"
          >小米商城</a
        ><span>|</span>
        <a
          href="https://blog.csdn.net/s2422617864?spm=1001.2014.3001.5113"
          target="_blank"
          >小米商城</a
        ><span>|</span>
        <a
          href="https://blog.csdn.net/s2422617864?spm=1001.2014.3001.5113"
          target="_blank"
          >小米商城</a
        >
      </div>
      <p class="copyright">
        Copyright ©2019 mi.futurefe.com All Rights Reserved.
      </p>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "login",
  data() {
    // 如果想要打印数据需要先把需要打印的变量放在这里
    return {
      username: "",
      password: "",
      userId: "",
      showLog: 1,
    };
  },
  methods: {
    login() {
      // 解构this
      let { username, password } = this;
      this.axios
        .post("/user/login", {
          username,
          password,
        })
        .then((res) => {
          //过期时间与后台同步
          this.$cookie.set("userId", res.id, { expires: "Session" });
          // this.$store.dispatch('saveUserName',res.username);
          this.saveUserName(res.username);
          //query用path param用name
          this.$router.push({
            name: "index",
            params: {
              from: "login",
            },
          });
        });
    },
    ...mapActions(["saveUserName"]),
    register() {
      this.axios
        .post("/user/register", {
          username: "admin1",
          password: "admin1",
          email: "admin1@163.com",
        })
        .then(() => {
          this.$message.success("注册成功");
        });
    },
    logLeft() {
      console.log("我是左边");
    },
    logRight() {
      console.log("我是右边");
    },
    regt() {
      this.$router.push({
        name: "register",
        params: {
          from: "login",
        },
      });
    },
  },
};
</script>
<style lang="scss">
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.login {
  & > .container {
    height: 113px;
    img {
      width: auto;
      height: 100%;
    }
  }
  .wrapper {
    background: url("/imgs/login-bg.jpg") no-repeat center;
    .container {
      height: 576px;
      .login-form {
        // display: none;
        box-sizing: border-box;
        padding-left: 31px;
        padding-right: 31px;
        width: 410px;
        height: 510px;
        background-color: #ffffff;
        position: absolute;
        bottom: 29px;
        right: 0;
        h3 {
          line-height: 23px;
          font-size: 24px;
          text-align: center;
          margin: 40px auto 49px;
          .checked {
            color: #ff6600;
          }
          .sep-line {
            margin: 0 32px;
          }
        }
        h3:hover {
          cursor: pointer;
        }
        .input {
          display: inline-block;
          width: 348px;
          height: 50px;
          border: 1px solid #e5e5e5;
          margin-bottom: 20px;
          input {
            width: 100%;
            height: 100%;
            border: none;
            padding: 18px;
          }
        }
        .btn {
          width: 100%;
          line-height: 50px;
          margin-top: 10px;
          font-size: 16px;
        }
        .tips {
          margin-top: 14px;
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          cursor: pointer;
          .sms {
            color: #ff6600;
          }
          .reg {
            color: #999999;
            span {
              margin: 0 7px;
            }
          }
        }
      }
    }
  }
  .footer {
    height: 100px;
    padding-top: 60px;
    color: #999999;
    font-size: 16px;
    text-align: center;
    .footer-link {
      a {
        color: #999999;
        display: inline-block;
      }
      span {
        margin: 0 10px;
      }
    }
    .copyright {
      margin-top: 13px;
    }
  }
  .sao {
    // background-color: #ff6600;
    width: 249px;
    height: 249px;
    margin-left: 50px;
    img {
      width: 100%;
      // height: 100%;
    }
  }
}
.outer {
  position: absolute;
  // margin-bottom: 66px;
  width: 90%;
  bottom: 66px;
}
</style>