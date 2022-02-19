import React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import IconShape from './IconShape';
import { canvasItemsAtom } from 'recoil/canvas';

const Box = styled.div`
  color: var(--neutralDelta);
`;

const Icon = ({ size }) => {
  const viewBox = `0 0 ${size} ${size}`;

  const canvasItems = useRecoilValue(canvasItemsAtom) || [];

  return (
    <Box>
      <svg height={size} xmlns="http://www.w3.org/2000/svg" viewBox={viewBox}>
        {canvasItems.map((id) => (
          <IconShape key={id} id={id} />
        ))}
      </svg>
    </Box>
  );
};

export default Icon;
