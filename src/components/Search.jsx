import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';

const SearchField = styled(Paper)(({ theme }) => ({
  position: 'relative',
  border: '1px solid grey',
  borderRadius: 4,
  backgroundColor: theme.palette.secondary.dark,
  p: '0px 2px',
  alignItems: 'center',
  marginLeft: 0,
  minWidth: 500,
  display: 'flex',
  [theme.breakpoints.down('md')]: {
    marginLeft: theme.spacing(1),
    minWidth: 100,
  },
}));

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
  const [searchText, setSearchText] = useState('');
  const debouncedSearchTerm = useDebounce(searchText, 500);

  return (
    <Stack direction="row">
      <SearchField>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search"
          onChange={(event) => setSearchText(event.target.value)}
        />
      </SearchField>
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

{
  /* <Paper
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
</Paper> */
}
