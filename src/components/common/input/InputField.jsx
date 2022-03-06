import styled from 'styled-components';
import theme from 'styled-theming';

const colorActive = theme('mode', {
  light: 'inherit',
  dark: '#222',
});

const colorInActive = theme('mode', {
  light: 'var(--neutralGamma)',
  dark: 'var(--neutralDelta)',
});

const InputField = styled.input`
  width: 100%;
  height: 24px;
  padding: 0 5px;
  display: flex;
  align-items: center;
  background: none;
  font-size: 12px;
  color: ${({ active }) => (active ? colorActive : colorInActive)};
  border: none;

  &:focus {
    cursor: ${({ disabled }) => (disabled ? 'default' : 'text')};
    outline: none;
  }

  &:hover {
    cursor: ${({ disabled }) => (disabled ? 'default' : 'text')};
  }

  &::selection {
    background: var(--primaryBeta);
  }
`;

export default InputField;
