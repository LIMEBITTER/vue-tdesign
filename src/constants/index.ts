interface IOption {
  value: number | string;
  label: string;
}
// 合同状态枚举
export const CONTRACT_STATUS = {
  // FAIL: 0,
  // AUDIT_PENDING: 1,
  EXEC_PENDING: 0,
  EXECUTING: 1,
  FINISH: 2,
};

export const CONTRACT_STATUS_OPTIONS: Array<IOption> = [
  // { value: CONTRACT_STATUS.FAIL, label: '审核失败' },
  // { value: CONTRACT_STATUS.AUDIT_PENDING, label: '待审核' },
  { value: CONTRACT_STATUS.EXEC_PENDING, label: '未开始' },
  { value: CONTRACT_STATUS.EXECUTING, label: '正在开会' },
  { value: CONTRACT_STATUS.FINISH, label: '已结束' },
];

// 合同类型枚举
export const CONTRACT_TYPES = {
  MAIN: 0,
  SUB: 1,
  SUPPLEMENT: 2,
};

// export const CONTRACT_TYPE_OPTIONS: Array<IOption> = [
//   { value: CONTRACT_TYPES.MAIN, label: '主合同' },
//   { value: CONTRACT_TYPES.SUB, label: '子合同' },
//   { value: CONTRACT_TYPES.SUPPLEMENT, label: '补充合同' },
// ];

// 合同收付类型枚举
// export const CONTRACT_PAYMENT_TYPES = {
//   PAYMENT: 0,
//   RECIPT: 1,
// };

// 通知的优先级对应的TAG类型
export const NOTIFICATION_TYPES = {
  low: 'primary',
  middle: 'warning',
  high: 'danger',
};
