import Layout from '@/layouts';
import ListIcon from '@/assets/assets-slide-list.svg';
import FormIcon from '@/assets/assets-slide-form.svg';
import DetailIcon from '@/assets/assets-slide-detail.svg';

export default [
  {
    path: '/list',
    // name: 'list',
    component: Layout,
    redirect: '/list/meeting_apply_schedule',
    // meta: { title: '列表页', icon: ListIcon },
    meta: { title: '会议管理', icon: ListIcon },

    children: [

      {
        path: 'meeting_apply_schedule',
        name: 'FormBase',
        component: () => import('@/pages/form/meeting-apply-sche/index.vue'),
        meta: { title: '会议申请（预定）' },
      },
      {
        path: 'history_meeting',
        name: 'ListFilter',
        component: () => import('@/pages/list/history-meeting/index.vue'),
        meta: { title: '历史会议' },
      },
      {
        path: 'meeting_management',
        name: 'ListFilterAll',
        component: () => import('@/pages/list/meeting-management/index.vue'),
        meta: { title: '我的会议（申请人）' },
      },
      {
        path: 'meeting_join',
        name: 'MeetingJoin',
        component: () => import('@/pages/list/meeting-join/index.vue'),
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
      {
        path: 'screen_show',
        name: 'ScreenShow',
        component: () => import('@/pages/hidden/screen-show/index.vue'),
        meta: { title: '大屏展示（测试）' },
      },

    ],
  },


];
