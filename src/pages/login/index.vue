<template>
  <div class="login-wrapper">
<!--    <login-header />-->

    <div class="login-container">
      <div class="title-container">
        <h1 class="title margin-no">登录到</h1>
        <h3 class="title">人脸签到会议系统</h3>
        <div class="sub-title">
          <p class="tip">{{ type == 'register' ? '已有账号?' : '没有账号吗?' }}</p>
          <p class="tip" @click="switchType(type == 'register' ? 'login' : 'register')">
            {{ type == 'register' ? '登录' : '注册新账号' }}
          </p>
        </div>
      </div>

      <login v-if="type === 'login'" />
      <register v-else @register-success="switchType('login')" />
      <tdesign-setting />
    </div>

<!--    <footer class="copyright">Copyright @ 2021-2022 Tencent. All Rights Reserved</footer>-->
  </div>
</template>
<script>
import Login from './components/components-login.vue';
import Register from './components/components-register.vue';
import TdesignSetting from '@/layouts/setting.vue';

export default {
  name: 'LoginIndex',
  components: {
    Login,
    Register,
    TdesignSetting,
  },
  data() {
    return {
      type: 'login',
    };
  },
  methods: {
    switchType(val) {
      this.type = val;
    },
  },
};
</script>
<style lang="less">
@import url('./index.less');
  .login-container{
      text-align: center;
      /*background-color: #fff;*/
      border-radius: 20px;
      padding: 50px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      box-shadow: 0 10px 20px rgba(0,0,0,0.5);
      overflow: hidden;
      z-index: 2;
      box-sizing: border-box;
  }
/* 通过给背景添加模糊效果使其不会模糊容器内容，即文字 */
  .login-container::before{
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    -webkit-filter: blur(20px);
    -moz-filter: blur(20px);
    -ms-filter: blur(20px);
    -o-filter: blur(20px);
    filter: blur(20px);
    z-index: -3;
    /* 将距离限制于容器内部，防止边缘虚化 */
    margin: -30px;
    background-image: url('src/assets/assets-login-bg-white.png');
    /*background-position: center top;*/
    /* 把背景图像扩展至足够大，以使背景图像完全覆盖背景区域。 */
    background-size: cover;
    /* 固定的背景图像 */
    background-attachment: fixed;
  }



</style>
