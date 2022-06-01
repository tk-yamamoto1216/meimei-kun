import "./App.css";
import Button from "@mui/material/Button";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

function App() {
  const options = [
    {
      en: "register",
      jp: "登録する",
    },
    {
      en: "post",
      jp: "投稿する",
    },
    {
      en: "add",
      jp: "追加する",
    },
  ];

  const handleChange = (e: SelectChangeEvent) => {
    console.log(e.target.value);
  };
  return (
    <div className="App">
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value="選択してね"
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained">Hello World</Button>
    </div>
  );
}

export default App;
