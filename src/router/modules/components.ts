import Layout from '@/layouts';
import ListIcon from '@/assets/assets-slide-list.svg';
import FormIcon from '@/assets/assets-slide-form.svg';
import DetailIcon from '@/assets/assets-slide-detail.svg';

export default [
  {
    path: '/list',
    name: 'list',
    component: Layout,
    redirect: '/list/base',
    // meta: { title: '列表页', icon: ListIcon },
    meta: { title: '会议管理', icon: ListIcon },

    children: [
      {
        path: 'filter',
        name: 'ListFilter',
        component: () => import('@/pages/list/filter/index.vue'),
        meta: { title: '会议历史查询' },
      },
      {
        path: 'filterall',
        name: 'ListFilterAll',
        component: () => import('@/pages/list/filterallcheck/index.vue'),
        meta: { title: '会议查看' },
      },
      {
        path: 'checkallmeetings',
        name: 'ListFilterUser',
        component: () => import('@/pages/list/checkallmeetings/index.vue'),
        meta: { title: '所有会议情况浏览' },
      },
      {
        path: 'base',
        name: 'FormBase',
        component: () => import('@/pages/form/base/index.vue'),
        meta: { title: '会议申请' },
      },
      {
        path: 'joinmeeting',
        name: 'MeetingJoin',
        component: () => import('@/pages/form/joinmeeting/index.vue'),
        meta: { title: '会议加入' },
      },
      {
        path: 'buqian',
        name: 'BuQian',
        component: () => import('@/pages/form/buqian/index.vue'),
        meta: { title: '补签页面' },
      },
      {
        path: 'camera',
        name: 'Camera',
        component: () => import('@/pages/camera/Camera.vue'),
        meta: { title: '摄像头' },
      },

    ],
  },
  {
    path: '/form',
    name: 'form',
    component: Layout,
    redirect: '/form/base',
    meta: { title: '表单页', icon: FormIcon },
    // meta: { title: '签到管理', icon: FormIcon },

    children: [
      {
        path: 'base',
        name: 'FormBase',
        component: () => import('@/pages/form/base/index.vue'),
        meta: { title: '会议申请' },
      },
      // {
      //   path: 'step',
      //   name: 'FormStep',
      //   component: () => import('@/pages/form/step/index.vue'),
      //   meta: { title: '分步表单页' },
      // },
    ],
  },
  {
    path: '/detail',
    name: 'detail',
    component: Layout,
    redirect: '/detail/base',
    meta: { title: '详情页', icon: DetailIcon },
    children: [
      {
        path: 'base',
        name: 'DetailBase',
        component: () => import('@/pages/detail/base/index.vue'),
        meta: { title: '会议开始结束' ,keepAlive:false},
      },
      {
        path: 'basecheck',
        name: 'BaseCheck',
        component: () => import('@/pages/detail/basecheck/index.vue'),
        meta: { title: '当前会议信息' },
      },
      {
        path: 'facedetection',
        name: 'FaceDetection',
        component: () => import('@/pages/detail/facedetection/index.vue'),
        meta: { title: '人脸签到' },
      },
      // {
      //   path: 'deploy',
      //   name: 'DetailDeploy',
      //   component: () => import('@/pages/detail/deploy/index.vue'),
      //   meta: { title: '数据详情页' },
      // },
      // {
      //   path: 'secondary',
      //   name: 'DetailSecondary',
      //   component: () => import('@/pages/detail/secondary/index.vue'),
      //   meta: { title: '二级详情页' },
      // },
    ],
  },

];
