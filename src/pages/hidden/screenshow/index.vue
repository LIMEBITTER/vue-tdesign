<template>
  <div class="list-card-items">
    <t-row :gutter="[16,16]">
      <t-col :xs="4" :xl="4" :lg="4"><card title="1-1"><div id="TimeRank" style="height: 260px"/></card></t-col>
      <t-col :xs="4" :xl="4" :lg="4">
        <card title="已签到" style="height: 260px">
<!--          <div title="已签到"></div>-->
<!--          <div title="未签到"></div>-->

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
import * as echarts from 'echarts/core';
import { mapState } from 'vuex';

import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { changeChartsTheme, getFolderLineDataSet } from '@/pages/dashboard/base/index';

import { USER_INFO_LIST} from '@/service/service-user';
import ProductAIcon from '@/assets/assets-product-1.svg';
import ProductBIcon from '@/assets/assets-product-2.svg';
import ProductCIcon from '@/assets/assets-product-3.svg';
import ProductDIcon from '@/assets/assets-product-4.svg';
import Charts from '@/pages/dashboard/detail/index.vue'
import Card from '@/components/card/index.vue';
import {Bar,Gauge,Pie,Area,Column} from '@antv/g2plot';

echarts.use([GridComponent, TooltipComponent, LineChart, CanvasRenderer, LegendComponent]);

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
      // TEAM_MEMBERS,
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
  mounted() {
    // window.addEventListener('resize', this.updateContainer, false);
    // this.renderCharts();
    // this.$nextTick(() => {
    //   this.updateContainer();
    // });
    this.initR1C1()
    this.initR1C3()
    this.initR2C1()
    this.initR2C2()
    this.initR2C3()
  },
  methods: {
    initR1C1(){
      const data = [
        {
          type: '张三',
          sales: 38,
        },
        {
          type: '王五',
          sales: 52,
        },
        {
          type: '李四',
          sales: 61,
        },
        {
          type: '周八',
          sales: 145,
        },
        {
          type: '赵六',
          sales: 48,
        },

      ];

      const barPlot = new Bar('TimeRank', {
        data,
        xField: 'sales',
        yField: 'type',
        barWidthRatio: 0.8,
        meta: {
          type: {
            alias: '类别',
          },
          sales: {
            alias: '销售额',
          },
        },
      });

      barPlot.render();
    },
    initR1C3(){

      const color = ['#F4664A', '#FAAD14', '#30BF78'];
      const getColor = (percent) => {
        return percent < 0.4 ? color[0] : percent < 0.6 ? color[1] : color[2];
      };
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

      let data = 0.2;
      const interval = setInterval(() => {
        if (data >= 0.85) {
          clearInterval(interval);
        } else {
          data += 0.001;
          gauge.changeData(data);
          gauge.update({ range: { color: getColor(data) } });
        }
      }, 100);

    },
    initR2C1(){

      const data = [
        { type: '赵', value: 27 },
        { type: '钱', value: 25 },
        { type: '孙', value: 18 },
        { type: '李', value: 15 },
        { type: '周', value: 10 },
        { type: '物', value: 5 },
      ];

      const piePlot = new Pie('NamePieChart', {
        appendPadding: 10,
        data,
        angleField: 'value',
        colorField: 'type',
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

      fetch('https://gw.alipayobjects.com/os/bmw-prod/360c3eae-0c73-46f0-a982-4746a6095010.json')
        .then((res) => res.json())
        .then((originalData) => {
          let cnt = 2;
          const area = new Area('PeopleDynamic', {
            data: originalData.slice(0, cnt),
            xField: 'timePeriod',
            yField: 'value',
            xAxis: {
              range: [0, 1],
            },
          });
          area.render();

          const interval = setInterval(() => {
            if (cnt === originalData.length) {
              clearInterval(interval);
            } else {
              cnt += 1;
              area.changeData(originalData.slice(0, cnt));
            }
          }, 400);
        });

    },
    initR2C3(){

      const data = [
        {
          type: '张三',
          sales: 38,
        },
        {
          type: '李四',
          sales: 52,
        },
        {
          type: '王五',
          sales: 61,
        },
        {
          type: '赵六',
          sales: 145,
        },
        {
          type: '周八',
          sales: 48,
        },

      ];

      const columnPlot = new Column('EarlyRank', {
        data,
        xField: 'type',
        yField: 'sales',
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
          type: {
            alias: '类别',
          },
          sales: {
            alias: '销售额',
          },
        },
      });

      columnPlot.render();
    }

  },
};
</script>
<style lang="less" scoped>
@import url('./index.less');
</style>
