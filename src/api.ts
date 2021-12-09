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
    process.env.API_PREFIX + url,
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
  return request('/login', data, { method: 'POST' });
}

/**
 * 获取用户信息
 */
export function getUserInfo(): APIResponse<any> {
  return request('/authed_user');
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
  return request('/ding/config', data, { method: 'POST' });
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
  return request('/dingFile/permission', data, { method: 'POST' });
}

/************************获取详情页接口*********************************/
//获取某个居民详细信息
export function getResidentInfo(id: string): APIResponse<any> {
  const open_id = id;
  return request('/resident/info?open_id=' + open_id);
}

//更新居民信息
export function getFixResidentInfo(
  id: string,
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  formvalue: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): APIResponse<any> {
  const data = JSON.stringify({ open_id: id, properties: formvalue });
  return request('/resident', data, { method: 'PUT' });
}
/***************************酒店功能************************************/
//获取酒店列表
export function getHotelList(): APIResponse<any> {
  return request('/hotel/search');
}

//分页获取酒店列表
export function getHotelListAll(
  page_size: number,
  page: number,
  condition: {
    hotel_name?: string;
    state?: string;
    capacity?: string;
  }
): APIResponse<any> {
  const hotel_name = condition.hotel_name || '';
  const state = condition.state || '';
  const capacity = condition.capacity || '';
  const url = qs.stringifyUrl({
    url: '/hotel/list',
    query: {
      page,
      page_size,
      'property_queries[]': [
        `resident_property|${hotel_name}`,
        `quarantine_type|${state}`,
        `home_address|${capacity}`
      ]
    }
  });
  return request(url);
}

//获取酒店详细信息
export function getHotelDetailInfo(id: string): APIResponse<any> {
  return request('/hotel/info?id=' + id);
}

//酒店接收人员
export function getHotelReceive(
  open_id: string,
  condition: {
    hotel_name: string;
    room: string;
    time: string;
    releaseTime: string;
  }
): APIResponse<any> {
  const open_ids = [open_id];
  const hotel_name = condition.hotel_name;
  const room = condition.room;
  const time = condition.time;
  const release_time = condition.releaseTime;
  const data = JSON.stringify({
    open_ids,
    hotel_name,
    room,
    time,
    release_time
  });
  return request('/receive/hotel?', data, {
    method: 'POST'
  });
}

//转运到酒店（发起转运）
export function getTransferHotel(
  open_id: string,
  hotel_name?: string,
  sub_district?: string,
  healthcare_center?: string
): APIResponse<any> {
  const open_ids = [open_id];
  const data = JSON.stringify({
    open_ids,
    hotel_name,
    sub_district,
    healthcare_center
  });
  return request('/transfer/hotel', data, {
    method: 'POST'
  });
}

/*****************************社区功能*****************************************/
//获取社区列表
export function getCommunityList(): APIResponse<any> {
  const page_size = 10;
  const sub_district = '望江';
  return request(
    '/community/list?page_size=' + page_size + 'sub_district=' + sub_district
  );
}

//转运到社区(发起转运)
export function getTransferCommunity(
  open_id: string,
  time: string
): APIResponse<any> {
  const open_ids = [open_id];
  const data = JSON.stringify({
    open_ids,
    time
  });
  return request('/transfer/community', data, {
    method: 'POST'
  });
}

//社区接收人员
export function getCommunityReceive(
  open_id: string,
  time: string
): APIResponse<any> {
  const open_ids = [open_id];
  const data = JSON.stringify({
    open_ids,
    time
  });
  return request('/receive/community', data, {
    method: 'POST'
  });
}

//采样管理单项上传
export function getCreateSampling(
  open_id: string,
  planned_date: string,
  sampling_date?: string,
  sampling_result?: string
): APIResponse<any> {
  const data = JSON.stringify({
    open_id,
    planned_date,
    sampling_date,
    sampling_result
  });
  return request('/sampling', data, {
    method: 'POST'
  });
}

//健康状况上传
export function getCreateHealth(
  open_id: string,
  is_cough?: string,
  is_fever?: string,
  is_weak?: string,
  other_health_case?: string
): APIResponse<any> {
  const data = JSON.stringify({
    open_id,
    is_cough,
    is_fever,
    is_weak,
    other_health_case
  });
  return request('/health/fill', data, {
    method: 'POST'
  });
}

