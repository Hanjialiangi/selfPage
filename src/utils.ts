import jsCookie from 'js-cookie';
import moment from 'moment';
import qs from 'query-string';
import { dingActionSheet, dingConfig } from '@src/dingtalkAPI';
import { Dingtalk, PUBLIC_PATH } from './constants';
import { getDingConfig } from './api';
import BScroll from '@better-scroll/core';
import Pullup from '@better-scroll/pull-up';
import { BScrollConstructor } from '@better-scroll/core/dist/types/BScroll';

BScroll.use(Pullup);
/**
 * 设置 Cookie
 * @param key Cookie 键名
 * @param value Cookie 值
 * @param expires Cookie 有效期（天数）
 */
export function setCookie(key: string, value: string, expires: number): void {
  if (expires > 0) {
    jsCookie.set(key, value, { expires });
  } else {
    jsCookie.set(key, value);
  }
}

/**
 * 读取 Cookie
 * @param key Cookie 键名
 * @returns Cookie 值
 */
export function getCookie(key: string): string | undefined {
  return jsCookie.get(key);
}

/**
 * 删除 Cookie
 * @param key Cookie 键名
 */
export function removeCookie(key: string): void {
  jsCookie.remove(key);
}

/**
 * 根据路径获取完整的URL
 * @param path 路径
 * @returns URL
 */
