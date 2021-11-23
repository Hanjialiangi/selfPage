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
export function getUserInfo(): APIResponse<any> {
  // const res: any = {
  //   code: 200,
  //   data: { user_name: '张三', id: 3, role: 1, level: 2, avatar: '' },
  //   message: 'ok'
  // };
  // return res;
  return request('/api/authed_user');
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
