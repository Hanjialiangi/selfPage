import jsCookie from 'js-cookie';
import moment from 'moment';
import qs from 'query-string';
import { dingActionSheet, dingConfig } from '@src/dingtalkAPI';
import { Dingtalk, PUBLIC_PATH } from './constants';
import { getDingConfig } from './api';

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

//工具函数(form表单string序列)
export function isValidKey(
  key: string | number | symbol,
  // eslint-disable-next-line @typescript-eslint/ban-types
  object: object
): key is keyof typeof object {
  return key in object;
}
