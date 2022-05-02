<template>
  <t-form
    ref="form"
    class="base-form"
    :data="formData"
    :rules="FORM_RULES"
    label-align="top"
    :label-width="100"
    @reset="onReset"
    @submit="onSubmit"
  >
    <div class="form-basic-container">
      <div class="form-basic-item">
        <div class="form-basic-container-title">加入会议</div>
        <!-- 表单内容 -->

        <!-- 合同名称,合同类型 -->
        <t-row class="row-gap" :gutter="[16, 24]">
          <t-col :span="6">
            <t-form-item label="会议号" name="mid">
              <t-input v-model="formData.mid" :style="{ width: '322px' }" placeholder="请输入内容" />
            </t-form-item>
          </t-col>
<!--          <t-col :span="6">-->

<!--          </t-col>-->
<!--          <t-col :span="6">-->
<!--            <t-form-item label="会议名" name="mname">-->
<!--              <t-input v-model="formData.mname" :style="{ width: '322px' }" placeholder="请输入内容" />-->
<!--            </t-form-item>-->
<!--          </t-col>-->
<!--          <t-col :span="6"></t-col>-->

<!--          <t-col :span="6">-->
<!--            <t-form-item label="申请人" name="user_name">-->
<!--              <t-input v-model="user_name"  :style="{ width: '322px' }"  placeholder="请输入内容" disabled></t-input>-->

<!--            </t-form-item>-->
<!--            <t-form-item label="会议总人数" name="totalNum">-->
<!--              <t-input v-model="totalNum"  :style="{ width: '322px' }" type="number"  placeholder="请输入内容"></t-input>-->

<!--            </t-form-item>-->
<!--          </t-col>-->




          <t-col :span="6">
          </t-col>

        </t-row>

      </div>
    </div>

    <div class="form-submit-container">
      <div class="form-submit-sub">
        <div class="form-submit-left">
          <t-button theme="primary" class="form-submit-confirm" type="submit"> 提交 </t-button>
          <t-button type="reset" class="form-submit-cancel" theme="default" variant="base"> 取消 </t-button>
        </div>
      </div>
    </div>
  </t-form>
</template>
<script>
import { prefix } from '@/config/global';
import {pSignRecord} from '@/utils/api.js';

const INITIAL_DATA = {
  mid: '',
  uid: localStorage.getItem('uid'),

};
const FORM_RULES = {
  mid: [{ required: true, message: '请输入会议号', type: 'error' }],
  // mname: [{ required: true, message: '请输入会议名', type: 'error' }],

};

export default {
  name: 'MeetingJoin',
  data() {
    return {
      prefix,
      stepSuccess: true,
      formData: { ...INITIAL_DATA },
      FORM_RULES,

      textareaValue: '',
    };
  },
  methods: {
    changeStatus() {
      this.stepSuccess = !this.stepSuccess;
    },
    onReset() {
      this.$message.warning('取消提交');
    },
    onSubmit({ validateResult }) {
      console.log(this.formData)
      if (validateResult === true) {
        pSignRecord(this.formData).then(res=>{
          if(res.data.code === "200"){
            console.log('formdata',this.formData)
            console.log('加入会议成功',res)
            this.$message.success('加入成功');
          }else {
            this.$message.error('加入失败');

          }
        })
      }
    },
  },
};
</script>
<style lang="less" scoped>
@import 'src/pages/list/joinmeeting/index';
</style>
