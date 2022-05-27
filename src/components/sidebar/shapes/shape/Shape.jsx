import React, { useRef } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useDrag, useDrop, DragPreviewImage } from 'react-dnd';

import {
  canvasSelectedItemsAtom,
  withHoveredCanvasItem,
  canvasEditingItemAtom,
} from 'recoil/canvas';
import { draggedShapeAtom, withShapeDraggingConstraints } from 'recoil/sidebar';

import useShapeSelect from 'hooks/useShapeSelect';
import Text from './Text';
import Input from './Input';
import Preview from './preview';
import ShapeBox from './ShapeBox';

const Shape = ({ id, index, onDrop, onDropIndexChange }) => {
  const ref = useRef(null);
  const selectedCanvasItems = useRecoilValue(canvasSelectedItemsAtom);
  const [editingCanvasItem, setEditingCanvasItem] = useRecoilState(canvasEditingItemAtom);
  const [hoveredCanvasItem, setHoveredCanvasItem] = useRecoilState(withHoveredCanvasItem);
  const setDraggedShape = useSetRecoilState(draggedShapeAtom);
  const { canDropBefore, canDropAfter } = useRecoilValue(withShapeDraggingConstraints(id));
  const selectCanvasItem = useShapeSelect();

  const isSelected = selectedCanvasItems.some((selectedId) => selectedId === id);
  const isEditing = editingCanvasItem === id;
  const isHovered = hoveredCanvasItem === id;
  const selectedItemsCount = selectedCanvasItems.length;

  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: 'Shape',
      options: { dropEffect: 'move' },
      canDrag: () => !isEditing,
      item: () => {
        setDraggedShape(id);
        setHoveredCanvasItem(null);
        return { id, index };
      },
      end: (item) => {
        onDrop(item);
        setHoveredCanvasItem(null);
        setDraggedShape(null);
      },
      collect: (monitor) => ({
        canDrag: monitor.canDrag(),
        isDragging: monitor.isDragging(),
      }),
    }),
    [isEditing]
  );

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

  const onClick = (event) => {
    event.stopPropagation();

    const options = {
      metaKey: event.metaKey,
      shiftKey: event.shiftKey,
      ctrlKey: event.ctrlKey,
      anyKeyPressed() {
        return this.metaKey || this.shiftKey || this.ctrlKey;
      },
    };

    if (!isSelected || options.anyKeyPressed() || selectedItemsCount > 1) {
      selectCanvasItem(id, options);
      return;
    }

    setEditingCanvasItem(id);
  };

  const onMouseEnter = () => setHoveredCanvasItem(id);
  const onMouseLeave = () => setHoveredCanvasItem(null);

  drag(drop(ref));

  return (
    <div>
      <DragPreviewImage
        connect={preview}
        src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
      />

      <ShapeBox
        id={id}
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
        {isEditing ? <Input id={id} /> : <Text id={id} />}
      </ShapeBox>
    </div>
  );
};

export default Shape;
