<!--
 * @Author: yk1062008412
 * @Date: 2019-12-04 22:35:31
 * @LastEditors  : yk1062008412
 * @LastEditTime : 2020-01-05 14:41:39
 * @Description: store Table 表格
 -->
<template>
  <div>
    <el-table :data="list" stripe style="width: 100%" size="small" empty-text="暂无数据">
      <el-table-column type="index" width="50" />
      <el-table-column prop="goods_id" label="商品ID" />
      <el-table-column prop="goods_name" label="商品名称" />
      <el-table-column prop="category_name" label="商品图片">
        <template slot-scope="scope">
          <el-image style="width:80px;height:80px" :src="scope.row.goods_img_url" fit="contain" />
        </template>
      </el-table-column>
      <el-table-column prop="category_name" label="分类" />
      <el-table-column prop="goods_status" label="状态">
        <template slot-scope="scope">
          <span v-if="scope.row.goods_status === 0">
            <el-tag type="warning" size="mini">下架</el-tag>
          </span>
          <span v-if="scope.row.goods_status === 1">
            <el-tag type="success" size="mini">上架</el-tag>
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="stock" label="库存" />
      <el-table-column prop="goods_index" label="排序权重"/>
      <el-table-column prop="address" label="操作" width="140px">
        <template slot-scope="scope">
          <el-tooltip content="编辑" placement="top">
            <el-button type="primary" icon="el-icon-edit" circle size="mini" @click="editStore(scope.row.goods_id)" />
          </el-tooltip>
          <el-tooltip content="删除" placement="top">
            <el-button type="danger" icon="el-icon-delete" circle size="mini" @click="deleteStore(scope.row.goods_id)" />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { delStoreItem } from "@/api/home/storeInfo";
export default {
  props: {
    list: {
      type: Array,
      required: true
    }
  },
  methods: {
    editStore(goodsId) { // 编辑商品
      this.$emit('handleEdit', goodsId);
    },
    deleteStore(goodsId) { // 删除商品
      this.$confirm('此操作将永久删除商品，确定要删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const params = {
          goodsId
        }
        delStoreItem(params).then(({ code }) => {
          if(code === 0){
            this.$message({
              message: '删除完成！',
              type: 'success'
            });
            this.$emit('handleDelete')
          }
        })
      }).catch();
    }
  }
}
</script>