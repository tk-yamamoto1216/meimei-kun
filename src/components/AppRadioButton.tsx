import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@mui/material';

// type Props = {
//   labels: string[];
// };

const AppRadioButton = () => {
  // const { labels } = props;
  return (
    <div>
      <FormControl>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="female"
          name="radio-buttons-group"
        >
          <FormControlLabel value="female" control={<Radio />} label="英語" />
          <FormControlLabel value="male" control={<Radio />} label="ローマ字" />
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default AppRadioButton;
