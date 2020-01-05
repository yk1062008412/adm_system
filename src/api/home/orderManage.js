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

// 修改订单信息
export function orderUpdate(params) {
  return request({
    url: 'order/orderUpdate',
    method: 'post',
    data: params
  })
}