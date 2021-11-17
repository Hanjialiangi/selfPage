import * as dd from 'dingtalk-jsapi';
import { ENV_ENUM } from 'dingtalk-jsapi/lib/sdk';
import { IBizMicroAppOpenAppResult } from 'dingtalk-jsapi/api/biz/microApp/openApp';
import { IBizUtilOpenLinkResult } from 'dingtalk-jsapi/api/biz/util/openLink';
import { IDeviceNotificationActionSheetResult } from 'dingtalk-jsapi/api/device/notification/actionSheet';
import { IDeviceNotificationAlertResult } from 'dingtalk-jsapi/api/device/notification/alert';
import { IDeviceNotificationConfirmResult } from 'dingtalk-jsapi/api/device/notification/confirm';
import { IDeviceNotificationHidePreloaderResult } from 'dingtalk-jsapi/api/device/notification/hidePreloader';
import { IDeviceNotificationPromptResult } from 'dingtalk-jsapi/api/device/notification/prompt';
import { IDeviceAudioStartRecordResult } from 'dingtalk-jsapi/api/device/audio/startRecord';
import { IDeviceAudioStopRecordResult } from 'dingtalk-jsapi/api/device/audio/stopRecord';
import { IDeviceAudioTranslateVoiceResult } from 'dingtalk-jsapi/api/device/audio/translateVoice';
import { IDeviceNotificationShowPreloaderResult } from 'dingtalk-jsapi/api/device/notification/showPreloader';
import { IDeviceNotificationToastResult } from 'dingtalk-jsapi/api/device/notification/toast';
import { IRuntimePermissionRequestAuthCodeResult } from 'dingtalk-jsapi/api/runtime/permission/requestAuthCode';
import { IUiPullToRefreshStopResult } from 'dingtalk-jsapi/api/ui/pullToRefresh/stop';
import { IUiPullToRefreshDisableResult } from 'dingtalk-jsapi/api/ui/pullToRefresh/disable';
import { IUiWebViewBounceEnableResult } from 'dingtalk-jsapi/api/ui/webViewBounce/enable';
import { IUiWebViewBounceDisableResult } from 'dingtalk-jsapi/api/ui/webViewBounce/disable';
import { IBizUtilPreviewImageResult } from 'dingtalk-jsapi/api/biz/util/previewImage';
import { IBizNavigationSetTitleResult } from 'dingtalk-jsapi/api/biz/navigation/setTitle';
import { IBizUtilScanResult } from 'dingtalk-jsapi/api/biz/util/scan';
import { IBizCalendarChooseOneDayResult } from 'dingtalk-jsapi/api/biz/calendar/chooseOneDay';
import { IBizAlipayPayResult } from 'dingtalk-jsapi/api/biz/alipay/pay';
import { IBizCspacePreviewResult } from 'dingtalk-jsapi/api/biz/cspace/preview';
import { IBizContactComplexPickerResult } from 'dingtalk-jsapi/api/biz/contact/complexPicker';
import { IBizContactDepartmentsPickerResult } from 'dingtalk-jsapi/api/biz/contact/departmentsPicker';
import { IBizCalendarChooseDateTimeResult } from 'dingtalk-jsapi/api/biz/calendar/chooseDateTime';
import { Mode } from './constants';
import { IBizUtilUploadAttachmentResult } from 'dingtalk-jsapi/api/biz/util/uploadAttachment';
import { IBizClipboardDataSetDataResult } from 'dingtalk-jsapi/api/biz/clipboardData/setData';

export function getPlatform(): ENV_ENUM {
  return dd.env.platform;
}

/* 获取钉钉临时授权码 */
export function dingGetCode(
  corpId: string
): Promise<IRuntimePermissionRequestAuthCodeResult> {
  if (dd.env.platform === ENV_ENUM.notInDingTalk) {
    return Promise.reject('Not in Dingtalk.');
  }
  return dd.runtime.permission.requestAuthCode({
    corpId: corpId
  });
}

/* 警告弹窗 */
export function dingAlert(
  msg: string,
  title: string,
  buttonText: string
): Promise<IDeviceNotificationAlertResult> {
  if (dd.env.platform === ENV_ENUM.notInDingTalk) {
    if (process.env.NODE_ENV === Mode.DEVELOPMENT) {
      console.error(msg);
      return Promise.resolve({});
    }
    window.alert(msg);
    return Promise.resolve({});
  }
  return dd.device.notification.alert({
    message: msg,
    title: title,
    buttonName: buttonText
  });
}

