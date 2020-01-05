/*
 * @Author: yk1062008412
 * @Date: 2020-01-05 13:52:11
 * @LastEditors  : yk1062008412
 * @LastEditTime : 2020-01-05 15:26:07
 * @Description: banner设置接口
 */
import request from '@/utils/request';

// 获取banner列表
export function getBannerList(params) {
  return request({
    url: 'banner/getBannerList',
    method: 'post',
    data: params
  })
}

// banner上下架
export function bannerUpOff(params) {
  return request({
    url: 'banner/bannerPopUp',
    method: 'post',
    data: params
  })
}

// 删除banner
export function bannerDelete(params) {
  return request({
    url: 'banner/bannerDelete',
    method: 'post',
    data: params
  })
}

// 新增banner
export function addBannerItem(params) {
  return request({
    url: 'banner/bannerAdd',
    method: 'post',
    data: params
  })
}

// 更新banner
export function updateBannerItem(params) {
  return request({
    url: 'banner/bannerUpdate',
    method: 'post',
    data: params
  })
}

// 获取banner详情
export function getBannerInfo(params) {
  return request({
    url: 'banner/getBannerInfo',
    method: 'post',
    data: params
  })
}