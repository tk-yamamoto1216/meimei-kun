import { useCallback, useEffect, useState } from 'react';
// MUIs
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
// Components
import AppSelectBox from './components/AppSelectBox';
import AppHeader from './components/AppHeader';
import AppRadioButton from './components/AppRadioButton';
import AppModal from './components/AppModal';
// Hooks
import { useValidate } from './hooks/useValidate';
import { useGenerateFunctionName } from './hooks/useGenerateFunctionName';
// Others
import './assets/styles/App.css';
import { prepositionOptions, processOptions } from './options';
import AppLoading from './components/AppLoading';

function App() {
  const {
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
    handleChangeType,
    handleChangePrepositionType,
    translationType,
    subjectLabel,
    prepositionTranslationType,
  } = useGenerateFunctionName();
  const { isValid, validateValue, validateKana } = useValidate();

  // バリデーション
  useEffect(() => {
    validateValue({
      processing,
      preposition,
      subject,
      nounAfterPreposition,
    });
    setFunctionName('');
  }, [processing, preposition, subject, nounAfterPreposition]);

  // 対象バリデーション
  const [isValidKana, setValidateKana] = useState(true);
  useEffect(() => {
    const valid = validateKana(subject, translationType);
    setValidateKana(valid);
  }, [subject, translationType]);

  // 前置詞の後の名詞バリデーション
  const [isValidPrepositionKana, setValidatePrepositionKana] = useState(true);
  useEffect(() => {
    const valid = validateKana(
      nounAfterPreposition,
      prepositionTranslationType
    );
    setValidatePrepositionKana(valid);
  }, [nounAfterPreposition, prepositionTranslationType]);

  // モーダル
  const [open, setOpen] = useState(false);
  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);

  // 関数名（ローディング込み）
  // 別に分けんでよかったわ
  const FuncName: React.FC = () => {
    if (isLoading) return <AppLoading />;
    return <p className="function">{functionName}</p>;
  };

  return (
    <div className="App">
      <AppHeader handleOpen={handleOpen} />
      <div className="container">
        <div className="input-container">
          <AppSelectBox
            onChange={handleChangeProcess}
            options={processOptions}
            selectedItem={processing}
            label="処理"
          />
          <div className="text-field-container">
            <TextField
              fullWidth
              error={!isValidKana}
              helperText={
                !isValidKana ? 'ローマ字の時はひらがなで入力してください' : ''
              }
              id="outlined-basic"
              label={subjectLabel}
              variant="outlined"
              onChange={(e) => setSubject(e.target.value)}
            />
            <AppRadioButton handleChange={handleChangeType} />
          </div>
          {subject && processing && (
            <AppSelectBox
              onChange={handleChangePreposition}
              options={prepositionOptions}
              selectedItem={preposition}
              label="前置詞"
            />
          )}
          {preposition && (
            <div className="text-field-container">
              <TextField
                fullWidth
                error={!isValidPrepositionKana}
                helperText={
                  !isValidPrepositionKana
                    ? 'ローマ字の時はひらがなで入力してください'
                    : ''
                }
                id="outlined-basic"
                label="前置詞の後に来る名詞を入力してください。"
                variant="outlined"
                onChange={(e) => setnounAfterPreposition(e.target.value)}
              />
              <AppRadioButton handleChange={handleChangePrepositionType} />
            </div>
          )}
        </div>
        <h1>{japaneseSentence()}</h1>
        <Button
          className="button"
          variant="contained"
          size="large"
          disabled={!isValid || !isValidKana}
          onClick={() => nameFunction()}
        >
          命名
        </Button>
        <FuncName />
      </div>
      <img
        src={`${process.env.REACT_APP_URL}/${
          functionName ? 'IMG_0134.PNG' : 'IMG_0132.PNG'
        }`}
        alt={'meimei'}
      />
      <AppModal handleClose={handleClose} open={open} />
    </div>
  );
}

export default App;
