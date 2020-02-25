<template>
  <div>
    <accountForm @handleSearch="onSearch" />
    <el-row>
      <el-button
        type="primary"
        icon="el-icon-circle-plus-outline"
        size="small"
        @click="openInsertDialog"
      >新增用户</el-button>
    </el-row>
    <account-table :list="tableData" @handleRefetch="refetch" @handleEdit="handleEdit" />
    <div class="paginate-container">
      <el-pagination
        layout="total, sizes, prev, pager, next"
        :page-size="pageSize"
        :page-sizes="[10, 20, 30, 50]"
        :current-page.sync="currentPage"
        :total="count"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange">
      </el-pagination>
    </div>
    <el-dialog :title="dialogType === 1 ? '新增用户' : '编辑用户'" :visible.sync="dialogVisible" width="450px">
      <account-dialog
        v-if="dialogVisible"
        :dialog-type="dialogType"
        :adm-id="admId"
        @handleClose="handleClose"
        @handleReFetch="handleReFetch"
      ></account-dialog>
    </el-dialog>
  </div>
</template>

<script>
import accountTable from "./accountTable.vue";
import accountForm from "./accountForm.vue";
import accountDialog from './accountDialog.vue';
import { getAccountList } from "@/api/home/accountManage";

export default {
  name: "AccountManage",
  components: {
    accountTable,
    accountForm,
    accountDialog
  },
  data() {
    return {
      tableData: [],
      count: 0,
      currentPage: 1,
      pageSize: 10,
      currentParam: {},
      dialogVisible: false,
      dialogType: 1, // 1新增，2编辑
      admId: null
    };
  },
  methods: {
    fetchData() {
      // 获取数据
      const params = {
      ...this.currentParam,
      currentPage: this.currentPage,
      pageSize: this.pageSize
      };
      getAccountList(params).then(
      ({ data, pageInfo: { count, currentPage, pageSize } }) => {
          this.tableData = data;
          this.count = +count;
          this.currentPage = +currentPage;
          this.pageSize = +pageSize;
      }
      );
    },
    onSearch(params) {
      // 查询数据
      this.currentParam = params;
      this.refetch();
    },
    refetch() {
      this.currentPage = 1;
      this.pageSize = 10;
      this.fetchData();
    },
    handleSizeChange(pageSize) {
      // 每页数变化
      this.pageSize = +pageSize;
      this.currentPage = 1;
      this.fetchData();
    },
    handleCurrentChange(currentPage) {
      // 当前页变化
      this.currentPage = +currentPage;
      this.fetchData();
    },
    openInsertDialog(){ // 打开弹窗
      this.dialogType = 1;
      this.admId = null;
      this.dialogVisible = true;
    },
    handleClose(){ //关闭弹窗
      this.dialogVisible = false;
      this.admId = null;
    },
    handleReFetch(){ // 添加成功，重新获取数据
      this.dialogVisible = false;
      this.refetch();
    },
    handleEdit(admId){ // 编辑分类
      this.dialogType = 2;
      this.admId = admId;
      this.dialogVisible = true;
    }
  },
  mounted() {
    this.fetchData();
  }
};
</script>