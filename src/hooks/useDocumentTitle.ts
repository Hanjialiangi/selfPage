import { dingSetTitle } from '@src/dingtalkAPI';
import { useEffect, useState } from 'react';

export default function useDocumentTitle(
  initTitle: string
): React.Dispatch<React.SetStateAction<string>> {
  const [title, setTitle] = useState(initTitle);

  useEffect(() => {
    //设置文档标题
    document.title = title;

    //设置钉钉微应用的窗口顶部标题
    dingSetTitle(title);
  }, [title]);

  return setTitle;
}
