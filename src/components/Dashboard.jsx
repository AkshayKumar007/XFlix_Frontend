import React from 'react';
import { useContext } from 'react';

import VideoContext from '../utils/VideoContext';

const Dashboard = () => {
  const [localVideos, setLocalVideos] = useContext(VideoContext);
  console.log('local Videos', localVideos);

  return <p>Yo</p>;
};

export default Dashboard;
