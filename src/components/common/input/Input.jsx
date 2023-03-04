import { useState, useEffect, useRef } from 'react';

import Label from './Label';
import InputField from './InputField';
import InputWrapper from './InputWrapper';

const Input = ({ label, labelPosition = 'right', value, multi, disabled, onChange }) => {
  const inputRef = useRef(null);
  const lastValidValue = useRef(value);
  const [active, setActive] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);

  useEffect(() => {
    setCurrentValue(value);
    lastValidValue.current = value;
  }, [value]);

  const onFocus = () => {
    setActive(true);
    inputRef.current.select();
  };

  const onBlur = () => {
    setActive(false);

    const value = inputRef.current.value;
    if (value === 'multi') {
      return;
    }

    let newValue = value;
    // ToDo: Validatation
    update(newValue);
  };

  const update = (value) => {
    if (value === 'multi') {
      return;
    }

    setCurrentValue(value);
    lastValidValue.current = value;
    onChange(value);
  };

  return (
    <InputWrapper disabled={disabled} active={active}>
      {label && labelPosition === 'left' && (
        <Label left active={active} disabled={disabled}>
          {label}
        </Label>
      )}
      <InputField
        active={active}
        multi={multi}
        disabled={disabled}
        value={currentValue}
        onChange={(event) => update(event.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        ref={inputRef}
      />
      {label && labelPosition !== 'left' && (
        <Label active={active} disabled={disabled}>
          {label}
        </Label>
      )}
    </InputWrapper>
  );
};

export default Input;
