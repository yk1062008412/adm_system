/*
 * @Author: yk1062008412
 * @Date: 2019-11-27 22:46:10
 * @LastEditors: yk1062008412
 * @LastEditTime: 2019-12-05 23:35:33
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

