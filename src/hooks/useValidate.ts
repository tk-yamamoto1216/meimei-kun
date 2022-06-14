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
  const [isValidKana, setValidateKana] = useState(false);
  const { ENG, ROMAN } = TranslationType;

  const validateValue = (values: InputValues) => {
    if (!values.processing) {
      setValidate(false);
      return;
    }

    if (!values.subject) {
      setValidate(false);
      return;
    }

    if (values.preposition && !values.nounAfterPreposition) {
      setValidate(false);
      return;
    }

    if (!values.preposition && values.nounAfterPreposition) {
      setValidate(false);
      return;
    }

    setValidate(true);
  };

  const validateKana = (text: string, type: typeof ENG | typeof ROMAN) => {
    if (type === ENG) {
      setValidateKana(true);
      return;
    }
    if (!text.match(/^[ぁ-んー　]*$/)) {
      //"ー"の後ろの文字は全角スペースです。
      setValidateKana(false);
      return;
    }
    setValidateKana(true);
  };

  return { isValid, validateValue, isValidKana, validateKana };
};
