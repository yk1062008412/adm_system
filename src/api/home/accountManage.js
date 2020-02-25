import request from '@/utils/request';

// 管理员列表
export function getAccountList(params) {
  return request({
    url: 'admAccount/getAdmAccountList',
    method: 'post',
    data: params
  })
}

// 创建管理员
export function admAccountAdd(params) {
  return request({
    url: 'admAccount/admAccountAdd',
    method: 'post',
    data: params
  })
}

// 更新管理员信息
export function admAccountUpdate(params) {
  return request({
    url: 'admAccount/admAccountUpdate',
    method: 'post',
    data: params
  })
}

// 设置管理员为超级管理员
export function admAccountSuper(params) {
  return request({
    url: 'admAccount/admAccountSuper',
    method: 'post',
    data: params
  })
}

// 删除管理员
export function admAccountDelete(params) {
  return request({
    url: 'admAccount/admAccountDelete',
    method: 'post',
    data: params
  })
}

// 重置管理员密码
export function admAccountResetPwd(params) {
  return request({
    url: 'admAccount/admAccountResetPwd',
    method: 'post',
    data: params
  })
}

// 管理员详情
export function getAdmAccountDetail(params) {
  return request({
    url: 'admAccount/getAdmAccountDetail',
    method: 'post',
    data: params
  })
}