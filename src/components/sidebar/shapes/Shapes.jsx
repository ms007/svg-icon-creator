import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useLatest } from 'react-use';

import Shape from './Shape';
import Divider from './Divider';
import ShapeDragLayer from './ShapeDragLayer';
import { withCanvasItemsReversed, canvasSelectedItemsAtom } from 'recoil/canvas';

const Title = styled.span`
  font-weight: 500;
`;

const Box = styled.div`
  margin-top: 10px;
`;

const Shapes = () => {
  const [dropIndex, setDropIndex] = useState(-1);
  const [canvasItems, setCanvasItems] = useRecoilState(withCanvasItemsReversed);
  const setSelectedItems = useSetRecoilState(canvasSelectedItemsAtom);

  const latestDropIndex = useLatest(dropIndex);
  const latestCanvasItems = useLatest(canvasItems);

  const onDrop = ({ id }) => {
    const latestItems = latestCanvasItems.current;
    const latestIndex = latestDropIndex.current;

    if (latestIndex >= 0) {
      setCanvasItems([
        ...latestItems.slice(0, latestIndex).filter((item) => item !== id),
        id,
        ...latestItems.slice(latestIndex).filter((item) => item !== id),
      ]);
      setSelectedItems([id]);
    }

    setDropIndex(-1);
  };

  const onDropIndexChange = (index) => {
    if (index !== dropIndex) {
      setDropIndex(index);
    }
  };

  if (!canvasItems.length) {
    return null;
  }

  return (
    <>
      <Title>Shapes</Title>
      <Box>
        {canvasItems.map((id, index) => (
          <Fragment key={id}>
            <Divider visible={dropIndex === index} />
            <Shape id={id} index={index} onDrop={onDrop} onDropIndexChange={onDropIndexChange} />
            <Divider visible={dropIndex === index + 1} />
          </Fragment>
        ))}
      </Box>
      <ShapeDragLayer />
    </>
  );
};

export default Shapes;
