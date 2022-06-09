import { useState } from "react";

interface InputValues {
  processing: string;
  preposition: string;
  subject: string;
  subject2: string;
}

export const useValidate = () => {
  const [isValid, setValidate] = useState(false);
  const validateValue = (values: InputValues) => {
    if (!values.processing) {
      setValidate(false);
      return;
    }

    if (!values.subject) {
      setValidate(false);
      return;
    }

    if (values.preposition && !values.subject2) {
      setValidate(false);
      return;
    }

    if (!values.preposition && values.subject2) {
      setValidate(false);
      return;
    }

    setValidate(true);
  };

  return { isValid, validateValue };
};
