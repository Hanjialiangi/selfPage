export const appName = '铁骑力士工单平台';

export const PUBLIC_PATH = process.env.PUBLIC_PATH;

export enum ContentType {
  JSON = 'application/json',
  URL_ENCODED = 'application/x-www-form-urlencoded'
}

export enum CookieKey {
  AUTHORIZATION = 'authorization'
}

export enum Mode {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production'
}

export const Dingtalk = {
  AGENT_ID:
    process.env.BUILD_TYPE === Mode.DEVELOPMENT ? '1231547770' : '1254291040',
  CORP_ID:
    process.env.BUILD_TYPE === Mode.DEVELOPMENT
      ? 'ding2f32ce41dd8a058a'
      : 'ding99d1beeeb7318f0fbc961a6cb783455b'
};

export enum Role {
  UNKNOWN,
  SUPER_USER,
  ADMIN,
  EXPERT,
  USER
}

export const RoleName = {
  [Role.UNKNOWN]: '',
  [Role.SUPER_USER]: '系统管理员',
  [Role.ADMIN]: '工单管理员',
  [Role.EXPERT]: '专家',
  [Role.USER]: '用户'
};

export enum OrderStatus {
  AWAIT_SIGN = 1,
  SIGNED,
  PROCESSING,
  FINISHED,
  TIMEOUT
}

export const OrderStatusName = {
  [OrderStatus.AWAIT_SIGN]: '等待签收',
  [OrderStatus.SIGNED]: '已签收',
  [OrderStatus.PROCESSING]: '处理中',
  [OrderStatus.FINISHED]: '已结束'
};

export enum ExchangeStatus {
  AWAIT_EXAMINE = 1,
  ADOPT,
  REJECT,
  FINISHED
}
export const ExchangeStatusName = {
  [ExchangeStatus.AWAIT_EXAMINE]: '待审核',
  [ExchangeStatus.ADOPT]: '已通过',
  [ExchangeStatus.REJECT]: '已驳回',
  [ExchangeStatus.FINISHED]: '已结束'
};

export enum MILLISECONDS {
  A_HOUR = 3600000,
  A_DAY = 86400000,
  A_WEEK = 604800000
}
