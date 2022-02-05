import React from 'react';

import { useRecoilValue } from 'recoil';

import inspectorAtom from 'recoil/inspector';
import ThemeSwitch from './themeSwitch';
import { SitePanel } from 'components/common';

const Inspector = () => {
  const { width } = useRecoilValue(inspectorAtom);

  return (
    <SitePanel width={width}>
      Inspector
      <ThemeSwitch />
    </SitePanel>
  );
};

export default Inspector;
