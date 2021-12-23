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

  // use this to change local Videos based on API calls for search
  const [localVideos, setLocalVideos] = useContext(VideoContext);

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
                  sx={{ height: 35, pt: 1 }}
                  component="img"
                  alt="XFlix"
                  src="/XFlix-logo.png"
                />
              </Link>
              <Box sx={{ flexGrow: 1 }} />
              {/* Search icon */}
              <Search handleSearch={handleSearch} />

              {/* Upload Button */}
              <Box sx={{ flexGrow: 1 }} />
              <Button
                onClick={handleUploadClick}
                sx={{ display: 'flex' }}
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
                <Box
                  sx={{ height: 25 }}
                  component="img"
                  alt="XFlix"
                  src="/XFlix-logo.png"
                />
              </Link>
            </CssBaseline>
          </Toolbar>
        </AppBar>
      )}
    </div>
  );
};

export default Header;
