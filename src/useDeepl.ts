import translate from "deepl";
import { useState } from "react";

export const useDeepl = () => {
  const translateText = async (subject: string) => {
    try {
      const res = await translate({
        free_api: true,
        text: subject,
        target_lang: "EN",
        auth_key: process.env.REACT_APP_DEEPL_KEY ?? "",
      });
      return res.data.translations[0].text;
    } catch (error) {
      console.log("API error", error);
    }
  };

  /* １文字目だけ大文字に  */
  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  return {
    translateText,
    capitalize,
  };
};
