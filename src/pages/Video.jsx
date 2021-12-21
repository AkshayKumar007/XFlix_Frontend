import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Divider } from '@mui/material';

import Dashboard from '../components/Dashboard';
import { config } from '../App';
import Playback from '../components/Playback';

const Video = () => {
  const [video, setVideo] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const getVideoDetails = async (id) => {
      try {
        const response = await fetch(`${config.endpoint}/v1/videos/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const jsonResponse = await response.json();
        if (!jsonResponse.ok) {
          throw new Error(jsonResponse);
        }
        setVideo(jsonResponse);
      } catch (e) {
        console.log(`Video Fetch error: ${e.message}`);
      }
    };

    getVideoDetails(id);
  }, [id]);

  return (
    <>
      <Playback video={video} />
      <Divider />
      <Dashboard />
    </>
  );
};

export default Video;
