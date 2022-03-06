import styled from 'styled-components';
import theme from 'styled-theming';

const colorActive = theme('mode', {
  light: 'var(--neutralGamma)',
  dark: '#222',
});

const colorInActive = theme('mode', {
  light: 'var(--neutralBeta)',
  dark: 'var(--neutralBeta)',
});

const Label = styled.div`
  padding: 0 5px;
  font-size: 10px;
  font-weight: 700;
  color: ${({ active, disabled }) => (active && !disabled ? colorActive : colorInActive)};
`;

export default Label;
