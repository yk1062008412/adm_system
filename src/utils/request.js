
import axios from 'axios';

// 携带cookie
axios.defaults.withCredentials = true;
// 创建axios实例
const service = axios.create({
    timeout: 30000,
    responseType: 'json',
    baseURL: 'http://localhost:3001/', // api 的 base_url
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
            // 此处有坑，下方记录
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
