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
import {pSignRecord,sCurrentMeetingInfo} from '@/utils/api.js';

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
      console.log('会议加入=====',this.formData)
      if (validateResult === true) {
        // 先查看当前会议状态是否开始，如果是未开始状态，则不产生入会记录
        sCurrentMeetingInfo(this.formData.mid).then(res=>{
          const {status} = res.data.result.meetingInfo
          const {host} = res.data.result.meetingInfo
          if (status === 1){
            // 申请人可加入自己的会议 但不产生签到记录
            if (host !== localStorage.getItem('user_name')){
              // 当前会议号为进行中状态 进入会议，产生签到记录
              // 加一条 ：如果当前参会者已经加入过会议，则任然进入进入会议 但不产生签到记录
              pSignRecord(this.formData).then(res=>{
                console.log(res)
                if(res.data.code === "200"){
                  console.log('formdata',this.formData)
                  console.log('加入会议成功',res)
                  this.$message.success('加入成功');
                  this.$router.push({name:'MeetingStart',query:this.formData})
                }else {
                  this.$message.error('加入失败');

                }
              })
            }else {
              setTimeout(()=>{
                this.$message.info('申请者加入会议，不产生入会记录')
              },1000)
              this.$router.push({name:'MeetingStart',query:this.formData})

            }


          }else if (status === 0){
            this.$message.info('当前会议还未开始！')
          }else {
            this.$message.info('当前会议已结束！')

          }
        })

      }
    },
  },
};
</script>
<style lang="less" scoped>
@import 'src/pages/list/meeting-join/index';
</style>
