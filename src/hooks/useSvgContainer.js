import { useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';

import { artboardIsReadyAtom } from 'recoil/artboard';

const getContainer = () => document.getElementById('svg-container');

export default function useSvgContainer() {
  const artboardIsReady = useRecoilValue(artboardIsReadyAtom);
  const svgContainer = useRef(getContainer());

  useEffect(() => {
    svgContainer.current = getContainer();
  }, [artboardIsReady]);

  return svgContainer.current || null;
}
