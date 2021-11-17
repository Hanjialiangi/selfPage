import { dingHidePreloader, dingShowPreloader } from '@src/dingtalkAPI';
import { useEffect, useState } from 'react';

export default function useLoading(
  loadingText?: string
): [boolean, React.Dispatch<React.SetStateAction<boolean>>] {
  /* 是否正在加载 */
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isLoading) {
      dingShowPreloader(loadingText || '');
    } else {
      dingHidePreloader();
    }
  }, [isLoading, loadingText]);

  return [isLoading, setIsLoading];
}
