import React from 'react';
import styled from 'styled-components';

import { Logo, MoreButton, Menu } from 'components/common';
import { ThemeSwitchMenuItem } from './menuItems';

const Box = styled.div`
  padding: 24px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const Header = () => {
  return (
    <Box>
      <Logo />
      <div>
        <Menu
          width={220}
          align="end"
          offsetY={4}
          offsetX={1}
          menuButton={({ open }) => <MoreButton active={open} />}
        >
          <ThemeSwitchMenuItem />
        </Menu>
      </div>
    </Box>
  );
};

export default Header;
