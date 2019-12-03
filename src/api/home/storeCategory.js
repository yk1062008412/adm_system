/*
 * @Author: yk1062008412
 * @Date: 2019-11-27 22:46:10
 * @LastEditors: yk1062008412
 * @LastEditTime: 2019-12-03 23:13:25
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

// 查询分类详情
export function getCategoryInfo(categoryId) {
    return request({
        url: 'category/getCategoryDetail',
        method: 'post',
        data: { categoryId: categoryId }
    })
}

// 修改分类信息
export function editCategoryInfo(params) {
    return request({
        url: 'category/categoryUpdate',
        method: 'post',
        data: params
    })
}
