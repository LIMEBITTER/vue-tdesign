import Vue from 'vue';
import VueRouter from 'vue-router';

import baseRouters from './modules/base';
import componentsRouters from './modules/components';
import othersRouters from './modules/others';


Vue.use(VueRouter)
// 存放动态路由
export const asyncRouterList = [...baseRouters,...componentsRouters, ...othersRouters];

// 存放固定的路由
const defaultRouterList = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/login/index.vue'),
  },
  {
    path: '*',
    redirect: '/dashboard/base',
  },

  ...asyncRouterList,
];

const createRouter = () =>
  new VueRouter({
    routes: defaultRouterList,
    scrollBehavior() {
      return { x: 0, y: 0 };
    },
  });

const router = createRouter();

// const router = new VueRouter({
//   routes
// })


// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
// router.beforeEach((to, from, next) => {
// // 如果去往登录页则放行
//   if (to.path === '/login') {
//     next();
//   } else {
//     // 从本地存储里获取token
//     let token = localStorage.getItem('token');
//     console.log('router token',token)
//     // 判断token是否为空如果为空则跳转到登录页 如果有则放行
//     if (token === null || token === '') {
//       console.log('token empty')
//       next({path:'/login'});
//     } else {
//       console.log('go')
//       next();
//     }
//   }
// });


export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
