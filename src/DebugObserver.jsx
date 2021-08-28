import { useEffect } from 'react';
import { useRecoilSnapshot } from 'recoil';

const DebugObserver = () => {
  const snapshot = useRecoilSnapshot();
  useEffect(() => {
    for (const node of snapshot.getNodes_UNSTABLE({ isModified: true })) {
      console.debug('%c%s', 'color: green;', node.key, snapshot.getLoadable(node).contents);
    }
  }, [snapshot]);

  return null;
};

export default DebugObserver;
