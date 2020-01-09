<!--
 * @Author: ljy-code
 * @Date: 2019-12-11 10:48:57
 * @LastEditors  : carkang.yang@qunar.com
 * @LastEditTime : 2020-01-09 17:58:22
 * @Description: 订单列表Table
-->

<template>
  <el-table :data="list" stripe style="width: 100%" size="small" empty-text="暂无数据" border>
    <el-table-column type="index" width="50" />
    <el-table-column prop="order_number" label="订单号" />
    <el-table-column label="商品信息" width="300">
      <template slot-scope="scope">
        <div v-for="item in scope.row.orderDetail" :key="item.goods_id" class="order-table-good-info">
          <img class="order-table-good-pic" :src="item.goods_img_url" alt />
          <div class="order-table-good-detail">
            <span>商品ID：{{item.goods_id}}</span>
            <span>商品名：{{item.goods_name}}</span>
            <span>商品成交单价：{{item.last_price}}</span>
            <span>商品数量：{{item.goods_num}}</span>
          </div>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="订单状态" width="70">
      <template slot-scope="scope">
        <span>{{ getOrderStatus(scope.row.order_status) }}</span>
      </template>
    </el-table-column>
    <el-table-column label="用户信息" width="180">
      <template slot-scope="scope">
        <div>
          <p>收货人：{{scope.row.receive_user_name}}</p>
          <p>联系电话：{{scope.row.tel_phone}}</p>
          <p>收货时间：{{scope.row.book_time || '无'}}</p>
          <p>收货地址：{{scope.row.address_info}}</p>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="订单金额" prop="goods_amount" />
    <el-table-column label="成交金额" prop="order_amount" />
    <el-table-column label="用户留言" :show-overflow-tooltip="true" width="100">
      <template slot-scope="scope">
        <p class="user_leave_message">{{scope.row.leave_message}}</p>
      </template>
    </el-table-column>
    <el-table-column label="下单时间" width="150">
      <template slot-scope="scope">
        <span>{{ formatData(scope.row.order_add_time) }}</span>
      </template>
    </el-table-column>
    <el-table-column label="最后操作时间" width="150">
      <template slot-scope="scope">
        <span>{{ formatData(scope.row.last_edit_time) }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="140px" fixed="right">
      <template slot-scope="scope">
        <el-tooltip v-if="scope.row.order_status === 1" content="修改订单价格" placement="top">
          <el-button type="primary" icon="el-icon-money" circle size="mini" @click="changePrice(scope.row.order_id, scope.row.order_amount)"/>
        </el-tooltip>
        <el-tooltip v-if="scope.row.order_status === 2" content="去发货" placement="top">
          <el-button type="success" icon="el-icon-s-promotion" circle size="mini" @click="sendOrder(scope.row.order_id)"/>
        </el-tooltip>
        <el-tooltip v-if="scope.row.order_status === 3" content="完成订单" placement="top">
          <el-button type="warning" icon="el-icon-s-promotion" circle size="mini" @click="successOrder(scope.row.order_id)"/>
        </el-tooltip>
        <el-tooltip v-if="scope.row.order_status === 1 || scope.row.order_status === 2" content="取消订单" placement="top">
          <el-button type="danger" icon="el-icon-close" circle size="mini" @click="cancelOrder(scope.row.order_id)"/>
        </el-tooltip>
        <el-tag v-if="scope.row.order_status === 4" type="success" effect="plain">已完成</el-tag>
        <el-tag v-if="scope.row.order_status === 5" type="danger" effect="plain">已取消</el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { ORDER_STATUS_MAP } from "@/utils/constants";
import { orderStatusUpdate, orderAmountUpdate } from "@/api/home/orderManage";
export default {
  name: "OrderTable",
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
    formatData(timestamp) {
      // 格式化日期
      return this.$moment(timestamp).format("YYYY-MM-DD HH:mm:ss");
    },
    cancelOrder(orderId) { // 取消订单
      this.$confirm('确定要取消订单吗？若取消，请线下联系客户退款！', '订单取消', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.operateOrder(orderId, 5)
      });
    },
    sendOrder(orderId) { // 去发货
      this.$confirm('确定要发货吗？', '订单发货', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.operateOrder(orderId, 3)
      });
    },
    successOrder(orderId) { // 完成订单
      this.$confirm('确定完成订单了吗？', '订单完成', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.operateOrder(orderId, 4)
      });
    },
    changePrice(orderId, orderAmount) { // 修改价格
      console.log(orderId, orderAmount)
      this.$prompt(`请输入金额（原价为: ${orderAmount}）`, '修改金额', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/,
        inputErrorMessage: '金额格式不对'
      }).then(data => {
        const param = {
          orderId: orderId,
          orderAmount: data.value
        }
        orderAmountUpdate(param).then(res => {
          if(res.code === 0){
            this.$message({
              message: '订单金额成功！',
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
    operateOrder(orderId, status) { // 编辑状态 1待付款2待发货3已发货4已完成5已回退
      const params = {
        orderId: orderId,
        orderStatus: status
      }
      orderStatusUpdate(params).then(res => {
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
    }
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