import React from 'react';
import { useContext } from 'react';

import VideoContext from '../utils/VideoContext';

const Dashboard = () => {
  const [localVideos, setLocalVideos] = useContext(VideoContext);
  
  return <p>Yo</p>;
};

export default Dashboard;
