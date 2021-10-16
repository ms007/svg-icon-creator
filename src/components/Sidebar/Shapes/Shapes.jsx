import React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import Shape from './Shape';
import Preview from './Preview';
import { canvasItemsAtom } from 'recoil/canvas';

const Title = styled.span`
  font-weight: 500;
`;

const Container = styled.div`
  margin-top: 10px;
`;

const Box = styled.div`
  display: flex;
  align-items: center;
`;

const Shapes = () => {
  const canvasItems = useRecoilValue(canvasItemsAtom);
  if (!canvasItems.length) {
    return null;
  }

  const reversedItems = [...canvasItems].reverse();

  return (
    <>
      <Title>Shapes</Title>
      <Container>
        {reversedItems.map((id) => (
          <Box key={id}>
            <Preview id={id} />
            <Shape id={id} />
          </Box>
        ))}
      </Container>
    </>
  );
};

export default Shapes;
