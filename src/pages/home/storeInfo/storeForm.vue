<!--
 * @Author: yk1062008412
 * @Date: 2019-12-04 22:35:02
 * @LastEditors: yk1062008412
 * @LastEditTime: 2019-12-07 17:33:13
 * @Description: store 查询内容
 -->
<template>
  <div class="store-form-container">
    <el-form :model="formData" size="small" label-width="90px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="商品名称">
            <el-input v-model="formData.goodsName" placeholder="请输入商品名称" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="商品分类">
            <el-select v-model="formData.categoryId" placeholder="请选择商品分类" class="select-empty">
              <el-option value="" label="全部" />
              <el-option
                v-for="item in categoryList"
                :key="item.category_id"
                :label="item.category_name"
                :value="item.category_id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="状态">
            <el-select v-model="formData.goodsStatus" placeholder="请选择状态" class="select-empty">
              <option value="" label="全部" />
              <option :value="1" label="上架" />
              <option :value="0" label="下架" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-button type="primary" size="small" @click="onSearch">查 询</el-button>
          <el-button type="primary" size="small" @click="addStore">新增商品</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
export default {
  props: {
    categoryList: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      formData: {
        goodsName: '',
        categoryId: '',
        goodsStatus: ''
      },
    }
  },
  methods: {
    onSearch(){ // 查询商品列表
      this.$emit('handleSearch', this.formData);
    },
    addStore(){ // 添加商品
      this.$emit('handleAddStore')
    }
  }
}
</script>
<style lang="less" scoped>
.store-form-container{
  margin-bottom: 20px;
  .select-empty{
    width: 100%;
  }
}
</style>
