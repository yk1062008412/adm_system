/*
 * @Author: yk1062008412
 * @Date: 2019-11-27 22:46:10
 * @LastEditors: yk1062008412
 * @LastEditTime: 2019-12-02 23:16:01
 * @Description: storeCategory商品分类接口
 */
import request from '@/utils/request';

// 获取当前分类信息
export function getCategoryList() {
    return request({
        url: 'category/getCategoryList',
        method: 'post',
        data: {}
    })
}

// 新增分类
export function insertCategory(params) {
    return request({
        url: 'category/categoryAdd',
        method: 'post',
        data: params
    })
}
