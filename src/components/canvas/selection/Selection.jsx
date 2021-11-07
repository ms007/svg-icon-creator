import React from 'react';
import { useRecoilValue } from 'recoil';

import SelectionBox from './SelectionBox';
import { canvasSelectedItemsAtom } from 'recoil/canvas';

const Selection = () => {
  const selectedItems = useRecoilValue(canvasSelectedItemsAtom);

  return (
    <>
      {selectedItems.map((item) => (
        <SelectionBox key={item} id={item} />
      ))}
    </>
  );
};

export default Selection;
