import { Input, NumberInput } from '../input';
import styled from 'styled-components';
import { useLatest } from 'react-use';
import { colord } from 'colord';

const round = (value) => Math.round((value + Number.EPSILON) * 100) / 100;
const toHex = (value) => `#${value.includes('#') ? value.replace(/#/g, '') : value}`;

const Box = styled.div`
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

const ColorBox = ({ color, onChange }) => {
  const latestColor = useLatest(color);

  const onRgbChange = (code) => (value) => {
    value = round(value);
    onChange({ ...latestColor.current, [code]: value });
  };

  const onRgbIncrement = (code) => (amount) => {
    amount = round(amount);
    const value = latestColor.current[code] + amount;
    onRgbChange(code)(value > 255 ? 255 : value);
  };

  const onRgbDecrement = (code) => (amount) => {
    amount = round(amount);
    const value = latestColor.current[code] - amount;
    onRgbChange(code)(value < 0 ? 0 : value);
  };

  const onAlphaChange = (value) => {
    onChange({ ...latestColor.current, a: value / 100 });
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

  const onHexUpdate = (value) => {
    const hexColor = colord(value);
    if (hexColor.isValid()) {
      const color = hexColor.alpha(1).toRgb();
      onChange(color);
    }
  };

  const onHexChange = (value) => {
    value = toHex(value);
    if (value.length < 7) return;
    onHexUpdate(value);
  };

  const onHexBlur = (value) => {
    value = toHex(value);
    onHexUpdate(value);
  };

  const hex = colord(color).alpha(1).toHex().replace(/^#/, '');

  return (
    <Box>
      <Input label="#" labelPosition="left" value={hex} onChange={onHexChange} onBlur={onHexBlur} />
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
    </Box>
  );
};

export default ColorBox;
