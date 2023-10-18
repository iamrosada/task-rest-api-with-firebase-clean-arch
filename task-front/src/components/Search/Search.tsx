import React from 'react';
import TextField from '@mui/material/TextField';

type SearchProps = {
  search: string;
  setSearch: (search: string) => void;
};

const Search: React.FC<SearchProps> = ({ search, setSearch }) => (
    <TextField
      label="Search"
      type="search"
      variant="outlined"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );

export default Search;

