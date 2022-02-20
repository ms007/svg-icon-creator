import styled from 'styled-components';

const InputWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ active }) => (active ? '#fff' : 'var(--neutralAlpha)')};
  border: 1px solid transparent;
  border-radius: 4px;
  outline: ${({ active }) => (active ? '2px solid var(--primaryAlpha)' : 'none')};
  filter: ${({ active }) => (active ? 'drop-shadow(0px 0px 3px rgb(86, 90, 102, 0.2))' : 'none')};
`;

export default InputWrapper;
