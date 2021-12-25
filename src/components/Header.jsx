import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Search from './Search';

import FileUploadIcon from '@mui/icons-material/FileUpload';
import { AppBar, CssBaseline, Toolbar, Box, Button } from '@mui/material';

import headerOptionsContext from '../utils/HeaderOptionsContext';
import SearchContext from '../utils/SearchContext';
// import VideoContext from '../utils/VideoContext';
// import { config } from '../App';

const Header = ({ visibility, setVisibility }) => {
  const [headerOptions, setHeaderOptions] = useContext(headerOptionsContext);

  const [SearchTerm, setSearchTerm] = useContext(SearchContext);

  // use this to change local Videos based on API calls for search
  // const [localVideos, setLocalVideos] = useContext(VideoContext);

  // change local videos based on pattern
  const handleSearch = (searchParam) => {
    setSearchTerm(searchParam);
  };

  const handleUploadClick = () => {
    setVisibility(!visibility);
  };

  return (
    <div className="header">
      {headerOptions ? (
        <AppBar position="static">
          {/* style={{ background: '#2E3B55' }}> */}
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
                color="success"
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

// const getMatchingVideos = async (searchParam) => {
//   try {
//     const response = await fetch(
//       `${config.endpoint}/v1/videos?title=${searchParam}`
//     );
//     const jsonResponse = await response.json();
//     if (!response.ok) {
//       throw new Error(jsonResponse);
//     }
//     setLocalVideos(jsonResponse.videos);
//   } catch (e) {
//     console.log(`Search Error: ${e.message}`);
//   }
// };
// getMatchingVideos(searchParam);
