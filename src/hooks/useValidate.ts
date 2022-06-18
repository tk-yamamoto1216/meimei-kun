import { useState } from 'react';
import { TranslationType } from '../types';

// React Hook Form 使いてぇな〜

export const useValidate = () => {
  const { ENG, ROMAN } = TranslationType;

  // 処理 (processing) と対象(subject)のバリデーション
  const [isValidSubject, setSubjectValidate] = useState(false);
  const validateSubjectValue = (subject: string, processing: string) => {
    if (subject && processing) {
      setSubjectValidate(true);
      return;
    }
    setSubjectValidate(false);
  };

  // 対象 (subject) がローマ字のとき、ひらがなだけ許容
  const [isValidSubjectKana, setValidSubjectKana] = useState(false);
  const validateSubjectKana = (
    text: string,
    type: typeof ENG | typeof ROMAN
  ) => {
    if (type === ENG) {
      setValidSubjectKana(true);
      return;
    }
    if (!text) {
      setValidPrepositionKana(false);
      return;
    }
    //"ー"の後ろの文字は全角スペースです。
    if (!text.match(/^[ぁ-んー　]*$/)) {
      setValidSubjectKana(false);
      return;
    }
    setValidSubjectKana(true);
  };

  // 補助語 (preposition) と補助対象 (nounAfterPreposition) のバリデーション
  const [isValidPreposition, setPrepositionValidate] = useState(false);
  const validatePreposition = (
    preposition: string,
    nounAfterPreposition: string
  ) => {
    if (!preposition) {
      setPrepositionValidate(true);
      return;
    }
    if (preposition && !nounAfterPreposition) {
      setPrepositionValidate(false);
      return;
    }
    setPrepositionValidate(true);
  };

  // 補助 (nounAfterPreposition) がローマ字のとき、ひらがなだけ許容
  const [isValidPrepositionKana, setValidPrepositionKana] = useState(false);
  const validatePrepositionKana = (
    text: string,
    type: typeof ENG | typeof ROMAN
  ) => {
    if (type === ENG) {
      setValidPrepositionKana(true);
      return;
    }
    //"ー"の後ろの文字は全角スペースです。
    if (!text.match(/^[ぁ-んー　]*$/)) {
      setValidPrepositionKana(false);
      return;
    }
    setValidPrepositionKana(true);
  };

  return {
    isValidSubject,
    isValidPreposition,
    isValidSubjectKana,
    isValidPrepositionKana,
    validateSubjectValue,
    validatePreposition,
    validateSubjectKana,
    validatePrepositionKana,
  };
};
