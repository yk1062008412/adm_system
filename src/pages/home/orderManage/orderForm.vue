<!--
 * @Author: yk1062008412
 * @Date: 2020-01-07 21:25:07
 * @LastEditors  : yk1062008412
 * @LastEditTime : 2020-01-07 23:00:56
 * @Description: order form
 -->
<template>
  <div class="order-form-container">
    <el-form :model="formData" ref="formData" size="small" label-width="120px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="订单状态" prop="orderStatus">
            <el-select v-model="formData.orderStatus" placeholder="请选择订单状态" class="select-full">
              <el-option value="" label="全部" />
              <el-option :value="1" label="待付款" />
              <el-option :value="2" label="待发货" />
              <el-option :value="3" label="已发货" />
              <el-option :value="4" label="已完成" />
              <el-option :value="5" label="已取消" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="订单号" prop="orderNumber">
            <el-input v-model="formData.orderNumber" placeholder="请输入订单号" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="收货人" prop="receiveUserName">
            <el-input v-model="formData.receiveUserName" placeholder="请输入收货人" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="用户昵称" prop="nickname">
            <el-input v-model="formData.nickname" placeholder="请输入用户昵称" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="收货人手机号" prop="telPhone">
            <el-input v-model="formData.telPhone" placeholder="请输入收货人手机号" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="收货地址" prop="addressInfo">
            <el-input v-model="formData.addressInfo" placeholder="请输入收货地址" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="订单生成时间" prop="orderAddTime">
            <el-date-picker
              v-model="formData.orderAddTime"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd HH:mm:ss"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="付款时间" prop="orderPayTime">
            <el-date-picker
              v-model="formData.orderPayTime"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd HH:mm:ss"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="发货时间" prop="orderSendTime">
            <el-date-picker
              v-model="formData.orderSendTime"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd HH:mm:ss"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="订单完成时间" prop="orderCompleteTime">
            <el-date-picker
              v-model="formData.orderCompleteTime"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd HH:mm:ss"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="订单取消时间" prop="orderExitTime">
            <el-date-picker
              v-model="formData.orderExitTime"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd HH:mm:ss"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item>
            <el-button type="primary" size="small" @click="onSearch">查 询</el-button>
            <el-button @click="resetForm('formData')">重 置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'OrderForm',
  data() {
    return {
      formData: {
        orderStatus: '',
        orderNumber: '',
        receiveUserName: '',
        nickname: '',
        telPhone: '',
        addressInfo: '',
        orderAddTime: [],
        orderPayTime: [],
        orderSendTime: [],
        orderCompleteTime: [],
        orderExitTime: [],
        orderAddTimeStart: '',
        orderAddTimeEnd: '',
        orderPayTimeStart: '',
        orderPayTimeEnd: '',
        orderSendTimeStart: '',
        orderSendTimeEnd: '',
        orderCompleteTimeStart: '',
        orderCompleteTimeEnd: '',
        orderExitTimeStart: '',
        orderExitTimeEnd: ''
      }
    }
  },
  watch: {
    'formData.orderAddTime' (val) {
      Object.assign(this.formData, {orderAddTimeStart: val[0], orderAddTimeEnd: val[1]})
    },
    'formData.orderPayTime' (val) {
      Object.assign(this.formData, {orderPayTimeStart: val[0], orderPayTimeEnd: val[1]})
    },
    'formData.orderSendTime' (val) {
      Object.assign(this.formData, {orderSendTimeStart: val[0], orderSendTimeEnd: val[1]})
    },
    'formData.orderCompleteTime' (val) {
      Object.assign(this.formData, {orderCompleteTimeStart: val[0], orderCompleteTimeEnd: val[1]})
    },
    'formData.orderExitTime' (val) {
      Object.assign(this.formData, {orderExitTimeStart: val[0], orderExitTimeEnd: val[1]})
    }
  },
  methods: {
    onSearch () {
      const param = {
        ...this.formData
      }
      delete param.orderAddTime;
      delete param.orderPayTime;
      delete param.orderSendTime;
      delete param.orderCompleteTime;
      delete param.orderExitTime;
      console.log(param);
      console.log(this.formData);
      // this.$emit('handleSearch', this.formData)
    },
    resetForm (formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>
<style lang="less" scoped>
.button-group{
  margin-left: 20px;
}
.select-full{
  width: 100%;
}
</style>