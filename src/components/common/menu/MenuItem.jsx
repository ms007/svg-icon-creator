import React from 'react';
import styled from 'styled-components';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

const StyledDropdownMenuItem = styled.div`
  all: unset;
  border-radius: 3px;
  display: flex;
  align-items: centner;
  height: 25px;
  padding: 8px 8px;
  position: relative;
  user-select: none;

  &[data-highlighted] {
    background-color: var(--neutral20);
    cursor: pointer;
  }
`;

const DropdownMenuItem = React.forwardRef((props, ref) => {
  const { children, 'data-highlighted': highlighted } = props;
  const renderedChildren = React.Children.map(children, (child) =>
    React.cloneElement(child, {
      ...props,
      highlighted: highlighted != null,
    })
  );

  return (
    <StyledDropdownMenuItem ref={ref} {...props}>
      {renderedChildren}
    </StyledDropdownMenuItem>
  );
});

const MenuItem = ({ children, ...props }) => {
  return (
    <DropdownMenu.Item asChild {...props}>
      <DropdownMenuItem>{children}</DropdownMenuItem>
    </DropdownMenu.Item>
  );
};

export default MenuItem;
