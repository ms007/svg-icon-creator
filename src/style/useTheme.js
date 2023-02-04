import { useEffect } from 'react';
import { useLocalStorage } from 'react-use';
import { useRecoilState } from 'recoil';

import { light, dark } from './colors';
import { presetsThemeAtom } from 'recoil/presets';

const colors = {
  light,
  dark,
};

const useTheme = (initialTheme = 'light') => {
  const [name, setName] = useLocalStorage('theme', initialTheme);
  const [theme, setTheme] = useRecoilState(presetsThemeAtom);

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
