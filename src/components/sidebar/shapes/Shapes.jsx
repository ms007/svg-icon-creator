import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useLatest } from 'react-use';

import { canvasSelectedItemsAtom } from 'recoil/canvas';
import { withSidebarShapes } from 'recoil/sidebar';

import { H4 } from 'components/common';
import { Shape, DragLayer } from './shape';
import ScrollBox from './scrollBox';
import Divider from './divider';

const Title = styled(H4)`
  margin-bottom: 6px;
`;

const Shapes = () => {
  const [dropIndex, setDropIndex] = useState(-1);
  const [canvasItems, setCanvasItems] = useRecoilState(withSidebarShapes);
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

      <ScrollBox>
        {canvasItems.map((id, index) => (
          <Fragment key={id}>
            <Divider visible={dropIndex === index} />
            <Shape id={id} index={index} onDrop={onDrop} onDropIndexChange={onDropIndexChange} />
            <Divider visible={dropIndex === index + 1} />
          </Fragment>
        ))}
      </ScrollBox>

      <DragLayer />
    </>
  );
};

export default Shapes;
