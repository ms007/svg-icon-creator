import React, { useState, useRef, useEffect } from 'react';
import { useKey } from 'react-use';

import InputWrapper from './InputWrapper';
import InputField from './InputField';
import Label from './Label';

const isNumeric = (value) => !isNaN(parseFloat(value)) && isFinite(value);

const NumberInput = ({ label, value, min, max, disabled, onChange }) => {
  const inputRef = useRef(null);
  const lastValidValue = useRef(value);
  const [active, setActive] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);

  useKey('Escape', () => inputRef.current?.blur(), { target: inputRef.current });
  useKey('Enter', () => inputRef.current?.blur(), { target: inputRef.current });
  useKey('ArrowUp', (event) => increment(event), { target: inputRef.current });
  useKey('ArrowDown', (event) => decrement(event), { target: inputRef.current });

  useEffect(() => {
    setCurrentValue(value);
    lastValidValue.current = value;
  }, [value]);

  const isValid = (number) =>
    min != null && number < min ? false : max != null && number > max ? false : true;

  const increment = (event) => {
    event.preventDefault();
    const value = inputRef.current.value;
    if (!isNumeric(value)) {
      return;
    }

    let newValue = parseFloat(value) + 1;
    if (!isValid(newValue)) {
      if (max == null) {
        return;
      }
      newValue = max;
    }

    setCurrentValue(newValue);
    update(newValue);
  };

  const decrement = (event) => {
    event.preventDefault();
    const value = inputRef.current.value;
    if (!isNumeric(value)) {
      return;
    }

    let newValue = parseFloat(value) - 1;
    if (!isValid(newValue)) {
      if (min == null) {
        return;
      }
      newValue = min;
    }

    setCurrentValue(newValue);
    update(newValue);
  };

  const onFocus = () => {
    setActive(true);
    inputRef.current.select();
  };

  const onBlur = () => {
    const value = inputRef.current.value;
    const isNumber = isNumeric(value);
    const isValidNumber = isNumber && isValid(parseFloat(value));
    setCurrentValue(isValidNumber ? value : lastValidValue.current);
    update(value);
    setActive(false);
  };

  const update = (n) => {
    let newValue = isNumeric(n) ? parseFloat(n) : lastValidValue.current;
    newValue = isValid(newValue) ? newValue : lastValidValue.current;
    lastValidValue.current = newValue;
    onChange(newValue);
  };

  const handleChange = (event) => {
    const newValue = event.target.value;
    setCurrentValue(newValue);
    if (isNumeric(newValue)) {
      update(newValue);
    }
  };

  return (
    <InputWrapper disabled={disabled} active={active}>
      <InputField
        active={active}
        disabled={disabled}
        value={currentValue}
        onChange={handleChange}
        onFocus={onFocus}
        onBlur={onBlur}
        ref={inputRef}
      />
      <Label active={active}>{label}</Label>
    </InputWrapper>
  );
};

export default NumberInput;
