<!--
 * @Author: yk1062008412
 * @Date: 2019-11-05 22:16:41
 * @LastEditors: yk1062008412
 * @LastEditTime: 2019-12-06 00:05:44
 * @Description: 商品管理 -> 商品信息
 -->
<template>
  <div>
    <store-form @handleSearch="onSearch"/>
    <store-table />
    <div class="paginate-container">
      <el-pagination
        layout="total, sizes, prev, pager, next, jumper"
        :page-size="10"
        :page-sizes="[10, 30, 50, 100]"
        :total="50">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import storeForm from './storeForm';
import storeTable from './storeTable';
import { getStoreList } from "@/api/home/storeInfo";
export default {
  name: "StoreInfo",
  components: {
    storeForm,
    storeTable
  },
  data() {
    return {
      formData: {},
      count: 0,
      currentPage: 1,
      pageSize: 20,
      resList: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() { // 获取商品列表
      const params = {
        ...this.formData,
        currentPage: this.currentPage,
        pageSize: this.pageSize
      }
      getStoreList(params).then(({ data, pageInfo: { count, currentPage, pageSize }}) => {
        this.resList = data || [],
        this.count = count,
        this.currentPage = currentPage,
        this.pageSize = pageSize
      })
    },
    onSearch(params) {
      this.formData = params;
      this.currentPage = 1;
      this.fetchData();
    }
  },
};
</script>
<style lang="less" scoped>
.paginate-container{
  text-align: right;
}
</style>
