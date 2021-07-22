import { useState, useCallback, useEffect } from 'react';
import { useRecoilValue } from 'recoil';

import svgAtom from 'recoil/svg';
import { getMousePosition } from 'util/svg';

export default function useCanvasItemCreate(func) {
  const svg = useRecoilValue(svgAtom);
  const [isCreating, setIsCreating] = useState(false);
  const [isMoving, setIsMoving] = useState(false);

  const getPosition = getMousePosition(svg);

  const callback = useCallback(
    (status, position) => {
      func({ status, position });
    },
    [func]
  );

  const handleMouseDown = useCallback(
    (event) => {
      setIsCreating(true);
      setIsMoving(true);

      const position = getPosition(event);
      callback('start', position);
    },
    [callback, getPosition]
  );

  const handleMouseMove = useCallback(
    (event) => {
      if (!isMoving) {
        return;
      }

      const position = getPosition(event);
      callback('moving', position);
    },
    [callback, getPosition, isMoving]
  );

  const handleMouseUp = useCallback(
    (event) => {
      if (!isMoving) {
        return;
      }

      setIsCreating(false);
      setIsMoving(false);

      const position = getPosition(event);
      callback('end', position);
    },
    [callback, getPosition, isMoving]
  );

  useEffect(() => {
    if (!isCreating) {
      svg.addEventListener('mousedown', handleMouseDown);
    }

    return () => svg.removeEventListener('mousedown', handleMouseDown);
  }, [svg, handleMouseDown, isCreating]);

  useEffect(() => {
    function addEventListeners() {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    function removeEventListeners() {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }

    isMoving ? addEventListeners() : removeEventListeners();

    return removeEventListeners;
  }, [handleMouseMove, handleMouseUp, isMoving]);

  return;
}
