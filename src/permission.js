import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style

import store from '@/store';
import router from '@/router';

NProgress.configure({ showSpinner: false });

const whiteListRouters = store.getters['permission/whiteListRouters'];

router.beforeEach(async (to, from, next) => {
  NProgress.start();

  // const token = store.getters['user/token'];
  // 获取 token ！！！
  const token = localStorage.getItem('token')



  if (token) {

    // 如果访问login router放行
    if (to.path === '/login') {
      setTimeout(() => {
        store.dispatch('user/logout');
        store.dispatch('permission/restore');
      });
      next();
      return;
    }
    // 获取用户角色
    const roles = store.getters['user/roles'];
    console.log('roles',roles)
    // 判断当前用户是否已经拉取userInfo
    if (roles && roles.length > 0) {
      next();
    } else {
      try {
        // 拉取userInfo
        await store.dispatch('user/getUserInfo');
        // 生成可访问的路由表
        await store.dispatch('permission/initRoutes', store.getters['user/roles']);

        next({ ...to });
      } catch (error) {
        await store.commit('user/removeToken');
        next(`/login?redirect=${to.path}`);
        NProgress.done();
      }
    }
  } else {
    /* white list router */
    if (whiteListRouters.indexOf(to.path) !== -1) {
      next();
    } else {
      next(`/login?redirect=${to.path}`);
    }
    NProgress.done();
  }
});

router.afterEach(() => {
  NProgress.done();
});
