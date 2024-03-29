import React from 'react';
import styled from 'styled-components';
import { useRecoilValue, useSetRecoilState, useResetRecoilState } from 'recoil';

import { SidePanel } from 'components/common';
import Header from './header';
import ToolBar from './toolBar';
import Shapes from './shapes';
import { useDrop } from 'react-dnd';

import { sidebarAtom } from 'recoil/sidebar';
import {
  canvasSelectedItemsAtom,
  canvasNewItemTypeAtom,
  canvasIsCreatingNewItemAtom,
} from 'recoil/canvas';

const Box = styled.div`
  padding: 24px;
`;

const Sidebar = () => {
  const { width } = useRecoilValue(sidebarAtom);
  const setSelectedItems = useSetRecoilState(canvasSelectedItemsAtom);
  const resetType = useResetRecoilState(canvasNewItemTypeAtom);
  const resetIsCreatingNewItem = useResetRecoilState(canvasIsCreatingNewItemAtom);

  // workaround:
  // https://github.com/react-dnd/react-dnd/issues/3115#issuecomment-826799284
  const [, drop] = useDrop(() => ({ accept: 'Shape' }));

  const onClick = () => {
    setSelectedItems([]);
    resetType();
    resetIsCreatingNewItem();
  };

  return (
    <SidePanel ref={drop} width={width} onClick={onClick}>
      <Header />
      <Box>
        <ToolBar />
      </Box>
      <Box>
        <Shapes />
      </Box>
    </SidePanel>
  );
};

export default Sidebar;
