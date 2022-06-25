import styled from 'styled-components';
import theme from 'styled-theming';

const colorMulti = theme('mode', {
  light: 'var(--neutral30)',
  dark: 'var(--neutral40)',
});

const colorActive = theme('mode', {
  light: 'inherit',
  dark: '#222',
});

const colorInActive = theme('mode', {
  light: 'var(--neutral40)',
  dark: 'var(--neutral50)',
});

const InputField = styled.input`
  width: 100%;
  height: 24px;
  padding: 0 5px;
  display: flex;
  align-items: center;
  background: none;
  font-size: 12px;
  color: ${({ active, multi }) => (active ? colorActive : multi ? colorMulti : colorInActive)};
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
