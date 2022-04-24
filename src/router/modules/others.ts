import Layout from '@/layouts';
import LogoutIcon from '@/assets/assets-slide-logout.svg';

export default [
  {
    path: '/user',
    name: 'user',
    component: Layout,
    redirect: '/user/index',
    meta: { title: '个人页', icon: 'user-circle' },
    children: [
      {
        path: 'index',
        name: 'UserIndex',
        component: () => import('@/pages/user/index.vue'),
        meta: { title: '登录信息' },
      },

    ],
  },
  {
    path: '/hidden',
    name: 'hiddenPage',
    component: Layout,
    meta: { title: '隐藏页', icon: LogoutIcon },
    // redirect: '/hidden/meetingInfo',
    children: [
      {
        path: 'meetingInfo',
        name:'MeetingInfo',
        component: () => import('@/pages/hidden/meetingInfo/index.vue'),
        meta: { title: '当前会议信息' },
      },
      {
        path: 'meetingStart',
        name: 'MeetingStart',
        component: () => import('@/pages/hidden/meetingStart/index.vue'),
        meta: { title: '会议开始结束' ,keepAlive:false},
      },
      {
        path: 'faceDetection',
        name: 'FaceDetection',
        component: () => import('@/pages/hidden/faceDetection/index.vue'),
        meta: { title: '人脸签到' },
      },
      {
        path: 'indexm',
        name: 'MemberIndex',
        component: () => import('@/pages/member/index.vue'),
        meta: { title: '参会人员信息' },
      },
    ],
  },
];
