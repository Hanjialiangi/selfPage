import React from 'react';
import useDocumentTitle from '@src/hooks/useDocumentTitle';
import pageStyle from '@styleModules/components/layout/page.module.scss';
import styles from '@styleModules/fallbackPage.module.scss';

export default function Fallback(): JSX.Element {
  useDocumentTitle('载入中');

  return <section className={`${pageStyle.page} ${styles.fallback}`}></section>;
}
