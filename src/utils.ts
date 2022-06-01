/* １文字目だけ大文字に  */
export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * () の中身を削除
 * @param val (western)soup
 * @returns BigRiver
 */
export const removeInsideParentheses = (text: string) => {
  return text.replace(/ *\([^)]*\) */g, "");
};

/**
 * ハイフン区切りを空白に置換
 * @param val western-soup
 * @returns western soup
 */
export const replaceHyphenToBlank = (text: string) => {
  return text.replace("-", " ");
};

/**
 * キャメルケースに変換し空白を取り除く
 * @param val Big river
 * @returns BigRiver
 */
export const removeBlank = (text: string) => {
  const capitalizedTexts = text.split(" ", 0).map((e) => capitalize(e));
  return capitalizedTexts.join("");
};

/* 生成された関数から不適切な文字を取り除く */
export const formatFunctionName = (text: string) => {};
