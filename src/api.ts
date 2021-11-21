import { ContentType, CookieKey, Role } from '@src/constants';
import { getCookie } from '@src/utils';
import { OrderStatus } from '@src/constants';

interface Payload {
  method: string;
  headers: {
    Authorization: string;
    Accept: string;
    [key: string]: string;
  };
  body?: string | FormData;
}
function getPayload(
  authorization: string,
  method: string,
  data: string | FormData,
  contentType: string
) {
  const payload: Payload = {
    method,
    headers: {
      Authorization: authorization,
      Accept: ContentType.JSON
    }
  };

  if (data) {
    payload.headers['Content-Type'] = contentType;
    payload.body = data;
  }

  return payload;
}

type RequestParams = {
  authorization?: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  contentType?: ContentType;
};

/**
 * HTTP请求
 * @param url 请求地址
 * @param authorization Authorization头
 * @param method 请求方法
 * @param data 请求体
 * @param contentType 请求体类型
 */
async function request<T>(
  url: string,
  data: string | FormData = '',
  { authorization, method, contentType }: RequestParams = {
    authorization: '',
    method: 'GET',
    contentType: ContentType.JSON
  },
  reLoginOnAuthFailure = true
): Promise<T> {
  if (!authorization) {
    authorization = getCookie(CookieKey.AUTHORIZATION) || '';
  }
  if (!method) {
    method = 'GET';
  }
  if (!contentType) {
    contentType = ContentType.JSON;
  }

  const response = await fetch(
    url,
    getPayload(authorization, method, data, contentType)
  );

  //登录失效
  if (response.status === 401 && window.login && reLoginOnAuthFailure) {
    await window.login(true);
    return request(
      url,
      data,
      { authorization: '', method, contentType },
      false
    );
  }

  return response.json();
}

type ResponseData<T> = {
  code: number;
  data: T;
  message: string;
};
type APIResponse<T> = Promise<ResponseData<T>>;

/**
 * 用户登录授权
 * @param code 钉钉临时授权码
 * @param agentId 钉钉应用AgentId
 * @param debug 调试模式参数
 */
export function auth(
  code: string,
  agentId: string,
  debug?: string
): APIResponse<{
  token: string;
  role: Role;
  user_name: string;
  user_id: number;
  avatar: string;
}> {
  const data = JSON.stringify({ code, agentId, debug });
  return request('/api/login', data, { method: 'POST' });
}

/**
 * 获取钉钉JSAPI鉴权参数
 * @param agentId 钉钉应用AgentId
 * @param url 当前页面地址（不包含#及其后的内容）
 */
export function getDingConfig(
  agentId: string,
  url: string
): APIResponse<{
  agent_id: string | number;
  corp_id: string;
  time_stamp: number;
  nonce_str: string;
  signature: string;
}> {
  const data = JSON.stringify({ agentId, url });
  return request('/api/ding/config', data, { method: 'POST' });
}

type DingFilePermission = {
  resoult: boolean;
  spaceId: string;
};
/**
 * 授权访问钉盘空间
 * @param type 授权类型
 * @param fileIds 授权下载的文件ID
 */
export function getDingFilePermission(
  type: 'add'
): APIResponse<DingFilePermission>;
export function getDingFilePermission(
  type: 'download',
  fileIds: string
): APIResponse<DingFilePermission>;
export function getDingFilePermission(
  type: 'add' | 'download',
  fileIds?: string
): APIResponse<DingFilePermission> {
  const data = JSON.stringify({ type, fileIds });
  return request('/api/dingFile/permission', data, { method: 'POST' });
}

/**
 * 获取已登录用户信息
 * @returns 用户信息
 */
export function getUserInfo(): APIResponse<{
  user_name: string;
  avatar: string;
  role: Role;
  id: number;
}> {
  return request('/api/user/fetch');
}

/************************************用户侧******************************************************** */
/**
 * 用户提交工单
 * @param title 工单标题
 * @param type_id 工单类别ID
 * @param desc 工单描述
 * @param filePath 工单附件（JSON字符串：{ fileId: string, fileName: string, fileSize: number, fileType:string, spaceId: string }）
 */
export function createOrder(
  title: string,
  type_id: string,
  desc: string,
  filePath: string | null,
  tag_ids?: string,
  tag_names?: string
): APIResponse<['ok']> {
  const data = JSON.stringify({
    desc,
    title,
    type_id,
    filePath,
    tag_ids,
    tag_names
  });
  return request('/api/tickets/create', data, { method: 'POST' });
}

/**
 * 获取用户工单列表
 */
export function getUserOrderList() {
  return request('/api/tickets/get');
}

