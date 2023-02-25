import styled from 'styled-components';

import { H5, NumberInput, CheckBox, ColorInput, ColorPicker } from 'components/common';
import {
  inspectorAtom,
  withBorderWidth,
  withBorderIncrease,
  withBorderColor,
  withBorderEnabled,
} from 'recoil/inspector';
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';

const Container = styled.div`
  display: grid;
  grid-template-columns: 28px 75px;
  gap: 0 12px;
  margin-right: 16px;
`;

const Box = styled.div`
  display: flex;
`;

const BorderCheckBox = styled(CheckBox)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 28px;
  width: 28px;
`;

const InputBox = styled.div`
  height: 28px;
  width: 75px;
  align-self: center;
  justify-self: center;
`;

const Anchor = styled.div`
  position: absolute;
  right: 20px;
  height: 38px;
`;

const Borders = () => {
  const { width } = useRecoilValue(inspectorAtom);
  const [enabled, setEnabled] = useRecoilState(withBorderEnabled);
  const [color, setColor] = useRecoilState(withBorderColor);
  const [strokeWidth, setStrokeWidth] = useRecoilState(withBorderWidth);
  const increaseBorderWidth = useSetRecoilState(withBorderIncrease);

  const onChange = (value) => {
    if (value === 'multi') {
      return;
    }

    setStrokeWidth(value);
  };

  const onIncrement = (amount) => {
    increaseBorderWidth(amount);
  };

  const onDecrement = (amount) => {
    increaseBorderWidth(-amount);
  };

  return (
    <>
      <H5>Borders</H5>
      <Box>
        <Container>
          <BorderCheckBox checked={enabled} onChange={(e) => setEnabled(e.target.checked)} />
          <ColorPicker
            color={color}
            width={width - 40 - 5}
            renderTrigger={() => <ColorInput color={color} />}
            renderAnchor={() => <Anchor />}
            onChange={setColor}
          />
        </Container>

        <InputBox>
          <NumberInput
            label="px"
            value={strokeWidth}
            onChange={onChange}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
            min={0}
            multi={strokeWidth === 'multi'}
            disabled={!enabled}
          />
        </InputBox>
      </Box>
    </>
  );
};

export default Borders;
