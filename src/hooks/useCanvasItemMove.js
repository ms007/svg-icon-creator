import { useState, useCallback, useEffect } from 'react';
import { useRecoilValue } from 'recoil';

import svgAtom from 'recoil/svg';

export default function useCanvasItemMove(func) {
  const svg = useRecoilValue(svgAtom);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);

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

  const callback = useCallback(
    (status, position) => {
      func({ status, position });
    },
    [func]
  );

  const handleMouseDown = useCallback(
    (event) => {
      const selectedElement = event.target;
      const position = getMousePosition(event);
      position.x -= parseFloat(selectedElement.getAttributeNS(null, 'x'));
      position.y -= parseFloat(selectedElement.getAttributeNS(null, 'y'));
      setIsMoving(true);
      setOffset(position);
      callback('start', position);
    },
    [callback, getMousePosition]
  );

  const handleMouseMove = useCallback(
    (event) => {
      if (!isMoving) {
        return;
      }

      const position = getMousePosition(event);
      position.x = position.x - offset.x;
      position.y = position.y - offset.y;
      callback('moving', position);
    },
    [callback, getMousePosition, isMoving, offset]
  );

  const handleMouseUp = useCallback(
    (event) => {
      if (!isMoving) {
        return;
      }

      setIsMoving(false);

      const position = getMousePosition(event);
      position.x = position.x - offset.x;
      position.y = position.y - offset.y;
      callback('end', position);
    },
    [callback, getMousePosition, isMoving, offset]
  );

  useEffect(() => {
    function addEventListeners() {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    function removeEventListeners() {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }

    if (isMoving) {
      addEventListeners();
    } else {
      removeEventListeners();
    }

    return removeEventListeners;
  }, [handleMouseMove, handleMouseUp, isMoving]);

  return {
    onMouseDown: handleMouseDown,
  };
}
