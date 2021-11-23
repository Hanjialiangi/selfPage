import { ContentType, CookieKey } from '@src/constants';
import { getCookie } from '@src/utils';
import qs from 'query-string';

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
  debug_ding_user_id?: string
): APIResponse<{
  token: string;
  role: string;
  user_name: string;
  user_id: number;
}> {
  const data = JSON.stringify({ code, agentId, debug_ding_user_id });
  // const res: any = {
  //   code: 200,
  //   data: { user_name: '张三', id: 3, role: 1, level: 2, avatar: '' },
  //   message: 'ok'
  // };
  // return res;
  return request('/api/login', data, { method: 'POST' });
}

/**
 * 获取用户信息
 */
export function getUserInfo(): APIResponse<any> {
  // const res: any = {
  //   code: 200,
  //   data: { user_name: '张三', id: 3, role: 1, level: 2, avatar: '' },
  //   message: 'ok'
  // };
  // return res;
  return request('/api/authed_user');
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

/************************获取详情页接口*********************************/
//获取某个居民详细信息
export function getResidentInfo(): APIResponse<any> {
  const open_id = '3f13deea-63f7-4a3d-b925-2aedab9189a9';
  return request('/api/resident/info?open_id=' + open_id);
}

//更新居民信息
export function getFixResidentInfo(): APIResponse<any> {
  const open_id = '3f13deea-63f7-4a3d-b925-2aedab9189a9';
  return request('/api/resident?open_id=' + open_id);
}
/***************************酒店功能************************************/
//获取酒店列表
export function getHotelList(): APIResponse<any> {
  const open_id = '3f13deea-63f7-4a3d-b925-2aedab9189a9';
  return request('/api/hotel/search?open_id=' + open_id);
}
// export function getCategory(isChildrenAdmin?: number): APIResponse<Category[]> {
//   const data = JSON.stringify({
//     isChildrenAdmin
//   });
//   return request('/api/tickets/type', data, { method: 'POST' });
// }

//添加人员并隔离
export function getCreateHotelResident(address?: string): APIResponse<any> {
  const open_id = '3f13deea-63f7-4a3d-b925-2aedab9189a9';
  const data = JSON.stringify({
    address
  });
  return request('/api/hotel?open_id=' + open_id, data, {
    method: 'POST'
  });
}

//酒店接收人员
export function getHotelReceive(): APIResponse<any> {
  const open_ids = ['3f13deea-63f7-4a3d-b925-2aedab9189a9'];
  const hotel_name = '酒店A';
  const data = JSON.stringify({
    open_ids,
    hotel_name
  });
  return request('/api/receive/hotel?', data, {
    method: 'POST'
  });
}

//转运到酒店（发起转运）
export function getTransferHotel(
  planned_quarantine_hotel?: string,
  quarantine_type?: string,
  current_state?: string
): APIResponse<any> {
  const open_id = '3f13deea-63f7-4a3d-b925-2aedab9189a9';
  const hotel_id = '';
  const data = JSON.stringify({
    planned_quarantine_hotel,
    quarantine_type,
    current_state
  });
  return request(
    '/api/transfer/hotel?open_id=' + open_id + '&hotel_id=' + hotel_id,
    data,
    {
      method: 'POST'
    }
  );
}

//采样管理上传
export function getCreateSampling(
  sampling_result?: string,
  sampling_date?: string
): APIResponse<any> {
  const open_id = '3f13deea-63f7-4a3d-b925-2aedab9189a9';
  const data = JSON.stringify({
    sampling_date,
    sampling_result
  });
  return request('/api/sampling?open_id=' + open_id, data, {
    method: 'POST'
  });
}

//健康状况上传
export function getCreateHealth(
  is_cough?: string,
  is_fever?: string,
  is_weak?: string,
  other_health_case?: string
): APIResponse<any> {
  const open_id = '3f13deea-63f7-4a3d-b925-2aedab9189a9';
  const data = JSON.stringify({
    open_id,
    is_cough,
    is_fever,
    is_weak,
    other_health_case
  });
  return request('/api/health/fill?', data, {
    method: 'POST'
  });
}

//获取全部隔离人员信息
export function getResidentList(
  condition: {
    name?: string;
    contact?: string;
    id_card?: string;
    resident_property?: string;
    quarantine_type?: string;
    place?: string;
  },
  current_state?: string
): APIResponse<any> {
  const page_size = 15;
  const page = 1;
  if (!condition.name) {
    condition.name = '';
  }
  if (!condition.contact) {
    condition.contact = '';
  }
  if (!condition.id_card) {
    condition.id_card = '';
  }
  if (!condition.resident_property) {
    condition.resident_property = '';
  }
  if (!condition.quarantine_type) {
    condition.quarantine_type = '';
  }
  if (!condition.place) {
    condition.place = '';
  }
  if (!current_state) {
    current_state = '';
  }
  const url = qs.stringify({
    page_size,
    page,
    name: condition.name,
    contact: condition.contact,
    id_card: condition.id_card,
    resident_property: condition.resident_property,
    quarantine_type: condition.quarantine_type,
    home_address: condition.place,
    current_state: current_state
  });
  return request('/api/resident/list?' + url);
}

//获取采样记录
export function getSamplingList(condition: {
  name?: string;
  contact?: string;
  id_card?: string;
  resident_property?: string;
  quarantine_type?: string;
  place?: string;
}): APIResponse<any> {
  const page_size = 15;
  const page = 1;
  if (!condition.name) {
    condition.name = '';
  }
  if (!condition.contact) {
    condition.contact = '';
  }
  if (!condition.id_card) {
    condition.id_card = '';
  }
  if (!condition.resident_property) {
    condition.resident_property = '';
  }
  if (!condition.quarantine_type) {
    condition.quarantine_type = '';
  }
  if (!condition.place) {
    condition.place = '';
  }
  const url = qs.stringify({
    page_size,
    page,
    name: condition.name,
    contact: condition.contact,
    id_card: condition.id_card,
    resident_property: condition.resident_property,
    quarantine_type: condition.quarantine_type,
    place: condition.place
  });
  return request('/api/sampling/list?' + url);
}
