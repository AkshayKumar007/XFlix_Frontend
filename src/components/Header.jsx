import React from 'react';
import { Link } from 'react-router-dom';
import Search from './Search';
import { useContext } from 'react';
import headerOptionsContext from '../utils/HeaderOptionsContext';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { AppBar, CssBaseline, Toolbar, Box, Button } from '@mui/material';

const Header = () => {
  const [headerOptions, setHeaderOptions] = useContext(headerOptionsContext);

  const handleSearch = (event) => {};

  const handleUploadClick = (event) => {};

  let modalDiv = document.getElementById('modal');

  return (
    <div className="header">
      {headerOptions ? (
        <AppBar position="static">
          <Toolbar>
            <CssBaseline>
              {/* Xflix icon */}
              <Link to="/">
                <Box
                  sx={{ height: 25 }}
                  component="img"
                  alt="XFlix"
                  src="/XFlix-logo.png"
                />
              </Link>

              {/* Search icon */}
              <Search handleSearch={handleSearch} />

              {/* Upload Button */}

              <Button
                onClick={handleUploadClick}
                variant="contained"
                endIcon={<FileUploadIcon />}
              >
                Upload
              </Button>
            </CssBaseline>
          </Toolbar>
        </AppBar>
      ) : (
        <AppBar position="static">
          <Toolbar>
            <CssBaseline>
              {/* Xflix icon */}
              <Link to="/">
                <Box component="img" alt="XFlix" src="/XFlix-logo.png" />
              </Link>
            </CssBaseline>
          </Toolbar>
        </AppBar>
      )}
    </div>
  );
};

export default Header;
