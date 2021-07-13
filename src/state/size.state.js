import { atom, selector } from 'recoil';

export const windowState = atom({
  key: '[size] window size',
  default: { width: window.innerWidth, height: window.innerHeight },
});

export const sidebarState = atom({
  key: '[size] sidebar size',
  default: 342,
});

export const inspectorState = atom({
  key: '[size] inspector size',
  default: 342,
});

export const artboardState = selector({
  key: '[size] artboard size',
  get: ({ get }) => {
    const margin = 80;
    const minSize = 300;
    const sidebarSize = get(sidebarState);
    const inspectorSize = get(inspectorState);
    const dimensions = get(windowState);

    const desiredWidth = dimensions.width - sidebarSize - inspectorSize - margin * 2;
    const desiredHeight = dimensions.height - margin * 2;
    const artboardWidth = desiredWidth < desiredHeight ? desiredWidth : desiredHeight;

    // ToDo: too big on big screens?

    const width = artboardWidth >= minSize ? artboardWidth : minSize;
    return { width, margin };
  },
});
