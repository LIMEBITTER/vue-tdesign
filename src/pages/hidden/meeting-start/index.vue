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
            <h1>会议预计开始时间</h1>
            {{formData.expectsTime}}
          </div>
          <div class="info-item">
            <h1>会议预计结束时间</h1>
            {{formData.expecteTime}}
          </div>
          <div class="info-item">
            <h1>会议开始时间</h1>
            {{formData.startTime}}

          </div>
          <div class="info-item">
            <h1>会议结束时间</h1>
            <div v-if="formData.endTime===null">\</div>
            <div v-else>{{formData.endTime}}</div>
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

      <t-row :gutter="[16, 16]" class="card-container-margin" v-show="formData.host===user_name">
        <t-col :xs="12" :xl="9">
          <card title="参会者信息查询" >
            <keep-alive>
              <common-table :mid="this.mid" />
            </keep-alive>
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

      <t-row :gutter="[16, 16]" class="card-container-margin" v-show="formData.host!==user_name">
        <t-col :xs="16" :xl="16">
          <card title="人脸签到（暂时以普通签到代替）" >
            <common-table-start-user/>
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
import {sCurrentMeetingInfo,endMeetingDev,recordMeetingInfo} from "@/utils/api.js";
// import FaceReg from "../components/FaceReg.vue";
import CommonTableStartUser from "../components/CommonTableStartUser.vue";

export default {
  name: 'MeetingStart',
  components: { Card ,CommonTable,CommonTableStartUser},
  data() {
    return {
      prefix,
      user_name:localStorage.getItem('user_name'),
      mid:'',
      baseInfoData: model.getBaseInfoData(),
      formData:[],
      // 结束会议时传输的数据
      endData:{

      }

    };
  },
  // mounted() {
  //   this.mid = this.$route.query.mid
  //   localStorage.setItem('current_mid',this.mid)
  //
  //   console.log('当前会议号',this.mid)
  //   const local_mid = localStorage.getItem('current_mid')
  //   sCurrentMeetingInfo(local_mid).then(res=>{
  //     console.log('查询当前会议信息',res)
  //     this.formData = res.data.result.meetingInfo
  //
  //   })
  // },
  // watch:{
  //   $route(to,from){
  //     console.log('路由监听======会议开始主界面',to,from)
  //     if (to.name==='ListFilterAll'){
  //       console.log('路由监听成功======会议开始主界面')
  //       console.log('当前mid',this.mid)
  //     }
  //   }
  // },
  created() {
    this.mid = this.$route.query.mid
    localStorage.setItem('current_mid',this.mid)

    console.log('当前会议号',this.mid)
    const local_mid = localStorage.getItem('current_mid')
    sCurrentMeetingInfo(local_mid).then(res=>{
      console.log('查询当前会议信息',res)
      this.formData = res.data.result.meetingInfo

    })
  },
  // 此页面不需要缓存 需要重复加载数据
  activated() {
    this.mid = this.$route.query.mid
    localStorage.setItem('current_mid',this.mid)

    console.log('当前会议号',this.mid)
    const local_mid = localStorage.getItem('current_mid')
    sCurrentMeetingInfo(local_mid).then(res=>{
      console.log('查询当前会议信息',res)
      this.formData = res.data.result.meetingInfo

    })


  },



  methods: {
    back(){
      // this.$router.push('/list/filterall')
      this.$router.go(-1)
    },
    endMeeting(){
      const eData = {mid:this.mid}
      endMeetingDev(eData).then(res=>{
        console.log('结束会议',res)
        if (res.data.code === "200"){
          this.$message.success("结束会议")
          recordMeetingInfo(eData).then(res=>{
            console.log('生成会议历史记录',res)
            if(res.data.code === "200"){
              this.$message.success("生成历史记录")

            }else{
              this.$message.error("历史记录生成失败")
            }
          })
          this.$router.push({name:'ListFilter'})
        }else{
          this.$message.error("结束会议失败")
        }
      })

    }

  },
};
</script>
<style lang="less" scoped>
@import 'src/pages/hidden/meeting-start/index';
</style>
