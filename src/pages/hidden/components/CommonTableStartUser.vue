<template>
  <div class="list-common-table">

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
        <template #isSign="{ row }">

          <t-tag v-if="row.isSign === 0" theme="warning" variant="light">未签到</t-tag>
          <t-tag v-if="row.isSign === 1" theme="success" variant="light">已签到</t-tag>
        </template>


        <template #op="slotProps">
          <a class="t-button-link" @click="checkInfo(slotProps)">详情</a>
          <a class="t-button-link" @click="qiandao(slotProps)">签到</a>
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
<!--      <t-dialog header="人员补签"-->
<!--                @opened="buttonDisabled=false"-->
<!--                :closeBtn="false"-->
<!--                :visible.sync="visible5"-->
<!--                :confirmBtn="{content:loadingText,theme:'primary',loading:loadingbut}"-->
<!--                :onConfirm="onConfirm"-->
<!--                :onClose="close5">-->
<!--        <div slot="body">-->
<!--          <t-form :data="resignData" :labelAlign="formData.labelAlign" :labelWidth="60">-->
<!--            <t-form-item label="补签人" name="uid" >-->
<!--              <t-input v-model="resignData.uid" disabled></t-input>-->
<!--            </t-form-item>-->
<!--            <t-form-item label="备注" name="comment" >-->
<!--              <t-input v-model="resignData.comment"></t-input>-->
<!--            </t-form-item>-->
<!--          </t-form>-->


