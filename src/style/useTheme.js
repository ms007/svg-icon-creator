import { useEffect } from 'react';
import { useLocalStorage } from 'react-use';
import { atom, useRecoilState } from 'recoil';

const themeAtom = atom({
  key: 'themeAtom',
  default: null,
});

const useTheme = (initialTheme = 'light') => {
  const [name, setName] = useLocalStorage('theme', initialTheme);
  const [theme, setTheme] = useRecoilState(themeAtom);

  useEffect(() => {
    const loadThemeValues = async () => {
      const { default: themeValues } = await import(`./${name}`);
      setTheme(themeValues);
    };

    loadThemeValues();
  }, [name, setTheme]);

  const toggleTheme = () => {
    setName(name === 'dark' ? 'light' : 'dark');
  };

  const isReady = theme != null;
  return { name, theme, isReady, toggleTheme };
};

export default useTheme;
