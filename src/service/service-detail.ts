interface DashboardPanel {
  title: string;
  number: string | number;
  leftType?: string;
  upTrend?: string;
  downTrend?: string;
}

export const PANE_LIST_DATA: Array<DashboardPanel> = [
  {
    title: '总申请数（次）',
    number: '1126',
    // upTrend: '10%',
  },
  {
    title: '使用会议时间',
    number: '13',
    // downTrend: '13%',
  },
  {
    title: '参加会议次数',
    number: '4',
    // upTrend: '10%',
  },
  {
    title: '签到成功次数',
    number: 90,
    // downTrend: '44%',
    leftType: 'icon-file-paste',
  },
  {
    title: '您的签到率（%）',
    number: 80.5,
    // upTrend: '70%',
  },
  {
    title: '会完成会议签到次数',
    number: 78,
    // upTrend: '16%',
  },
  {
    title: '补签数',
    number: 78,
  },
];
export const PRODUCT_LIST = [
  {
    description: 'SSL证书又叫服务器证书，腾讯云为您提供证书的一站式服务，包括免费、付费证书的申请、管理及部',
    index: 1,
    isSetup: true,
    name: 'SSL证书',
    type: 4,
  },
  {
    description: 'SSL证书又叫服务器证书，腾讯云为您提供证书的一站式服务，包括免费、付费证书的申请、管理及部',
    index: 1,
    isSetup: true,
    name: 'SSL证书',
    type: 4,
  },
];