type Order = {
  id: number;
  title: string;
  desc: string;
  accessory: string | null;
  type_id: number;
  ask_name: string;
  ask_id: number;
  resolve_name: string;
  resolve_id: number;
  reminder: number;
  urgent: number;
  adminDingUserId: string;
  ask_evaluate: string | null;
  order_rate: number | null;
  designate: number;
  status: number;
  confirm_at: string;
  resolve_at: string;
  complete_at: string | null;
  dispatch: number;
  transfer_times: number | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  serial_number: string | null;
  category: string;
  isHandler: boolean;
  replies: Array<{
    id: number;
    ticket_id: number;
    post_id: number;
    file: string;
    ding_user_id: string;
    file_type: string;
    is_user_reply: number;
    content: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    username: string;
    createdAt: string;
    isUserReply: boolean;
    isSelf: boolean;
  }>;
};
/**
 * 获取工单详情
 */
export function getOrderDetail(orderId: string): APIResponse<Order> {
  return request('/api/tickets/detail/' + orderId);
}

/**
 * 添加工单回复
 * @param ticket_id 工单ID
 * @param content 回复内容
 * @param isUserReply 是否是提单用户的回复
 */
export function addFeedback(
  ticket_id: string,
  content: string,
  isUserReply: boolean,
  file?: string,
  file_name?: string,
  file_type?: string
): APIResponse<unknown> {
  const data = JSON.stringify({
    ticket_id,
    content,
    isUserReply,
    file,
    file_name,
    file_type
  });
  return request('/api/tickets/feedback/add', data, { method: 'POST' });
}

/**
 * 获取工单回复列表
 * @param orderId 工单ID
 */
export function getFeedback(orderId: string): APIResponse<unknown> {
  return request('/api/feedback/get/' + orderId);
}

export type Category = {
  value: number;
  label: string;
  children?: Category[];
};
/**
 * 获取可用的工单类型
 */
export function getCategory(isChildrenAdmin?: number): APIResponse<Category[]> {
  const data = JSON.stringify({
    isChildrenAdmin
  });
  return request('/api/tickets/type', data, { method: 'POST' });
}
/*************************************专家侧********************************************************* */
/**
 * 获取专家接收全部工单数据
 * @returns
 */
export function getExpertOrderList() {
  return request('/api/tickets/getResolve');
}
/**
 * 专家抢单列表
 */
export function getSignOrderList(): APIResponse<
  {
    id: number;
    title: string;
    desc: string;
    created_at: string;
    resolve_at: string;
    timeOut: string;
    userName: string;
    resolve_id: number;
    expertName: string;
    status: OrderStatus;
    ask_id: number;
  }[]
> {
  return request('/api/tech/allSigning');
}
/**
 * 专家待办列表
 */
export function getBacklogOrderList() {
  return request('/api/tech/backlog');
}

/**
 * 专家看板计数
 */
export function getTechKanBanNum() {
  return request('/api/tech/getNum');
}

/**
 * 专家接单、抢单
 */
export function expertSignOrder(
  ticket_id: string,
  schedule: string
): APIResponse<unknown> {
  const data = JSON.stringify({ ticket_id, schedule });
  return request('/api/tickets/confirm', data, { method: 'POST' });
}
/**
 * 管理员加急工单
 * @returns
 */

export function adminUrgentOrder(
  urgent: number,
  ticket_id: string
): APIResponse<any> {
  const data = JSON.stringify({ urgent, ticket_id });
  return request('/api/ticket/urgent', data, { method: 'POST' });
}
/**
 * 获取专家超时工单
 */
export function getTechTimeoutOrders() {
  return request('/api/tech/overtime');
}

/**
 * 获取进行中的工单数据
 */
export function getProcessingOrders() {
  return request('/api/tech/handling');
}

/**
 * 获取可签收（待签收）工单数据
 */
export function getNewOrders() {
  return request('/api/tech/signing');
}

/**
 * 获取加急工单数据
 */
export function getUrgentOrders() {
  return request('/api/tech/urgent');
}

/**
 * 获取专家积分
 */
export function getExpertScore(): APIResponse<{
  integral: number;
  usedIntegral: number;
}> {
  return request('/api/tech/integral');
}

/**
 * 获取专家积分明细
 */
export function getTechIntegralDetail() {
  return request('/api/integral/list');
}

/**
 * 获取专家积分兑换明细
 */
export function getTechIntegralUsed() {
  return request('/api/integral/used');
}

export type ExpertScoreQuery = {
  type: 'EXPERT';
  isExchange: 0 | 1;
  startTime?: string;
  endTime?: string;
};
type Score = {
  id: number;
  serial_number: string;
  point: number;
  reason: string;
  type: number;
  from: string;
  from_id: number;
  tech_id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};
/**
 * 获取专家积分兑换明细
 */
export function queryExpertScore(
  condition: ExpertScoreQuery
): APIResponse<Score[]> {
  const data = JSON.stringify(condition);
  return request('/api/integral/condition', data, { method: 'POST' });
}

