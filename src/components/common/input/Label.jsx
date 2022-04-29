import styled from 'styled-components';
import theme from 'styled-theming';

const colorActive = theme('mode', {
  light: 'var(--neutral40)',
  dark: '#222',
});

const colorDisabled = theme('mode', {
  light: '#d3d0d0',
  dark: 'var(--neutral20)',
});

const Label = styled.div`
  padding: 0 5px;
  font-size: 10px;
  font-weight: 700;
  color: ${({ active, disabled }) =>
    disabled ? colorDisabled : active ? colorActive : 'var(--neutral30)'};
  user-select: none;
`;

export default Label;
