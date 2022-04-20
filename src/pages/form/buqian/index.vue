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
        <div class="form-basic-container-title">会议补签</div>
        <!-- 表单内容 -->

        <!-- 合同名称,合同类型 -->
        <t-row class="row-gap" :gutter="[16, 24]">
          <t-col :span="6">
            <t-form-item label="补签会议号" name="mname">
              <t-input v-model="formData.mname" :style="{ width: '322px' }" placeholder="请输入内容" />
            </t-form-item>
          </t-col>
          <t-col :span="6">

          </t-col>
          <t-col :span="6">
            <t-form-item label="补签人" name="user">
              <t-input v-model="formData.user" :style="{ width: '322px' }" placeholder="请输入内容" />
            </t-form-item>
          </t-col>
          <t-col :span="6"></t-col>


          <t-col :span="6">
          </t-col>

        </t-row>
                <div class="form-basic-container-title form-title-gap">其它信息</div>

                <t-form-item label="补签原因" name="comment">
                  <t-textarea v-model="formData.comment" :height="124" placeholder="请输入补签原因" />
                </t-form-item>

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

const INITIAL_DATA = {
  mno: undefined,
  mname: '',

};
const FORM_RULES = {
  mno: [{ required: true, message: '请输入会议号', type: 'error' }],
  mname: [{ required: true, message: '请输入会议名', type: 'error' }],

};

export default {
  name: 'BuQian',
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
      if (validateResult === true) {
        // this.$request.post('api/meetings/apply',this.formData).then(res=> {
        //   console.log('meeting apply',res)
        //
        //   if (res.data.code === '200') {
        //
        //     this.$message.success(res.data.msg);
        //
        //   } else {
        //     this.$message.error(res.data.msg);
        //   }
        // })
        this.$message.success('加入成功');
      }
    },
  },
};
</script>
<style lang="less" scoped>
@import './index';
</style>
