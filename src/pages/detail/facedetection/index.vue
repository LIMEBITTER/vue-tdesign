<template>
  <div>
    <t-row>
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


      </card>
        <t-col>
          <card title="人脸上传" class="container-base-margin-top">
            <camera/>


          </card>
        </t-col>


        <t-col >
          <card title="您的信息" class="container-base-margin-top" >
            <p>姓名：</p>
            <p>邮箱：</p>
            <p>电话：0</p>

          </card>

          <div class="form-submit-container" style="margin: auto">
                <t-button style="margin-top: 20px" theme="primary" class="form-submit-confirm" type="submit"> 人脸签到 </t-button>
          </div>
        </t-col>


    </t-row>
  </div>
</template>
<script>
import { prefix } from '@/config/global';
import model from '@/service/service-detail-base';
import Card from '@/components/card/index.vue';
import Camera from "../components/Camera.vue";

export default {
  name: 'FaceDetection',
  components: { Card,Camera },
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
@import './index';

</style>
