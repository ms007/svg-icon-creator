import styled, { keyframes } from 'styled-components';
import { Menu as MenuInner } from '@szhsin/react-menu';
import {
  menuSelector,
  menuItemSelector,
  menuDividerSelector,
} from '@szhsin/react-menu/style-utils';
import '@szhsin/react-menu/dist/core.css';

const menuShow = keyframes`
  from {
    opacity: 0;
  }
`;
const menuHide = keyframes`
  to {
    opacity: 0;
  }
`;

const Menu = styled(MenuInner)`
  ${menuSelector.name} {
    position: absolute;
    margin: 0;
    padding: 10px;
    width: ${({ width }) => `${width}px`};
    box-sizing: border-box;
    box-shadow: 0 10px 20px rgba(64, 64, 64, 0.15);
    background-color: var(--neutral);
    border-radius: 8px;
    border: none;
    list-style: none;
    user-select: none;
    z-index: 100;
  }

  ${menuSelector.stateOpening} {
    animation: ${menuShow} 0.15s ease-out;
  }

  // NOTE: animation-fill-mode: forwards is required to
  // prevent flickering with React 18 createRoot()
  ${menuSelector.stateClosing} {
    animation: ${menuHide} 0.2s ease-out forwards;
  }

  ${menuItemSelector.name} {
    border-radius: 4px;
    padding: 10px 10px;
  }

  ${menuItemSelector.hover} {
    background-color: var(--neutral20);
  }

  ${menuDividerSelector.name} {
    margin: 10px -10px;
    background-color: var(--neutral10);
    height: 2px;
  }
`;

export default Menu;

Menu.defaultProps = {
  width: 208,
};