/* 确认对话框 */
export function dingConfirm(
  msg: string,
  title: string,
  buttonTexts: string[]
): Promise<IDeviceNotificationConfirmResult> {
  if (dd.env.platform === ENV_ENUM.notInDingTalk) {
    const res = window.confirm(msg) ? 1 : 0;
    return Promise.resolve({ buttonIndex: res });
  }
  return dd.device.notification.confirm({
    message: msg,
    title: title,
    buttonLabels: buttonTexts
  });
}

/* 输入对话框 */
export function dingPrompt(
  msg: string,
  title: string,
  defaultText: string,
  buttonTexts: string[]
): Promise<IDeviceNotificationPromptResult> {
  if (dd.env.platform === ENV_ENUM.notInDingTalk) {
    const value = window.prompt(msg, defaultText) || '';
    return Promise.resolve({ buttonIndex: 1, value: value });
  }
  return dd.device.notification.prompt({
    message: msg,
    title: title,
    defaultText: defaultText,
    buttonLabels: buttonTexts
  });
}

/* 显示加载中提示 */
export function dingShowPreloader(
  text: string
): Promise<IDeviceNotificationShowPreloaderResult> {
  if (dd.env.platform === ENV_ENUM.notInDingTalk) {
    return Promise.resolve({});
  }
  return dd.device.notification.showPreloader({
    text: text
  });
}

/* 隐藏加载中提示 */
export const dingHidePreloader =
  (): Promise<IDeviceNotificationHidePreloaderResult> =>
    dd.env.platform === ENV_ENUM.notInDingTalk
      ? Promise.resolve({})
      : dd.device.notification.hidePreloader({});

/* 显示气泡提示 */
export function dingToast(
  text: string,
  icon?: 'success' | 'error'
): Promise<IDeviceNotificationToastResult> {
  if (dd.env.platform === ENV_ENUM.notInDingTalk) {
    console.log(text);
    return Promise.resolve({});
  }
  return dd.device.notification.toast({
    icon: icon,
    text: text
  });
}

/* 显示单选列表 */
export function dingActionSheet(
  title: string,
  cancelText: string,
  selections: string[]
): Promise<IDeviceNotificationActionSheetResult> {
  if (dd.env.platform === ENV_ENUM.notInDingTalk) {
    const value = window.prompt(JSON.stringify(selections), '0') || '0';
    return Promise.resolve({ buttonIndex: parseInt(value) });
  }
  return dd.device.notification.actionSheet({
    title: title,
    cancelButton: cancelText,
    otherButtons: selections
  });
}

/* 返回上一级页面 */
export const dingGoBack = (): void => {
  dd.env.platform === ENV_ENUM.notInDingTalk
    ? window.history.back()
    : dd.biz.navigation.goBack({});
};

/* 关闭当前页面 */
export const dingClosePage = (): void => {
  dd.env.platform === ENV_ENUM.notInDingTalk
    ? window.close()
    : dd.biz.navigation.close({});
};

/* 关闭页面（在侧边栏或弹窗打开的页面） */
export const dingQuitPage = (): void => {
  dd.env.platform === ENV_ENUM.notInDingTalk
    ? window.close()
    : dd.biz.navigation.quit({ message: '' });
};

/* 打开链接 */
export function dingOpenLink(link: string): Promise<IBizUtilOpenLinkResult> {
  if (dd.env.platform === ENV_ENUM.notInDingTalk) {
    window.open(link, '_self');
    return Promise.resolve({});
  }
  return dd.biz.util.openLink({
    url: link
  });
}

/* 打开钉钉工作台应用 */
export function dingOpenApp(
  agentId: string,
  appId: string,
  corpId: string
): Promise<IBizMicroAppOpenAppResult> {
  if (dd.env.platform === ENV_ENUM.notInDingTalk) {
    return Promise.resolve({ result: 1 });
  }
  return dd.biz.microApp.openApp({
    agentId: agentId,
    appId: appId,
    corpId: corpId
  });
}

/* 下拉刷新 */
export function dingPullToRefresh(onSuccess?: () => void): void {
  if (
    dd.env.platform === ENV_ENUM.ios ||
    dd.env.platform === ENV_ENUM.android
  ) {
    dd.ui.pullToRefresh.enable({
      onSuccess: onSuccess
    });
  }
}

/* 停止下拉刷新 */
export const dingStopPullToRefresh = (): Promise<IUiPullToRefreshStopResult> =>
  dd.env.platform === ENV_ENUM.notInDingTalk
    ? Promise.resolve({})
    : dd.ui.pullToRefresh.stop({});

/* 禁用下拉刷新 */
export const dingDisablePullToRefresh =
  (): Promise<IUiPullToRefreshDisableResult> =>
    dd.env.platform === ENV_ENUM.notInDingTalk
      ? Promise.resolve({})
      : dd.ui.pullToRefresh.disable({});

