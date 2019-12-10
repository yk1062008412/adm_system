/*
 * @Author: yk1062008412
 * @Date: 2019-11-03 02:09:44
 * @LastEditors: yk1062008412
 * @LastEditTime: 2019-12-10 13:17:20
 * @Description: 封装axios
 */

import axios from 'axios';
import { REQUESTURL } from '@/config/config.js';

// 携带cookie
axios.defaults.withCredentials = true;
// 创建axios实例
const service = axios.create({
    timeout: 30000,
    responseType: 'json',
    baseURL: REQUESTURL, // api 的 base_url
    withCredentials: true, // 是否允许带cookie
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8', // 接口需要 urlencoded 不能使json格式,
    }
});

service.defaults.transformRequest = [function (data) {
    let ret = '';
    for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
    }
    return ret;
}];

// request拦截器
service.interceptors.request.use(
    config => {
        const token = localStorage.getItem('_token_');
        if (token) {
            // token赋值，带到后端
            config.headers['Authorization'] =`Bearer ${token}`;
        }
        return config;
    },
    error => {
        Promise.reject(error);
    }
);

service.interceptors.response.use(
    response => {
        const data = response.data;
        // eslint-disable-next-line no-extra-boolean-cast
        if (!!data) {
            return data; //  返回处理结果
        }
        return Promise.reject({message: 'response error', response: response}); 
    },
    error => {
        location.href = '/login';
        return Promise.reject(error);
    }
);

export default service;
