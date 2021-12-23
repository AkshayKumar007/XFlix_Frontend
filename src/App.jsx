import React, { useState, useEffect } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './pages/Home';
import Video from './pages/Video';
import headerOptionsContext from './utils/HeaderOptionsContext';
import VideoContext from './utils/VideoContext';
import './App.css';

export const config = {
  endpoint: `https://a9dbbc30-7f76-4a58-af9f-189c09f97c41.mock.pstmn.io`,
};

const App = () => {
  const [headerOptions, setHeaderOptions] = useState(true);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    let errored = false;
    const getData = async () => {
      try {
        let response = await fetch(`${config.endpoint}/v1/videos`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        let jsonResponse = await response.json();
        setVideos(jsonResponse.videos);
      } catch (e) {
        errored = true;
      }
    };
    getData();
    if (errored) {
      console.log('Error Occured!');
    }
  }, []);

  const [localVideos, setLocalVideos] = useState(videos);

  useEffect(() => {
    setLocalVideos(videos);
  }, [videos]);

  return (
    <div className="App">
      <Router>
        <headerOptionsContext.Provider
          value={[headerOptions, setHeaderOptions]}
        >
          <VideoContext.Provider value={[localVideos, setLocalVideos]}>
            <Layout allVideos={videos}>
              <Switch>
                <Route
                  exact
                  path="/"
                  render={() => <Home allVideos={videos} />}
                />
                <Route exact path="/video/:videoId" render={() => <Video />} />
              </Switch>
            </Layout>
          </VideoContext.Provider>
        </headerOptionsContext.Provider>
      </Router>
    </div>
  );
};

export default App;
