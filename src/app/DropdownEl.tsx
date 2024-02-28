import React, { useState, useEffect } from "react";
import { FormControl, InputLabel, MenuItem } from "@mui/material";
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface DropdownProps {
  selectedSet: string;
  onSetChange: (selectedSet: string) => void;
}

const DropdownEl: React.FC<DropdownProps> = ({ selectedSet, onSetChange }) => {

  // get a list of all the sets from remote api `/collections`
  const [sets, setSets] = useState<string[]>([]);
  useEffect(() => {
    fetch("http://localhost:3001/api/collections")
      .then((res) => res.json())
      .then((data) => {
        console.log(`fetched sets: ${data}`);
        return setSets(data)
      });
  }, []);

  const handleSetChange = (event: SelectChangeEvent) => {
    onSetChange(event.target.value);
    console.log(`selected set: ${event.target.value}`);
    // select a mongo collection based on the selected set and fetch the data
    fetch(`http://localhost:3001/api/collections/${event.target.value}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(`fetched data: ${data}`);
      });
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
