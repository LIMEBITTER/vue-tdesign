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
      background-color: #fff;
      border-radius: 20px;
      padding: 50px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);

  }


</style>
