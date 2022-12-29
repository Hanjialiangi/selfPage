import React, { useEffect} from 'react';
import useDocumentTitle from '@src/hooks/useDoucumentTitle';
import CommentComponent from '@components/Comment';

export default function Home(): JSX.Element {
  useDocumentTitle('首页');
  return (
    <div>
      <CommentComponent />
    </div>
  );
}