//获取全部隔离人员信息
export function getResidentList(
  page_size: number,
  page: number,
  condition: {
    name?: string;
    contact?: string;
    id_card?: string;
    resident_property?: string;
    quarantine_type?: string;
    quarantine_hotel?: string;
    home_address?: string;
  },
  current_state?: Array<string>
): APIResponse<any> {
  condition.name = condition.name || '';
  condition.contact = condition.contact || '';
  condition.id_card = condition.id_card || '';
  condition.resident_property = condition.resident_property || '';
  condition.quarantine_type = condition.quarantine_type || '';
  condition.quarantine_hotel = condition.quarantine_hotel || '';
  condition.home_address = condition.home_address || '';
  const url = qs.stringifyUrl({
    url: '/resident/list',
    query: {
      page,
      page_size,
      name: condition.name,
      contact: condition.contact,
      id_card: condition.id_card,
      'property_queries[]': [
        `resident_property|${condition.resident_property}`,
        `quarantine_type|${condition.quarantine_type}`,
        `home_address|${condition.home_address}`,
        `quarantine_hotel|${condition.quarantine_hotel}`
      ],
      current_state: current_state?.join(',')
    }
  });
  return request(url);
}

//获取采样记录
export function getSamplingList(
  page_size: number,
  page: number,
  condition: {
    name?: string;
    contact?: string;
    id_card?: string;
    resident_property?: string;
    quarantine_type?: string;
    quarantine_hotel?: string;
    home_address?: string;
  }
): APIResponse<any> {
  condition.name = condition.name || '';
  condition.contact = condition.contact || '';
  condition.id_card = condition.id_card || '';
  condition.resident_property = condition.resident_property || '';
  condition.quarantine_type = condition.quarantine_type || '';
  condition.quarantine_hotel = condition.quarantine_hotel || '';
  condition.home_address = condition.home_address || '';
  const url = qs.stringifyUrl({
    url: '/sampling/list',
    query: {
      page,
      page_size,
      name: condition.name,
      contact: condition.contact,
      id_card: condition.id_card,
      'property_queries[]': [
        `resident_property|${condition.resident_property}`,
        `quarantine_type|${condition.quarantine_type}`,
        `home_address|${condition.home_address}`,
        `quarantine_hotel|${condition.quarantine_hotel}`
      ]
    }
  });
  return request(url);
}

//转院
export function transferHospital(
  open_id: string,
  time: string,
  hospital: string
): APIResponse<any> {
  const data = JSON.stringify({ open_id, time, hospital });
  return request('/transfer/hospital', data, {
    method: 'POST'
  });
}

//转归
export function transferBack(
  open_id: string,
  time: string,
  outcome: string
): APIResponse<any> {
  const data = JSON.stringify({ open_id, time, outcome });
  return request('/outcome', data, {
    method: 'POST'
  });
}

//获取街道列表
export function getSubDistrict(): APIResponse<any> {
  const page_size = 100;
  return request('/sub_district/list?page_size=' + page_size);
}

//获取社区服务中心
export function getServiceCenter(sub_district: string): APIResponse<any> {
  const page_size = 100;
  const url = qs.stringifyUrl({
    url: '/healthcare_center/list',
    query: {
      page_size,
      sub_district
    }
  });
  return request(url);
}

//更新人员预计隔离酒店以及街道信息
export function updatePersonInfo(
  open_id: string,
  planned_quarantine_hotel: string,
  healthcare_center: string,
  sub_district: string
): APIResponse<any> {
  const hotel = {
    key: 'planned_quarantine_hotel',
    value: planned_quarantine_hotel
  };
  const healthCenter = {
    key: 'healthcare_center',
    value: healthcare_center
  };
  const sub = {
    key: 'sub_district',
    value: sub_district
  };
  const properties = [hotel, healthCenter, sub];
  const data = JSON.stringify({ open_id, properties });
  return request('/resident', data, {
    method: 'PUT'
  });
}

//转运到居家隔离酒店
export function transferHomeQuarantineHotel(
  open_id: string,
  hotel_name: string,
  time: string
): APIResponse<any> {
  const open_ids = [open_id];
  const data = JSON.stringify({ open_ids, hotel_name, time });
  return request('/transfer/home_quarantine_hotel', data, { method: 'POST' });
}

//提交异常情况
export function uploadException(
  open_id: string,
  exception: string
): APIResponse<any> {
  const open_ids = [open_id];
  const data = JSON.stringify({ open_ids, exception });
  return request('/quarantine_exception', data, { method: 'POST' });
}
