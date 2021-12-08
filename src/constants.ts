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
    process.env.BUILD_TYPE === Mode.DEVELOPMENT ? '1231321213' : '1371334360',
  CORP_ID:
    process.env.BUILD_TYPE === Mode.DEVELOPMENT
      ? 'ding0bfcdc2ba159a01935c2f4657eb6378f'
      : 'dinged61c9634da1d42735c2f4657eb6378f'
};

export enum Role {
  UNKNOWN,
  ADMIN,
  TRANSFER,
  HOTELDOCTOR,
  COMMUNITY,
  SERVICECENTER,
  STREET,
  MANAGE,
  ISOLATE
}

export const RoleName = {
  [Role.UNKNOWN]: '',
  [Role.ADMIN]: '疾控中心',
  [Role.MANAGE]: '密接管理组',
  [Role.ISOLATE]: '集中隔离组',
  [Role.STREET]: '街道',
  [Role.SERVICECENTER]: '社区服务中心',
  [Role.TRANSFER]: '转运组',
  [Role.HOTELDOCTOR]: '酒店管理组',
  [Role.COMMUNITY]: '社区'
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
