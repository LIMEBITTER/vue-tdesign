<template>
  <div class="list-common-table">
    <t-form ref="form" :data="formData" :label-width="80" colon @reset="onReset" @submit="onSubmit">
      <t-row>
        <t-col :span="10">
          <t-row :gutter="[16, 16]">
            <t-col :flex="1">
              <t-form-item label="姓名" name="name">
                <t-input
                  v-model="formData.name"
                  class="form-item-content"
                  type="search"
                  placeholder="请输入姓名"
                  :style="{ minWidth: '134px' }"
                />
              </t-form-item>
            </t-col>
            <t-col :flex="1">
              <t-form-item label="签到状态" name="status">
                <t-select
                  v-model="formData.status"
                  class="form-item-content`"
                  :options="CONTRACT_STATUS_OPTIONS"
                  placeholder="请选择签到状态"
                />
              </t-form-item>
            </t-col>
            <t-col :flex="1">
<!--              <t-form-item label="会议号" name="no">-->
<!--                <t-input-->
<!--                  v-model="formData.no"-->
<!--                  class="form-item-content"-->
<!--                  placeholder="请输入会议号"-->
<!--                  :style="{ minWidth: '134px' }"-->
<!--                />-->
<!--              </t-form-item>-->
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
<!--        <template #status="{ row }">-->

<!--          <t-tag v-if="row.status === CONTRACT_STATUS.EXEC_PENDING" theme="warning" variant="light">未开始</t-tag>-->
<!--          <t-tag v-if="row.status === CONTRACT_STATUS.EXECUTING" theme="success" variant="light">进行中</t-tag>-->
<!--          <t-tag v-if="row.status === CONTRACT_STATUS.FINISH" theme="success" variant="light">已结束</t-tag>-->
<!--        </template>-->
<!--        <template #contractType="{ row }">-->
<!--          <p v-if="row.contractType === CONTRACT_TYPES.MAIN">审核失败</p>-->
<!--          <p v-if="row.contractType === CONTRACT_TYPES.SUB">待审核</p>-->
<!--          <p v-if="row.contractType === CONTRACT_TYPES.SUPPLEMENT">待履行</p>-->
<!--        </template>-->

        <template #op="slotProps">
          <a class="t-button-link" @click="checkInfo(slotProps)">详情</a>
          <a class="t-button-link" @click="buqian(slotProps)">补签</a>
        </template>
      </t-table>
<!--      <t-dialog-->
<!--        header="确认删除当前所选会议？"-->
<!--        :body="confirmBody"-->
<!--        :visible.sync="confirmVisible"-->
<!--        @confirm="onConfirmDelete"-->
<!--        :onCancel="onCancel"-->
<!--      >-->
<!--      </t-dialog>-->
      <t-dialog header="人员补签" :closeBtn="false" :visible.sync="visible5" @confirm="onConfirm" :onClose="close5">
        <div slot="body">
          <t-form :data="resignData" :labelAlign="formData.labelAlign" :labelWidth="60">
            <t-form-item label="会议号" name="mid" disabled>
              <t-input v-model="resignData.mid"></t-input>
            </t-form-item>
            <t-form-item label="补签人" name="user" disabled>
              <t-input v-model="resignData.resignedUser"></t-input>
            </t-form-item>
          </t-form>


        </div>
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

} from '@/constants';

export default {
  name: 'list-table',
  components: {
    Trend,
  },
  // 子组件接收并深度监听赋值
  props:['mid'],

  data() {
    return {
      visible5: false,
      // 重新签到的人员
      CONTRACT_STATUS,
      CONTRACT_STATUS_OPTIONS,

      prefix,
      formData: {
        name: '',
        no: undefined,
        status: undefined,
      },
      // 补签对话框数据
      resignData:{
        resignedUser:'',
        mid:this.mid,
      },
      data: [],
      dataLoading: false,
      value: 'frist',
      columns: [
        {
          title: '姓名',
          fixed: 'left',
          minWidth: '300',
          align: 'left',
          ellipsis: true,
          colKey: 'uname',
        },
        { title: '签到状态', colKey: 'status', width: 200, cell: { col: 'status' } },
        // {
        //   title: '电话',
        //   width: 200,
        //   ellipsis: true,
        //   colKey: 'phone',
        // },
        // {
        //   title: '邮箱',
        //   width: 200,
        //   ellipsis: true,
        //   colKey: 'email',
        // },
        {
          title: '签到方式',
          width: 200,
          ellipsis: true,
          colKey: 'signType',
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

  // 实现每次进入不同的会议能实时更新会议号
  watch:{
    mid(){
      this.resignData.mid = this.mid

    },
  },
  mounted() {
    this.dataLoading = true;
    this.$request
      .get('/api/get-list')
      .then((res) => {
        if (res.code === 0) {
          const { list = [] } = res.data;
          this.data = list;
          this.pagination = {
            ...this.pagination,
            total: list.length,
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
    buqian(e){
      console.log('当前补签人员',e)
      // 将当前行的人员姓名存入
      this.resignData.resignedUser = e.row.uname
      this.visible5 = true
    },
    checkInfo(currentRow){
      console.log('当前人员',currentRow)
      // 当前人员信息
      this.$router.push('/hidden/indexm')


    },
    sendingRequest() {
      console.log('sending request');
    },
    close5() {
      this.visible5 = false;
    },
    onConfirm(context) {
      const { e } = context;
      // todo something else here
      this.sendingRequest();
      this.visible5 = false;
      e.stopPropagation();
    },

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
