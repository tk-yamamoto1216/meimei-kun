import { prepositionOptions, processOptions } from "../options";
import { capitalize, formatFunctionName } from "../utils";
import { SelectChangeEvent } from "@mui/material";
import { useCallback, useState } from "react";
import { TranslationType } from "../types";
import { useDeepl } from "./useDeepl";
import { useFormatRomanAlphabet } from "./useFormatRomanAlphabet";

export const useGenerateFunctionName = () => {
  const [processing, setProcess] = useState("");
  const [preposition, setPreposition] = useState("");
  const [subject, setSubject] = useState("");
  // NOTE: 前置詞の対象
  // with〇〇 の「〇〇」にあたる部分
  const [nounAfterPreposition, setnounAfterPreposition] = useState("");
  const [functionName, setFunctionName] = useState("");

  const japaneseSentence = () => {
    return `${nounAfterPreposition}${preposition.replace("~", "")}${subject}${
      subject ? "を" : ""
    }${processing}`;
  };

  const handleChangeProcess = useCallback(
    (e: SelectChangeEvent) => setProcess(e.target.value),
    []
  );

  const handleChangePreposition = useCallback((e: SelectChangeEvent) => {
    if (e.target.value === "なし") {
      setPreposition("");
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

  // 英語 or ローマ字
  const { ENG, ROMAN } = TranslationType;
  const [translationType, changeType] = useState<typeof ENG | typeof ROMAN>(
    ENG
  ); // ちゃう気が、、
  const [caution, setCaution] = useState("");
  const handleChangeType = useCallback((id: typeof ENG | typeof ROMAN) => {
    if (Number(id) === ROMAN) {
      setCaution("ローマ字を翻訳する場合はひらがなで入力してください");
      return;
    }
    setCaution("");
  }, []);

  const { translateText, isLoading } = useDeepl();
  const { formatKanaToRaman } = useFormatRomanAlphabet();
  const nameFunction = async () => {
    if (!target) {
      alert("「処理」が入力されていません。");
      return;
    }

    let translatedSubject: string | undefined = "";

    // ローマ字の場合
    // FIX: なんか string で返ってきちゃうから一旦力業
    if (typeof translationType === "string") {
      if (translationType === "1") {
        translatedSubject = formatKanaToRaman(subject);
      }
    } else {
      // 英語の場合 Deepl API を叩いて整形
      translatedSubject = await translateText(subject);
    }

    if (!translatedSubject) {
      alert("対象の翻訳に失敗しました。");
      return;
    }
    if (nounAfterPreposition && !targetPreposition) {
      alert("前置詞を入力してください。");
      return;
    }
    const str = capitalize(translatedSubject);
    const translatedText2 = await translateText(nounAfterPreposition);
    const str2 = capitalize(translatedText2 ?? "");
    const name = `${target.en}${formatFunctionName(str)}${
      targetPreposition?.en ?? ""
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
    translationType,
    handleChangeType,
    caution,
  };
};
