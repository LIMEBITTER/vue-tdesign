import request from './request.ts'
import axios from "axios";

/**
 *  用户服务
 */
// 用户登录
export function userLogin(data) {
  return request({
    url:'/user/login',
    method:'post',
    data
  })
}

// 用户注册
export function userRegister(data) {
  return request({
    url:'/user/register',
    method:'post',
    data
  })
}

// 获取当前用户信息
export function getCurrentUserInfo() {
  return request({
    url:'/user/userInfo',
    method:'get',
  })
}

// 退出登录,销毁redis
export function logOut() {
  return request({
    url:'/user/loginOut',
    method:'get',
  })
}

/**
 *  会议服务
 */
// 根据uid查询所有该用户创建的会议信息
export function sAllMeetingsInfoByUid(data) {
  // console.log('datadddddddd',data)
  const pageData = {current:data.current,size:data.size,id:data.mid,status:data.status,name:data.mname}
  const {uid} = data
  console.log(pageData,uid)
  return request({
    url:`/meetings/host/${uid}`,
    method:'post',
    data:pageData

  })
}



// 预定会议(申请会议)
export function applyMeeting(data) {
  return request({
    url:'/meetings/apply',
    method:'post',
    data
  })
}

// 开始会议(预定与快速会议)
export function startMeetingDev(data) {
  return request({
    url:'/meetings/start',
    method:'post',
    data
  })
}

// 结束会议(需要会议号)  ？？？？？
export function endMeetingDev(data) {
  return request({
    url:'/meetings/end',
    method:'post',
    data
  })
}

// 查询当前会议信息 （根据mid）
export function sCurrentMeetingInfo(params) {
  return request({
    url:`/meetings/${params}`,
    method:'get',
  })
}

// 查询所有会议信息
export function sAllMeetingsInfo() {
  return request({
    url:'/meetings',
    method:'get',
  })
}

/**
 *  会议历史服务
 */
// 生成会议历史记录(结束会议)  ？？？？？？
export function recordMeetingInfo(data) {
  return request({
    url:'/meetingRecord/endMeeting',
    method:'post',
    data
  })
}

// 查询会议历史记录
export function sMeetingsRecord(params) {
  return request({
    url:'/meetingRecord',
    method:'get',
    data:params

  })
}

/**
 *  签到记录服务
 */
// 产生签到记录（进入会议） ||只需 会议号 和 用户id  ？？？？？？
export function pSignRecord(data) {
  return request({
    url:'/signRecord/add',
    method:'post',
    data
  })
}

// 离开会议 ||只需 会议号 和 用户id
export function leaveMeeting(data) {
  return request({
    url:'/signRecord/leave',
    method:'post',
    data
  })
}

// 签到服务 ||只需 会议号 和 用户id  ？？？？？
export function signService(data) {
  return request({
    url:'/signRecord/sign',
    method:'post',
    data
  })
}

// 补签服务 ||只需 会议号 和 用户id
export function retroactiveUser(data) {
  return request({
    url:'/signRecord/retroactive',
    method:'post',
    data
  })
}

// 查询所有签到记录
export function sAllSignRecords() {
  return request({
    url:'/signRecord',
    method:'get',
  })
}

// 根据会议号查询所有签到记录
export function sAllSignRecordsByMid(data) {
  const {mid} = data
  const pageData = {current:data.current,size:data.size,name:data.name,isSign:data.status}
  console.log(mid,pageData)
  return request({
    url:`/signRecord/meeting/${mid}`,
    method:'post',
    data:pageData
  })
}

// 根据用户id查询所有签到记录
export function sAllSignRecordsByUid(params) {
  return request({
    url:'/signRecord/user',
    method:'get',
    params
  })
}

// 根据用户id查询所有会议记录
export function sAllMeetingsByUid(params) {
  return request({
    url:'/signRecord/meetings',
    method:'get',
    params
  })
}
// 根据uid mid 查询单条签到记录
export function sOneMeetingByUMid(data) {
  return request({
    url:'/signRecord/getOne',
    method:'post',
    data
  })
}

/**
 *  文件传输接口
 */
// 实现刷新
export function refreshPage() {
  return request({
    url:'/refresh',
    method:'get',
  })
}

// 单文件上传
export function uploadFileOne(data) {
  return request({
    url:'/uploadFile',
    method:'post',
    headers:{'Content-Type':'multipart/form-data'},
    data
  })
}

// 人脸检测
export function faceCheck(data) {
  return request({
    url:'/faceCheck',
    method:'post',
    headers:{'Content-Type':'multipart/form-data'},
    data
  })
}

// 多文件上传
export function uploadFileMany(data) {
  return request({
    url:'/uploadFiles',
    method:'post',
    headers:{'Content-Type':'multipart/form-data'},
    data
  })
}

// 单文件上传 test
export function uploadFileTest(data) {
  return request({
    url:'/uploadFileT',
    method:'post',
    headers:{'Content-Type':'multipart/form-data'},
    data
  })
}

// 人脸检测 test
export function faceCheckTest(data) {
  return request({
    url:'/faceCheckT',
    method:'post',
    headers:{'Content-Type':'multipart/form-data'},
    data
  })

}

// 可视化图表
export function visiable(data) {
  return axios({
    url:'ws://10.18.220.188:5518/meeting',
    method:'post',
    data
  })
}
