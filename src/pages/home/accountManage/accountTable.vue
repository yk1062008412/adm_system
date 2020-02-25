<!--
 * @Author: ljy-code
 * @Date: 2020-01-13 16:37:57
 * @LastEditors  : ljy-code@gmail.com
 * @LastEditTime : 2020-01-16 17:58:22
 * @Description: 用户管理Table
-->

<template>
  <el-table :data="list" stripe style="width: 100%" size="small" empty-text="暂无数据" border>
    <el-table-column type="index" width="50" />
    <el-table-column prop="adm_account" label="账号" />
    <el-table-column prop="adm_name" label="姓名" />
    <el-table-column prop="adm_phone" label="手机号" />
    <el-table-column prop="adm_comments" label="备注" />
    <el-table-column prop="super_adm" label="类型">
      <template slot-scope="scope">
        <span>{{ scope.row.super_adm === 1 ? '超级管理员' : '管理员' }}</span>
      </template>
    </el-table-column>
    <el-table-column label="添加时间" width="150">
      <template slot-scope="scope">
        <span>{{ formatData(scope.row.add_time) }}</span>
      </template>
    </el-table-column>
    <el-table-column label="最后操作时间" width="150">
      <template slot-scope="scope">
        <span>{{ formatData(scope.row.update_time) }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="last_operate_account" label="最后操作人" />
    <el-table-column label="操作" width="180px" fixed="right">
      <template slot-scope="scope">
        <el-tooltip content="编辑" placement="top">
          <el-button type="primary" icon="el-icon-edit" circle size="mini" @click="updateAccount(scope.row.id)"/>
        </el-tooltip>
        <el-tooltip v-if="scope.row.super_adm === 0" content="设为超级管理员" placement="top">
          <el-button type="warning" icon="el-icon-user-solid" circle size="mini" @click="setSuper(scope.row.id, 1)"/>
        </el-tooltip>
        <el-tooltip v-else content="取消超级管理员" placement="top">
          <el-button type="danger" icon="el-icon-user-solid" circle size="mini" @click="setSuper(scope.row.id, 0)"/>
        </el-tooltip>
        <el-tooltip content="删除" placement="top">
          <el-button type="danger" icon="el-icon-delete" circle size="mini" @click="deleteAdm(scope.row.id)"/>
        </el-tooltip>
        <el-tooltip content="重置密码" placement="top">
          <el-button type="primary" icon="el-icon-refresh" circle size="mini" @click="resetPwd(scope.row.id)"/>
        </el-tooltip>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { admAccountSuper, admAccountDelete, admAccountResetPwd } from "@/api/home/accountManage";
export default {
  name: "account-table",
  props: {
    list: {
      type: Array,
      required: true
    }
  },
  methods: {
    updateAccount(admId){ // 编辑分类
      this.$emit('handleEdit', admId);
    },
    setSuper(id, superAdm) {
      let tooltip = '';
      if (superAdm) {
        tooltip = '确定要设置为超级管理员吗？';
      } else {
        tooltip = '确定要取消超级管理员权限吗？';
      }
      this.$confirm(tooltip, '管理员权限变更', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        admAccountSuper({ id, superAdm }).then(res => {
          if(res.code === 0){
            this.$message({
              message: '操作成功！',
              type: 'success'
            });
            this.$emit('handleRefetch');
          }else{
            this.$notify({
              title: '提示',
              message: res.des,
              duration: 0
            });
          }
        })
      });
    },

    deleteAdm(id) {
      this.$confirm('确定删除该管理员账号？', '删除管理员', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        admAccountDelete({id}).then(res => {
          if(res.code === 0){
            this.$message({
              message: '删除成功！',
              type: 'success'
            });
            this.$emit('handleRefetch');
          }else{
            this.$notify({
              title: '提示',
              message: res.des,
              duration: 0
            });
          }
        })
      })
    },
    resetPwd(id) {
      this.$confirm('确定重置该管理员账号密码？', '重置密码', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        admAccountResetPwd({id}).then(res => {
          if(res.code === 0){
            this.$message({
              message: '重置成功！',
              type: 'success'
            });
            this.$emit('handleRefetch');
          }else{
            this.$notify({
              title: '提示',
              message: res.des,
              duration: 0
            });
          }
        })
      })
    },

    formatData(timestamp) {
      // 格式化日期
      return this.$moment(timestamp).format("YYYY-MM-DD HH:mm:ss");
    },
  }
};
</script>
<style lang="less">
.order-table-good-info {
  display: flex;
  &:not(:last-of-type) {
    border-bottom: 1px dashed #ccc;
    margin-bottom: 10px;
  }
  .order-table-good-pic {
    width: 121px;
    height: 75px;
    margin-right: 20px;
  }
  .order-table-good-detail {
    display: flex;
    flex-direction: column;
  }
}
.user_leave_message{
  white-space: normal;
}
</style>