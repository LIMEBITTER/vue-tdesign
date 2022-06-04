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
        path: 'history_meeting-info',
        name:'MeetingInfo',
        component: () => import('@/pages/hidden/hmeeting-info/index.vue'),
        meta: { title: '当前会议信息',keepAlive: true },
      },
      {
        path: 'meeting_start',
        name: 'MeetingStart',
        component: () => import('@/pages/hidden/meeting-start/index.vue'),
        meta: { title: '会议开始结束' ,keepAlive:true},
        // beforeEnter(to,from,next){
        //   console.log('meetingstart路由守卫',to,from)
        //   next();
        // }
      },
      {
        path: 'face_detection',
        name: 'FaceDetection',
        component: () => import('@/pages/hidden/face-detection/index.vue'),
        meta: { title: '人脸签到' },
      },

    ],
  },
];
