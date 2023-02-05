import styled from 'styled-components';

import { H5, NumberInput, CheckBox, Spacer } from 'components/common';
import { withBorderEnabled } from 'recoil/inspector';
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
  const [checked, setChecked] = useRecoilState(withBorderEnabled);
  return (
    <>
      <H5>Borders</H5>
      <Box>
        <BorderCheckBox checked={checked} onChange={(e) => setChecked(e.target.checked)} />
        <Spacer size={10} />
        <InputBox>
          <NumberInput label="px" />
        </InputBox>
      </Box>
    </>
  );
};

export default Borders;