/**
 * 被转单专家设置预计完成时间
 */
export function expertSetSchedule(
  ticket_id: string,
  schedule: string
): APIResponse<any> {
  const data = JSON.stringify({ ticket_id, schedule });
  return request('/api/tickets/set/schedule', data, { method: 'POST' });
}
/*************************************管理员侧********************************************************* */

/**
 * 管理员获取超时工单
 */
export function getAdminNum() {
  return request('/api/admin/getNum');
}

/**
 * 管理员获取超时工单
 */
export function getTimeoutOrderList() {
  return request('/api/tickets/overTime');
}

/**
 * 管理员获取全部加急工单
 */
export function getUrgentOrderList() {
  return request('/api/urgent/fetch');
}

/**
 * 管理员获取全部工单
 */
export function getAllorder() {
  return request('/api/tickets/fetch');
}

export type TicketQuery = {
  type: 'USER' | 'EXPERT' | 'ADMIN';
  user_id?: number; //提单用户ID
  tech_id?: number; //接单专家ID
  title?: string; //工单标题
  user?: string; //提单用户名
  expert?: string; //专家姓名
  desc?: string; //工单描述
  type_id?: number; //工单类型ID
  reminder?: 0 | 1; //是否催单
  urgent?: 0 | 1; //是否加急
  status?: number | number[]; //工单状态
  resolve_at_start?: string; //最早预计完成时间
  resolve_at_end?: string; //最晚预计完成时间
  created_at_start?: string; //最早创建时间
  created_at_end?: string; //最晚创建时间
  complete_at_start?: string; //最早办结时间
  complete_at_end?: string; //最晚办结时间
  confirm_at_start?: string; //最早接单时间
  confirm_at_end?: string; //最晚接单时间
};
type Ticket = {
  id: number;
  title: string;
  desc: string;
  created_at: string;
  resolve_at: string;
  timeOut: string;
  userName: string;
  resolve_id: number;
  expertName: string;
  status: OrderStatus;
  ask_id: number;
};
/**
 * 检索符合条件的工单
 */
export function searchTickets(
  condition: TicketQuery
): APIResponse<[Array<Ticket>, number]> {
  const data = JSON.stringify(condition);
  return request('/api/tickets/search', data, { method: 'POST' });
}

/**
 * 获取全部专家列表
 */
export function getExpertList() {
  return request('/api/tech/fetch');
}

/**
 * 获取全部专家积分明细列表
 */
export function getExpertScoreList(techId: string) {
  return request('/api/tech/Score/list/' + techId);
}

/**
 * 获取全部工单类型列表
 */
export function getOrderCategory() {
  return request('/api/tickets/all/type');
}

/**
 * 获取系统设置
 */
export function getSystemConfig(): APIResponse<{
  expectHandle: string;
  expertSign: string;
  overtime: string;
}> {
  return request('/api/system/config/fetch');
}

/**
 * 修改系统设置
 */
export function updateSystemConfig(config: Record<string, unknown>) {
  const data = JSON.stringify(config);
  return request('/api/system/config', data, { method: 'POST' });
}

/**
 * 修改加急状态
 */
export function setOrderUrgent(urgent: number, ticket_id: string) {
  const data = JSON.stringify({ urgent, ticket_id });
  return request('/api/ticket/urgent', data, { method: 'POST' });
}

/**
 * 专家申请办结
 * @param ticket_id 工单ID
 */
export function expertCloseOrder(ticket_id: string): APIResponse<unknown> {
  const data = JSON.stringify({ ticket_id });
  return request('/api/tickets/tech/close', data, { method: 'POST' });
}

/**
 * 用户关闭工单
 * @param ticket_id 工单ID
 */
export function userCloseOrder(
  ticket_id: string,
  evaluate: string,
  orderRate: number
): APIResponse<unknown> {
  const data = JSON.stringify({ ticket_id, evaluate, orderRate });
  return request('/api/tickets/user/close', data, { method: 'POST' });
}

/**
 * 查询专家名单
 */
export function searchExpert(condition: {
  name?: string;
  level?: number;
  type?: string;
}): APIResponse<any> {
  const data = JSON.stringify(condition);
  return request('/api/searchExpert/fetch', data, { method: 'POST' });
}

/**
 * 移交工单
 * @param tech_id 专家ID
 * @param ticket_id 工单ID
 * @param option 转单说明
 */
export function transferOrder(
  tech_id: number,
  ticket_id: string,
  type_id?: string,
  option?: string
): APIResponse<unknown> {
  const data = JSON.stringify({ tech_id, ticket_id, type_id, option });
  return request('/api/ticket/transfer', data, { method: 'POST' });
}

/**
 * 转单给管理员
 * @param ticket_id 工单ID
 */
