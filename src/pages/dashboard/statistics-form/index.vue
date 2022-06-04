<template>
  <div class="dashboard-panel-detail">
    <card title="本月会议使用情况">
      <t-row :gutter="[16, 16]">
        <t-col v-for="(item, index) in CHART_LIST" :key="index" :xs="6" :xl="3">
          <card border class="dashboard-detail-container-item" size="small" :describe="item.title">
            <div class="number" style="width: 88px">{{ item.number }}</div>
            <div class="myCharts" name="myCharts" style="height: 75px" ></div>

            <!--            <div class="dashboard-detail-container-item-text">-->
<!--              <div class="dashboard-detail-container-item-text-left">-->
<!--                环比-->
<!--                <trend class="icon" :type="item.upTrend ? 'up' : 'down'" :describe="item.upTrend || item.downTrend" />-->
<!--              </div>-->
<!--              <t-icon name="chevron-right" />-->
<!--            </div>-->
          </card>


        </t-col>
      </t-row>
    </card>
    <t-row :gutter="[16, 16]" class="card-container-margin">
<!--      <t-col :xs="12" :xl="9">-->

<!--      <t-col v-for="(item,index) in CHART_LIST" :key="index" :xs="6" :xl="3">-->
<!--        <card border class="dashboard-detail-container-item" size="small" :describe="item.title">-->
<!--          <div class="myCharts" style="width: 210px;height: 75px" ></div>-->


<!--        </card>-->
<!--      </t-col>-->
<!--      <div @click="testPush">tiaozhuan</div>-->
<!--      <t-button @click="testPush">12121212</t-button>-->






      <!--      </t-col>-->
      <t-col :xs="12" :xl="3">

      </t-col>
    </t-row>

  </div>
</template>
<script lang="ts">
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components';
import {LineChart, PieChart, ScatterChart} from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import * as echarts from 'echarts';
import { mapState } from 'vuex';

import Trend from '@/components/trend/index.vue';
import Card from '@/components/card/index.vue';
import { prefix } from '@/config/global';

import { LAST_7_DAYS } from '@/utils/date';
import {interval, Line} from "@antv/g2plot";
import ProductCard from '@/components/card/component-card.vue';
import { PANE_LIST_DATA, PRODUCT_LIST } from '@/service/service-detail';
import { changeChartsTheme, getFolderLineDataSet,getPieChartDataSet, getScatterDataSet } from '../base';

echarts.use([GridComponent, LegendComponent, PieChart,TooltipComponent, LineChart, ScatterChart, CanvasRenderer]);

