import * as React from "react";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

const Search = (props) => {
  return (
    <Stack direction="row">
      <Paper
        component="form"
        sx={{
          p: "0px 2px",
          display: "flex",
          alignItems: "center",
          width: "60rem",
          border: "1px solid grey",
        }}
        elevation={0}
      >
        <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search" />
      </Paper>
      <Paper
        sx={{ border: "1px solid grey", "borderLeft": "0px" }}
        elevation={0}
      >
        <IconButton onClick={(event) => {props.handleSearch(event.target.value)} }>
          <SearchIcon />
        </IconButton>
      </Paper>
    </Stack>
  );
}

export default Search;