import React, { ChangeEvent } from "react";
import { FormControl, TextField } from '@mui/material';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearchChange }) => {
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = event.target.value;
    onSearchChange(newSearchTerm);
  };

  return (
    <FormControl sx={{ my: 2, minWidth: 120 }}>
      <div className="mb-4">
        <TextField id="standard-basic" 
          label="Search for a Word"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
    </FormControl>
  );
};

export default SearchBar;
