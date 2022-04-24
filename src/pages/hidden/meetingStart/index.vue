<template>
  <div>
    <t-row :gutter="[16, 16]">
      <card title="会议基本信息">
        <t-button theme="default" variant="outline" style="width: 88px;height: 32px;" @click="back()">
          返回
        </t-button>
        <div class="info-block">
          <div class="info-item">
            <h1>会议名</h1>
            {{formData.mname}}

          </div>
          <div class="info-item">
            <h1>会议号</h1>
            {{formData.mid}}
          </div>
          <div class="info-item">
            <h1>总人数</h1>
            {{formData.totalNum}}
          </div>
          <div class="info-item">
            <h1>申请人</h1>
            {{formData.host}}
          </div>
          <div class="info-item">
            <h1>会议状态</h1>
            <div v-if="formData.status===0">未开始</div>
            <div v-if="formData.status===1">进行中</div>

          </div>
          <div class="info-item">
            <h1>会议开始时间</h1>
            {{formData.startTime}}
          </div>
          <div class="info-item">
            <h1>会议预计时间</h1>

          </div>
          <div class="info-item">
            <h1>会议结束时间</h1>
            {{formData.endTime}}
          </div>
          <div class="info-item">
            <h1>创建时间</h1>

          </div>




            <!--            <span-->
<!--              :class="{-->
<!--              ['inProgress']: item.type && item.type.value === 'inProgress',-->
<!--            }"-->
<!--            >-->
<!--            <i v-if="item.type && item.type.key === 'contractStatus'" />-->
<!--            {{ item.value }}-->
<!--          </span>-->
        </div>

      </card>

      <t-row :gutter="[16, 16]" class="card-container-margin">
        <t-col :xs="12" :xl="9">
          <card title="参会者信息查询">
            <common-table :mid="formData.mid"/>
          </card>
        </t-col>
        <t-col :xs="12" :xl="3">
          <card title="签到">
            <p>已签到人数：40</p>
            <p>签到率：100%</p>
            <p>补签人数：0</p>
            <t-button style="margin-top: 10px" @click="endMeeting()">结束签到</t-button>

          </card>
        </t-col>
      </t-row>

    </t-row>

  </div>
</template>
<script>
import { prefix } from '@/config/global';
import model from '@/service/service-detail-base';
import Card from '@/components/card/index.vue';
import CommonTable from "../components/CommonTableStart.vue";

export default {
  name: 'MeetingStart',
  components: { Card ,CommonTable},
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
      // 结束会议时传输的数据
      endData:{

      }

    };
  },
  // 此页面不需要缓存 需要重复加载数据
  activated() {
    this.formData.mid = this.$route.params.mid
    this.formData.mname = this.$route.params.mname
    this.formData.host = this.$route.params.host
    this.formData.status = this.$route.params.status
    this.formData.startTime = this.$route.params.startTime
    this.formData.endTime = this.$route.params.endTime
    this.formData.totalNum = this.$route.params.totalNum
    console.log('detail',this.$route.params.mid)
  },

  methods: {
    back(){
      // this.$router.push('/list/filterall')
      this.$router.go(-1)
    },
    endMeeting(){
      console.log('结束会议！！！！')
      // this.$request.post('api/meetingRecord/endMeeting',this.endData).then(res=>{
      //   console.log('结束会议',res)
      //
      // })
      this.$router.push({name:'ListFilter'})
    }

  },
};
</script>
<style lang="less" scoped>
@import 'src/pages/hidden/meetingStart/index';
</style>
