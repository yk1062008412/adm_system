<!--
 * @Author: yk1062008412
 * @Date: 2019-12-02 22:23:33
 * @LastEditors: yk1062008412
 * @LastEditTime: 2019-12-03 22:40:03
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
        <el-button type="primary" icon="el-icon-edit" circle size="mini" @click="editCategory(scope.row.category_id)" />
        <el-button v-if="scope.row.category_status === 0" type="success" icon="el-icon-upload2" circle size="mini" />
        <el-button v-if="scope.row.category_status === 1" type="warning" icon="el-icon-download" circle size="mini" />
        <el-button type="danger" icon="el-icon-delete" circle size="mini" />
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
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
    }
  },
};
</script>
