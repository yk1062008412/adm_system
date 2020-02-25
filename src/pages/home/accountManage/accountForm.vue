<!--
 * @Author: ljy-code
 * @Date: 2020-01-14 21:25:07
 * @LastEditors  : ljy-code@gmail.com
 * @LastEditTime : 2020-01-16 17:49:29
 * @Description: account form
-->
<template>
  <div class="order-form-container">
    <el-form :model="formData" ref="formData" size="small" label-width="120px">
      <el-row>
        <el-col :span="6">
          <el-form-item label="账号" prop="admAccount">
            <el-input v-model="formData.admAccount" placeholder="请输入账号" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="姓名" prop="admName">
            <el-input v-model="formData.admName" placeholder="请输入姓名" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="手机号" prop="admPhone">
            <el-input v-model="formData.admPhone" placeholder="请输入手机号" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="是否超级管理员" prop="superAdmin">
            <el-select v-model="formData.superAdmin" placeholder="请选择管理员状态" class="select-full">
              <el-option value="" label="全部" />
              <el-option :value="1" label="是" />
              <el-option :value="0" label="否" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item>
            <el-button type="primary" size="small" @click="onSearch">查 询</el-button>
            <el-button @click="resetForm('formData')">重 置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'account-form',
  data() {
    return {
      formData: {
        admAccount: '',
        admName: '',
        admPhone: '',
        superAdmin: ''
      }
    }
  },
  created() {
    this.onSearch();
  },
  methods: {
    onSearch () {
      this.$emit('handleSearch', this.formData)
    },
    resetForm (formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>
<style lang="less" scoped>
.button-group{
  margin-left: 20px;
}
.select-full{
  width: 100%;
}
</style>