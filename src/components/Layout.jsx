import React from 'react';
import { useState } from 'react';

import Header from './Header';
import UploadForm from './UploadForm';

const Layout = ({ children, allVideos }) => {
  const [formVisibility, setFormVisibility] = useState(false);

  return (
    <>
      <Header allVideos={allVideos} visibility={formVisibility} setVisibility={setFormVisibility} />
      {children}
      <UploadForm visibility={formVisibility} setVisibility={setFormVisibility} />
    </>
  );
};

export default Layout;
