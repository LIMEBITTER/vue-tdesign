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
            <t-form-item label="会议号" name="mname">
              <t-input v-model="formData.mname" :style="{ width: '322px' }" placeholder="请输入内容" />
            </t-form-item>
          </t-col>
          <t-col :span="6">
            <t-form-item label="会议名" name="mname">
              <t-input v-model="formData.mname" :style="{ width: '322px' }" placeholder="请输入内容" />
            </t-form-item>
          </t-col>

          <t-col :span="6">
            <t-form-item label="申请人" name="partyA">
              <t-select
                v-model="formData.partyA"
                :style="{ width: '322px' }"
                class="demo-select-base"
                placeholder="请选择类型"
                clearable
              >
                <t-option v-for="(item, index) in partyAOptions" :key="index" :value="item.value" :label="item.label">
                  {{ item.label }}
                </t-option>
              </t-select>
            </t-form-item>
          </t-col>
          <t-col :span="6">
          </t-col>
          <t-col :span="6">
            <t-form-item label="总人数    " name="partyA">
              <t-select
                v-model="formData.partyA"
                :style="{ width: '322px' }"
                class="demo-select-base"
                placeholder="请选择类型"
                clearable
              >
                <t-option v-for="(item, index) in partyAOptions" :key="index" :value="item.value" :label="item.label">
                  {{ item.label }}
                </t-option>
              </t-select>
            </t-form-item>
          </t-col>
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

const INITIAL_DATA = {
  name: '',
  type: '',
  partyA: '',
  // partyB: '',
  signDate: '',
  startDate: '',
  endDate: '',

};
const FORM_RULES = {
  mname: [{ required: true, message: '请输入会议名', type: 'error' }],
  partyA: [{ required: true, message: '请选择申请人', type: 'error' }],
  expectTime: [{ required: true, message: '请选择预定时间', type: 'error' }],
  endTime: [{ required: true, message: '请选择结束时间', type: 'error' }],
};

export default {
  name: 'MeetingJoin',
  data() {
    return {
      prefix,
      stepSuccess: true,
      formData: { ...INITIAL_DATA },
      FORM_RULES,

      partyAOptions: [
        { label: 'test1', value: '1' },
        { label: 'test2', value: '2' },
        { label: 'test3', value: '3' },
      ],
      textareaValue: '',
      rules: {
        mname: [{ required: true, message: '请输入会议名', type: 'error' }],
        partyA: [{ required: true, message: '请选择申请人', type: 'error' }],
        expectTime: [{ required: true, message: '请选择预定时间', type: 'error' }],
        endTime: [{ required: true, message: '请选择结束时间', type: 'error' }],
      },
    };
  },
  methods: {
    changeStatus() {
      this.stepSuccess = !this.stepSuccess;
    },
    onReset() {
      this.$message.warning('取消申请');
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
