<template>
  <el-table :data="list" stripe style="width: 100%" size="small" empty-text="暂无数据">
    <el-table-column type="index" width="50" />
    <el-table-column prop="banner_id" label="banner图ID" />
    <el-table-column prop="banner_img_url" label="banner图" width="200">
      <template slot-scope="scope">
        <el-image style="width:188px;height:75px" :src="scope.row.banner_img_url" fit="contain" />
      </template>
    </el-table-column>
    <el-table-column prop="banner_status" label="状态">
      <template slot-scope="scope">
        <span v-if="scope.row.banner_status === 0">
          <el-tag type="warning" size="mini">下线</el-tag>
        </span>
        <span v-if="scope.row.banner_status === 1">
          <el-tag type="success" size="mini">上线</el-tag>
        </span>
      </template>
    </el-table-column>
    <el-table-column prop="banner_index" label="排序" />
    <el-table-column label="添加时间" width="150">
      <template slot-scope="scope">
        <span>{{ formatData(scope.row.add_time) }}</span>
      </template>
    </el-table-column>
    <el-table-column label="最近更新时间" width="150">
      <template slot-scope="scope">
        <span>{{ formatData(scope.row.update_time) }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="comments" label="备注" :show-overflow-tooltip="true"/>
    <el-table-column prop="address" label="操作" width="140px">
      <template slot-scope="scope">
        <el-tooltip content="编辑" placement="top">
          <el-button type="primary" icon="el-icon-edit" circle size="mini" @click="editBanner(scope.row.banner_id)" />
        </el-tooltip>
        <el-tooltip v-if="scope.row.banner_status === 0" content="上线" placement="top">
          <el-button type="success" icon="el-icon-upload2" circle size="mini" @click="bannerUp(scope.row.banner_id)" />
        </el-tooltip>
        <el-tooltip v-if="scope.row.banner_status === 1" content="下线" placement="top">
          <el-button type="warning" icon="el-icon-download" circle size="mini" @click="bannerOff(scope.row.banner_id)" />
        </el-tooltip>
        <el-tooltip content="删除" placement="top">
          <el-button type="danger" icon="el-icon-delete" circle size="mini" @click="deleteBanner(scope.row.banner_id)" />
        </el-tooltip>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { bannerUpOff, bannerDelete } from "@/api/home/bannerSetting";
export default {
  props: {
    list: {
      type: Array,
      required: true
    }
  },
  methods: {
    editBanner (bannerId){ // 编辑banner
      this.$emit('handleEdit', bannerId);
    },
    bannerUp (bannerId) { // 上线banner
      this.$confirm('确定要上线吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const params = {
          bannerId,
          bannerStatus: 1
        }
        bannerUpOff(params).then(({ code }) => {
          if(code === 0){
            this.$message({
              message: '上线成功！',
              type: 'success'
            });
            this.$emit('handleReFetch')
          }
        })
      });
    },
    bannerOff (bannerId) { // 下线banner
      this.$confirm('确定要下线吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const params = {
          bannerId,
          bannerStatus: 0
        }
        bannerUpOff(params).then(({ code }) => {
          if(code === 0){
            this.$message({
              message: '下线成功！',
              type: 'success'
            });
            this.$emit('handleReFetch')
          }
        })
      });
    },
    deleteBanner (bannerId) { // 删除banner
      this.$confirm('此操作将永久删除，不可恢复！！！确定要删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const params = {
          bannerId
        }
        bannerDelete(params).then(({ code }) => {
          if(code === 0){
            this.$message({
              message: '删除完成！',
              type: 'success'
            });
            this.$emit('handleReFetch')
          }
        })
      }).catch();
    },
    formatData(timestamp){ // 格式化日期
      return this.$moment(timestamp).format('YYYY-MM-DD HH:mm:ss');
    }
  }
}
</script>