/* 启用iOS页面回弹效果 */
export const dingEnableWebViewBounce =
  (): Promise<IUiWebViewBounceEnableResult> =>
    dd.env.platform === ENV_ENUM.ios
      ? dd.ui.webViewBounce.enable({})
      : Promise.resolve({});

/* 禁用iOS页面回弹 */
export const dingDisableWebViewBounce =
  (): Promise<IUiWebViewBounceDisableResult> =>
    dd.env.platform === ENV_ENUM.ios
      ? dd.ui.webViewBounce.disable({})
      : Promise.resolve({});

/* 浏览图片 */
export function dingPreviewImage(
  urls: string[],
  current: string
): Promise<IBizUtilPreviewImageResult> {
  if (dd.env.platform === ENV_ENUM.notInDingTalk) {
    return Promise.resolve({});
  }
  return dd.biz.util.previewImage({
    urls,
    current
  });
}

/* 设置顶栏标题内容 */
export function dingSetTitle(
  title: string
): Promise<IBizNavigationSetTitleResult> {
  if (dd.env.platform === ENV_ENUM.notInDingTalk) {
    return Promise.resolve({});
  }
  return dd.biz.navigation.setTitle({
    title
  });
}

/* 发起会话 */
export function dingConversation(corpId: string, userId: string) {
  return dd.biz.chat.openSingleChat({
    corpId: corpId, // 企业id,必须是用户所属的企业的corpid
    userId: userId
  });
}

/* 设置顶栏右侧内容 */
export function dingSetRight(
  show: boolean,
  control: boolean,
  text: string,
  onSuccess?: () => void
): void {
  if (
    dd.env.platform === ENV_ENUM.ios ||
    dd.env.platform === ENV_ENUM.android
  ) {
    dd.biz.navigation.setRight({
      show,
      control,
      text,
      onSuccess
    });
  }
}

/* 扫描二维码、条形码 */
export function dingScan(type = 'all'): Promise<IBizUtilScanResult> {
  if (dd.env.platform === ENV_ENUM.notInDingTalk) {
    return Promise.resolve({ text: '' });
  }
  return dd.biz.util.scan({
    type
  });
}

/* 选择日期 */
export function dingDatePicker(
  timestamp?: number
): Promise<IBizCalendarChooseOneDayResult> {
  if (dd.env.platform === ENV_ENUM.notInDingTalk) {
    return Promise.resolve({ chosen: timestamp || Date.now(), timezone: 8 });
  }
  return dd.biz.calendar.chooseOneDay({ default: timestamp });
}

/* 选择时间 */
export function dingDateTimePicker(
  timestamp?: number
): Promise<IBizCalendarChooseDateTimeResult> {
  if (dd.env.platform === ENV_ENUM.notInDingTalk) {
    return Promise.resolve({
      chosen: timestamp || Date.now(),
      timezone: 8
    });
  }
  return dd.biz.calendar.chooseDateTime({
    default: timestamp
  });
}

/* JSAPI鉴权 */
export function dingConfig(
  config: {
    agentId: string | number;
    corpId: string;
    timeStamp: number;
    nonceStr: string;
    signature: string;
  },
  jsApiList: string[]
): Promise<void> {
  if (dd.env.platform === ENV_ENUM.notInDingTalk) {
    return Promise.resolve();
  }
  return new Promise((resolve, reject) => {
    dd.config({
      agentId: config.agentId,
      corpId: config.corpId,
      timeStamp: config.timeStamp,
      nonceStr: config.nonceStr,
      signature: config.signature,
      type: 0,
      jsApiList
    });
    dd.ready(() => resolve());
    dd.error(err => reject(err));
  });
}

/* 需要JSAPI鉴权 */

/* 发起支付宝支付 */
export function dingPay(info: string): Promise<IBizAlipayPayResult> {
  if (dd.env.platform === ENV_ENUM.notInDingTalk) {
    return Promise.resolve({});
  }
  return dd.biz.alipay.pay({
    info: info
  });
}

/* 预览钉盘文件 */
export function dingPreviewFile(
  corpId: string,
  fileInfo: {
    spaceId: string;
    fileId: string;
    fileName: string;
    fileSize: number;
    fileType: string;
  }
): Promise<IBizCspacePreviewResult> {
  if (dd.env.platform === ENV_ENUM.notInDingTalk) {
    return Promise.resolve({});
  }
  return dd.biz.cspace.preview({
    corpId: corpId,
    spaceId: fileInfo.spaceId,
    fileId: fileInfo.fileId,
    fileName: fileInfo.fileName,
    fileSize: fileInfo.fileSize,
    fileType: fileInfo.fileType
  });
}

