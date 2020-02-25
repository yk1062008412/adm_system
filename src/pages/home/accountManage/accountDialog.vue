<!--
 * @Author: ljy-code@gmail.com
 * @Date: 2020-01-15 22:40:30
 * @LastEditors: ljy-code@gmail.com
 * @LastEditTime: 2020-01-22 20:58:43
 * @Description: file content
 -->
<template>
  <el-form ref="form" :rules="rules" :model="formData" label-width="120px" size="small">
    <el-form-item label="账号" prop="admAccount">
      <el-input v-model="formData.admAccount" placeholder="请输入账号" />
    </el-form-item>
    <el-form-item label="姓名" prop="admName">
      <el-input v-model="formData.admName" placeholder="请输入姓名" />
    </el-form-item>
    <el-form-item label="手机号" prop="admPhone">
      <el-input v-model="formData.admPhone" placeholder="请输入手机号" />
    </el-form-item>
    <el-form-item label="是否超级管理员" prop="superAdm">
      <el-select v-model="formData.superAdm" placeholder="请选择管理员状态" class="select-full">
        <el-option :value="1" label="是" />
        <el-option :value="0" label="否" />
      </el-select>
    </el-form-item>
    <el-form-item label="备注信息" prop="admComments">
      <el-input type="textarea" :rows="3" v-model="formData.admComments" placeholder="请输入备注信息" />
    </el-form-item>
    <el-row class="button-group">
      <el-button @click="closeDialog" size="small">取 消</el-button>
      <el-button v-if="dialogType === 1" type="primary" @click="addAdm" size="small">添 加</el-button>
      <el-button v-if="dialogType === 2" type="primary" @click="updateAdm" size="small">确 定</el-button>
    </el-row>
  </el-form>
</template>

<script>
import { admAccountAdd, getAdmAccountDetail, admAccountUpdate } from "@/api/home/accountManage";
export default {
  props: {
    dialogType: {
      type: Number,
      required: true
    },
    admId: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      formData: {
        admAccount: '',
        admName: '',
        admPhone: '',
        superAdm: 1,
        admComments: ''
      },
      rules: {
        admAccount: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 1, max: 30, message: '请输入1-30个字符',trigger: 'blur' }
        ],
        admName: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 1, max: 30, message: '请输入1-30个字符',trigger: 'blur' }
        ],
        superAdm: [
          { required: true, message: '请选择管理员状态', trigger: 'change' }
        ]
      }
    }
  },
  created() {
    if(this.dialogType === 2){
      this.getAdmAccountDetail();
    }
  },
  methods: {
    closeDialog() { // 取消添加，关闭弹窗
      this.$emit('handleClose')
    },
    addAdm() { // 新增类目
      this.$refs['form'].validate((valid) => {
        if(!valid) return false;
        admAccountAdd(this.formData).then(({ code }) => {
          if(code === 0){
            this.$message({
              message: '管理员添加成功',
              type: 'success'
            });
            this.$emit('handleReFetch')
          }
        })
      })
    },
    getAdmAccountDetail(){ // 获取类目详情
      const param = { id: this.admId }
      getAdmAccountDetail(param).then(({ data:{ adm_account, adm_name, adm_phone, super_adm, adm_comments }}) => {
        this.formData.admAccount = adm_account;
        this.formData.admName = adm_name;
        this.formData.admPhone = adm_phone;
        this.formData.superAdm = super_adm;
        this.formData.admComments = adm_comments;
      })
    },
    updateAdm(){ // 保存修改的类目
      const params = {
        ...this.formData,
        id: this.admId
      }
      admAccountUpdate(params).then(({ code }) => {
        if(code === 0){
          this.$message({
            message: '修改成功',
            type: 'success'
          });
          this.$emit('handleReFetch')
        }
      })
    },
  },
  mounted() {
    console.log('mounted: ', this.admId)
  },
};
</script>
<style lang="less">
.button-group{
  text-align: center;
}
.select-width{
  width: 100%;
}
</style>
