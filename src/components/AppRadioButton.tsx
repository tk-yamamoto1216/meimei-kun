import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { css } from '@emotion/react';

// type Props = {
//   labels: string[];
// };

const style = css(`
  display: flex;
 `);

const AppRadioButton = () => {
  // const { labels } = props;
  return (
    <div css={style}>
      <FormControl>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="female"
          name="radio-buttons-group"
        >
          <div>
            <FormControlLabel value="female" control={<Radio />} label="英語" />
            <FormControlLabel
              value="male"
              control={<Radio />}
              label="ローマ字"
            />
          </div>
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default AppRadioButton;
