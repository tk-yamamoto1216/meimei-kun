import { kanaToRoman } from '../kana';

export const useFormatRomanAlphabet = () => {
  const formatKanaToRaman = (subject: string) => {
    return kanaToRoman(subject);
  };

  return {
    formatKanaToRaman,
  };
};
