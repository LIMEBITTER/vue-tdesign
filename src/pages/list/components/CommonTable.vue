<template>
  <div class="list-common-table">
    <t-form ref="form" :data="formData" :label-width="80" colon @reset="onReset" @submit="onSubmit">
      <t-row>
        <t-col :span="10">
          <t-row :gutter="[16, 16]">
            <t-col :flex="1">
              <t-form-item label="会议名" name="name">
                <t-input
                  v-model="formData.mname"
                  class="form-item-content"
                  type="search"
                  placeholder="请输入会议名称"
                  :style="{ minWidth: '134px' }"
                />
              </t-form-item>
            </t-col>
            <t-col :flex="1">
              <t-form-item label="会议状态" name="status">
                <t-select
                  v-model="formData.status"
                  class="form-item-content`"
                  :options="CONTRACT_STATUS_OPTIONS"
                  placeholder="请选择会议状态"
                />
              </t-form-item>
            </t-col>
            <t-col :flex="1">
              <t-form-item label="会议号" name="no">
                <t-input
                  v-model="formData.mid"
                  class="form-item-content"
                  placeholder="请输入会议号"
                  :style="{ minWidth: '134px' }"
                />
              </t-form-item>
            </t-col>
<!--            <t-col :flex="1">-->
<!--              <t-form-item label="合同类型" name="type">-->
<!--                <t-select-->
<!--                  v-model="formData.type"-->
<!--                  class="form-item-content`"-->
<!--                  :options="CONTRACT_TYPE_OPTIONS"-->
<!--                  placeholder="请选择合同类型"-->
<!--                />-->
<!--              </t-form-item>-->
<!--            </t-col>-->
          </t-row>
        </t-col>

        <t-col :span="2" class="operation-container">
          <t-button theme="primary" type="submit" :style="{ marginLeft: '8px' }"> 查询 </t-button>
          <t-button type="reset" variant="base" theme="default"> 重置 </t-button>
        </t-col>
      </t-row>
    </t-form>
    <div class="table-container">
      <t-table
        :data="data"
        :columns="columns"
        :rowKey="rowKey"
        :verticalAlign="verticalAlign"
        :hover="hover"
        :pagination="pagination"
        @page-change="rehandlePageChange"
        @change="rehandleChange"
        :loading="dataLoading"
      >
        <template #status="{ row }">
          <t-tag v-if="row.status === CONTRACT_STATUS.FAIL" theme="danger" variant="light">审核失败</t-tag>
          <t-tag v-if="row.status === CONTRACT_STATUS.AUDIT_PENDING" theme="warning" variant="light">待审核</t-tag>
          <t-tag v-if="row.status === CONTRACT_STATUS.EXEC_PENDING" theme="warning" variant="light">未开始</t-tag>
          <t-tag v-if="row.status === CONTRACT_STATUS.EXECUTING" theme="success" variant="light">进行中</t-tag>
          <t-tag v-if="row.status === CONTRACT_STATUS.FINISH" theme="success" variant="light">已结束</t-tag>
        </template>
        <template #contractType="{ row }">
          <p v-if="row.contractType === CONTRACT_TYPES.MAIN">审核失败</p>
          <p v-if="row.contractType === CONTRACT_TYPES.SUB">待审核</p>
          <p v-if="row.contractType === CONTRACT_TYPES.SUPPLEMENT">待履行</p>
        </template>
<!--        <template #paymentType="{ row }">-->
<!--          <p v-if="row.paymentType === CONTRACT_PAYMENT_TYPES.PAYMENT" class="payment-col">-->
<!--            付款<trend class="dashboard-item-trend" type="up" />-->
<!--          </p>-->
<!--          <p v-if="row.paymentType === CONTRACT_PAYMENT_TYPES.RECIPT" class="payment-col">-->
<!--            收款<trend class="dashboard-item-trend" type="down" />-->
<!--          </p>-->
<!--        </template>-->
        <template #op="slotProps">
          <a class="t-button-link" @click="startMeeting(slotProps)">开始会议</a>
          <a class="t-button-link" @click="handleClickDetail()">管理</a>
          <a class="t-button-link" @click="handleClickDelete(slotProps)">删除</a>
        </template>
      </t-table>
      <t-dialog
        header="确认删除当前所选会议？"
        :body="confirmBody"
        :visible.sync="confirmVisible"
        @confirm="onConfirmDelete"
        :onCancel="onCancel"
      >
      </t-dialog>
    </div>
  </div>
</template>
<script>
import { prefix } from '@/config/global';
import Trend from '@/components/trend/index.vue';

