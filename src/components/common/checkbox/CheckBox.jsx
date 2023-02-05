import styled from 'styled-components';

const Label = styled.label`
  display: inline-flex;
  align-items: center;
`;

const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 3px;
`;

// Hide checkbox visually but remain accessible to screen readers.
// Source: https://polished.js.org/docs/#hidevisually
const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const StyledCheckbox = styled.div`
  display: inline-block;
  width: 16px;
  height: 16px;
  background: var(--neutral20);
  border-radius: 3px;
  transition: all 150ms;

  ${HiddenCheckbox}:focus + & {
    outline: 2px solid var(--primaryAlpha);
    filter: drop-shadow(0px 0px 3px rgb(86, 90, 102, 0.2));
  }

  ${HiddenCheckbox}:hover + & {
    cursor: pointer;
  }

  ${HiddenCheckbox}:checked + & {
    background: var(--primary);
  }

  ${HiddenCheckbox}:not(:checked):focus:hover + & {
    background: #fff;
  }

  ${Icon} {
    visibility: ${({ checked }) => (checked ? 'visible' : 'hidden')};
  }
`;

const Checkbox = ({ label, className, checked, ...props }) => {
  return (
    <Label className={className}>
      <HiddenCheckbox checked={checked} {...props} />
      <StyledCheckbox checked={checked}>
        <Icon viewBox="0 0 24 24">
          <path d="m17.457 8.116-7.251 7.598L7 12.456" />
        </Icon>
      </StyledCheckbox>
      {label && <span style={{ marginLeft: 8 }}>{label}</span>}
    </Label>
  );
};

export default Checkbox;
