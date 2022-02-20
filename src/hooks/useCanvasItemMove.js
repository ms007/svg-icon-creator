import { useState, useCallback, useEffect } from 'react';
import useSvgMousePosition from './useSvgMousePosition';

export default function useCanvasItemMove(func) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);

  const getMousePosition = useSvgMousePosition();

  const callback = useCallback(
    (status, position, event) => {
      func({ status, event, position });
    },
    [func]
  );

  const handleMouseDown = useCallback(
    (event, props) => {
      const position = getMousePosition(event);
      const selectedElement = event.target;

      const positionXAttribute = event.target.nodeName === 'circle' ? 'cx' : 'x';
      const positionYAttribute = event.target.nodeName === 'circle' ? 'cy' : 'y';

      position.x -= parseFloat(selectedElement.getAttributeNS(null, positionXAttribute));
      position.y -= parseFloat(selectedElement.getAttributeNS(null, positionYAttribute));
      setIsMoving(true);
      setOffset(position);
      callback('start', position, event, props);
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
      callback('moving', position, event);
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
      callback('end', position, event);
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
