import { useRef, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import svgAtom from 'recoil/svg';

export default function useSvgRef() {
  const ref = useRef(null);
  const updateSvg = useSetRecoilState(svgAtom);

  useEffect(() => {
    updateSvg(ref.current);
  }, [ref, updateSvg]);

  return ref;
}
