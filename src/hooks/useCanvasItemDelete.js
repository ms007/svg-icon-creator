import { useKey } from 'react-use';
import { useSetRecoilState } from 'recoil';

import { withCanvasItemsDelete } from 'recoil/canvas';

const useCanvasItemDelete = () => {
  const deleteCanvasItems = useSetRecoilState(withCanvasItemsDelete);

  const shouldDelete = (event) => {
    const isValidKey = event.key === 'Backspace' || event.key === 'Delete';
    const isValidTarget = event.target.tagName !== 'INPUT';
    return isValidKey && isValidTarget;
  };

  useKey(shouldDelete, deleteCanvasItems, { event: 'keyup' });
};

export default useCanvasItemDelete;