export function transferOrderToAdmin(ticket_id: string): APIResponse<any> {
  const data = JSON.stringify({ ticket_id });
  return request('/api/expert/designate/toAdmin', data, { method: 'POST' });
}

/**
 * 用户催单
 * @returns
 */
export function setOrderReminder(ticket_id: string): APIResponse<unknown> {
  const data = JSON.stringify({ ticket_id });
  return request('/api/user/reminder', data, { method: 'POST' });
}

/**
 * 转单给管理员
 * @param ticket_id
 * @returns
 */
export function expertDesignateToAdmin(
  ticket_id: string,
  opinion?: string
): APIResponse<any> {
  const data = JSON.stringify({ ticket_id, opinion });
  return request('/api/expert/designate/toAdmin', data, { method: 'POST' });
}
export type myCenterCondition = {
  role_id: number;
  id: number;
};
export type categoryItem = {
  id: number;
  level: number;
  name: string;
  tickettype_id: number;
};
/**
 * 获取个人中心的数据
 */
export function getMyCenterData(condition: myCenterCondition): APIResponse<{
  askNumber: number;
  evaluateNumber: number;
  categorys: categoryItem[];
  userOrderList: Order[];
  expertOrderList: Order[];
  resolveNumber: number;
}> {
  const data = JSON.stringify({ condition });
  return request('/api/my/center/fetch', data, { method: 'POST' });
}

type searchPrize = {
  name?: string;
  need_integral?: number;
};
/**
 * 获取奖品
 */
export function getAllPrize(condition: searchPrize): APIResponse<any> {
  const data = JSON.stringify(condition);
  return request('/api/get/all/prize', data, { method: 'POST' });
}

/**
 * 修改奖品
 */
export function updatePrize(
  prize_id: number,
  name?: string,
  number?: number,
  need_integral?: number,
  limit_number?: number,
  status?: number
): APIResponse<any> {
  const data = JSON.stringify({
    prize_id,
    name,
    number,
    need_integral,
    limit_number,
    status
  });
  return request('/api/update/prize', data, { method: 'POST' });
}

export function getPrizeDetail(prize_id: number | string): APIResponse<any> {
  const data = JSON.stringify({ prize_id });
  return request('/api/get/prize', data, { method: 'POST' });
}
/**
 * 删除奖品
 */
export function deletePrize(prize_id: number): APIResponse<any> {
  const data = JSON.stringify({ prize_id });
  return request('/api/delete/prize', data, { method: 'POST' });
}

/**
 * 获取申请列表
 */
export type conditionApply = {
  prize_name?: string;
  type?: string;
  exchange_user_name?: string;
  exchange_user_number?: string;
  created_at?: string;
};

export function getExchangeApply(condition: conditionApply): APIResponse<
  {
    id: number;
    prize_id: number;
    prize_name: string;
    prize_number: number;
    need_integral: number;
    exchange_user_id: number;
    exchange_user_name: string;
    exchange_user_number: string;
    feedback: string;
    created_at: string;
    status: number;
  }[]
> {
  const data = JSON.stringify(condition);
  return request('/api/get/exchange/apply', data, { method: 'POST' });
}
export function getExchangeApplyById(applyId: string | number): APIResponse<{
  id: number;
  prize_id: number;
  prize_name: string;
  prize_number: number;
  need_integral: number;
  exchange_user_id: number;
  exchange_user_name: string;
  exchange_user_number: string;
  feedback: string;
  created_at: string;
  status: number;
}> {
  const data = JSON.stringify({ applyId });
  return request('/api/get/one/exchange/apply', data, { method: 'POST' });
}

/**
 * 添加申请
 */
export function addExcheangeApply(
  prizeId: number,
  prizeName: string,
  number: number,
  needIntegral: number
): APIResponse<any> {
  const data = JSON.stringify({ prizeId, number, prizeName, needIntegral });
  return request('/api/apply/exchange/integral', data, { method: 'POST' });
}
/**
 * 审核申请
 */
export function updateExcheangeApply(
  applyId: number,
  status: number,
  feedback?: string
): APIResponse<any> {
  const data = JSON.stringify({ applyId, status, feedback });
  return request('/api/examine/exchange/apply', data, { method: 'POST' });
}

/**
 * 获取全部事业部标签
 */

export function getOrderTags(condition: {
  type_id?: number | string;
}): APIResponse<any> {
  const data = JSON.stringify(condition);
  return request('/api/tickets/tags/get', data, { method: 'POST' });
}

//jk

/**
 * 提交搜索条件
 */
export function searchResidentList(condition: {
  name?: string;
  phone?: number;
  cardnumber?: number;
}): APIResponse<any> {
  const data = JSON.stringify(condition);
  return request('/api/search/resident_list', data, { method: 'POST' });
}
