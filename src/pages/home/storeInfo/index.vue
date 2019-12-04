<!--
 * @Author: yk1062008412
 * @Date: 2019-11-05 22:16:41
 * @LastEditors: yk1062008412
 * @LastEditTime: 2019-12-04 22:46:49
 * @Description: 商品管理 -> 商品信息
 -->
<template>
  <div>
    <store-form />
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
export default {
  name: "StoreInfo",
  components: {
    storeForm,
    storeTable
  }
};
</script>
<style lang="less" scoped>
.paginate-container{
  text-align: right;
}
</style>
