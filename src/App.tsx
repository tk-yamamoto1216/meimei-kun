import { useCallback, useEffect, useState } from "react";
// MUIs
import Button from "@mui/material/Button";
import { TextField, Box } from "@mui/material";
// Components
import AppSelectBox from "./components/AppSelectBox";
import AppHeader from "./components/AppHeader";
import AppRadioButton from "./components/AppRadioButton";
import AppModal from "./components/AppModal";
// Hooks
import { useValidate } from "./hooks/useValidate";
import { useGenerateFunctionName } from "./hooks/useGenerateFunctionName";
// Others
import "./assets/styles/App.css";
import { prepositionOptions, processOptions } from "./options";
import AppLoading from "./components/AppLoading";

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
    subjectPrepositionLabel,
  } = useGenerateFunctionName();
  const {
    isValidSubject,
    isValidPreposition,
    isValidSubjectKana,
    isValidPrepositionKana,
    validateSubjectValue,
    validatePreposition,
    validateSubjectKana,
    validatePrepositionKana,
  } = useValidate();

  // バリデーション
  useEffect(() => {
    validateSubjectValue(subject, processing);
    validateSubjectKana(subject, translationType);
    validatePreposition(preposition, nounAfterPreposition);
    validatePrepositionKana(nounAfterPreposition, prepositionTranslationType);
    setFunctionName("");
  }, [
    processing,
    preposition,
    subject,
    nounAfterPreposition,
    translationType,
    prepositionTranslationType,
  ]);

  // 補助がないときは補助対象もない
  useEffect(() => {
    if (preposition) {
      return;
    }
    setnounAfterPreposition("");
  }, [preposition]);

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
      <div className="app-container">
        <AppHeader handleOpen={handleOpen} />
        <div className="container">
          <div className="input-container">
            <Box sx={{ width: 300 }}>
              <AppSelectBox
                onChange={handleChangeProcess}
                options={processOptions}
                selectedItem={processing}
                label="処理"
              />
            </Box>
            <div>
              <TextField
                sx={{ width: 300 }}
                error={!isValidSubjectKana}
                helperText={
                  !isValidSubjectKana
                    ? "ローマ字の時はひらがなで入力してください"
                    : ""
                }
                id="outlined-basic"
                label={subjectLabel}
                variant="outlined"
                onChange={(e) => setSubject(e.target.value)}
              />
              <AppRadioButton handleChange={handleChangeType} />
            </div>
            {subject && processing && (
              <Box sx={{ width: 300 }}>
                <AppSelectBox
                  onChange={handleChangePreposition}
                  options={prepositionOptions}
                  selectedItem={preposition}
                  label="補助"
                />
              </Box>
            )}
            {preposition && (
              <div>
                <TextField
                  sx={{ width: 300 }}
                  error={!isValidPrepositionKana}
                  helperText={
                    !isValidPrepositionKana
                      ? "ローマ字の時はひらがなで入力してください"
                      : ""
                  }
                  id="outlined-basic"
                  label={subjectPrepositionLabel}
                  variant="outlined"
                  onChange={(e) => setnounAfterPreposition(e.target.value)}
                />
                <AppRadioButton handleChange={handleChangePrepositionType} />
              </div>
            )}
          </div>
          <h2>{japaneseSentence()}</h2>
          <Button
            className="button"
            variant="contained"
            size="large"
            disabled={
              !isValidSubject ||
              !isValidSubjectKana ||
              !isValidPreposition ||
              !isValidPrepositionKana
            }
            onClick={() => nameFunction()}
          >
            命名
          </Button>
          <FuncName />
        </div>
        <img
          className="image"
          src={`${process.env.REACT_APP_URL}/${
            functionName ? "IMG_0134.PNG" : "IMG_0132.PNG"
          }`}
          alt={"meimei"}
        />
        <AppModal handleClose={handleClose} open={open} />
      </div>
    </div>
  );
}

export default App;
