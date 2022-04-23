<template>
  <t-form
    ref="form"
    :class="['item-container', `login-${type}`]"
    :data="formData"
    :rules="FORM_RULES"
    label-width="0"
    @submit="onSubmit"
  >
    <template v-if="type == 'password'">
      <t-form-item name="uname">
        <t-input v-model="formData.uname" size="large" placeholder="请输入账号：aaa">
          <template #prefix-icon>
            <t-icon name="user" />
          </template>
        </t-input>
      </t-form-item>

      <t-form-item name="password">
        <t-input
          v-model="formData.password"
          size="large"
          :type="showPsw ? 'text' : 'password'"
          clearable
          key="password"
          placeholder="请输入登录密码：aaa"
        >
          <template #prefix-icon>
            <t-icon name="lock-on" />
          </template>
          <template #suffix-icon>
            <t-icon :name="showPsw ? 'browse' : 'browse-off'" @click="showPsw = !showPsw" />
          </template>
        </t-input>
      </t-form-item>

      <t-form-item name="confirmPassword">
        <t-input
          v-model="formData.confirmPassword"
          size="large"
          :type="showPsw ? 'text' : 'password'"
          clearable
          key="password"
          placeholder="确认密码：123"
        >
          <template #prefix-icon>
            <t-icon name="lock-on" />
          </template>
          <template #suffix-icon>
            <t-icon :name="showPsw ? 'browse' : 'browse-off'" @click="showPsw = !showPsw" />
          </template>
        </t-input>
      </t-form-item>

<!--      <div class="check-container remember-pwd">-->
<!--        <t-checkbox>记住账号</t-checkbox>-->
<!--        <span class="tip">忘记账号？</span>-->
<!--      </div>-->
    </template>


<!--    <t-form-item v-if="type !== 'qrcode'" class="btn-container">-->
    <t-form-item class="btn-container">
      <t-button block size="large" type="submit"> 登录 </t-button>
    </t-form-item>


  </t-form>
</template>
<script lang="ts">
import Vue from 'vue';
import QrcodeVue from 'qrcode.vue';
import axios from "axios";

const INITIAL_DATA = {
  uname:'',
  password:'',
  confirmPassword: ''
};


// const FORM_RULES = {
  // phone: [{ required: true, message: '手机号必填', type: 'error' }],
  // uname: [{ required: true, message: '账号必填', type: 'error' }],
  // password: [{ required: true, message: '密码必填', type: 'error' }],
  // confirmPassword: [{ validator: (val) => val===password_confirmed,  message: '两次输入密码不一致',trigger: 'blur', required: true ,type:'error'}],

  // verifyCode: [{ required: true, message: '验证码必填', type: 'error' }],
// };
/** 高级详情 */
export default Vue.extend({
  name: 'Login',

  data() {
    return {
      // FORM_RULES,

      type: 'password',
      formData: { ...INITIAL_DATA },
      showPsw: false,
      countDown: 0,
      intervalTimer: null,
      // 后台获取的token
      userToken:'',
      FORM_RULES :{
        uname: [{ required: true, message: '账号必填', type: 'error' }],
        password: [{ required: true, message: '密码必填', type: 'error' }],
        confirmPassword: [{ validator: (val) => val===this.formData.password,  message: '两次输入密码不一致',trigger: 'blur', required: true ,type:'error'}],
      },
    };
  },
  beforeDestroy() {
    clearInterval(this.intervalTimer);
  },
  methods: {
    switchType(val) {
      this.type = val;
      this.$refs.form.reset();
    },
    async onSubmit({ validateResult }) {
      if (validateResult === true) {
        this.$request.post('api/user/login',this.formData).then(res=> {
          console.log(res)

          if (res.data.code === '200') {
            // token存储
            this.userToken = res.data.result.token;
            localStorage.setItem('user_name', this.formData.uname);

            localStorage.setItem('token', this.userToken);
            // this.$router.push('/dashboard');
            // console.log('zhixing')
            // console.log(this.formData.uname)
            this.$router.replace('/').catch(() => '');

            this.$message.success(res.data.msg);

          } else {
            this.$message.error(res.data.message);
          }
        })
      }
    },
    handleCounter() {
      this.countDown = 60;
      this.intervalTimer = setInterval(() => {
        if (this.countDown > 0) {
          this.countDown -= 1;
        } else {
          clearInterval(this.intervalTimer);
          this.countDown = 0;
        }
      }, 1000);
    },
  },
});
</script>
