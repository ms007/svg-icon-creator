import styled from 'styled-components';

import { H5, NumberInput, CheckBox, Spacer } from 'components/common';
import { withBorderWidth, withBorderEnabled } from 'recoil/inspector';
import { useRecoilState } from 'recoil';

const Box = styled.div`
  display: flex;
  align-items: center;
`;

const BorderCheckBox = styled(CheckBox)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 28px;
  width: 28px;
`;

const InputBox = styled.div`
  width: 80px;
  height: 28px;
`;

const Borders = () => {
  const [strokeWidth, setStrokeWidth] = useRecoilState(withBorderWidth);
  const [enabled, setEnabled] = useRecoilState(withBorderEnabled);

  const onChange = (value) => {
    if (value === 'multi') {
      return;
    }

    setStrokeWidth(value);
  };

  return (
    <>
      <H5>Borders</H5>
      <Box>
        <BorderCheckBox checked={enabled} onChange={(e) => setEnabled(e.target.checked)} />
        <Spacer size={10} />
        <InputBox>
          <NumberInput
            label="px"
            value={strokeWidth}
            onChange={onChange}
            // onIncrement={onIncrement}
            // onDecrement={onDecrement}
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
