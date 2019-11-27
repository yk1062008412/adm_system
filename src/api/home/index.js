/*
 * @Author: yk1062008412
 * @Date: 2019-11-27 22:46:10
 * @LastEditors: yk1062008412
 * @LastEditTime: 2019-11-27 22:58:30
 * @Description: home首页接口API
 */
import request from '@/utils/request';

// 获取当前管理员信息
export function getAdmInfo() {
    return request({
        url: 'login/getMyInfo',
        method: 'post',
        data: {}
    })
}