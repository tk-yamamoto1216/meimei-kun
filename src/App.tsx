import { useCallback, useEffect, useState } from 'react';
// MUIs
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
// Components
import ReactLoading from 'react-loading';
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
    caution,
  } = useGenerateFunctionName();
  const { isValid, validateValue } = useValidate();

  // バリデーション
  useEffect(() => {
    validateValue({
      processing,
      preposition,
      subject,
      nounAfterPreposition,
    });
  }, [processing, preposition, subject, nounAfterPreposition]);

  // モーダル
  const [open, setOpen] = useState(false);
  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);

  // 関数名
  const FuncName: React.FC = () => {
    if (isLoading) {
      return (
        <ReactLoading
          className="loading"
          type="spin"
          color="black"
          height={'5%'}
          width={'5%'}
        />
      );
    }
    return <p className="function">{functionName}</p>;
  };

  // 命名 or リセット
  const clickButton = () => {
    if (functionName) {
      return setFunctionName('');
    }
    nameFunction();
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
          <TextField
            fullWidth
            id="outlined-basic"
            label="対象"
            variant="outlined"
            onChange={(e) => setSubject(e.target.value)}
          />
          {subject && processing && (
            <AppSelectBox
              onChange={handleChangePreposition}
              options={prepositionOptions}
              selectedItem={preposition}
              label="前置詞"
            />
          )}
          {preposition && (
            <TextField
              fullWidth
              id="outlined-basic"
              label="前置詞の後に来る名詞を入力してください。"
              variant="outlined"
              onChange={(e) => setnounAfterPreposition(e.target.value)}
            />
          )}
        </div>
        <h1>{japaneseSentence()}</h1>
        <p>{caution}</p>
        <AppRadioButton handleChange={handleChangeType} />
        <Button
          className="button"
          variant="contained"
          size="large"
          disabled={!isValid}
          onClick={() => clickButton()}
        >
          {functionName ? 'リセット' : '命名'}
        </Button>
        <FuncName />
      </div>
      <img src={`${process.env.REACT_APP_URL}/IMG_0134.PNG`} alt={'logo'} />
      <AppModal handleClose={handleClose} open={open} />
    </div>
  );
}

export default App;