/**
 * 上传文件到钉盘
 * @param spaceId 钉盘空间ID
 * @param max 最大上传文件数量
 */
export function dingUploadFile(
  spaceId: string,
  max: number,
  corpId: string
): Promise<IBizUtilUploadAttachmentResult> {
  return dd.biz.util.uploadAttachment({
    image: { multiple: true, compress: true, max, spaceId },
    file: { spaceId, max },
    space: { corpId, spaceId, isCopy: 1 },
    types: ['photo', 'camera', 'file', 'space']
  });
}

interface DingComplexPickerOptions {
  title?: string;
  corpId?: string;
  multiple?: boolean;
  limitTips?: string;
  maxUsers?: number;
  pickedUsers?: string[];
  pickedDepartments?: string[];
  disabledUsers?: string[];
  disabledDepartments?: string[];
  requiredUsers?: string[];
  requiredDepartments?: string[];
  appId?: number;
  responseUserOnly?: boolean;
}
/**
 * 钉钉通讯录选人
 * @param options 选项
 */
export function dingComplexPicker(
  options: DingComplexPickerOptions = {}
): Promise<IBizContactComplexPickerResult> {
  if (dd.env.platform === ENV_ENUM.notInDingTalk) {
    return Promise.resolve({
      selectedCount: 0,
      users: [],
      departments: []
    });
  }
  return dd.biz.contact.complexPicker({
    title: options.title || '选人', //标题
    corpId: options.corpId || '-', //企业的corpId
    multiple: options.multiple || false, //是否多选
    limitTips: options.limitTips || '超出人数限制', //超过限定人数返回提示
    maxUsers: options.maxUsers || 10, //最大可选人数
    pickedUsers: options.pickedUsers || [], //已选用户
    pickedDepartments: options.pickedDepartments || [], //已选部门
    disabledUsers: options.disabledUsers || [], //不可选用户
    disabledDepartments: options.disabledDepartments || [], //不可选部门
    requiredUsers: options.requiredUsers || [], //必选用户（不可取消选中状态）
    requiredDepartments: options.requiredDepartments || [], //必选部门（不可取消选中状态）
    appId: options.appId || 0, //微应用的Id
    permissionType: 'GLOBAL', //可添加权限校验，选人权限，目前只有GLOBAL这个参数
    responseUserOnly: options.responseUserOnly || false //返回人，或者返回人和部门
  });
}

interface DingDepartmentPickerOptions {
  title?: string;
  corpId?: string;
  multiple?: boolean;
  limitTips?: string;
  maxDepartments?: number;
  pickedDepartments?: string[];
  disabledDepartments?: string[];
  requiredDepartments?: string[];
  appId?: number;
}
/**
 * 钉钉通讯录选部门
 * @param options 选项
 */
export function dingDepartmentPicker(
  options: DingDepartmentPickerOptions = {}
): Promise<IBizContactDepartmentsPickerResult> {
  if (dd.env.platform === ENV_ENUM.notInDingTalk) {
    return Promise.resolve({
      userCount: 0,
      departmentsCount: 0,
      departments: []
    });
  }
  return dd.biz.contact.departmentsPicker({
    title: options.title || '选择部门', //标题
    corpId: options.corpId || '-', //企业的corpId
    multiple: options.multiple || false, //是否多选
    limitTips: options.limitTips || '超出数量限制', //超过限定人数返回提示
    maxDepartments: options.maxDepartments || 10, //最大选择部门数量
    pickedDepartments: options.pickedDepartments || [], //已选部门
    disabledDepartments: options.disabledDepartments || [], //不可选部门
    requiredDepartments: options.requiredDepartments || [], //必选部门（不可取消选中状态）
    appId: options.appId || '-', //微应用的Id
    permissionType: 'GLOBAL' //选人权限，目前只有GLOBAL这个参数
  });
}

/**
 * 将文本复制到剪贴板
 * @param text 需要复制到剪贴板的文本
 */
export function dingCopy(
  text: string
): Promise<IBizClipboardDataSetDataResult> {
  if (dd.env.platform === ENV_ENUM.notInDingTalk) {
    return Promise.resolve({});
  }
  return dd.biz.clipboardData.setData({
    text
  });
}

//开始录影
export function dingStartRecord(): Promise<IDeviceAudioStartRecordResult> {
  return dd.device.audio.startRecord({ maxDuration: 300 });
}

//停止录影
export function dingStopRecord(): Promise<IDeviceAudioStopRecordResult> {
  return dd.device.audio.stopRecord({});
}

//语音转文字
export function dingTranslateVoice(
  mediaId: string,
  duration: number
): Promise<IDeviceAudioTranslateVoiceResult> {
  return dd.device.audio.translateVoice({ mediaId, duration });
}
