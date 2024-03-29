import React from 'react';
import { useRecoilValue } from 'recoil';

import { H4 } from 'components/common';
import Dimensions from './dimensions';
import Corners from './corners';
import Borders from './borders';

import { withAppearanceEnabled } from 'recoil/inspector';

const Appearance = () => {
  const isEnabled = useRecoilValue(withAppearanceEnabled);
  return (
    <>
      <H4>Appearance</H4>
      <Dimensions />

      {isEnabled && (
        <>
          <Corners />
          <Borders />
        </>
      )}
    </>
  );
};

export default Appearance;
