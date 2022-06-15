import { useState } from 'react';
import { TranslationType } from '../types';

// React Hook Form 使いてぇな〜
interface InputValues {
  processing: string;
  preposition: string;
  subject: string;
  nounAfterPreposition: string;
}

export const useValidate = () => {
  const [isValid, setValidate] = useState(false);
  const { ENG, ROMAN } = TranslationType;

  const validateValue = (values: InputValues) => {
    const { processing, preposition, subject, nounAfterPreposition } = values;
    if (!processing) {
      setValidate(false);
      return;
    }

    if (!subject) {
      setValidate(false);
      return;
    }

    if (preposition && nounAfterPreposition) {
      setValidate(false);
      return;
    }

    if (preposition && nounAfterPreposition) {
      setValidate(false);
      return;
    }

    setValidate(true);
  };

  const validateKana = (text: string, type: typeof ENG | typeof ROMAN) => {
    if (type === ENG) return true;
    //"ー"の後ろの文字は全角スペースです。
    if (!text.match(/^[ぁ-んー　]*$/)) return false;
    return true;
  };

  return { isValid, validateValue, validateKana };
};
