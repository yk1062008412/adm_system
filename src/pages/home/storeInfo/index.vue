<!--
 * @Author: yk1062008412
 * @Date: 2019-11-05 22:16:41
 * @LastEditors: yk1062008412
 * @LastEditTime: 2019-12-07 20:38:19
 * @Description: 商品管理 -> 商品信息
 -->
<template>
  <div>
    <store-form
      :category-list="categoryList"
      @handleSearch="onSearch"
      @handleAddStore="handleAddStore"
    />
    <store-table />
    <div class="paginate-container">
      <el-pagination
        layout="total, sizes, prev, pager, next, jumper"
        :page-size="10"
        :page-sizes="[10, 30, 50, 100]"
        :total="50">
      </el-pagination>
    </div>
    <el-dialog
      :title="dialogStatus === 'add' ? '新增商品' : '编辑商品'"
      :visible.sync="dialogVisible"
      width="1000px"
    >
      <store-dialog
        v-if="dialogVisible"
        :dialog-status="dialogStatus"
        :category-list="categoryList"
        @handleCancel="cancelOperate"
        @handleSuccess="onSuccess"
      />
    </el-dialog>
  </div>
</template>

<script>
import storeForm from './storeForm';
import storeTable from './storeTable';
import storeDialog from './storeDialog';
import { getStoreList } from "@/api/home/storeInfo";
import { getCategoryList } from "@/api/home/storeCategory";
export default {
  name: "StoreInfo",
  components: {
    storeForm,
    storeTable,
    storeDialog
  },
  data() {
    return {
      formData: {},
      count: 0,
      currentPage: 1,
      pageSize: 20,
      resList: [],
      dialogVisible: false,
      categoryList: [],
      dialogStatus: 'add' // add: 新增, edit: 编辑
    }
  },
  created() {
    this.fetchData()
    this.getCategory()
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
    getCategory(){ // 获取类目列表
      getCategoryList().then(({ data }) => {
        this.categoryList = data || [];
      })
    },
    onSearch(params) { // 查询
      this.formData = params;
      this.currentPage = 1;
      this.fetchData();
    },
    handleAddStore() { // 添加商品
      this.dialogStatus = 'add';
      this.dialogVisible = true;
    },
    cancelOperate(){ // 取消弹框
      this.dialogVisible = false;
    },
    onSuccess(){ // 操作成功，关闭弹框
      this.pageSize = 1;
      this.fetchData();
      this.dialogVisible = false;
    }
  },
};
</script>
<style lang="less" scoped>
.paginate-container{
  text-align: right;
}
</style>
