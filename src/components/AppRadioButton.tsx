import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { css } from '@emotion/react';
import { memo } from 'react';
import { TranslationType } from '../types';

const style = css(`
  display: flex;
 `);

// FIX: 固定値🙅‍♂️
const { ENG, ROMAN } = TranslationType;
type Props = {
  handleChange: (id: typeof ENG | typeof ROMAN) => void;
};

const AppRadioButton = (props: Props) => {
  const { handleChange } = props;
  return (
    <div css={style}>
      <FormControl>
        <RadioGroup
          defaultValue={ENG}
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group"
        >
          {/* FIX: 固定の選択肢🙅‍♂️ */}
          <div>
            <FormControlLabel
              value={ENG}
              control={<Radio />}
              label="英語で翻訳"
              onChange={(e: any) => handleChange(e.target.value)}
            />
            <FormControlLabel
              value={ROMAN}
              control={<Radio />}
              label="ローマ字で翻訳"
              onChange={(e: any) => handleChange(e.target.value)}
            />
          </div>
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default memo(AppRadioButton);
