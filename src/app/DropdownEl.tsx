import React from "react";
import { FormControl, InputLabel, MenuItem } from "@mui/material";
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface DropdownProps {
  selectedSet: string;
  onSetChange: (selectedSet: string) => void;
}

const DropdownEl: React.FC<DropdownProps> = ({ selectedSet, onSetChange }) => {
  const sets: string[] = ["Basic", "Intermediate", "IELTS", "TOEFL", "GRE", "SAT"]; // Add other sets here

  const handleSetChange = (event: SelectChangeEvent) => {
    onSetChange(event.target.value);
  };

  return (
    <div className="mb-4">
      <FormControl sx={{ my: 2, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">Vocabulary Set</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={selectedSet}
          label="Select a Vocabulary Set"
          autoWidth
          onChange={handleSetChange}
        >
          {sets.map((set) => (
            <MenuItem key={set} value={set}>
              {set}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default DropdownEl;
