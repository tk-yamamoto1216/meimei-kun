import { useState } from 'react';

interface InputValues {
  processing: string;
  preposition: string;
  subject: string;
  nounAfterPreposition: string;
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

  return { isValid, validateValue };
};
