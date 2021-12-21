import React, { useState, useEffect } from 'react';
import { Grid, Stack, Paper, Typography, Fab } from '@mui/material';
import { ThumbUp, ThumbDown } from '@mui/icons-material/ThumbUp';
import { formatDistanceToNow } from 'date-fns';

import { config } from '../App';

const VideoPlayer = ({ id }) => {
  let [video, setVideo] = useState(null);

  const [upvotes, setUpvotes] = useState(0); // votes.upVotes)
  const [downvotes, setDownvotes] = useState(0); // votes.downVotes

  const handleClick = (event) => {
    console.log(event.target.value);
  };

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
        setVideo(jsonResponse);
        if (!response.ok) {
          throw new Error(jsonResponse.message);
        }
      } catch (error) {
        console.log(`Video Fetch error: ${error.message}`);
      }
    };

    getVideoDetails(id);
  }, []);

  if (video !== null) {
    return (
      <Grid
        container
        sx={{ pl: 10, my: 2, pr: 12 }}
        columns={{ xs: 12, sm: 12, md: 12, lg: 12 }}
      >
        <Grid item xs={12} sx={{ height: 1 }}>
          {/* .videoWrapper {
            position: relative;
            padding-bottom: 56.25%; // 16: 9
            padding-top: 25px;
            height: 0;
          }*/}
          <iframe
            width="100%"
            frameBorder="0"
            src={`https://${video.videoLink}`}
          />
          {/* .videoWrapper iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          } */}
        </Grid>
      </Grid>
    );
  }
  return <div> {'Video is Loading'} </div>;
};

export default VideoPlayer;
