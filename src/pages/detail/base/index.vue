<template>
  <div>
    <t-row :gutter="[16, 16]">
      <card title="会议基本信息">
        <t-button theme="default" variant="outline" style="width: 88px;height: 32px;position: absolute;right: 65px">
          返回
        </t-button>
        <div class="info-block">
          <div v-for="(item, index) in baseInfoData" :key="index" class="info-item">
            <h1>{{ item.name }}</h1>
            <span
              :class="{
              ['inProgress']: item.type && item.type.value === 'inProgress',
              ['pdf']: item.type && item.type.value === 'pdf',
            }"
            >
            <i v-if="item.type && item.type.key === 'contractStatus'" />
            {{ item.value }}
          </span>
          </div>
        </div>


        <t-button theme="primary" style="width: 88px;height: 32px;position: relative;left: 1249px">
          修改会议信息
        </t-button>
      </card>
      <t-col :flex="3">
        <card title="参会者信息查询">
          1231
        </card>

      </t-col>
      <t-col :flex="1">
        <card title="dfdfdfd">
          ddddd
        </card>
      </t-col>

    </t-row>




<!--    <card title="变更记录" class="container-base-margin-top">-->
<!--      <t-steps class="detail-base-info-steps" layout="vertical" theme="dot" :current="1">-->
<!--        <t-step-item title="上传合同附件" content="这里是提示文字" />-->
<!--        <t-step-item title="修改合同金额" content="这里是提示文字" />-->
<!--        <t-step-item title="新建合同" content="2020-12-01 15:00:00 管理员-李川操作" />-->
<!--      </t-steps>-->
<!--    </card>-->
  </div>
</template>
<script>
import { prefix } from '@/config/global';
import model from '@/service/service-detail-base';
import Card from '@/components/card/index.vue';

export default {
  name: 'DetailBase',
  components: { Card },
  data() {
    return {
      prefix,
      baseInfoData: model.getBaseInfoData(),
    };
  },
  methods: {},
};
</script>
<style lang="less" scoped>
@import './index';
</style>