export default {
  name: 'DashboardDetail',

  components: { Trend, Card, ProductCard },

  data() {
    return {

      resizeTime: 1,

      prefix,
      PANE_LIST_DATA,
      PRODUCT_LIST,
      dashboardBase: '',
      lineContainer: '',
      scatterContainer: '',
      lineChart: '',
      scatterChart: '',
      LAST_7_DAYS,
      CHART_LIST:[
        {
          title: '总申请数（次）',
          number: '1126',
          resData:[
            {Date:"2022-05-03",scales:12},
            {Date:"2022-05-04",scales:32},
            {Date:"2022-05-05",scales:23},
            {Date:"2022-05-06",scales:17},
            {Date:"2022-05-07",scales:22},
            {Date:"2022-05-08",scales:33},
            {Date:"2022-05-09",scales:31},
          ]

          // Date:['2022-05-03','2022-05-04','2022-05-05','2022-05-06','2022-05-07','2022-05-08','2022-05-09'],
          // scales: [12,32,23,17,22,33,31]
        },
        {
          title: '使用会议时间',
          number: '13',
          resData: [
            {Date:"2022-05-03",scales:22},
            {Date:"2022-05-04",scales:12},
            {Date:"2022-05-05",scales:33},
            {Date:"2022-05-06",scales:17},
            {Date:"2022-05-07",scales:15},
            {Date:"2022-05-08",scales:25},
            {Date:"2022-05-09",scales:28},
          ]
          // Date:['2022-05-03','2022-05-04','2022-05-05','2022-05-06','2022-05-07','2022-05-08','2022-05-09'],
          // scales: [22,12,33,17,15,25,28]
        },
        {
          title: '参加会议次数',
          number: '4',
          resData: [
            {Date:"2022-05-03",scales:12},
            {Date:"2022-05-04",scales:23},
            {Date:"2022-05-05",scales:13},
            {Date:"2022-05-06",scales:27},
            {Date:"2022-05-07",scales:32},
            {Date:"2022-05-08",scales:13},
            {Date:"2022-05-09",scales:31},
          ]
          // Date:['2022-05-03','2022-05-04','2022-05-05','2022-05-06','2022-05-07','2022-05-08','2022-05-09'],
          // scales: [12,23,13,27,32,13,31]
        },
        {
          title: '签到成功次数',
          number: 90,
          resData: [
            {Date:"2022-05-03",scales:22},
            {Date:"2022-05-04",scales:12},
            {Date:"2022-05-05",scales:23},
            {Date:"2022-05-06",scales:12},
            {Date:"2022-05-07",scales:22},
            {Date:"2022-05-08",scales:38},
            {Date:"2022-05-09",scales:21},
          ]
          // Date:['2022-05-03','2022-05-04','2022-05-05','2022-05-06','2022-05-07','2022-05-08','2022-05-09'],
          // scales: [22,12,23,12,22,39,21]
        },
        {
          title: '您的签到率（%）',
          number: 80.5,
          resData: [
            {Date:"2022-05-03",scales:90},
            {Date:"2022-05-04",scales:56},
            {Date:"2022-05-05",scales:78},
            {Date:"2022-05-06",scales:89},
            {Date:"2022-05-07",scales:34},
            {Date:"2022-05-08",scales:99},
            {Date:"2022-05-09",scales:74},
          ]
          // Date:['2022-05-03','2022-05-04','2022-05-05','2022-05-06','2022-05-07','2022-05-08','2022-05-09'],
          // scales: [90,56,78,89,34,99,74]
        },
        {
          title: '会完成会议签到次数',
          number: 78,
          resData: [
            {Date:"2022-05-03",scales:95},
            {Date:"2022-05-04",scales:77},
            {Date:"2022-05-05",scales:29},
            {Date:"2022-05-06",scales:85},
            {Date:"2022-05-07",scales:65},
            {Date:"2022-05-08",scales:24},
            {Date:"2022-05-09",scales:21},
          ]
          // Date:['2022-05-03','2022-05-04','2022-05-05','2022-05-06','2022-05-07','2022-05-08','2022-05-09'],
          // scales: [95,77,29,85,65,24,21]
        },
        {
          title: '补签数',
          number: 78,
          resData: [
            {Date:"2022-05-03",scales:42},
            {Date:"2022-05-04",scales:32},
            {Date:"2022-05-05",scales:23},
            {Date:"2022-05-06",scales:17},
            {Date:"2022-05-07",scales:64},
            {Date:"2022-05-08",scales:33},
            {Date:"2022-05-09",scales:39},
          ]
          // Date:['2022-05-03','2022-05-04','2022-05-05','2022-05-06','2022-05-07','2022-05-08','2022-05-09'],
          // scales: [42,32,23,17,64,33,39]
        },

      ],
      // currentMonth: this.getThisMonth(),

    };
  },
  computed: {
    ...mapState('setting', ['brandTheme', 'mode']),
  },

  mounted() {
  //   this.renderCharts();
    this.drawChart()
    //   this.initEchart()

  },
  methods: {
    // testPush(){
    //   console.log('testpush')
    //   window.open('https://www.baidu.com')
    //   // this.$router.push('src/pages/hidden/testvue/test-vue.vue')
    // },
    drawChart(){
      // const data=[
      //   {Date:"2022-05-03",scales:32},
      //   {Date:"2022-05-04",scales:23},
      //   {Date:"2022-05-05",scales:12},
      //   {Date:"2022-05-06",scales:18},
      //   {Date:"2022-05-07",scales:38},
      //   {Date:"2022-05-08",scales:40},
      //   {Date:"2022-05-09",scales:29},
      //   {Date:"2022-05-10",scales:16},
      // ];
      const arr = document.getElementsByName('myCharts')
      console.log('length',this.CHART_LIST.length)
      for (let i =0;i<this.CHART_LIST.length;i++){
        const cData = this.CHART_LIST[i].resData

        const line = new Line(arr[i], {
          data:cData,
          padding: 'auto',
          xField: 'Date',
          yField: 'scales',
          xAxis: {
            // type: 'timeCat',
            tickCount: 0,
            line:null
          },
          yAxis:{
            tickCount:0,
          }
        });
        line.render()
      }


    },
    initEchart(){
      // type EChartsOption = echarts.EChartsOption;

      // const chartDom = document.getElementById('myCharts')!;
      const chartDom = document.getElementsByClassName('myCharts');

      for (let i = 0;i<chartDom.length;i++){
        const myChart = echarts.init(chartDom[i]);
        // let option: EChartsOption;
        // eslint-disable-next-line prefer-const
        let option = {
          grid: {
            x: 30,
            y: 80,

          },
          tooltip:{
            trigger:'axis'
          },
          toolbox:{
            show:true
          },
          xAxis: [{
            type: 'category',
            data: this.CHART_LIST[i].name,
            show:false

          }],
          yAxis:[{
            type:'value',
            axisLabel:{
              interval:2
            }

          }],
          series: [
            {
              data: this.CHART_LIST[i].value,
              type: 'line',

            }
          ]
        };

        // eslint-disable-next-line no-unused-expressions
        myChart.setOption(option);
      }



    }

  },
};
</script>
<style lang="less" scoped>
@import './index';
  /*.myCharts{*/
  /*  margin-left: 106px;*/
  /*  margin-top: -14px;*/
  /*}*/
</style>
