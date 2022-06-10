import "./assets/styles/App.css";
import { SelectChangeEvent } from "@mui/material/Select";
import Button from "@mui/material/Button";
import AppSelectBox from "./components/AppSelectBox";
import AppHeader from "./components/AppHeader";
import { prepositionOptions, processOptions } from "./options";
import { useCallback, useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { useDeepl } from "./hooks/useDeepl";
import ReactLoading from "react-loading";
import { capitalize, formatFunctionName } from "./utils";
import { useValidate } from "./hooks/useValidate";
import AppModal from "./components/AppModal";

function App() {
  const [processing, setProcess] = useState("");
  const [preposition, setPreposition] = useState("");
  const [subject, setSubject] = useState("");
  // 前置詞の対象
  // FIX: 2はあかんなぁ
  const [subject2, setSubject2] = useState("");
  const [functionName, setFunctionName] = useState("");
  const { isValid, validateValue } = useValidate();

  const japaneseSentence = () => {
    return `${subject2}${preposition.replace("~", "")}${subject}${
      subject ? "を" : ""
    }${processing}`;
  };

  const { translateText, isLoading } = useDeepl();
  const handleChangeProcess = (e: SelectChangeEvent) => {
    setProcess(e.target.value);
  };
  const handleChangePreposition = useCallback((e: SelectChangeEvent) => {
    if (e.target.value === "なし") {
      setPreposition("");
      return;
    }
    setPreposition(e.target.value);
  }, []);
  const target = processOptions.find((option) => option.jp === processing);
  const targetPreposition = prepositionOptions.find(
    (option) => option.jp === preposition
  );

  const nameFunction = async () => {
    if (!target) {
      alert("「処理」が入力されていません。");
      return;
    }
    const translatedText = await translateText(subject);
    if (!translatedText) {
      alert("対象の翻訳に失敗しました。");
      return;
    }
    if (subject2 && !targetPreposition) {
      alert("前置詞を入力してください。");
      return;
    }
    const str = capitalize(translatedText);
    const translatedText2 = await translateText(subject2);
    const str2 = capitalize(translatedText2 ?? "");
    const name = `${target.en}${formatFunctionName(str)}${
      targetPreposition?.en ?? ""
    }${str2}`;
    setFunctionName(name);
  };

  // バリデーション
  useEffect(() => {
    validateValue({
      processing,
      preposition,
      subject,
      subject2,
    });
  }, [processing, preposition, subject, subject2]);

  // モーダル
  const [open, setOpen] = useState(false);
  const handleOpen = useCallback(() => {
    setOpen(true);
  }, [open]);
  const handleClose = () => setOpen(false);

  // ボタン
  const FuncName: React.FC = () => {
    if (isLoading) {
      return (
        <ReactLoading
          className="loading"
          type="spin"
          color="black"
          height={"5%"}
          width={"5%"}
        />
      );
    }
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
              onChange={(e) => setSubject2(e.target.value)}
            />
          )}
        </div>
        <h1>{japaneseSentence()}</h1>
        {functionName ? (
          <Button
            className="button"
            variant="contained"
            size="large"
            onClick={() => setFunctionName("")}
          >
            リセット
          </Button>
        ) : (
          <Button
            className="button"
            variant="contained"
            size="large"
            disabled={!isValid}
            onClick={() => nameFunction()}
          >
            命名
          </Button>
        )}
        <FuncName />
      </div>
      <img src={`${process.env.REACT_APP_URL}/IMG_0134.PNG`} alt={"logo"} />
      <AppModal handleClose={handleClose} open={open} />
    </div>
  );
}

export default App;
