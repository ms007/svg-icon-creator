import { useState, useCallback, useEffect } from 'react';
import useSvgMousePosition from './useSvgMousePosition';

export default function useCanvasItemMove(func) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);

  const getMousePosition = useSvgMousePosition();

  const callback = useCallback(
    (status, position) => {
      func({ status, position });
    },
    [func]
  );

  const handleMouseDown = useCallback(
    (event) => {
      const position = getMousePosition(event);
      const selectedElement = event.target;
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

    isMoving ? addEventListeners() : removeEventListeners();

    return removeEventListeners;
  }, [handleMouseMove, handleMouseUp, isMoving]);

  return {
    onMouseDown: handleMouseDown,
  };
}
