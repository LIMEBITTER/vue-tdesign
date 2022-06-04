import Layout from '@/layouts';
import DashboardIcon from '@/assets/assets-slide-dashboard.svg';

export default [
  {
    path: '/dashboard',
    component: Layout,
    redirect: '/dashboard/statistics_form',
    name: 'dashboard',
    meta: { title: '仪表盘', icon: DashboardIcon },
    children: [
      // {
      //   path: 'base',
      //   name: 'DashboardBase',
      //   component: () => import('@/pages/dashboard/base/index.vue'),
      //   meta: { title: '概览仪表盘' },
      // },
      {
        path: 'statistics_form',
        name: 'DashboardDetail',
        component: () => import('@/pages/dashboard/statistics-form/index.vue'),
        meta: { title: '统计报表' },
      },

    ],
  },
];
