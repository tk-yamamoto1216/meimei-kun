import translate from "deepl";
import { useState } from "react";

export const useDeepl = () => {
  const [isLoading, setLoading] = useState(false);
  const translateText = async (subject: string) => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  return {
    translateText,
    isLoading,
  };
};
