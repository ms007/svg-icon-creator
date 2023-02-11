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

const MenuButton = React.forwardRef((props, ref) => {
  const { 'data-state': state } = props;
  return <MoreButton ref={ref} active={state === 'open'} {...props} />;
});

const Header = () => {
  return (
    <Box>
      <Logo />
      <div>
        <Menu width="230" align="end" renderMenuButton={() => <MenuButton />}>
          <ThemeSwitchMenuItem />
        </Menu>
      </div>
    </Box>
  );
};

export default Header;
