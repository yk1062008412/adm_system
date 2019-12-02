<!--
 * @Author: yk1062008412
 * @Date: 2019-11-05 22:09:21
 * @LastEditors: yk1062008412
 * @LastEditTime: 2019-12-02 23:24:53
 * @Description: 商品分类页面
 -->
<template>
  <div>
    <el-row>
      <el-button
        type="primary"
        icon="el-icon-circle-plus-outline"
        size="small"
        @click="openDialog"
      >新增分类</el-button>
    </el-row>
    <category-table :list="tableData" />
    <el-dialog title="新增分类" :visible.sync="dialogVisible" width="450px">
      <category-dialog
        :dialog-type="dialogType"
        @handleClose="handleClose"
        @handleInsert="handleInsert"
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
      dialogType: 1 // 1新增，2编辑
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
    openDialog(){ // 打开弹窗
      this.dialogVisible = true;
    },
    handleClose(){ //关闭弹窗
      this.dialogVisible = false;
    },
    handleInsert(){ // 添加成功，重新获取数据
      this.dialogVisible = false;
      this.fetchData();
    }
  },
};
</script>
