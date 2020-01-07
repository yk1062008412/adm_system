<!--
 * @Author: yk1062008412
 * @Date: 2019-12-11 21:56:13
 * @LastEditors  : yk1062008412
 * @LastEditTime : 2020-01-07 22:08:35
 * @Description: orderManage
 -->
<template>
  <div>
    <order-form @handleSearch="fetchData" />
    <order-table :list="tableData" />
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
      currentPage: 1,
      pageSize: 20
    };
  },
  mounted() {},
  methods: {
    fetchData(param) {
      // 获取数据
      const params = {
        ...param,
        currentPage: this.currentPage,
        pageSize: this.pageSize
      };
      getOrderList(params).then(({ data }) => {
        this.tableData = data;
      });
    }
  }
};
</script>