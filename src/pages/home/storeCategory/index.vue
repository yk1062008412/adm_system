<!--
 * @Author: yk1062008412
 * @Date: 2019-11-05 22:09:21
 * @LastEditors: yk1062008412
 * @LastEditTime: 2019-12-04 22:55:00
 * @Description: 商品管理 -> 商品分类
 -->
<template>
  <div>
    <el-row>
      <el-button
        type="primary"
        icon="el-icon-circle-plus-outline"
        size="small"
        @click="openInsertDialog"
      >新增分类</el-button>
    </el-row>
    <category-table
      :list="tableData"
      @handleEdit="handleEdit"
      @handleReFetch="handleReFetch"
    />
    <el-dialog title="新增分类" :visible.sync="dialogVisible" width="450px">
      <category-dialog
        v-if="dialogVisible"
        :dialog-type="dialogType"
        :category-id="editCategoryId"
        @handleClose="handleClose"
        @handleReFetch="handleReFetch"
      />
    </el-dialog>
  </div>
</template>

<script>
import categoryTable from './categoryTable';
import categoryDialog from './categoryDialog';
import { getCategoryList } from "@/api/home/storeCategory";
export default {
  name: "storeCategory",
  components: {
    categoryTable,
    categoryDialog
  },
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      dialogType: 1, // 1新增，2编辑
      editCategoryId: null // 类目ID
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData(){ // 获取类目数据
      getCategoryList().then(({ data }) => {
        this.tableData = data || [];
      })
    },
    openInsertDialog(){ // 打开弹窗
      this.dialogType = 1;
      this.editCategoryId = null;
      this.dialogVisible = true;
    },
    handleClose(){ //关闭弹窗
      this.dialogVisible = false;
    },
    handleReFetch(){ // 添加成功，重新获取数据
      this.dialogVisible = false;
      this.fetchData();
    },
    handleEdit(categoryId){ // 编辑分类
      this.dialogType = 2;
      this.editCategoryId = categoryId;
      this.dialogVisible = true;
    }
  },
};
</script>
