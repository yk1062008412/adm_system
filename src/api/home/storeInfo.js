/*
 * @Author: yk1062008412
 * @Date: 2019-11-27 22:46:10
 * @LastEditors: yk1062008412
 * @LastEditTime: 2019-12-10 15:52:02
 * @Description: storeInfo商品信息接口
 */
import request from '@/utils/request';

// 查询商品列表
export function getStoreList(params) {
  return request({
    url: 'goods/getGoodsList',
    method: 'post',
    data: params
  })
}

// 新增商品
export function addStoreItem(params) {
  return request({
    url: 'goods/goodsAdd',
    method: 'post',
    data: params
  })
}

// 删除商品
export function delStoreItem(params) {
  return request({
    url: 'goods/goodsDelete',
    method: 'post',
    data: params
  })
}

// 获取商品详情
export function getGoodsDetail(params) {
  return request({
    url: 'goods/getGoodsDetail',
    method: 'post',
    data: params
  })
}

// 修改商品信息
export function goodsUpdate(params) {
  return request({
    url: 'goods/goodsUpdate',
    method: 'post',
    data: params
  })
}