<template>
  <t-row :gutter="[16, 16]">
    <t-col :flex="3">

      <card class="user-info-list" size="small" title="会议人员信息">
        <template #option>
          <t-button theme="default" shape="square" variant="text">
            <t-icon name="edit" size="18" />
          </t-button>
        </template>
        <t-row class="content" justify="space-between">
          <t-col v-for="(item, index) in USER_INFO_LIST" :key="index" class="contract" :span="item.span || 3">
            <div class="contract-title">
              {{ item.title }}
            </div>
            <div class="contract-detail">
              {{ item.content }}
            </div>
          </t-col>
        </t-row>
      </card>

    </t-col>

    <t-col :flex="1">
      <card class="user-intro">
        <t-avatar size="90px">T</t-avatar>
        <div class="name">My Account</div>
        <div class="position">XXG 港澳业务拓展组员工 直客销售</div>
      </card>


    </t-col>
  </t-row>
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

import Card from '@/components/card/index.vue';

echarts.use([GridComponent, TooltipComponent, LineChart, CanvasRenderer, LegendComponent]);

export default {
  name: 'MemberIndex',

  components: {
    Card,

  },
  data() {
    return {
      prefix,
      dashboardBase: '',
      lineContainer: '',
      lineChart: '',
      USER_INFO_LIST,
      visible1:false,

    };
  },
  computed: {
    ...mapState('setting', ['brandTheme', 'mode']),
  },
  watch: {
    brandTheme() {
      changeChartsTheme([this.lineChart]);
    },
    mode() {
      this.renderCharts();
    },
    lineChart() {
      this.updateContainer();
    },
  },
  mounted() {
    window.addEventListener('resize', this.updateContainer, false);
    this.renderCharts();
    this.$nextTick(() => {
      this.updateContainer();
    });
  },
  methods: {
    /** 图表选择 */
    onLineChange(value) {
      this.lineChart.setOption(getFolderLineDataSet({ dateTime: value }));
    },
    updateContainer() {
      this.lineChart.resize?.({
        width: this.lineContainer.clientWidth,
        height: this.lineContainer.clientHeight,
      });
    },
    renderCharts() {
      const { chartColors } = this.$store.state.setting;
      if (!this.lineContainer) {
        this.lineContainer = document.getElementById('lineContainer');
      }
      this.lineChart = echarts.init(this.lineContainer);
      this.lineChart.setOption({
        grid: {
          x: 30, // 默认是80px
          y: 30, // 默认是60px
          x2: 10, // 默认80px
          y2: 30, // 默认60px
        },
        ...getFolderLineDataSet({ ...chartColors }),
      });
    },
    getIcon(type) {
      switch (type) {
      case 'a':
        return ProductAIcon;
      case 'b':
        return ProductBIcon;
      case 'c':
        return ProductCIcon;
      case 'd':
        return ProductDIcon;
      default:
        return ProductAIcon;
      }
    },

    onConfirm(context) {
      const { e } = context;
      // todo something else here
      this.sendingRequest();
      this.visible1 = false;

      e.stopPropagation();
    },
    sendingRequest() {
      console.log('sending request');
    },
    close1() {
      this.visible1 = false;
    },
  },
};
</script>
<style lang="less" scoped>
@import url('./index.less');
</style>
