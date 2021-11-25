import React, { useEffect, useRef } from 'react';
import Box from '@material-ui/core/Box';
import useDocumentTitle from '@src/hooks/useDocumentTitle';
import pageStyle from '@styleModules/components/layout/page.module.scss';
import { dingSetRight } from '@src/dingtalkAPI';

type PageProps = React.PropsWithChildren<{
  title?: string;
  className?: string;
  paddingBottom?: number;
  onLoad?: (element: HTMLElement) => void;
  navigationRigth?:
    | false
    | {
        label: string;
        onClick: () => void;
      };
}>;

export default function Page(props: PageProps): JSX.Element {
  useDocumentTitle(props.title || '工单');

  const pageRef = useRef<HTMLElement>(null);

  const onLoad = props.onLoad;

  const navigationRight = props.navigationRigth;

  useEffect(() => {
    if (!pageRef.current) {
      return;
    }

    if (typeof onLoad === 'function') {
      onLoad(pageRef.current);
    }

    pageRef.current.scrollIntoView();
  }, [pageRef, onLoad]);

  useEffect(() => {
    if (navigationRight === false) {
      dingSetRight(false, false, '');
      return;
    }

    if (navigationRight) {
      dingSetRight(true, true, navigationRight.label, navigationRight.onClick);
    }
  }, [navigationRight]);

  return (
    <section
      className={`${pageStyle.page} ${props.className || ''}`}
      ref={pageRef}
    >
      <Box paddingBottom={props.paddingBottom}>{props.children}</Box>
    </section>
  );
}
