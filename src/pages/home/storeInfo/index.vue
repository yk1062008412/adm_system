<!--
 * @Author: yk1062008412
 * @Date: 2019-11-05 22:16:41
 * @LastEditors  : carkang.yang@qunar.com
 * @LastEditTime : 2020-01-09 17:40:12
 * @Description: 商品管理 -> 商品信息
 -->
<template>
  <div>
    <store-form
      :category-list="categoryList"
      @handleSearch="onSearch"
      @handleAddStore="handleAddStore"
    />
    <store-table
      :list="resList"
      @handleEdit="handleEdit"
      @handleDelete="handleDelete"
    />
    <div class="paginate-container">
      <el-pagination
        layout="total, sizes, prev, pager, next, jumper"
        :page-size="pageSize"
        :page-sizes="[20, 30, 50, 100]"
        :current-page.sync="currentPage"
        :total="count"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange">
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
        :goods-id="goodsId"
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
      dialogStatus: 'add', // add: 新增, edit: 编辑
      goodsId: null // 编辑时用到
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
        this.count = +count,
        this.currentPage = +currentPage,
        this.pageSize = +pageSize
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
      this.currentPage = 1;
      this.fetchData();
      this.dialogVisible = false;
    },
    handleEdit(goodsId) { // 编辑商品
      this.goodsId = goodsId;
      this.dialogStatus = 'edit';
      this.dialogVisible = true;
    },
    handleDelete() { // 删除商品
      this.currentPage = 1;
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
