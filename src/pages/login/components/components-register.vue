<template>
  <t-form
    ref="form"
    :class="['item-container', `register-${type}`]"
    :data="formData"
    :rules="FORM_RULES"
    label-width="0"
    @submit="onSubmit"
  >


    <t-form-item name="account">
      <t-input v-model="formData.uname" size="large" placeholder="请输入用户名">
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
        placeholder="请输入登录密码"
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


<!--    <template v-if="type == 'phone'">-->

<!--      <t-form-item name="phone">-->
<!--        <t-input v-model="formData.phone" :maxlength="11" size="large" placeholder="请输入您的手机号">-->
<!--          <template #prefix-icon>-->
<!--            <t-icon name="user" />-->
<!--          </template>-->
<!--        </t-input>-->
<!--      </t-form-item>-->

<!--    </template>-->

<!--    <template v-if="type == 'email'">-->

<!--      <t-form-item name="email">-->
<!--        <t-input v-model="formData.email" type="text" size="large" placeholder="请输入您的邮箱">-->
<!--          <template #prefix-icon>-->
<!--            <t-icon name="mail" />-->
<!--          </template>-->
<!--        </t-input>-->
<!--      </t-form-item>-->

<!--    <t-upload-->
<!--      v-model="files"-->
<!--      :autoUpload="autoUpload"-->
<!--      :theme="display"-->
<!--      :data="{ extra_data: 123, file_name: 'certificate' }"-->
<!--      draggable-->
<!--      action="https://service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo"-->
<!--      @cancel-upload="onCancelUpload"-->
<!--      @remove="onRemove"-->
<!--    />-->



<!--    </template>-->


<!--    <template v-if="type == 'phone'">-->
<!--      <t-form-item class="verification-code" name="verifyCode">-->
<!--        <t-input v-model="formData.verifyCode" size="large" placeholder="请输入验证码" />-->
<!--        <t-button variant="outline" :disabled="countDown > 0" @click="handleCounter">-->
<!--          {{ countDown == 0 ? '发送验证码' : `${countDown}秒后可重发` }}-->
<!--        </t-button>-->
<!--      </t-form-item>-->
<!--    </template>-->

<!--    <t-form-item class="check-container" name="checked">-->
<!--      <t-checkbox v-model="formData.checked">我已阅读并同意 </t-checkbox> <span>TDesign服务协议</span> 和-->
<!--      <span>TDesign 隐私声明</span>-->
<!--    </t-form-item>-->

    <t-form-item>
      <t-button block size="large" type="submit"> 注册 </t-button>
    </t-form-item>

<!--    <div class="switch-container">-->
<!--      <span class="tip" @click="switchType(type == 'phone' ? 'email' : 'phone')">{{-->
<!--        type == 'phone' ? '使用邮箱注册' : '使用手机号注册'-->
<!--      }}</span>-->
<!--    </div>-->
  </t-form>
</template>
<script lang="ts">
import Vue from 'vue';
import {userRegister} from "@/utils/api.js";

const INITIAL_DATA = {
  // uid:1,
  uname:'',
  password: '',
  // email: '',
  // phone: '',
  // verifyCode: '',
  // checked: false,
};

const FORM_RULES = {
  // phone: [{ required: true, message: '手机号必填', type: 'error' }],
  // email: [{ required: true, email: true, message: '邮箱必填', type: 'error' }],
  password: [{ required: true, message: '密码必填', type: 'error' }],
  // verifyCode: [{ required: true, message: '验证码必填', type: 'error' }],
};

/** 高级详情 */
export default Vue.extend({
  name: 'Register',
  data() {
    return {
      // FORM_RULES,
      type: 'phone',
      emailOptions: [],
      formData: { ...INITIAL_DATA },
      showPsw: false,
      countDown: 0,
      intervalTimer: null,
      FORM_RULES :{
        // phone: [{ required: true, message: '手机号必填', type: 'error' }],
        uname: [{ required: true, message: '账号必填', type: 'error' }],
        password: [{ required: true, message: '密码必填', type: 'error' }],
        confirmPassword: [{ validator: (val) => val===this.formData.password,  message: '两次输入密码不一致',trigger: 'blur', required: true ,type:'error'}],

        // verifyCode: [{ required: true, message: '验证码必填', type: 'error' }],
      },
    };
  },
  beforeDestroy() {
    clearInterval(this.intervalTimer);
  },
  methods: {
    onSubmit({ validateResult }: { validateResult: boolean }) {

      if (validateResult === true) {
        // if (!this.formData.checked) {
        //   this.$message.error('请同意TDesign服务协议和TDesign 隐私声明');
        //   return;
        // }
        // this.request.post('/api/users/register',this.formData).then(res=>{
        //   console.log(res)
        // })
        // console.log('formdata',this.formData)
        userRegister(this.formData).then(res=>{
          const status = res.data.code;
          console.log('status',status)

          if (res.data.code==='200'){
            console.log('注册成功',res)

            this.$message.success('注册成功');
            this.$emit('registerSuccess');
            // this.$router.push('/login');

          }else {
            console.log('注册失败',res)

            this.$message.error('注册失败');

          }
        })

      }
    },
    // switchType(val: 'email' | 'phone') {
    //   this.$refs.form.reset();
    //   this.type = val;
    // },
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
