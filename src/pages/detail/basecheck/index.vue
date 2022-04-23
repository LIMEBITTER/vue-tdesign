<template>
  <div>
    <t-row :gutter="[16, 16]">
      <card title="会议基本信息">
        <t-button theme="default" variant="outline" style="width: 88px;height: 32px;" @click="back()">
          返回
        </t-button>
        <div class="info-block">
          <h1>会议名</h1>
          <h1>会议号{{formData.mid}}</h1>
          <h1>总人数{{formData.totalNum}}</h1>
          <h1>申请人</h1>
          <h1>会议状态</h1>
          <h1>会议开始时间{{formData.startTime}}</h1>
          <h1>会议预计时间</h1>
          <h1>会议结束时间{{formData.endTime}}</h1>
          <h1>创建时间</h1>
          <div class="info-item">
            <!--            <span-->
<!--              :class="{-->
<!--              ['inProgress']: item.type && item.type.value === 'inProgress',-->
<!--            }"-->
<!--            >-->
<!--            <i v-if="item.type && item.type.key === 'contractStatus'" />-->
<!--            {{ item.value }}-->
<!--          </span>-->
          </div>
        </div>


        <t-button theme="primary" style="width: 88px;height: 32px;">
          修改
        </t-button>
      </card>
    </t-row>




  </div>
</template>
<script>
import { prefix } from '@/config/global';
import model from '@/service/service-detail-base';
import Card from '@/components/card/index.vue';

export default {
  name: 'BaseCheck',
  components: { Card },
  data() {
    return {
      prefix,
      baseInfoData: model.getBaseInfoData(),
      formData:{
        mid:'',
        startTime:'',
        endTime:'',
        totalNum:null,
      },

    };
  },
  // 此页面不需要缓存 需要重复加载数据
  activated() {
    this.formData.mid = this.$route.params.mid
    this.formData.startTime = this.$route.params.startTime
    this.formData.endTime = this.$route.params.endTime
    this.formData.totalNum = this.$route.params.totalNum
    console.log('detail',this.$route.params.mid)
  },

  methods: {
    back(){
      // this.$router.push('/list/filter')
      this.$router.go(-1)
    }
  },
};
</script>
<style lang="less" scoped>
@import './index';
</style>
