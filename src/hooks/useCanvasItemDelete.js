import { useKey } from 'react-use';
import { useSetRecoilState } from 'recoil';

import { withCanvasItemsDelete } from 'recoil/canvas';

const useCanvasItemDelete = () => {
  const deleteCanvasItems = useSetRecoilState(withCanvasItemsDelete);

  const shouldDelete = (event) => {
    return event.key === 'Backspace' || event.key === 'Delete';
  };

  useKey(shouldDelete, deleteCanvasItems, { event: 'keyup' });
};

export default useCanvasItemDelete;
