<template>
  <div class="list-card-items">
    <t-row :gutter="[16,16]">
      <t-col :xs="4" :xl="4" :lg="4"><card title="1-1"><div id="TimeRank" style="height: 260px"/></card></t-col>
      <t-col :xs="4" :xl="4" :lg="4">
        <card title="已签到" style="height: 371px">
          <div class="signed">
            <div  class="signed-item" v-for="(item) in signedPeople">
              {{item.uname}}
            </div>
          </div>

          <br>
          <p style="font-size: 20px;color: black">未签到</p>
          <div class="signed">
            <div  class="signed-item" v-for="(item) in unSignedPeople">
              {{item.uname}}
            </div>
          </div>


        </card>
      </t-col>
      <t-col :xs="4" :xl="4" :lg="4"><card title="1-3"><div id="DynamicDashboard" style="height: 260px"/></card></t-col>

    </t-row>
    <t-row :gutter="[16,16]" class="user-info-list">
      <t-col :xs="4" :xl="4" :lg="4"><card title="2-1"><div id="NamePieChart" style="height: 300px"/></card></t-col>
      <t-col :xs="4" :xl="4" :lg="4"><card title="2-2"><div id="PeopleDynamic" style="height: 300px"/></card></t-col>
      <t-col :xs="4" :xl="4" :lg="4"><card title="2-3"><div id="EarlyRank" style="height: 300px"/></card></t-col>

    </t-row>
    <t-row class="user-info-list" style="text-align: center;vertical-align:middle;">
      <t-col :xs="4" :xl="4"></t-col>
      <t-col :xs="4" :xl="4">
        <t-button>结束签到</t-button>
        <t-button>结束会议</t-button>
      </t-col>
      <t-col :xs="4" :xl="4"></t-col>


    </t-row>


  </div>
</template>
<script>
import { prefix } from '@/config/global';

import { LAST_7_DAYS } from '@/utils/date.ts';
import { mapState } from 'vuex';

import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components';


import { USER_INFO_LIST} from '@/service/service-user';

import Card from '@/components/card/index.vue';
import {Bar,Gauge,Pie,Area,Column} from '@antv/g2plot';
import {connectWebsocket, closeWebsocket} from "@/utils/socket.js"


