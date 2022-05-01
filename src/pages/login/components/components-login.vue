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
    </template>
<!--    <t-form-item name="checkCode">-->
<!--      <t-input-->
<!--        v-model="inputCode"-->
<!--        size="large"-->
<!--        clearable-->
<!--        placeholder="请输入验证码"-->
<!--      ></t-input>-->
<!--      <check-code v-model="validCode" @sendData="getCode"/>-->
<!--    </t-form-item>-->


<!--    <t-form-item v-if="type !== 'qrcode'" class="btn-container">-->
    <t-form-item class="btn-container">
      <t-button block size="large" type="submit"> 登录 </t-button>
    </t-form-item>
<!--    <check-code :identify-code="identifyCode" @click="refreshCode"/>-->



  </t-form>
</template>
<script lang="ts">
import Vue from 'vue';
import QrcodeVue from 'qrcode.vue';
import axios from "axios";
import checkCode from "./checkCode.vue";
import {userLogin} from "@/utils/api.js";

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
  components: {checkCode},
  data() {
    return {
      // FORM_RULES,
      validCode:"",
      // 输入的验证码
      inputCode:"",

      type: 'password',
      formData: { ...INITIAL_DATA },
      showPsw: false,
      countDown: 0,
      intervalTimer: null,
      // 后台获取的token
      userToken:'',
      uid:'',
      FORM_RULES :{
        uname: [{ required: true, message: '账号必填', type: 'error' }],
        password: [{ required: true, message: '密码必填', type: 'error' }],
        confirmPassword: [{ validator: (val) => val===this.formData.password,  message: '两次输入密码不一致',trigger: 'blur', required: true ,type:'error'}],
        // inputCode: [{ validator: (val) => val===this.formData.password,  message: '两次输入密码不一致',trigger: 'blur', required: true ,type:'error'}],

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
    // 在方法中获取验证码的数据
    // 从子组件获取验证码，并将验证码返回到页面
    getCode(data){
      console.log(data)
      this.validCode = data;// 在data中定义一个 validCode:'',用来记录验证码。
    },
    async onSubmit({ validateResult }) {
      if (validateResult === true) {
        userLogin(this.formData).then(res=>{
          if (res.data.code === '200') {
            console.log('登录成功',res)

            // token存储
            this.userToken = res.data.result.token;
            this.uid = res.data.result.uid;
            localStorage.setItem('uid',this.uid)
            localStorage.setItem('user_name', this.formData.uname);
            localStorage.setItem('token', this.userToken);

            this.$router.replace('/').catch(() => '');

            this.$message.success('登录成功');

          } else {
            console.log('登录失败',res)

            this.$message.error('登录失败');
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
