import React, { useRef, useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useDrag, useDrop } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';

import ShapeButton from './ShapeButton';
import Preview from './Preview';
import Input from './Input';
import Text from './Text';
import { canvasSelectedItemsAtom, withHoveredCanvasItem } from 'recoil/canvas';
import { draggedShapeAtom, withShapeDraggingConstraints } from 'recoil/sidebar';

const Shape = ({ id, index, onDrop, onDropIndexChange }) => {
  const ref = useRef(null);
  const [selectedCanvasItem, setSelectedCanvasItem] = useRecoilState(canvasSelectedItemsAtom);
  const [hoveredCanvasItem, setHoveredCanvasItem] = useRecoilState(withHoveredCanvasItem);
  const setDraggedShape = useSetRecoilState(draggedShapeAtom);
  const { canDropBefore, canDropAfter } = useRecoilValue(withShapeDraggingConstraints(id));

  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: 'Shape',
    options: { dropEffect: 'move' },
    item: () => {
      setDraggedShape(id);
      return { id, index };
    },
    end: (item) => {
      setDraggedShape(null);
      onDrop(item);
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [, drop] = useDrop({
    accept: 'Shape',
    canDrop: () => canDropBefore || canDropAfter,
    hover: (_, monitor) => {
      if (!ref.current) {
        return;
      }

      if (!monitor.canDrop()) {
        return false;
      }

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (hoverClientY < hoverMiddleY) {
        onDropIndexChange(canDropBefore ? index : -1);
        return;
      }

      onDropIndexChange(canDropAfter ? index + 1 : -1);
    },
  });

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, []); // eslint-disable-line

  drag(drop(ref));

  const isSelected = selectedCanvasItem.some((selectedId) => selectedId === id);
  const isHovered = hoveredCanvasItem === id;

  const onClick = (event) => {
    event.stopPropagation();
    setSelectedCanvasItem([id]);
  };

  const onMouseEnter = () => setHoveredCanvasItem(id);
  const onMouseLeave = () => setHoveredCanvasItem(null);

  return (
    <ShapeButton
      key={id}
      ref={ref}
      onClick={onClick}
      selected={isSelected}
      hovered={isHovered}
      dragging={isDragging}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Preview id={id} />
      {isSelected ? <Input id={id} /> : <Text id={id} />}
    </ShapeButton>
  );
};

export default Shape;
