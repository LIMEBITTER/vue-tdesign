<template>
  <div>
    <t-row :gutter="[16, 16]">
      <card title="会议基本信息">
        <t-button theme="default" variant="outline" style="width: 88px;height: 32px;">
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


        <t-button theme="primary" style="width: 88px;height: 32px;">
          修改
        </t-button>
      </card>

      <t-row :gutter="[16, 16]" class="card-container-margin">
        <t-col :xs="12" :xl="9">
          <card title="参会者信息查询">
            <common-table/>
          </card>
        </t-col>
        <t-col :xs="12" :xl="3">
          <card title="签到">
            <p>已签到人数：40</p>
            <p>签到率：100%</p>
            <p>补签人数：0</p>
            <t-button style="margin-top: 10px">结束签到</t-button>

          </card>
        </t-col>
      </t-row>

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
import CommonTable from "../components/CommonTable.vue";

export default {
  name: 'DetailBase',
  components: { Card ,CommonTable},
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
