import React, { useEffect } from 'react';
import { withResizeDetector } from 'react-resize-detector';

const DetectorComponent = ({ width }: { width: number }) => {
  useEffect(() => {
    if (width) {
      const rootElement = document.querySelector(':root');

      if (!rootElement) {
        return;
      }

      (rootElement as HTMLHtmlElement).style.fontSize = `${
        (30 / 750) * width
      }px`;
    }
  }, [width]);

  return <div />;
};

export default withResizeDetector(DetectorComponent);