export function getURL(path: string): string {
  const fullPath = `${PUBLIC_PATH}${path}`.replace(/\/\//g, '/');
  return `${window.location.origin}${fullPath}`;
}

/**
 * 格式化时间
 * @param time 待格式化的时间
 * @param formatFromNow 返回相对时间的最大时间差，当 time 与当前时间差小于该参数指定的毫秒数时，返回相对时间，否则返回 format 参数指定的时间格式
 * @param format 时间格式
 * @returns 时间字符串
 */
export function formatDateTime(
  time: moment.MomentInput,
  formatFromNow = 0,
  format?: string
): string {
  const diffFromNow = Math.abs(moment().diff(time));

  const dateTime = moment(time).locale('zh-CN');
  if (diffFromNow < formatFromNow) {
    return dateTime.fromNow();
  }
  return dateTime.format(format);
}

window.formatDateTime = formatDateTime;

/**
 * 从文本中截取指定数量文字并在末尾添加必要的省略号
 * @param content 原始文本内容
 * @param maxLength 最大显示文字数量
 * @returns 省略之后的文本内容
 */
export function getTextEllipsis(content: string, maxLength: number): string {
  if (content.length <= maxLength) {
    return content;
  }

  return `${content.slice(0, maxLength)}...`;
}

/**
 * 获取 QueryString 参数对象或参数值
 * @param key QueryString 的参数键名
 * @returns 参数值或 QueryString 参数对象
 */
export function getQuery(): qs.ParsedQuery<string>;
export function getQuery(key: string): string | string[];
export function getQuery(
  key?: string
): string | string[] | qs.ParsedQuery<string> {
  const query = qs.parse(window.location.search);
  if (key) {
    return query[key] || '';
  }

  return query;
}

type TreeOption = {
  label: string;
  value: number;
  children?: TreeOption[];
};
/**
 * 选择多级选项
 * @param options 多级选项
 * @param selectedPath 已选择的选项路径
 * @returns selected: 已选择的选项（叶子节点）、selectedPath: 已选择的路径（节点数组）
 */
export async function selectTreeOptions(
  options: TreeOption[],
  selectedPath: TreeOption[] = []
): Promise<{ selected: TreeOption; selectedPath: TreeOption[] } | false> {
  const selections = options.map(option => option.label);
  const selectionIndex = await dingActionSheet('请选择', '取消', selections);
  if (selectionIndex.buttonIndex < 0) {
    return false;
  }

  const selectedOption = options[selectionIndex.buttonIndex];
  const newSelectedPath = selectedPath.concat(selectedOption);
  if (!selectedOption.children) {
    return { selected: selectedOption, selectedPath: newSelectedPath };
  }
  return selectTreeOptions(selectedOption.children, newSelectedPath);
}

/**
 * 钉钉 JS API 鉴权
 * @param apiList 钉钉 JSAPI
 * @returns true: 鉴权成功 | false: 鉴权失败
 */
export async function configDingtalk(apiList: string[]): Promise<boolean> {
  const configParamsRes = await getDingConfig(
    Dingtalk.AGENT_ID,
    window.location.href.replace(/#.*/, '')
  );
  if (configParamsRes.code !== 200) {
    return false;
  }

  try {
    await dingConfig(
      {
        agentId: configParamsRes.data.agent_id,
        corpId: configParamsRes.data.corp_id,
        timeStamp: configParamsRes.data.time_stamp,
        nonceStr: configParamsRes.data.nonce_str,
        signature: configParamsRes.data.signature
      },
      apiList
    );
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

window.configDingtalk = configDingtalk;

export function getTextFromHTML(html: string): string {
  try {
    if (html) {
      return new DOMParser().parseFromString(html, 'text/html').body.innerText;
    } else {
      return '';
    }
  } catch (_error) {
    return '';
  }
}

/**
 * 工具函数(form表单string序列)
 * @param key 序列索引
 * @param object 对象
 * @returns 索引
 */
export function isValidKey(
  key: string | number | symbol,
  // eslint-disable-next-line @typescript-eslint/ban-types
  object: object
): key is keyof typeof object {
  return key in object;
}
/**
 * 检测页面滑动下一页配置
 * @param wrapper 选择的容器
 * @returns bscroll配置
 */
export function BScrollConfig(wrapper: any): BScrollConstructor<any> {
  return new BScroll(wrapper, {
    probeType: 3,
    click: false,
    preventDefault: false,
    pullUpLoad: {
      threshold: -20,
      stop: 700
    }
  });
}

export function insertDebugScript(): void {
  const script = document.createElement('script');
  script.src =
    'https://g.alicdn.com/code/npm/@ali/dingtalk-h5-remote-debug-sdk/0.1.1/app.bundle.js';
  document.body.appendChild(script);
}

export function enableDebug(uuid: string): void {
  (
    window as unknown as {
      h5RemoteDebugSdk: {
        init: (arg: { uuid: string; observerElement: HTMLElement }) => void;
      };
    }
  ).h5RemoteDebugSdk.init({
    uuid: uuid,
    observerElement: document.documentElement
  });
}

type Form = {
  name: string;
  contact: string;
  id_card: string;
  resident_property: string;
  quarantine_type: string;
  quarantine_hotel: string;
  home_address: string;
};

/**
 *
 * @returns 返回表单对象
 */
//页面初始化获取表单数据
export function getFormVaildValue(): Form {
  const name = (document.querySelector('.name input') as HTMLInputElement)
    .value;
  const contact = (document.querySelector('.contact input') as HTMLInputElement)
    .value;
  const id_card = (document.querySelector('.id_card input') as HTMLInputElement)
    .value;
  const resident_property = document.querySelector('.resident_property select')
    ? (document.querySelector('.resident_property select') as HTMLInputElement)
        .value
    : '';
  const quarantine_type = document.querySelector('.quarantine_type select')
    ? (document.querySelector('.quarantine_type select') as HTMLInputElement)
        .value
    : '';
  const quarantine_hotel = document.querySelector('.quarantine_hotel input')
    ? (document.querySelector('.quarantine_hotel input') as HTMLInputElement)
        .value
    : '';
  const home_address = document.querySelector('.home_address input')
    ? (document.querySelector('.home_address input') as HTMLInputElement).value
    : '';
  const form: Form = {
    name: '',
    contact: '',
    id_card: '',
    resident_property: '',
    quarantine_type: '',
    quarantine_hotel: '',
    home_address: ''
  };
  form.name = name;
  form.contact = contact;
  form.id_card = id_card;
  form.resident_property = resident_property;
  form.quarantine_hotel = quarantine_hotel;
  form.quarantine_type = quarantine_type;
  form.home_address = home_address;

  return form;
}

//权限判断
/**
 * 处理权限数组
 * @param value 权限数组
 * @returns 权限逗号分隔的字符串
 */
export function judgeRole(value: Array<string>): string {
  const role: Array<string> = []; //权限设置
  value.map((item: any) => {
    role.push(item);
  });
  return role.join(',');
}
