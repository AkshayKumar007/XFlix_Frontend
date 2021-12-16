import React from 'react';
import { useState, useEffect } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './pages/Home';
import headerOptionsContext from './utils/HeaderOptionsContext';
import VideoContext from './utils/VideoContext';
import './App.css';

export const config = {
  endpoint: `https://52fde4a7-dca8-4f0c-b3bd-37879407f81f.mock.pstmn.io`, 
};

const App = () => {

  const [headerOptions, setHeaderOptions] = useState(true);
  const [videos, setVideos] = useState([]);
  
  useEffect(() => {
    let errored = false;
    const getData = async () => {
      try {
        let response =  await fetch(`${config.endpoint}/v1/videos`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        let jsonResponse = await response.json();
        let videoList = jsonResponse.videos.map((video) => {
          return Object.assign({}, video, {display: true});
        });
        console.log(videoList);
        setVideos(videoList);
      } catch (e) {
        errored = true;
      }
    };
    getData();
    if(errored) {
      console.log('Error Occured!')
    }
  }, []);

  return (
    <div className="App">
      <Router>
        <headerOptionsContext.Provider value={[headerOptions, setHeaderOptions]}>
        <VideoContext.Provider value={[videos, setVideos]}>
          <Layout>
            <Switch>
              <Route exact path='/' render={() => <Home/> } />

            </Switch>
          </Layout>
        </VideoContext.Provider>
        </headerOptionsContext.Provider>
      </Router>
    </div>
  );
}

export default App;