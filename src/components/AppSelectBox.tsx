import React, { useState } from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { memo } from 'react';

type Props = {
  options: {
    en: string;
    jp: string;
  }[];
  selectedItem: string;
  label: string;
  onChange: (event: SelectChangeEvent) => void;
};

const AppSelectBox: React.FC<Props> = ({
  onChange,
  options,
  selectedItem,
  label,
}: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          aria-expanded={open}
          value={selectedItem}
          label={label}
          onChange={onChange}
        >
          {options.map((option, index) => {
            return (
              <MenuItem key={index} value={option.jp}>
                {option.jp}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </>
  );
};

export default memo(AppSelectBox);
