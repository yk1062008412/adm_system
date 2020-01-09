import request from '@/utils/request';

// 订单列表
export function getOrderList(params) {
  return request({
    url: 'order/getOrderList',
    method: 'post',
    data: params
  })
}

// 订单详情
export function getOrderDetail(params) {
  return request({
    url: 'order/getOrderDetail',
    method: 'post',
    data: params
  })
}

// 修改订单信息-订单状态
export function orderStatusUpdate(params) {
  return request({
    url: 'order/orderStatusUpdate',
    method: 'post',
    data: params
  })
}

// 修改订单信息-订单金额
export function orderAmountUpdate(params) {
  return request({
    url: 'order/orderAmountUpdate',
    method: 'post',
    data: params
  })
}