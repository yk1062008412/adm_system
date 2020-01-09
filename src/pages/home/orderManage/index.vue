<!--
 * @Author: yk1062008412
 * @Date: 2019-12-11 21:56:13
 * @LastEditors  : carkang.yang@qunar.com
 * @LastEditTime : 2020-01-09 18:01:55
 * @Description: orderManage
 -->
<template>
  <div>
    <order-form @handleSearch="onSearch" />
    <order-table :list="tableData" @handleRefetch="refetch" />
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
  </div>
</template>

<script>
import orderTable from "./orderTable";
import orderForm from "./orderForm";
import { getOrderList } from "@/api/home/orderManage";

export default {
  name: "OrderManage",
  components: {
    orderTable,
    orderForm
  },
  data() {
    return {
      tableData: [],
      count: 0,
      currentPage: 1,
      pageSize: 10,
      currentParam: {}
    };
  },
  mounted() {},
  methods: {
    fetchData() {
      // 获取数据
      const params = {
        ...this.currentParam,
        currentPage: this.currentPage,
        pageSize: this.pageSize
      };
      getOrderList(params).then(({ data, pageInfo:{count, currentPage, pageSize} }) => {
        this.tableData = data;
        this.count = +count;
        this.currentPage = +currentPage;
        this.pageSize = +pageSize;
      });
    },
    onSearch(params) { // 查询数据
      this.currentParam = params;
      this.refetch();
    },
    refetch() {
      this.currentPage = 1;
      this.pageSize = 10;
      this.fetchData();
    },
    handleSizeChange(pageSize){ // 每页数变化
      this.pageSize = +pageSize;
      this.currentPage = 1;
      this.fetchData();
    },
    handleCurrentChange(currentPage){ // 当前页变化
      this.currentPage = +currentPage;
      this.fetchData();
    }
  }
};
</script>
<style lang="less" scoped>
.paginate-container{
  text-align: right;
  margin-top: 20px;
}
</style>