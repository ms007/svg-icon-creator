import React from 'react';
import styled from 'styled-components';
import theme from 'styled-theming';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import useSvgRef from 'hooks/useSvgRef';
import presetsAtom from 'recoil/presets';
import artboardAtom, { withWidth } from 'recoil/artboard';
import {
  newCanvasItemTypeAtom,
  canvasSelectedItemsAtom,
  canvasIsCreatingNewItemAtom,
  canvasIsResizingItemAtom,
} from 'recoil/canvas';

import Grid from './grid';

const boxShadow = theme('mode', {
  light: `0 0 2px 0 ${'#b9bcc0'}`,
  dark: 'none',
});

const Box = styled.div`
  box-sizing: content-box;
  margin: ${(props) => `${props.margin}px ${(props.margin / 100) * 70}px`};
  width: ${(props) => `${props.width}px`};
  height: ${(props) => `${props.width}px`};
  background-color: #ffffff;
  box-shadow: ${boxShadow};
  border-radius: 20px;
  border-color: #ffffff;
  border-style: solid;
  border-width: ${({ width }) => (width > 600 ? `${35}px` : `${20}px`)};
`;

const SvgContainer = styled.svg.attrs({
  version: '1.1',
  xmlns: 'http://www.w3.org/2000/svg',
  xmlnsXlink: 'http://www.w3.org/1999/xlink',
})`
  &:hover {
    cursor: ${({ cursor }) => {
      switch (cursor) {
        case 'rectangle':
          return 'url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcKICAgIGZpbGw9Im5vbmUiCiAgPjxwYXRoIHN0cm9rZT0iIzFlMjQzMyIgZD0iTTE0LjUgMS41aDh2OGgtOHoiIC8+PHBhdGgKICAgICAgc3Ryb2tlPSIjRkZGIgogICAgICBkPSJNMTMuNS41aDEwdjEwaC0xMHoiCiAgICAvPjxwYXRoIHN0cm9rZT0iI0ZGRiIgZD0iTTE1LjUgMi41aDZ2NmgtNnoiIC8+PHBhdGgKICAgICAgZD0iTTcuNSAxMC41djEybS02LTZoMTIiCiAgICAgIHN0cm9rZT0iI0ZGRiIKICAgICAgc3Ryb2tlLXdpZHRoPSIzIgogICAgICBzdHJva2UtbGluZWNhcD0ic3F1YXJlIgogICAgLz48cGF0aAogICAgICBkPSJNNy41IDEwLjV2MTJtLTYtNmgxMiIKICAgICAgc3Ryb2tlPSIjMWUyNDMzIgogICAgICBzdHJva2UtbGluZWNhcD0ic3F1YXJlIgogICAgLz48L2c+PC9zdmc+Cg==) 7.5 17.5, auto';
        default:
          return 'initial';
      }
    }};
  }
`;

const Artboard = ({ children }) => {
  const svg = useSvgRef();
  const { margin } = useRecoilValue(artboardAtom);
  const { iconSize } = useRecoilValue(presetsAtom);
  const isResizing = useRecoilValue(canvasIsResizingItemAtom);
  const isCreating = useRecoilValue(canvasIsCreatingNewItemAtom);
  const setSelectedCanvasItems = useSetRecoilState(canvasSelectedItemsAtom);

  const onClick = () => {
    if (!isResizing && !isCreating) {
      setSelectedCanvasItems([]);
    }
  };

  const width = useRecoilValue(withWidth);
  const newItemType = useRecoilValue(newCanvasItemTypeAtom);

  const viewBox = `0 0 ${iconSize} ${iconSize}`;

  return (
    <Box width={width} margin={margin}>
      <SvgContainer
        ref={svg}
        width={width}
        height={width}
        viewBox={viewBox}
        cursor={newItemType}
        onClick={onClick}
        overflow="visible"
      >
        <Grid size={iconSize} />
        {children}
      </SvgContainer>
    </Box>
  );
};

export default Artboard;
