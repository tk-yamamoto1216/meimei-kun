import "./App.css";
import { SelectChangeEvent } from "@mui/material/Select";
import Button from "@mui/material/Button";
import AppSelectBox from "./components/AppSelectBox";
import { prepositionOptions, processOptions } from "./options";
import { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { useDeepl } from "./useDeepl";
import ReactLoading from "react-loading";
import { capitalize, formatFunctionName } from "./utils";

function App() {
  const [process, setProcess] = useState("");
  const [preposition, setPreposition] = useState("");
  const [subject, setSubject] = useState("");
  // FIX: 2はあかんなぁ
  const [subject2, setSubject2] = useState("");
  const [functionName, setFunctionName] = useState("");

  const japaneseSentence = () => {
    return `${subject2}${preposition.replace("~", "")}${subject}を${process}`;
  };

  const { translateText, isLoading } = useDeepl();
  const handleChangeProcess = (e: SelectChangeEvent) => {
    setProcess(e.target.value);
  };
  const handleChangePreposition = (e: SelectChangeEvent) => {
    if (e.target.value === "なし") {
      setPreposition("");
      return;
    }
    setPreposition(e.target.value);
  };
  const target = processOptions.find((option) => option.jp === process);
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
    // FIX: 見辛
    setFunctionName(
      `${target.en}${formatFunctionName(str)}${
        targetPreposition?.en ?? ""
      }${str2}`
    );
  };

  useEffect(() => {
    if (functionName.length <= 30) {
      return;
    }
    alert(`${functionName.length}文字。変数名が長すぎます。`);
  }, [functionName]);

  return (
    <div className="App">
      <h1>めいめいくん</h1>
      <div className="input-container">
        <AppSelectBox
          onChange={handleChangeProcess}
          options={processOptions}
          selectedItem={process}
          label="処理を選択してください。"
        />
        <TextField
          fullWidth
          id="outlined-basic"
          label="対象を入力してください。"
          variant="outlined"
          onChange={(e) => setSubject(e.target.value)}
        />
        <AppSelectBox
          onChange={handleChangePreposition}
          options={prepositionOptions}
          selectedItem={preposition}
          label="前置詞を選択してください。"
        />
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
      <Button
        className="button"
        variant="contained"
        size="large"
        onClick={() => nameFunction()}
      >
        Mei Mei!!
      </Button>

      <h1>{japaneseSentence()}</h1>
      {isLoading ? (
        <ReactLoading
          className="loading"
          type="spin"
          color="black"
          height={"5%"}
          width={"5%"}
        />
      ) : (
        <h1>{functionName}</h1>
      )}
    </div>
  );
}

export default App;
