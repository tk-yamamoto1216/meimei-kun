import "./App.css";
import { SelectChangeEvent } from "@mui/material/Select";
import Button from "@mui/material/Button";
import AppSelectBox from "./components/AppSelectBox";
import { prepositionOptions, processOptions } from "./options";
import { useState } from "react";
import { TextField } from "@mui/material";
import { useDeepl } from "./useDeepl";

function App() {
  const [process, setProcess] = useState("");
  const [preposition, setPreposition] = useState("");
  const [subject, setSubject] = useState("");
  const [functionName, setFunctionName] = useState("");
  const { translateText, capitalize } = useDeepl();
  const handleChangeProcess = (e: SelectChangeEvent) => {
    setProcess(e.target.value);
  };
  const handleChangePreposition = (e: SelectChangeEvent) => {
    setPreposition(e.target.value);
  };
  const nameFunction = async () => {
    const target = processOptions.find((option) => option.jp === process);
    if (!target) {
      alert("「処理」が入力されていません。");
      return;
    }
    const translatedText = await translateText(subject);
    if (!translatedText) {
      alert("翻訳に失敗しました。");
      return;
    }
    const str = capitalize(translatedText);
    setFunctionName(target.en + str);
  };

  return (
    <div className="App">
      <div className="input-container">
        <AppSelectBox
          onChange={handleChangeProcess}
          options={processOptions}
          selectedItem={process}
          label="処理"
        />
        <TextField
          id="outlined-basic"
          label="対象"
          variant="outlined"
          onChange={(e) => setSubject(e.target.value)}
        />
        <AppSelectBox
          onChange={handleChangePreposition}
          options={prepositionOptions}
          selectedItem={preposition}
          label="前置詞"
        />
        <Button variant="contained" onClick={() => nameFunction()}>
          Mei Mei
        </Button>
      </div>
      {/* 日本語 */}
      <h1>
        {subject}
        {`を${process}`}
      </h1>
      <h1>{functionName}</h1>
    </div>
  );
}

export default App;
