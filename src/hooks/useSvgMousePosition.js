import { useCallback } from 'react';
import { useRecoilValue } from 'recoil';

import svgAtom from 'recoil/svg';

export default function useSvgMousePosition() {
  const svg = useRecoilValue(svgAtom);

  const getMousePosition = useCallback(
    (event) => {
      const CTM = svg.getScreenCTM();
      return {
        x: (event.clientX - CTM.e) / CTM.a,
        y: (event.clientY - CTM.f) / CTM.d,
      };
    },
    [svg]
  );

  return useCallback(getMousePosition, [getMousePosition]);
}
