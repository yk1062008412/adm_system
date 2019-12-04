<!--
 * @Author: yk1062008412
 * @Date: 2019-12-02 22:23:33
 * @LastEditors: yk1062008412
 * @LastEditTime: 2019-12-04 23:06:10
 * @Description: 类目Table列表
 -->

 <template>
  <el-table :data="list" stripe style="width: 100%" size="small" empty-text="暂无数据">
    <el-table-column type="index" width="50" />
    <el-table-column prop="category_id" label="分类ID" />
    <el-table-column prop="category_name" label="分类名称" />
    <el-table-column prop="category_status" label="状态">
      <template slot-scope="scope">
        <span v-if="scope.row.category_status === 0">
          <el-tag type="warning" size="mini">下架</el-tag>
        </span>
        <span v-if="scope.row.category_status === 1">
          <el-tag type="success" size="mini">上架</el-tag>
        </span>
      </template>
    </el-table-column>
    <el-table-column prop="category_index" label="排序" />
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
          <el-button type="primary" icon="el-icon-edit" circle size="mini" @click="editCategory(scope.row.category_id)" />
        </el-tooltip>
        <el-tooltip v-if="scope.row.category_status === 0" content="上架" placement="top">
          <el-button type="success" icon="el-icon-upload2" circle size="mini" @click="categoryUp(scope.row.category_id)" />
        </el-tooltip>
        <el-tooltip v-if="scope.row.category_status === 1" content="下架" placement="top">
          <el-button type="warning" icon="el-icon-download" circle size="mini" @click="categoryOff(scope.row.category_id)" />
        </el-tooltip>
        <el-tooltip content="删除" placement="top">
          <el-button type="danger" icon="el-icon-delete" circle size="mini" @click="deleteCategory(scope.row.category_id)" />
        </el-tooltip>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { categoryUpOff, categoryDelete } from "@/api/home/storeCategory";
export default {
  props: {
    list: {
      type: Array,
      required: true
    }
  },
  methods: {
    formatData(timestamp){ // 格式化日期
      return this.$moment(timestamp).format('YYYY-MM-DD HH:mm:ss');
    },
    editCategory(categoryId){ // 编辑分类
      this.$emit('handleEdit', categoryId);
    },
    categoryUp(categoryId){ // 上架类目
      this.$confirm('确定要上架吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const params = {
          categoryId,
          categoryStatus: 1
        }
        categoryUpOff(params).then(({ code }) => {
          if(code === 0){
            this.$message({
              message: '上架成功！',
              type: 'success'
            });
            this.$emit('handleReFetch')
          }
        })
      });
    },
    categoryOff(categoryId){ // 下架类目
      this.$confirm('确定要下架吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const params = {
          categoryId,
          categoryStatus: 0
        }
        categoryUpOff(params).then(({ code }) => {
          if(code === 0){
            this.$message({
              message: '下架成功！',
              type: 'success'
            });
            this.$emit('handleReFetch')
          }
        })
      });
    },
    deleteCategory(categoryId){ // 删除类目
      this.$confirm('此操作将永久删除，不可恢复！！！确定要删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const params = {
          categoryId
        }
        categoryDelete(params).then(({ code }) => {
          if(code === 0){
            this.$message({
              message: '删除完成！',
              type: 'success'
            });
            this.$emit('handleReFetch')
          }
        })
      }).catch();
    }
  },
};
</script>
