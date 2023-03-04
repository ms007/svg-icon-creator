import Popover from '../popover';
import styled from 'styled-components';
import { useLatest } from 'react-use';
import { RgbaColorPicker } from 'react-colorful';
import { colord } from 'colord';

import { Input, NumberInput } from '../input';

import './ColorPicker.css';

const ColorBox = styled.div`
  display: grid;
  grid-template-columns: 70px 1fr 40px;
  gap: 0 12px;
  margin-top: 16px;
`;

const RGBBox = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0 12px;
`;

const CircleBackground = styled.div`
  position: absolute;
  top: 170px;
  height: 32px;
  width: 32px;
  background-position: bottom 3px left 7px;
  background-size: 11px 20px;
  background-origin: border-box;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 15 28'%3E%3Cpath fill='%23eae8e8' d='M0 28h7.5v-7H0v7ZM0 7v7h7.5v7H15v-7H7.5V7H15V0H7.5v7H0Z'/%3E%3C/svg%3E");
  border-radius: 50%;
`;

const round = (value) => Math.round((value + Number.EPSILON) * 100) / 100;

const CircleForeground = styled.div.attrs(({ color }) => ({
  style: {
    backgroundColor: colord(color).toRgbString(),
  },
}))`
  position: absolute;
  top: 170px;
  height: 32px;
  width: 32px;
  border-radius: 50%;
  box-shadow: inset 0 0 0 1px rgb(117 117 117 / 20%);
`;

const ColorPicker = ({ color, width, renderTrigger, renderAnchor, onChange }) => {
  const latestColor = useLatest(color);

  const onRgbChange = (code) => (value) => {
    value = round(value);
    onChange({ ...color, [code]: value });
  };

  const onRgbIncrement = (code) => (amount) => {
    amount = round(amount);
    const value = latestColor.current[code] + amount;
    onChange({ ...color, [code]: value > 255 ? 255 : value });
  };

  const onRgbDecrement = (code) => (amount) => {
    amount = round(amount);
    const value = latestColor.current[code] - amount;
    onChange({ ...color, [code]: value < 0 ? 0 : value });
  };

  const onAlphaChange = (value) => {
    onChange({ ...color, a: value / 100 });
  };

  const onAlphaIncrement = (amount) => {
    amount = round(amount);
    const value = round(latestColor.current.a * 100 + amount);
    onAlphaChange(value > 100 ? 100 : value);
  };

  const onAlphaDecrement = (amount) => {
    amount = round(amount);
    const value = round(latestColor.current.a * 100 - amount);
    onAlphaChange(value < 0 ? 0 : value);
  };

  const hex = colord(color).alpha(1).toHex().replace(/^#/, '');

  return (
    <Popover
      width={width}
      align="end"
      renderAnchor={renderAnchor}
      renderPopoverButton={renderTrigger}
    >
      <div className="picker">
        <RgbaColorPicker color={color} onChange={onChange} />
        <CircleBackground />
        <CircleForeground color={color} />

        <ColorBox>
          <Input label="#" labelPosition="left" value={hex} />
          <RGBBox>
            <NumberInput
              value={color.r}
              min={0}
              max={255}
              onIncrement={onRgbIncrement('r')}
              onDecrement={onRgbDecrement('r')}
              onChange={onRgbChange('r')}
            />
            <NumberInput
              value={color.g}
              min={0}
              max={255}
              onIncrement={onRgbIncrement('g')}
              onDecrement={onRgbDecrement('g')}
              onChange={onRgbChange('g')}
            />
            <NumberInput
              value={color.b}
              min={0}
              max={255}
              onIncrement={onRgbIncrement('b')}
              onDecrement={onRgbDecrement('b')}
              onChange={onRgbChange('b')}
            />
          </RGBBox>
          <NumberInput
            value={round(color.a * 100)}
            min={0}
            max={100}
            onIncrement={onAlphaIncrement}
            onDecrement={onAlphaDecrement}
            onChange={onAlphaChange}
          />
        </ColorBox>
      </div>
    </Popover>
  );
};

export default ColorPicker;
