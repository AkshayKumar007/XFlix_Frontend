import React, {useEffect, useContext} from 'react';
import { useParams } from 'react-router-dom';
import { Divider } from '@mui/material';

import Dashboard from '../components/Dashboard';
import VideoPlayer from '../components/VideoPlayer';
import headerOptionsContext from '../utils/HeaderOptionsContext';

const Video = () => {
  const { videoId } = useParams();
  const [headerOptions, setHeaderOptions] = useContext(headerOptionsContext);
  useEffect(() => {
    setHeaderOptions(false);
  }, []);

  return (
    <>
      <VideoPlayer id={videoId} />
      <Divider sx={{ ml: 20, mr: 22 }} />
      <Dashboard />
    </>
  );
};

export default Video;
