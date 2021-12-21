import React, { useContext, useEffect } from 'react';

import Panel from '../components/Panel';
import headerOptionsContext from '../utils/HeaderOptionsContext';
import Dashboard from '../components/Dashboard';

const Home = ({ allVideos }) => {
  const [headerOptions, setHeaderOptions] = useContext(headerOptionsContext);
  useEffect(() => {
    setHeaderOptions(true);
  }, []);

  return (
    <>
      <Panel allVideos={allVideos} />
      <Dashboard />
    </>
  );
};

export default Home;
