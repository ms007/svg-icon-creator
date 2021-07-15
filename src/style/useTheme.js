import { useEffect } from 'react';
import { useLocalStorage } from 'react-use';
import { atom, useRecoilState } from 'recoil';

const themeValuesState = atom({
  key: 'themeValues',
  default: null,
});

const useTheme = (theme = 'light') => {
  const [name, setName] = useLocalStorage('theme', theme);
  const [values, setValues] = useRecoilState(themeValuesState);

  useEffect(() => {
    const loadThemeValues = async () => {
      const { default: themeValues } = await import(`./${name}`);
      setValues(themeValues);
    };

    loadThemeValues();
  }, [name, setValues]);

  const toggleTheme = () => {
    setName(name === 'dark' ? 'light' : 'dark');
  };

  const isReady = values != null;
  return { name, values, isReady, toggleTheme };
};

export default useTheme;
