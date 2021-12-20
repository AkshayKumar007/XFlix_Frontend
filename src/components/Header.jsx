import React from 'react';
import { Link } from 'react-router-dom';
import Search from './Search';
import { useContext } from 'react';

import headerOptionsContext from '../utils/HeaderOptionsContext';
import VideoContext from '../utils/VideoContext';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { AppBar, CssBaseline, Toolbar, Box, Button } from '@mui/material';

const Header = ({ visibility, setVisibility }) => {
  const [headerOptions, setHeaderOptions] = useContext(headerOptionsContext);

  const [localVideos, setLocalVideos] = useContext(VideoContext);
  console.log('local Videos', localVideos);

  // change local videos based on pattern
  const handleSearch = (event) => {};

  const handleUploadClick = () => {
    setVisibility(!visibility);
  };

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
