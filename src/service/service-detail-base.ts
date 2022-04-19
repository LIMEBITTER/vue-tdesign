interface IAdvancedColumn {
  name: string;
  value: string;
  type?: any;
}
class DetailBase {
  /**
   * 下拉框选项数据
   *
   * @returns
   *
   * @memberOf DetailBase
   */
  getBaseInfoData(): Array<IAdvancedColumn> {
    return [
      {
        name: '会议名',
        value: 'xxx会议',
      },

      {
        name: '会议号',
        value: 'BH00010',
      },
      {
        name: '总人数',
        value: '40',
      },
      {
        name: '申请人',
        value: '王明明',
      },
      {
        name: '会议状态',
        value: '履行中',
        type: {
          key: 'contractStatus',
          value: 'inProgress',
        },
      },

      {
        name: '会议开始时间',
        value: '2020-12-20',
      },
      {
        name: '会议预计时间',
        value: '2021-01-20',
      },
      {
        name: '会议结束时间',
        value: '2022-12-20',
      },
      // {
      //   name: '合同附件',
      //   value: '总部办公用品采购项目合同.pdf',
      //   type: {
      //     key: 'contractAnnex',
      //     value: 'pdf',
      //   },
      // },
      // {
      //   name: '备注',
      //   value: '--',
      // },
      {
        name: '创建时间',
        value: '2020-12-22 10:00:00',
      },
    ];
  }
}

export default new DetailBase();
