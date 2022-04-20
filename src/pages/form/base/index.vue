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
        <div class="form-basic-container-title">申请会议(预定会议)</div>
        <!-- 表单内容 -->

        <!-- 合同名称,合同类型 -->
        <t-row class="row-gap" :gutter="[16, 24]">
          <t-col :span="6">
            <t-form-item label="会议名" name="mname">
              <t-input v-model="formData.mname" :style="{ width: '322px' }" placeholder="请输入内容" />
            </t-form-item>
          </t-col>
          <t-col :span="6">

          </t-col>

<!--            <t-form-item label="申请人" name="applier">-->
<!--              <t-select-->
<!--                v-model="formData.partyA"-->
<!--                :style="{ width: '322px' }"-->
<!--                class="demo-select-base"-->
<!--                placeholder="请选择类型"-->
<!--                clearable-->
<!--              >-->
<!--                <t-option v-for="(item, index) in partyAOptions" :key="index" :value="item.value" :label="item.label">-->
<!--                  {{ item.label }}-->
<!--                </t-option>-->
<!--              </t-select>-->
<!--            </t-form-item>-->
            <t-col :span="6">
              <t-form-item label="申请人" name="user_name">
                <t-input v-model="user_name"  :style="{ width: '322px' }"  placeholder="请输入内容" disabled></t-input>

              </t-form-item>
              <t-form-item label="会议总人数" name="totalNum">
                <t-input v-model="formData.totalNum"  :style="{ width: '322px' }" type="number"  placeholder="请输入内容"></t-input>

              </t-form-item>
            </t-col>

          <t-col :span="6">

          </t-col>

          <t-col :span="6">
            <t-form-item label="会议预定时间" name="expectTime">
              <t-date-picker
                v-model="formData.expectTime"
                :style="{ width: '322px' }"
                mode="date"
                format="YYYY-MM-DD HH:mm:ss"
                enableTimePicker
                separator="/"
              />
            </t-form-item>
          </t-col>

          <t-col :span="6"></t-col>

          <t-col :span="6">
            <t-form-item label="会议结束时间" name="endTime">
              <t-date-picker
                v-model="formData.endTime"
                :style="{ width: '322px' }"
                mode="date"
                format="YYYY-MM-DD HH:mm:ss"
                enableTimePicker
                separator="/"
              />
            </t-form-item>
          </t-col>

        </t-row>

<!--        <div class="form-basic-container-title form-title-gap">其它信息</div>-->

<!--        <t-form-item label="备注" name="comment">-->
<!--          <t-textarea v-model="formData.comment" :height="124" placeholder="请输入备注" />-->
<!--        </t-form-item>-->

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
  mname: '',
  // type: '',
  // partyA: '',
  // startTime: '',
  endTime: '',
  totalNum:null,
  // 此页面默认申请为预定会议 0
  isApply:0,
};
const FORM_RULES = {
  mname: [{ required: true, message: '请输入会议名', type: 'error' }],
  expectTime: [{ required: true, message: '请选择预定时间', type: 'error' }],
  endTime: [{ required: true, message: '请选择结束时间', type: 'error' }],
  totalNum: [{ required: true, message: '请选择结束时间', type: 'error' }],

};

export default {
  name: 'FormBase',
  data() {
    return {
      prefix,
      stepSuccess: true,
      formData: { ...INITIAL_DATA },
      FORM_RULES,
      // partyAOptions: [
      //   { label: 'test1', value: '1' },
      //   { label: 'test2', value: '2' },
      //   { label: 'test3', value: '3' },
      // ],
      textareaValue: '',
      user_name:''
    };
  },
  mounted() {
    this.user_name = localStorage.getItem('user_name');
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
        this.$request.post('api/meetings/apply',this.formData).then(res=> {
          console.log('formdata',this.formData)
          console.log('meeting apply',res)

          if (res.data.code === '200') {

            this.$message.success(res.data.msg);

          } else {
            this.$message.error(res.data.msg);
          }
        })
        this.$message.success('申请成功');
      }
    },
  },
};
</script>
<style lang="less" scoped>
@import './index';
</style>
