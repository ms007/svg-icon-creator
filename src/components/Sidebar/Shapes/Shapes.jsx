import React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import Shape from './Shape';
import { withCanvasItemsReversed } from 'recoil/canvas';

const Title = styled.span`
  font-weight: 500;
`;

const Box = styled.div`
  margin-top: 10px;
`;

const Shapes = () => {
  const canvasItems = useRecoilValue(withCanvasItemsReversed);
  if (!canvasItems.length) {
    return null;
  }

  return (
    <>
      <Title>Shapes</Title>
      <Box>
        {canvasItems.map((id, index) => (
          <Shape key={id} id={id} index={index} />
        ))}
      </Box>
    </>
  );
};

export default Shapes;
