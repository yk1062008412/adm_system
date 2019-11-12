<!--
 * @Author: yk1062008412
 * @Date: 2019-11-05 22:09:21
 * @LastEditors: yk1062008412
 * @LastEditTime: 2019-11-12 23:49:03
 * @Description: 商品分类页面
 -->
<template>
  <div>
    <el-row>
      <el-button
        type="primary"
        icon="el-icon-circle-plus-outline"
        size="small"
        @click="openInsertDialog()"
      >新增分类</el-button>
    </el-row>
    <el-table :data="tableData" stripe style="width: 100%" size="small" empty-text="暂无数据">
      <el-table-column type="index" width="50" />
      <el-table-column prop="categoryId" label="分类ID" />
      <el-table-column prop="categoryName" label="分类名称" />
      <el-table-column prop="categorystatus" label="状态" />
      <el-table-column prop="categoryIndex" label="排序" />
      <el-table-column prop="addTime" label="添加时间" />
      <el-table-column prop="updateTime" label="最近更新时间" />
      <el-table-column prop="comments" label="备注" />
      <el-table-column prop="address" label="操作" width="200">
        <el-button type="primary" icon="el-icon-edit" circle size="mini" />
        <el-button type="success" icon="el-icon-check" circle size="mini" />
        <el-button type="warning" icon="el-icon-close" circle size="mini" />
        <el-button type="danger" icon="el-icon-delete" circle size="mini" />
      </el-table-column>
    </el-table>
    <el-dialog title="新增分类" :visible.sync="dialogVisible" width="40%">
      <el-form ref="form" :model="formData" label-width="80px" size="small">
        <el-form-item label="分类名称">
          <el-input v-model="formData.categoryName" />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="formData.categorystatus" placeholder="请选择活动区域">
            <el-option label="下架" :value="0" />
            <el-option label="上架" :value="1" />
          </el-select>
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="formData.categoryIndex" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="formData.comments" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "StoreCategory",
  data() {
    return {
      tableData: [{
          categoryId: 1,
          categoryName: '厨具',
          categoryIndex: 1,
          comments: '这里是厨具分类',
          addTime: '2019-11-10 23:09:52',
          updateTime: '2019-11-12 23:10:01'
      }],
      // tableData: [],
      dialogVisible: false,
      formData: {
        categoryName: '',
        categorystatus: 0,
        categoryIndex: '',
        comments: ''
      }
    };
  },
  methods: {
    openInsertDialog(){
      this.dialogVisible = true;
    }
  },
};
</script>
