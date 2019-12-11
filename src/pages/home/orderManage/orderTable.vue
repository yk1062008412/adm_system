<!--
 * @Author: ljy-code
 * @Date: 2019-12-11 10:48:57
 * @LastEditors: ljy-code
 * @LastEditTime: 2019-12-11 15:23:28
 * @Description: 订单列表Table
-->

<template>
  <el-table :data="list" stripe style="width: 100%" size="small" empty-text="暂无数据">
    <el-table-column type="index" width="50" />
    <el-table-column prop="order_number" label="订单号" />
    <el-table-column label="商品信息">
      <template slot-scope="scope">
        <div class="order-table-good-info">
          <img class="order-table-good-pic" :src="scope.row.goods_img_url" alt="">
          <div class="order-table-good-detail">
            <span>{{scope.row.goods_name}}</span>
            <span>商品金额：{{scope.row.goods_amount}}</span>
            <span>成交金额：{{scope.row.order_amount}}</span>
            <span>付款方式：{{getOrderPayMode(scope.row.pay_mode)}}</span>
          </div>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="用户信息">
      <template slot-scope="scope">
        <div>
          <p>{{scope.row.nickname}}</p>
          <p>{{scope.row.address_info}}</p>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="下单时间" width="150">
      <template slot-scope="scope">
        <span>{{ formatData(scope.row.order_add_time) }}</span>
      </template>
    </el-table-column>
    <el-table-column label="订单状态" width="150">
      <template slot-scope="scope">
        <span>{{ getOrderStatus(scope.row.order_status) }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="leave_message" label="留言" :show-overflow-tooltip="true"/>
    <el-table-column label="操作" width="140px">
      <template slot-scope="scope">
        <el-tooltip content="编辑" placement="top">
          <el-button type="primary" icon="el-icon-edit" circle size="mini" @click="editOrder(scope.row.order_id)" />
        </el-tooltip>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { ORDER_STATUS_MAP, ORDER_PAY_MODE_MAP } from '@/utils/constants';

export default {
  name: 'OrderTable',
  props: {
    list: {
      type: Array,
      required: true
    }
  },
  methods: {
    getOrderStatus(status) {
      return ORDER_STATUS_MAP[status];
    },
    getOrderPayMode(payMode) {
      return ORDER_PAY_MODE_MAP[payMode];
    },
    formatData(timestamp){ // 格式化日期
      return this.$moment(timestamp).format('YYYY-MM-DD HH:mm:ss');
    },
    editOrder(orderId){ // 编辑分类
      this.$emit('handleEdit', orderId);
    }
  },
};
</script>
<style lang="less">
.order-table-good-info {
  .order-table-good-pic {
    width: 121px;
    height: 75px;
  }
  .order-table-good-detail {
    display: flex;
    flex-direction: column;
  }
}
</style>