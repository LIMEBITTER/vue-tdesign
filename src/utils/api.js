import request from './request.ts'

/**
 *  用户服务
 */
// 用户登录
export function userLogin(data) {
  return request({
    url:'api/user/login',
    method:'post',
    data
  })
}

// 用户注册
export function userRegister(data) {
  return request({
    url:'api/user/register',
    method:'post',
    data
  })
}

// 获取当前用户信息
export function getCurrentUserInfo() {
  return request({
    url:'api/user/userInfo',
    method:'get',
  })
}

// 退出登录,销毁redis
export function logOut() {
  return request({
    url:'api/user/loginOut',
    method:'get',
  })
}

/**
 *  会议服务
 */
// 查询所有会议信息
export function checkAllMeetingsInfo() {
  return request({
    url:'api/meetings',
    method:'GET',
  })
}

// 预定会议(申请会议)
export function applyMeeting(data) {
  return request({
    url:'api/meetings/apply',
    method:'post',
    data
  })
}

// 开始会议(预定与快速会议)
export function startMeetingDev(data) {
  return request({
    url:'api/meetings/start',
    method:'post',
    data
  })
}

// 结束会议(需要会议号)  ？？？？？
export function endMeetingDev(data) {
  return request({
    url:'api/meetings/end',
    method:'post',
    data
  })
}

// 查询当前会议信息 （根据mid）
export function sCurrentMeetingInfo(params) {
  return request({
    url:`api/meetings/${params}`,
    method:'get',
  })
}

// 查询所有会议信息
export function sAllMeetingsInfo() {
  return request({
    url:'api/meetings',
    method:'get',
  })
}

/**
 *  会议历史服务
 */
// 生成会议历史记录(结束会议)  ？？？？？？
export function recordMeetingInfo(data) {
  return request({
    url:'api/meetingRecord/endMeeting',
    method:'post',
    data
  })
}

// 查询会议历史记录
export function sMeetingsRecord() {
  return request({
    url:'api/meetingRecord',
    method:'get',

  })
}

/**
 *  签到记录服务
 */
// 产生签到记录（进入会议） ||只需 会议号 和 用户id  ？？？？？？
export function pSignRecord(data) {
  return request({
    url:'api/signRecord/add',
    method:'post',
    data
  })
}

// 离开会议 ||只需 会议号 和 用户id
export function leaveMeeting(data) {
  return request({
    url:'api/signRecord/leave',
    method:'post',
    data
  })
}

// 签到服务 ||只需 会议号 和 用户id  ？？？？？
export function signService(data) {
  return request({
    url:'api/signRecord/sign',
    method:'post',
    data
  })
}

// 补签服务 ||只需 会议号 和 用户id
export function retroactiveUser(data) {
  return request({
    url:'api/signRecord/retroactive',
    method:'post',
    data
  })
}

// 查询所有签到记录
export function sAllSignRecords() {
  return request({
    url:'api/signRecord',
    method:'get',
  })
}

// 根据会议号查询所有签到记录
export function sAllSignRecordsByMid(params) {
  return request({
    url:`api/signRecord/meeting/${params}`,
    method:'get',
    // params
  })
}

// 根据用户id查询所有签到记录
export function sAllSignRecordsByUid(params) {
  return request({
    url:'api/signRecord/user',
    method:'get',
    params
  })
}

// 根据用户id查询所有会议记录
export function sAllMeetingsByUid(params) {
  return request({
    url:'api/signRecord/meetings',
    method:'get',
    params
  })
}

/**
 *  文件传输接口
 */
// 实现刷新
export function refreshPage() {
  return request({
    url:'api/refresh',
    method:'get',
  })
}

// 单文件上传
export function uploadFileOne(data) {
  return request({
    url:'api/uploadFile',
    method:'post',
    headers:{'Content-Type':'multipart/form-data'},
    data
  })
}

// 人脸检测
export function faceCheck(data) {
  return request({
    url:'api/faceCheck',
    method:'post',
    headers:{'Content-Type':'multipart/form-data'},
    data
  })
}

// 多文件上传
export function uploadFileMany(data) {
  return request({
    url:'api/uploadFiles',
    method:'post',
    headers:{'Content-Type':'multipart/form-data'},
    data
  })
}

// 单文件上传 test
export function uploadFileTest(data) {
  return request({
    url:'api/uploadFileT',
    method:'post',
    headers:{'Content-Type':'multipart/form-data'},
    data
  })
}

// 人脸检测 test
export function faceCheckTest(data) {
  return request({
    url:'api/faceCheckT',
    method:'post',
    headers:{'Content-Type':'multipart/form-data'},
    data
  })
}