import React from 'react';
import styled from 'styled-components';
import theme from 'styled-theming';
import { useRecoilValue } from 'recoil';

import Icon from './Icon';
import presetsAtom from 'recoil/presets';

const border = theme('mode', {
  light: '1px solid var(--neutral10)',
  dark: '1px solid var(--neutral)',
});

const Box = styled.div`
  box-sizing: content-box;
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
  border: ${border};
  border-radius: 1px;
`;

const IconBox = () => {
  const { iconSize } = useRecoilValue(presetsAtom);

  return (
    <Box size={iconSize}>
      <Icon size={iconSize} />
    </Box>
  );
};

export default IconBox;
