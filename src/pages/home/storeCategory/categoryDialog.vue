<!--
 * @Author: yk1062008412
 * @Date: 2019-12-02 22:40:30
 * @LastEditors: yk1062008412
 * @LastEditTime: 2019-12-10 20:58:43
 * @Description: file content
 -->
<template>
  <el-form ref="form" :rules="rules" :model="formData" label-width="80px" size="small">
    <el-form-item label="分类ID" v-if="dialogType === 2">
      <span>{{ categoryId }}</span>
    </el-form-item>
    <el-form-item label="分类名称" prop="categoryName">
      <el-input v-model="formData.categoryName" maxlength="6" placeholder="请输入分类名称(最多6个字)" />
    </el-form-item>
    <el-form-item label="状态" prop="categoryStatus">
      <el-select v-model="formData.categoryStatus" placeholder="请选择上下架状态" class="select-width">
        <el-option label="下架" :value="0" />
        <el-option label="上架" :value="1" />
      </el-select>
    </el-form-item>
    <el-form-item label="排序" prop="categoryIndex">
      <el-input-number v-model="formData.categoryIndex" controls-position="right" />
    </el-form-item>
    <el-form-item label="备注">
      <el-input type="textarea" v-model="formData.comments" />
    </el-form-item>
    <el-row class="button-group">
      <el-button @click="closeDialog" size="small">取 消</el-button>
      <el-button v-if="dialogType === 1" type="primary" @click="addCategory" size="small">添 加</el-button>
      <el-button v-if="dialogType === 2" type="primary" @click="saveCategory" size="small">确 定</el-button>
    </el-row>
  </el-form>
</template>

<script>
import { insertCategory, getCategoryInfo, editCategoryInfo } from "@/api/home/storeCategory";
export default {
  props: {
    dialogType: {
      type: Number,
      required: true
    },
    categoryId: {
      type: Number,
      default: null
    }
  },
  data() {
    // 校验是否为数字
    const checkNum = (rule, value, callback) => {
      if(!value){
        callback();
      }
      if(!Number.isInteger(value)){
        callback(new Error('请输入纯数字'));
      }else{
        callback();
      }
    }
    return {
      formData: {
        categoryName: '',
        categoryStatus: 0,
        categoryIndex: '',
        comments: ''
      },
      rules: {
        categoryName: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
          { min: 1, max: 6, message: '请输入1-6个字符',trigger: 'blur' }
        ],
        categoryStatus: [
          { required: true, message: '请选择上下架状态', trigger: 'change' }
        ],
        categoryIndex: [
          { validator: checkNum, trigger: 'change' }
        ]
      }
    }
  },
  created() {
    if(this.dialogType === 2){
      this.getCategoryDetail();
    }
  },
  methods: {
    closeDialog() { // 取消添加，关闭弹窗
      this.$emit('handleClose')
    },
    addCategory() { // 新增类目
      this.$refs['form'].validate((valid) => {
        if(!valid) return false;
        insertCategory(this.formData).then(({ code }) => {
          if(code === 0){
            this.$message({
              message: '分类添加成功',
              type: 'success'
            });
            this.$emit('handleReFetch')
          }
        })
      })
    },
    getCategoryDetail(){ // 获取类目详情
      getCategoryInfo(this.categoryId).then(({ data:{ category_name, category_status, category_index, comments }}) => {
        this.formData.categoryName = category_name;
        this.formData.categoryStatus = category_status;
        this.formData.categoryIndex = category_index;
        this.formData.comments = comments;
      })
    },
    saveCategory(){ // 保存修改的类目
      const params = {
        ...this.formData,
        categoryId: this.categoryId
      }
      editCategoryInfo(params).then(({ code }) => {
        if(code === 0){
          this.$message({
            message: '修改成功',
            type: 'success'
          });
          this.$emit('handleReFetch')
        }
      })
    }
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