export default {
  name: 'UserIndex',

  components: {
    Card,
    // Charts
    // ProductAIcon,
    // ProductBIcon,
    // ProductCIcon,
    // ProductDIcon,
  },
  beforeRouteLeave(to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    console.log("****************Test1****Leave**************");
    console.log(this, 'Leave'); // 当前组件实例
    console.log('to', to);
    console.log('from', from);
    console.log('next', next);
    closeWebsocket();
    clearInterval()
    next();
  },
  data() {
    return {
      prefix,
      user_name:localStorage.getItem('user_name'),
      dashboardBase: '',
      lineContainer: '',
      lineChart: '',
      // LAST_7_DAYS,
      USER_INFO_LIST,
      visible1:false,
      webSocketMessage:{},
      R2C3Data:{},
      // TEAM_MEMBERS,
      // 已签到数据
      signedPeople:[{uname:'张三'},{uname:'李四'},{uname:'王五'},{uname:'赵六'},{uname:'唐老鸭'},{uname:'黑牛'},{uname:'白牛'}],
      // 未签到数据
      unSignedPeople:[{uname:'丽丽'},{uname:'虎哥'},{uname:'fw刀'},{uname:'赵三金'},{uname:'孙笑川'},{uname:'小亮'},]


      // PRODUCT_LIST,
    };
  },
  computed: {
    ...mapState('setting', ['brandTheme', 'mode']),
  },
  // watch: {
  //   brandTheme() {
  //     changeChartsTheme([this.lineChart]);
  //   },
  //   mode() {
  //     this.renderCharts();
  //   },
  //   lineChart() {
  //     this.updateContainer();
  //   },
  // },
  created() {


    console.log('created============')
    // const taskIds = {mid:localStorage.getItem('current_mid'),uid:localStorage.getItem('uid')};
    const taskIds = {}
    const mid = '534449846'
    const uid = localStorage.getItem('uid')
    console.log(taskIds)
    connectWebsocket(
      // 链接地址
      `ws://10.18.220.188:5518/meeting?mid=${mid}&uid=${uid}`,
      // 传递给后台的数据
      // taskIds,
      // 成功拿到后台返回的数据的回调函数
      this.wsMessage,
      // websocket连接失败的回调函数
      this.wsError
    );

    // console.log('websocketmessage',this.webSocketMessage)





  },


  mounted() {
    // window.addEventListener('resize', this.updateContainer, false);
    // this.renderCharts();
    // this.$nextTick(() => {
    //   this.updateContainer();
    // });
    console.log('mounted===========')
    this.initR1C1()
    this.initR1C3()
    this.initR2C1()
    this.initR2C2()
    this.initR2C3()
  },
  beforeDestroy() {
    console.log('摧毁')
    // closeWebsocket()
  },
  methods: {

    // ws连接成功，后台返回的ws数据，组件要拿数据渲染页面等操作
    wsMessage (data) {
      this.webSocketMessage = data
      console.log('websocket',this.webSocketMessage)

      console.log(data,"链接成功的回调");

    },
    // ws连接失败，组件要执行的代码
    wsError () {
      console.log("链接失败的回调");
    },
    getData(){
      console.log('getdata',this.wsMessage())
    },





    initR1C1(){
      // 图表 1-1
      // 在会时长排名
      // name:参会人员姓名 hours:在会时长
      const data = [];

      const barPlot = new Bar('TimeRank', {
        data,
        xField: 'continuedTime',
        yField: 'uname',
        barWidthRatio: 0.8,
        meta: {
          name: {
            alias: '姓名',
          },
          hours: {
            alias: '在会时长',
          },
        },
      });

      barPlot.render();
      setInterval(() => {
        const temp  = JSON.parse((this.webSocketMessage))
        const newData = []
        const times = temp.countinueTimeTop5.map(item=>({uname:item.uname,continuedTime:item.continuedTime}))
        times.forEach((i,index) => {
          const arr = i.continuedTime.split(':')
          const minute = (+arr[0]) * 60  + (+arr[1]);
          console.log('将时间转化为分钟======',minute)
          newData.push({uname: i.uname,continuedTime:minute})

        })

        console.log('timess=============',newData)
        barPlot.changeData(newData);
      }, 5000);
    },
    initR1C3(){

      const color = ['#F4664A', '#FAAD14', '#30BF78'];
      const getColor = (percent) => percent < 0.4 ? color[0] : percent < 0.6 ? color[1] : color[2];
      const gauge = new Gauge('DynamicDashboard', {
        percent: 0.2,
        range: {
          color: getColor(0.2),
        },
        indicator: {
          pointer: {
            style: {
              stroke: '#D0D0D0',
            },
          },
          pin: {
            style: {
              stroke: '#D0D0D0',
            },
          },
        },
        axis: {
          label: {
            formatter(v) {
              return Number(v) * 100;
            },
          },
          subTickLine: {
            count: 3,
          },
        },
        statistic: {
          content: {
            formatter: ({ percent }) => `Rate: ${(percent * 100).toFixed(0)}%`,
          },
          style: {
            fontSize: 60,
          },
        },
        animation: false,
      });

      gauge.render();

      // let data = 0.2;
      const interval = setInterval(() => {
        const temp  = JSON.parse((this.webSocketMessage))
        const data = temp.signTotal / temp.meetingTotal
        console.log('当前签到人数与总人数之比',temp.signTotal,temp.meetingTotal,data)
        gauge.changeData(data);

        // if (data >= 0.85) {
        //   clearInterval(interval);
        // } else {
        //   data += 0.001;
        //   gauge.changeData(data);
        //   gauge.update({ range: { color: getColor(data) } });
        // }
      }, 5000);

    },
    initR2C1(){

      // 图表2-1
      // 姓氏分布图 （当前会议）
      // firstName:姓氏  value：该姓氏人数
      const data = [
        { firstName: '赵', value: 27 },
        { firstName: '钱', value: 25 },
        { firstName: '孙', value: 18 },
        { firstName: '李', value: 15 },
        { firstName: '周', value: 10 },
        { firstName: '物', value: 5 },
      ];

      const piePlot = new Pie('NamePieChart', {
        appendPadding: 10,
        data,
        angleField: 'value',
        colorField: 'firstName',
        radius: 1,
        innerRadius: 0.6,
        label: {
          type: 'inner',
          offset: '-50%',
          content: '{value}',
          style: {
            textAlign: 'center',
            fontSize: 14,
          },
        },
        interactions: [{ type: 'element-selected' }, { type: 'element-active' }],
        statistic: {
          title: false,
          content: {
            style: {
              whiteSpace: 'pre-wrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            },
            content: '姓氏分布',
          },
        },
      });

      piePlot.render();

    },
    initR2C2(){

      // 图表2-2 上半
      // 人数动态图
      // timePeriod: 会议时间  value：当前时间的会议人数
      const data = [
        // {currentTime:'19:22:00',signTotal:2},
        // {currentTime:'19:22:05',signTotal:2},
        // {currentTime:'19:22:10',signTotal:2}
      ]
      const area = new Area('PeopleDynamic', {
        data,
        xField: 'currentTime',
        yField: 'signTotal',
        xAxis: {
          range: [0, 1],
        },
      });
      area.render();

      setInterval(() => {
        // console.log('图表更新sockmessage==========',this.webSocketMessage)

        const temp  = JSON.parse((this.webSocketMessage))
        console.log('图表更新sockmessage==========R2C2',temp.now)
        const newData = {currentTime:temp.now.substr(11),signTotal:temp.signTotal}
        console.log('数据push！！！',data.push(newData))
        console.log('data数据！！',data)

        // const newData = line.options.data.slice(1).concat({ x, y });
        area.changeData(data);
      }, 5000);

    },
    initR2C3(){
      // 图表2-3
      // 签到时间排名图
      // name:签到人员姓名
      // signTime:签到时间
      // const data = [
      //   {
      //     name: '张三',
      //     signTime: 38,
      //   },
      //   {
      //     name: '李四',
      //     signTime: 52,
      //   },
      //   {
      //     name: '王五',
      //     signTime: 61,
      //   },
      //   {
      //     name: '赵六',
      //     signTime: 145,
      //   },
      //   {
      //     name: '周八',
      //     signTime: 48,
      //   },
      //
      // ];
      // console.log(this.webSocketMessage.signTimeTop5)

      const data = []

      const columnPlot = new Column('EarlyRank', {
        data,
        xField: 'uname',
        yField: 'signTime',
        label: {
          // 可手动配置 label 数据标签位置
          position: 'middle', // 'top', 'bottom', 'middle',
          // 配置样式
          style: {
            fill: '#FFFFFF',
            opacity: 0.6,
          },
        },
        xAxis: {
          label: {
            autoHide: true,
            autoRotate: false,
          },
        },
        meta: {
          uname: {
            alias: '姓名',
          },
          signTime: {
            alias: '签到时间',
          },
        },
      });

      columnPlot.render();
      setInterval(() => {
        // console.log('图表更新sockmessage==========',JSON.stringify(this.webSocketMessage))
        const temp  = JSON.parse((this.webSocketMessage))
        console.log('图表更新sockmessage==========R2C3',temp.signTimeTop5)
        const newData = temp.signTimeTop5

        // const newData = line.options.data.slice(1).concat({ x, y });
        columnPlot.changeData(newData);
      }, 5000);
    },



  },


};
</script>
<style lang="less" scoped>
@import url('./index.less');

.signed{
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
}
.signed-item{
  flex: 1;
  height: 20px;
  text-align: center;
  /*margin: 0 20px 20px 0; // 间隙为20px*/
  /*padding-top: 20px;*/
  /*border: 1px solid #888;*/
  box-sizing: border-box;
  position: relative;
  bottom: 20px;

  width: calc((100% - 60px) / 4);   // 我这里一行显示4个 所以是/4  一行显示几个就除以几
  // 这里的60px = (分布个数4-1)*间隙20px, 可以根据实际的分布个数和间隙区调整
  min-width: calc((100% - 60px) / 4);
  max-width: calc((100% - 60px) / 4);

  &:nth-child(4n + 4) {
    margin-right: 0;
  }

}
</style>