import {
  CONTRACT_STATUS,
  CONTRACT_STATUS_OPTIONS,
  CONTRACT_TYPES,
  CONTRACT_TYPE_OPTIONS,
  CONTRACT_PAYMENT_TYPES,
} from '@/constants';

export default {
  name: 'list-table',
  components: {
    Trend,
  },
  data() {
    return {
      CONTRACT_STATUS,
      CONTRACT_STATUS_OPTIONS,
      CONTRACT_TYPES,
      CONTRACT_TYPE_OPTIONS,
      CONTRACT_PAYMENT_TYPES,
      prefix,
      formData: {
        mname: '',
        mid: undefined,
        status: undefined,
      },
      data: [],
      dataLoading: false,
      value: 'frist',
      columns: [
        {
          title: '会议名',
          fixed: 'left',
          minWidth: '300',
          align: 'left',
          ellipsis: true,
          colKey: 'mname',
        },
        { title: '会议状态', colKey: 'status', width: 200, cell: { col: 'status' } },
        {
          title: '会议号',
          width: 200,
          ellipsis: true,
          colKey: 'mid',
        },
        {
          title: '开始时间',
          width: 200,
          ellipsis: true,
          // colKey: 'contractType',
          colKey:'startTime',
        },
        {
          title: '结束时间',
          width: 200,
          ellipsis: true,
          // colKey: 'paymentType',
          colKey: 'endTime',

        },
        {
          title: '总人数',
          width: 200,
          ellipsis: true,
          // colKey: 'amount',
          colKey: 'totalNum',

        },
        {
          align: 'left',
          fixed: 'right',
          width: 200,
          colKey: 'op',
          title: '操作',
        },
      ],
      rowKey: 'index',
      tableLayout: 'auto',
      verticalAlign: 'top',
      bordered: true,
      hover: true,
      rowClassName: (rowKey) => `${rowKey}-class`,
      // 与pagination对齐
      pagination: {
        defaultPageSize: 20,
        total: 100,
        defaultCurrent: 1,
      },
      confirmVisible: false,
      deleteIdx: -1,
    };
  },
  computed: {
    confirmBody() {
      if (this.deleteIdx > -1) {
        const { name } = this.data?.[this.deleteIdx];
        return `删除后，${name}的所有合同信息将被清空，且无法恢复`;
      }
      return '';
    },
  },
  mounted() {
    this.dataLoading = true;
    this.$request
      .get('/api/meetingRecord')
      .then((res) => {
        console.log('查询所有会议：',res)
        if (res.data.code === '200') {
          // const { list = [] } = res.data.result;
          // console.log('list',list)
          // this.data = list;
          this.data = res.data.result;

          console.log('data',this.data)
          this.pagination = {
            ...this.pagination,
            total: this.data.length,
          };
        }
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        this.dataLoading = false;
      });
  },
  methods: {
    onReset(data) {
      console.log(data);
    },
    onSubmit(data) {
      console.log(data);
    },
    rehandlePageChange(curr, pageInfo) {
      console.log('分页变化', curr, pageInfo);
    },
    rehandleChange(changeParams, triggerAndData) {
      console.log('统一Change', changeParams, triggerAndData);
    },
    handleClickDetail() {
      this.$router.push('/detail/base');
    },
    rehandleClickOp({ text, row }) {
      console.log(text, row);
    },
    handleClickDelete(row) {
      this.deleteIdx = row.rowIndex;
      this.confirmVisible = true;
    },
    onConfirmDelete() {
      // 真实业务请发起请求
      this.data.splice(this.deleteIdx, 1);
      this.pagination.total = this.data.length;
      this.confirmVisible = false;
      this.$message.success('删除成功');
      this.resetIdx();
    },
    onCancel() {
      this.resetIdx();
    },
    resetIdx() {
      this.deleteIdx = -1;
    },

    startMeeting(currentRow){
      console.log('currentRow',currentRow)

      // this.$router.push('/detail/base')
      this.$router.push({
        name:'DetailBase',
        params:{
          mid:currentRow.row.mid,
          startTime:currentRow.row.startTime,
          endTime:currentRow.row.endTime,
          totalNum:currentRow.row.totalNum
        }
      })
    }
  },
};
</script>

<style lang="less">
@import '@/style/variables.less';

.list-common-table {
  background-color: @bg-color-container;
  padding: 30px 32px;
  border-radius: @border-radius;

  .table-container {
    margin-top: 30px;
  }
}

.form-item-content {
  width: 100%;
}

.operation-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.payment-col {
  display: flex;

  .trend-container {
    display: flex;
    align-items: center;
    margin-left: 8px;
  }
}
</style>