<!--        </div>-->
<!--      </t-dialog>-->
      <t-dialog header="人员详细信息" :closeBtn="false" :footer="false" :visible.sync="visible6" @confirm="onConfirm" :onClose="close6">
        <div slot="body">
          <t-form :data="resignData" :labelAlign="formData.labelAlign" :labelWidth="60">
            <t-form-item label="用户姓名" name="uid" >
              <div class="member_detail"></div>
              {{currentMInfo.uid}}
            </t-form-item>
            <t-form-item label="签到时间" name="joinTime" >
              <div class="member_detail"></div>
              {{currentMInfo.signTime}}
            </t-form-item>
            <t-form-item label="入会时间" name="signTime" >
              <div class="member_detail"></div>
              {{currentMInfo.joinTime}}
            </t-form-item>
            <t-form-item label="离会时间" name="leaveTime" >
              <div class="member_detail"></div>

              {{currentMInfo.leaveTime}}
            </t-form-item>
            <t-form-item label="是否签到" name="isSign" >
              <div class="member_detail"></div>

              <t-tag v-if="currentMInfo.isSign === 0" theme="warning" variant="light">未签到</t-tag>
              <t-tag v-if="currentMInfo.isSign === 1" theme="success" variant="light">已签到</t-tag>
            </t-form-item>
            <t-form-item label="是否补签" name="isRetroactive" >
              <div class="member_detail"></div>

              <t-tag v-if="currentMInfo.isSign === 0" theme="warning" variant="light">非补签</t-tag>
              <t-tag v-if="currentMInfo.isSign === 1" theme="success" variant="light">补签</t-tag>
            </t-form-item>
            <t-form-item label="签到方式" name="signMethod" >
              <div class="member_detail"></div>

              {{currentMInfo.signMethod}}
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
import {sAllSignRecordsByMid,retroactiveUser,sOneMeetingByUMid,signService} from '@/utils/api.js';

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
      visible6:false,
      // 防止dialog表单重复提交
      buttonDisabled:false,
      loadingbut:false,
      loadingText:'补签',
      // 重新签到的人员
      CONTRACT_STATUS,
      CONTRACT_STATUS_OPTIONS,

      prefix,
      formData: {
        name: '',
        no: undefined,
        status: undefined,
      },
      t_mid:'',

      // 参会人员详细信息
      currentMInfo:[],
      // 补签对话框数据
      resignData:{
        // comment:'',
      },
      // 当前人员是否签到
      currentIsSign:0,

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
          colKey: 'uid',
        },
        { title: '签到状态', colKey: 'isSign', width: 200, cell: { col: 'isSign' } },

        {
          title: '签到方式',
          width: 200,
          ellipsis: true,
          colKey: 'signMethod',
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
        defaultPageSize: 5,
        total: 0,
        defaultCurrent: 1,
      },
      confirmVisible: false,
      deleteIdx: -1,
    };
  },

  // 实现每次进入不同的会议能实时更新会议号
  // watch:{
  //   mid(newVal,oldVal){
  //     this.t_mid = newVal;
  //     console.log()
  //     this.init_api(localStorage.getItem('current_mid'));
  //
  //   },
  //
  // },
  // created() {
  //   console.log('created=====================')
  //   // console.log(this.t_mid)
  // },
  mounted() {
    const iData = {mid:localStorage.getItem('current_mid'),uid:localStorage.getItem('uid')}

    this.init_api(iData);
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
      const rData = {mid:localStorage.getItem('current_mid'),current:curr.current,size:curr.pageSize}
      this.dataLoading = true;

      sAllSignRecordsByMid(rData).then(res=>{
        console.log('参会者信息查询',res)

        if (res.data.code === "200") {
          console.log('参会者信息查询成功',res)
          this.data = res.data.result.signList;
          this.currentMInfo = res.data.result.signList;
          console.log('currentinfo',this.currentMInfo)

          console.log('data',this.data)
          this.pagination = {
            ...this.pagination,
            defaultPageSize: rData.size,
            defaultCurrent: rData.current,
            total: res.data.result.total,
          };
        }
      }).catch((e) => {
        console.log(e);
      }).finally(() => {
        this.dataLoading = false;
      });
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
    qiandao(e){
      // 将当前行的人员姓名存入
      this.resignData.uid = e.row.uid
      this.resignData.mid = e.row.mid
      const qData = {uid:e.row.uid,mid:e.row.mid}
      console.log('当前签到人员',qData)
      // 签到服务
      signService(qData).then(res=>{
        console.log('签到服务',res)
        if (res.data.code==="200"){
          this.$message.success('签到成功')
          setTimeout(()=>{
            this.$router.go(0)
          },1000)
        }else{
          this.$message.error('签到失败')
        }
      })


      this.currentIsSign = e.row.isSign

      this.visible5 = true

    },
    checkInfo(currentRow){
      console.log('当前人员',currentRow.row)
      this.visible6 = true
      this.currentMInfo = currentRow.row
      // 当前人员信息
      // this.$router.push('/hidden/indexm')


    },

    close5() {
      this.visible5 = false;
    },
    close6() {
      this.visible6 = false;
    },
    // 补签
    onConfirm() {
      this.buttonDisabled = true
      this.loadingbut = true
      this.loadingText = '补签中'
      console.log('这是一次')
      console.log(this.currentIsSign)
      // 判断当前用户是否已经签到
      if(this.currentIsSign === 0){
        retroactiveUser(this.resignData).then(res=>{
          let count = 0
          count +=1
          console.log('执行补签api的次数',count)
          console.log(res)
          if (res.data.code === '200'){
            this.$message.success('补签成功')
            this.loadingbut = false
            this.loadingText = '补签'
            this.buttonDisabled = false
            this.visible5 = false;
            setTimeout(()=>{
              this.$router.go(0)

            },1000)
          }

        })
      }else {
        this.$message.info('当前用户已签到！')

      }

      // e.stopPropagation();
    },
    init_api(iData){
      this.dataLoading = true;
      console.log('参会者信息查询当前mid分页',iData)
      sOneMeetingByUMid(iData).then(res=>{
        console.log('查询当前人员签到信息',res)
        if (res.data.code==="200"){
          this.data.push(res.data.result)
          this.pagination.total = 1
        }
      })
        .catch((e) => {
          console.log(e);
        }).finally(() => {
          this.dataLoading = false;
        });
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

  .member_detail{
    margin-right: 20px;
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
