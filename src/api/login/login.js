import request from '@/utils/request';

// 登录
export function loginSystem(params) {
    return request({
        url: 'login/loginSystem',
        method: 'post',
        data: params
    })
}
