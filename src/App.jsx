import React from 'react';
import { useState } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './pages/Home';
import headerOptionsContext from './utils/HeaderOptionsContext';
import './App.css';

function App() {
  const headerOptionsHook = useState(true);

  return (
    <div className="App">
      <Router>
        <headerOptionsContext.Provider value={headerOptionsHook}>
          <Layout>
            <Switch>
              <Route exact path='/' render={() => <Home/> } />

            </Switch>
          </Layout>
        </headerOptionsContext.Provider>
      </Router>
    </div>
  );
}

export default App;
