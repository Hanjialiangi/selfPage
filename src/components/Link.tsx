import { getURL } from '@src/utils';
import React, { PropsWithChildren, useEffect, useState } from 'react';

type Props = PropsWithChildren<{
  to: string;
  className?: string;
}>;

export default function Link({ to, children, className }: Props): JSX.Element {
  const [href, setHref] = useState('');

  useEffect(() => {
    setHref(getURL(to));
  }, [to]);

  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}
