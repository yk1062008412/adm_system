<template>
  <div class="login-page">
    <el-card class="login-card">
      <div slot="header" class="login-title">
        <span>商品后台管理系统</span>
      </div>
      <el-form ref="form" label-width="50px" size="small" label-position="left">
        <el-form-item label="账 号">
          <el-input v-model="userName" />
        </el-form-item>
        <el-form-item label="密 码">
          <el-input v-model="passWord" type="password" auto-complete="off" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%" @click="onLogin">登 录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { loginSystem } from "@/api/login/login";
export default {
  name: "Login",
  data() {
    return {
      userName: "",
      passWord: ""
    };
  },
  methods: {
    onLogin() {
      const param = {
        userName: this.userName,
        passWord: this.passWord
      };
      localStorage.setItem("_token_", null);
      loginSystem(param).then(res => {
        if (res.code === 0) {
          const auth = res.token;
          localStorage.setItem("_token_", auth);
          location.href = "/home/";
        } else if (res.code === -1) {
          this.$message({
            message: "用户名或密码错误",
            type: "error",
            center: true
          });
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.login-page {
  display: flex;
  justify-content: center;
  .login-card {
    margin-top: 150px;
    width: 400px;
    .login-title {
      text-align: center;
    }
  }
}
</style>
<style lang="less">
html {
  background-color: #409eff;
}
</style>