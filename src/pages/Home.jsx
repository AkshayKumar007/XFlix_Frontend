import React from 'react';
import { useState, useContext, useEffect } from 'react';

import Panel from '../components/Panel';
import headerOptionsContext from '../utils/HeaderOptionsContext';
import VideoContext from '../utils/VideoContext';
import Dashboard from '../components/Dashboard';

const Home = ({ allVideos }) => {
  const [headerOptions, setHeaderOptions] = useContext(headerOptionsContext);
  useEffect(() => {
    setHeaderOptions(true);
  }, []);

  useEffect(() => {
    setLocalVideos(allVideos);
  }, [allVideos]);

  const [localVideos, setLocalVideos] = useState(allVideos);

  return (
    <VideoContext.Provider value={[localVideos, setLocalVideos]}>
      <Panel allVideos={allVideos} />
      <Dashboard></Dashboard>
    </VideoContext.Provider>
  );
};

export default Home;
