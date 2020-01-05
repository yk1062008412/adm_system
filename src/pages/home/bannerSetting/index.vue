<!--
 * @Author: yk1062008412
 * @Date: 2020-01-05 12:39:32
 * @LastEditors  : yk1062008412
 * @LastEditTime : 2020-01-05 15:54:58
 * @Description: banner设置
 -->
<template>
  <div>
    <el-row class="banner-insert">
      <el-button
        type="primary"
        icon="el-icon-circle-plus-outline"
        size="small"
        @click="openInsertDialog"
      >新增banner</el-button>
    </el-row>
    <banner-table
      :list="tableData"
      @handleEdit="handleEdit"
      @handleReFetch="handleReFetch"
    />
    <el-dialog :title=" dialogType === 'add' ? '新增banner' : '编辑banner'" :visible.sync="dialogVisible" width="450px">
      <banner-dialog
        v-if="dialogVisible"
        :dialog-type="dialogType"
        :banner-id="editBannerId"
        @handleClose="handleClose"
        @handleReFetch="handleReFetch"
        @handleSuccess='onSuccess'
      />
    </el-dialog>
  </div>
</template>

<script>
import bannerTable from './bannerTable';
import bannerDialog from './bannerDialog';
import { getBannerList } from '@/api/home/bannerSetting';
export default {
  name: 'bannerSetting',
  components: {
    bannerTable,
    bannerDialog
  },
  data() {
    return {
      dialogVisible: false,
      dialogType: 'add', // add新增 edit编辑
      editBannerId: null, // 编辑的bannerid
      tableData: []
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
    openInsertDialog () { // 打开新增弹窗
      this.dialogVisible = true;
      this.dialogType = 'add';
      this.editBannerId = null;
    },
    handleEdit (bannerId) { // 编辑banner
      this.dialogVisible = true;
      this.dialogType = 'edit';
      this.editBannerId = bannerId;
    },
    handleReFetch () { // 重新获取数据
      this.dialogVisible = false;
      this.fetchData();
    },
    fetchData () { // 获取数据列表
      getBannerList().then(({ data }) => {
        this.tableData = data || [];
      })
    },
    handleClose () { // 取消编辑或新增
      this.dialogVisible = false;
      this.editBannerId = null;
    },
    onSuccess(){ // 操作成功，关闭弹框
      this.fetchData();
      this.dialogVisible = false;
    }
  }
}
</script>
<style lang="less" scoped>
  .banner-insert{
    margin-bottom: 10px;
  }
</style>
