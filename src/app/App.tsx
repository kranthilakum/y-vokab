"use client"; 

import React, { SetStateAction, Suspense, useState } from 'react';
import VocabularyTable from './VocabularyTable';
import DropdownEl from './DropdownEl';
import SearchBar from './SearchBar';
import LoadingIcon from './LoadingIcon';
import { Grid } from '@mui/material';

const App = () => {
  const [selectedSet, setSelectedSet] = useState('Basic');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSetChange = (set: SetStateAction<string>) => {
    setSelectedSet(set);
  };

  const handleSearchChange = (search: SetStateAction<string>) => {
    setSearchTerm(search);
  };

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item>
        <DropdownEl selectedSet={selectedSet} onSetChange={handleSetChange} />
        </Grid>
        <Grid item>
        <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
        </Grid>
      </Grid>
      <Suspense fallback={<LoadingIcon />}>
        <VocabularyTable selectedSet={selectedSet} searchTerm={searchTerm} />
      </Suspense>
    </div>
  );
};

export default App;
