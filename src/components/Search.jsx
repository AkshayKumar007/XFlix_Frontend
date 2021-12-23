import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}

const Search = ({ handleSearch }) => {
  const [searchParam, setSearchParam] = useState('');
  const debouncedSearchTerm = useDebounce(searchParam, 500);
  return (
    <Stack direction="row">
      <Paper
        // component="form"
        sx={{
          p: '0px 2px',
          display: 'flex',
          width: '100%',
          alignItems: 'center',
          border: '1px solid grey',
        }}
        elevation={0}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search"
          onChange={(event) => setSearchParam(event.target.value)}
        />
      </Paper>
      <Paper
        sx={{ color: 'secondary', border: '1px solid grey', borderLeft: '0px' }}
        elevation={0}
      >
        <IconButton
          onClick={() => {
            handleSearch(debouncedSearchTerm);
          }}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    </Stack>
  );
};

export default Search;
