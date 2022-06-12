import { SelectChangeEvent } from '@mui/material';
import { useCallback, useState } from 'react';
import { prepositionOptions, processOptions } from '../options';
import { capitalize, formatFunctionName } from '../utils';
import { useDeepl } from './useDeepl';

export const useGenerateFunctionName = () => {
  const [processing, setProcess] = useState('');
  const [preposition, setPreposition] = useState('');
  const [subject, setSubject] = useState('');
  // NOTE: 前置詞の対象
  // with〇〇 の「〇〇」にあたる部分
  const [nounAfterPreposition, setnounAfterPreposition] = useState('');
  const [functionName, setFunctionName] = useState('');

  const japaneseSentence = () => {
    return `${nounAfterPreposition}${preposition.replace('~', '')}${subject}${
      subject ? 'を' : ''
    }${processing}`;
  };

  const handleChangeProcess = useCallback(
    (e: SelectChangeEvent) => setProcess(e.target.value),
    []
  );

  const handleChangePreposition = useCallback((e: SelectChangeEvent) => {
    if (e.target.value === 'なし') {
      setPreposition('');
      return;
    }
    setPreposition(e.target.value);
  }, []);

  //  選択された日本語（処理）から対応する英語を選ぶ
  const target = processOptions.find((option) => option.jp === processing);
  //  選択された日本語（前置詞）から対応する英語を選ぶ
  const targetPreposition = prepositionOptions.find(
    (option) => option.jp === preposition
  );

  // Deepl API を叩いて整形
  const { translateText, isLoading } = useDeepl();
  const nameFunction = async () => {
    if (!target) {
      alert('「処理」が入力されていません。');
      return;
    }
    const translatedText = await translateText(subject);
    if (!translatedText) {
      alert('対象の翻訳に失敗しました。');
      return;
    }
    if (nounAfterPreposition && !targetPreposition) {
      alert('前置詞を入力してください。');
      return;
    }
    const str = capitalize(translatedText);
    const translatedText2 = await translateText(nounAfterPreposition);
    const str2 = capitalize(translatedText2 ?? '');
    const name = `${target.en}${formatFunctionName(str)}${
      targetPreposition?.en ?? ''
    }${str2}`;
    setFunctionName(name);
  };

  return {
    processing,
    preposition,
    subject,
    nounAfterPreposition,
    functionName,
    japaneseSentence,
    nameFunction,
    isLoading,
    handleChangeProcess,
    setSubject,
    handleChangePreposition,
    setnounAfterPreposition,
    setFunctionName,
  };
};
