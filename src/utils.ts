/* １文字目だけ大文字に変換  */
export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/* Deeplから呼び出した単語を表示用に整形 */
export const formatFunctionName = (text: string) => {
  /* 生成された関数から()を取り除く */
  const removeInsideParentheses = text.replace(/ *\([^)]*\) */g, "");
  /*  ハイフン区切りを空白に置換 */
  const hyphenToBlank = removeInsideParentheses.replace(/-/g, " ");
  /* キャメルケースに変換し空白を取り除く */
  const capitalizedTexts = hyphenToBlank
    .split(" ")
    .map((e) => capitalize(e))
    .join("");

  return capitalizedTexts;
};
