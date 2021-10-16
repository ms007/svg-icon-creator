import React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import Shape from './Shape';
import { canvasItemsAtom } from 'recoil/canvas';

const Title = styled.span`
  font-weight: 500;
`;

const Box = styled.div`
  margin-top: 10px;
`;

const Shapes = () => {
  const canvasItems = useRecoilValue(canvasItemsAtom);
  const reversedItems = [...canvasItems].reverse();

  if (!reversedItems.length) {
    return null;
  }

  return (
    <>
      <Title>Shapes</Title>
      <Box>
        {reversedItems.map((id, index) => (
          <Shape id={id} index={index} />
        ))}
      </Box>
    </>
  );
};

export default Shapes;
