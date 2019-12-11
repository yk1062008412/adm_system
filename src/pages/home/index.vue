<template>
  <div>
    <el-container>
      <el-header class="header-container">
        <div class="system-title">后台管理系统</div>
        <el-dropdown>
          <span class="el-dropdown-link">
            <span class="welcome-text">欢迎您，</span>
            <span class="user-name">{{ admName }}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>修改密码</el-dropdown-item>
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-container class="next-container">
        <el-aside class="aside-container" width="200px">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            router
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-s-order"></i>
                <span>商品管理</span>
              </template>
              <el-menu-item index="storeCategory">商品分类</el-menu-item>
              <el-menu-item index="storeInfo">商品信息</el-menu-item>
              <el-menu-item index="1-3">特价商品</el-menu-item>
              <el-menu-item index="1-4">banner轮播</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-s-order"></i>
                <span>订单管理</span>
              </template>
              <el-menu-item index="order">订单管理</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-s-data"></i>
                <span>数据管理</span>
              </template>
              <el-menu-item index="1-1">仪表盘</el-menu-item>
              <el-menu-item index="1-2">销量数据</el-menu-item>
              <el-menu-item index="1-3">用户信息</el-menu-item>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-setting"></i>
                <span>系统设置</span>
              </template>
              <el-menu-item index="account">用户管理</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-submenu>
            <el-submenu index="5" disabled>
              <template slot="title">
                <i class="el-icon-setting"></i>
                <span slot="title">导航四</span>
              </template>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { getAdmInfo } from "@/api/home/index";
export default {
  name: "Home",
  data() {
    return {
      admName: ''
    }
  },
  mounted() {
    this.getUserInfo();
  },
  methods: {
    getUserInfo() {
      getAdmInfo().then(({ data }) => {
        this.admName = data.adm_name || '未知用户';
      });
    }
  }
};
</script>

<style lang="less" scoped>
.header-container {
  // border-bottom: 1px solid #C0C4CC;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #303133;
  z-index: 1;
  .system-title {
    font-size: 18px;
    letter-spacing: 2px;
    color: #303133;
    color: #dddddd;
  }
  .welcome-text {
    color: #c0c4cc;
  }
  .user-name {
    color: #409eff;
  }
}
.next-container{
  position: absolute;
  top: 0;
  left: 0;
  padding-top: 60px;
  height: 100%;
  width: 100%;
}
.aside-container {
  background-color: #545c64;
  height: 100%;
}
</style>
