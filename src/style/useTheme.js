import { useEffect } from 'react';
import { useLocalStorage } from 'react-use';
import { atom, useRecoilState } from 'recoil';

import { light, dark } from './colors';

const themeAtom = atom({
  key: 'themeAtom',
  default: null,
});

const colors = {
  light,
  dark,
};

const useTheme = (initialTheme = 'light') => {
  const [name, setName] = useLocalStorage('theme', initialTheme);
  const [theme, setTheme] = useRecoilState(themeAtom);

  useEffect(() => {
    const keys = Object.keys(colors[name]);
    keys.map((key) => {
      const constructVar = `--${key}`;
      document.body.style.setProperty(constructVar, colors[name][key]);
      setTheme(name);
      return name;
    });
  }, [name, setTheme]);

  const toggleTheme = () => {
    setName(name === 'dark' ? 'light' : 'dark');
  };

  const isReady = theme != null;
  return { theme, toggleTheme, isReady };
};

export default useTheme;
