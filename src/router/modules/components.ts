import Layout from '@/layouts';
import ListIcon from '@/assets/assets-slide-list.svg';
import FormIcon from '@/assets/assets-slide-form.svg';
import DetailIcon from '@/assets/assets-slide-detail.svg';

export default [
  {
    path: '/list',
    // name: 'list',
    component: Layout,
    redirect: '/list/base',
    // meta: { title: '列表页', icon: ListIcon },
    meta: { title: '会议管理', icon: ListIcon },

    children: [
      {
        path: 'filter',
        name: 'ListFilter',
        component: () => import('@/pages/list/filter/index.vue'),
        meta: { title: '历史会议' },
      },
      {
        path: 'filterall',
        name: 'ListFilterAll',
        component: () => import('@/pages/list/filterallcheck/index.vue'),
        meta: { title: '我的会议（申请人）' },
      },
      // {
      //   path: 'checkallmeetings',
      //   name: 'ListFilterUser',
      //   component: () => import('@/pages/list/checkallmeetings/index.vue'),
      //   meta: { title: '所有会议情况浏览' },
      // },
      {
        path: 'base',
        name: 'FormBase',
        component: () => import('@/pages/form/base/index.vue'),
        meta: { title: '会议申请（预定）' },
      },

      {
        path: 'joinmeeting',
        name: 'MeetingJoin',
        component: () => import('@/pages/list/joinmeeting/index.vue'),
        meta: { title: '会议加入' },
      },
      {
        path: 'CameraTest',
        name: 'CameraTest',
        component: () => import('@/pages/hidden/components/Camera.vue'),
        meta: { title: '人脸摄像头调用（测试）' },
      },
      {
        path: 'FaceReg',
        name: 'facereg',
        component: () => import('@/pages/hidden/components/FaceReg.vue'),
        meta: { title: '人脸识别（测试）' },
      },
      // {
      //   path: 'camera',
      //   name: 'Camera',
      //   component: () => import('@/pages/camera/Camera.vue'),
      //   meta: { title: '摄像头' },
      // },

    ],
  },


];
