import React from 'react';
import { useParams } from 'react-router-dom';
import { Divider } from '@mui/material';

import Dashboard from '../components/Dashboard';
import VideoPlayer from '../components/VideoPlayer';

const Video = () => {
  const { videoId } = useParams();

  return (
    <>
      <VideoPlayer id={videoId} />
      <Divider sx={{ ml: 20, mr: 22 }} />
      <Dashboard />
    </>
  );
};

export default Video;
