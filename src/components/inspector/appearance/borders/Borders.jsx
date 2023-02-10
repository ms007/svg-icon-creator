import styled from 'styled-components';

import { H5, NumberInput, CheckBox } from 'components/common';
import { withBorderWidth, withBorderIncrease, withBorderEnabled } from 'recoil/inspector';
import { useRecoilState, useSetRecoilState } from 'recoil';

const Container = styled.div`
  display: grid;
  grid-template-columns: 28px 75px;
  gap: 0 12px;
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
`;

const Borders = () => {
  const [enabled, setEnabled] = useRecoilState(withBorderEnabled);
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
      <Container>
        <BorderCheckBox checked={enabled} onChange={(e) => setEnabled(e.target.checked)} />
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
      </Container>
    </>
  );
};

export default Borders;
