import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { useLocalStorage } from 'react-use';
import { atom } from 'recoil';

import light from './light';
import dark from './dark';

const themeValuesState = atom({
  key: '[theme] theme values',
  default: light,
});

const useTheme = (theme = 'light') => {
  const [isReady, setIsReady] = useState(false);
  const [name, setName] = useLocalStorage('theme', theme);
  const [values, setValues] = useRecoilState(themeValuesState);

  useEffect(() => {
    setValues(name === 'dark' ? light : dark);
    setIsReady(true);
  }, [name, setValues]);

  const toggleTheme = () => {
    setName(name === 'dark' ? 'light' : 'dark');
    setValues(name === 'dark' ? light : dark);
  };

  return { name, values, isReady, toggleTheme };
};

export default useTheme;
