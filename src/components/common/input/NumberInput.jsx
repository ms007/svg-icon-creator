import React, { useState, useRef, useEffect } from 'react';
import { useKey } from 'react-use';

import InputWrapper from './InputWrapper';
import InputField from './InputField';
import Label from './Label';

const isNumeric = (value) => !isNaN(parseFloat(value)) && isFinite(value);

const isAltKeyPressed = (event) => event.altKey === true;

const NumberInput = ({
  label,
  value,
  min,
  max,
  multi,
  disabled,
  onChange,
  onIncrement,
  onDecrement,
}) => {
  const inputRef = useRef(null);
  const lastValidValue = useRef(value);
  const [active, setActive] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);

  useKey('Enter', () => inputRef.current?.blur(), { target: inputRef.current });
  useKey('ArrowUp', (event) => increment(event), { target: inputRef.current });
  useKey('ArrowLeft', (event) => event.stopPropagation(), { target: inputRef.current });
  useKey('ArrowRight', (event) => event.stopPropagation(), { target: inputRef.current });
  useKey('ArrowDown', (event) => decrement(event), { target: inputRef.current });
  useKey(
    'Escape',
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      inputRef.current?.blur();
    },
    { target: inputRef.current }
  );

  useEffect(() => {
    setCurrentValue(value);
    lastValidValue.current = value;
  }, [value]);

  const isValid = (number) =>
    min != null && number < min ? false : max != null && number > max ? false : true;

  const increment = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const altKeyPressed = isAltKeyPressed(event);
    onIncrement(altKeyPressed ? 0.1 : 1);
  };

  const decrement = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const altKeyPressed = isAltKeyPressed(event);
    onDecrement(altKeyPressed ? 0.1 : 1);
  };

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

    const isNumber = isNumeric(newValue);
    if (isNumber) {
      newValue = parseFloat(newValue);
      if (!isValid(newValue)) {
        if (max != null && newValue > max) {
          newValue = max;
        } else if (min != null && newValue < min) {
          newValue = min;
        }
      }
    }

    const isValidNumber = isNumber && isValid(newValue);
    setCurrentValue(isValidNumber ? newValue : lastValidValue.current);
    update(newValue);
  };

  const update = (value) => {
    if (value === 'multi') {
      return;
    }

    setCurrentValue(value);
    if (isNumeric(value)) {
      value = parseFloat(value);
      if (isValid(value)) {
        lastValidValue.current = value;
        onChange(value);
      }
    }
  };

  return (
    <InputWrapper disabled={disabled} active={active}>
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
      <Label active={active} disabled={disabled}>
        {label}
      </Label>
    </InputWrapper>
  );
};

export default NumberInput;
