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
        <div class="form-basic-container-title">申请会议信息</div>
        <!-- 表单内容 -->

        <!-- 合同名称,合同类型 -->
        <t-row class="row-gap" :gutter="[16, 24]">
          <t-col :span="6">
            <t-form-item label="会议名" name="mname">
              <t-input v-model="formData.mname" :style="{ width: '322px' }" placeholder="请输入内容" />
            </t-form-item>
          </t-col>
          <t-col :span="6">
<!--            <t-form-item label="合同类型" name="type">-->
<!--              <t-select-->
<!--                v-model="formData.type"-->
<!--                :style="{ width: '322px' }"-->
<!--                placeholder="请选择类型"-->
<!--                class="demo-select-base"-->
<!--                clearable-->
<!--              >-->
<!--                <t-option v-for="(item, index) in typeOptions" :key="index" :value="item.value" :label="item.label">-->
<!--                  {{ item.label }}-->
<!--                </t-option>-->
<!--              </t-select>-->
<!--            </t-form-item>-->
          </t-col>

          <!-- 合同收付类型 -->
<!--          <t-col :span="8">-->
<!--            <t-form-item label="合同收付类型" name="payment">-->
<!--              <t-radio-group v-model="formData.payment">-->
<!--                <t-radio value="1"> 收款 </t-radio>-->
<!--                <t-radio value="2"> 付款 </t-radio>-->
<!--              </t-radio-group>-->
<!--              <span class="space-item" />-->
<!--              <t-input placeholder="请输入金额" :style="{ width: '160px' }" />-->
<!--            </t-form-item>-->
<!--          </t-col>-->

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
<!--            <t-form-item label="乙方" name="partyB">-->
<!--              <t-select-->
<!--                v-model="formData.partyB"-->
<!--                :style="{ width: '322px' }"-->
<!--                placeholder="请选择类型"-->
<!--                class="demo-select-base"-->
<!--                clearable-->
<!--              >-->
<!--                <t-option v-for="(item, index) in partyBOptions" :key="index" :value="item.value" :label="item.label">-->
<!--                  {{ item.label }}-->
<!--                </t-option>-->
<!--              </t-select>-->
<!--            </t-form-item>-->
          </t-col>
<!--          <t-col :span="6">-->
<!--            <t-form-item label="会议开始日期" name="signDate">-->
<!--              <t-date-picker-->
<!--                v-model="formData.signDate"-->
<!--                :style="{ width: '322px' }"-->
<!--                theme="primary"-->
<!--                mode="date"-->
<!--                separator="/"-->
<!--              />-->
<!--            </t-form-item>-->
<!--          </t-col>-->
          <t-col :span="6">
            <t-form-item label="会议预定时间" name="expectTime">
              <t-date-picker
                v-model="formData.expectTime"
                :style="{ width: '322px' }"
                theme="primary"
                mode="date"
                separator="/"
              />
            </t-form-item>
          </t-col>
          <t-col :span="6">
            <t-form-item label="会议结束时间" name="endTime">
              <t-date-picker
                v-model="formData.endTime"
                :style="{ width: '322px' }"
                theme="primary"
                mode="date"
                separator="/"
              />
            </t-form-item>
          </t-col>
<!--          <t-col :span="6">-->
<!--            <t-form-item label="" name="files">-->
<!--              <t-upload-->
<!--                v-model="formData.files"-->
<!--                action="https://service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo"-->
<!--                tips="请上传pdf文件，大小在60M以内"-->
<!--                :size-limit="{ size: 60, unit: 'MB' }"-->
<!--                :format-response="formatResponse"-->
<!--                :before-upload="beforeUpload"-->
<!--                @fail="handleFail"-->
<!--              >-->
<!--                <t-button class="form-submit-upload-btn" variant="outline"> 上传合同文件 </t-button>-->
<!--              </t-upload>-->
<!--            </t-form-item>-->
<!--          </t-col>-->
        </t-row>

        <div class="form-basic-container-title form-title-gap">其它信息</div>

        <t-form-item label="备注" name="comment">
          <t-textarea v-model="formData.comment" :height="124" placeholder="请输入备注" />
        </t-form-item>
<!--        <t-form-item label="公证人">-->
<!--          <t-avatar-group>-->
<!--            <t-avatar>D</t-avatar>-->
<!--            <t-avatar>S</t-avatar>-->
<!--            <t-avatar>+</t-avatar>-->
<!--          </t-avatar-group>-->
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
  name: '',
  type: '',
  partyA: '',
  // partyB: '',
  signDate: '',
  startDate: '',
  endDate: '',
  // payment: '1',
  // amount: 0,
  comment: '',
  // files: [],
};
const FORM_RULES = {
  mname: [{ required: true, message: '请输入会议名', type: 'error' }],
  partyA: [{ required: true, message: '请选择申请人', type: 'error' }],
  expectTime: [{ required: true, message: '请选择预定时间', type: 'error' }],
  endTime: [{ required: true, message: '请选择结束时间', type: 'error' }],
};

export default {
  name: 'FormBase',
  data() {
    return {
      prefix,
      stepSuccess: true,
      formData: { ...INITIAL_DATA },
      FORM_RULES,
      // typeOptions: [
      //   { label: '类型A', value: '1' },
      //   { label: '类型B', value: '2' },
      //   { label: '类型C', value: '3' },
      // ],
      partyAOptions: [
        { label: 'test1', value: '1' },
        { label: 'test2', value: '2' },
        { label: 'test3', value: '3' },
      ],
      // partyBOptions: [
      //   { label: '公司A', value: '1' },
      //   { label: '公司B', value: '2' },
      //   { label: '公司C', value: '3' },
      // ],
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
    // handleFail({ file }) {
    //   this.$message.error(`文件 ${file.name} 上传失败`);
    // },
    // beforeUpload(file) {
    //   if (!/\.(pdf)$/.test(file.name)) {
    //     this.$message.warning('请上传pdf文件');
    //     return false;
    //   }
    //   return true;
    // },
    // 用于格式化接口响应值，error 会被用于上传失败的提示文字；url 表示文件/图片地址
    // formatResponse(res) {
    //   return { ...res, error: '上传失败，请重试', url: res.url };
    // },
    changeStatus() {
      this.stepSuccess = !this.stepSuccess;
    },
    onReset() {
      this.$message.warning('取消申请');
    },
    onSubmit({ validateResult }) {
      if (validateResult === true) {
        this.$request.post('api/meetings/apply',this.formData).then(res=> {
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
