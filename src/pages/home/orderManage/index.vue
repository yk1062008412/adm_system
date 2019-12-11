<template>
  <div>
    <order-table
      :list="tableData"
      @handleEdit="handleEdit"
    ></order-table>
  </div>
</template>

<script>
import orderTable from './orderTable';
import { getOrderList } from "@/api/home/orderManage";

export default {
    name: 'OrderManage',
    components: {
        orderTable
    },
    data() {
      return {
        tableData: []
      }
    },
    methods: {
      handleEdit() {
        console.log(11111);
      }
    },
    mounted() {
      getOrderList({currentPage: 1, pageSize: 20}).then(({ data }) => {
        this.tableData = data;
      })
    }
}
</script>