import React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import { canvasItemsAtomFamily } from 'recoil/canvas';

const Box = styled.div`
  margin-left: 10px;
  border: 1px solid transparent;
  width: 100%;
  user-select: none;
`;

const Text = ({ id }) => {
  const shape = useRecoilValue(canvasItemsAtomFamily(id));
  const { name } = shape;

  return <Box>{name}</Box>;
};

export default Text;
