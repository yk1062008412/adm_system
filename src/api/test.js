import request from '@/utils/request';

// 登录
export function testReq(params) {
    return request({
        url: 'test/getMyTestChracter',
        method: 'post',
        data: params
    })
}