import React from 'react';
import styled from 'styled-components';
import theme from 'styled-theming';

const boxShadow = theme('mode', {
  light: 'inset 0 0 0 1px rgb(117 117 117 / 20%)',
  dark: '',
});

const Background = styled.div`
  position: relative;
  height: 100%;
  background-size: 15px 28px;
  background-origin: border-box;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 15 28'%3E%3Cpath fill='%23eae8e8' d='M0 28h7.5v-7H0v7ZM0 7v7h7.5v7H15v-7H7.5V7H15V0H7.5v7H0Z'/%3E%3C/svg%3E");
  border-radius: 4px;
`;

const Button = styled.button`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: ${({ color }) => color};
  border: none;
  border-radius: 4px;
  padding: 0;
  box-shadow: ${boxShadow};

  &:hover {
    cursor: pointer;
  }
`;

const ColorInput = React.forwardRef(({ color, ...props }, ref) => (
  <Background ref={ref} {...props}>
    <Button color={color}></Button>
  </Background>
));
export default ColorInput;
