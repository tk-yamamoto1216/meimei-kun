export const useFormatRomanAlphabet = () => {
  const formatKanaToRaman = (subject: string) => {
    if (!subject) {
      return '';
    }
    return 'RomanText';
  };

  return {
    formatKanaToRaman,
  };
};
