declare type ListItem = {
  id: number | string;
};

declare type EditorInstance = {
  getContent: () => string;
};

/* 接口返回数据的基本结构，包含id、创建时间和更新时间 */
declare type DataBaseType = {
  id: number;
  created_at: string;
  updated_at: string;
};

declare interface Window {
  login?: (reLogin?: boolean) => Promise<void>;
  formatDateTime: (
    time: moment.MomentInput,
    formatFromNow?: number,
    format?: string
  ) => string;
  configDingtalk: (apiList: string[]) => Promise<boolean>;
}

declare type InputChangeEvent = React.ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement
>;

declare type DingFile = {
  fileId: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  spaceId: string;
};
