import React, { useState, useEffect } from 'react';
import { Grid, Stack, Typography, Fab, Box } from '@mui/material';
import { ThumbUp, ThumbDown } from '@mui/icons-material';
// import { formatDistanceToNow } from 'date-fns';

import { config } from '../App';

const VideoPlayer = ({ id }) => {
  let [video, setVideo] = useState(null);

  const [upvotes, setUpvotes] = useState(0); // votes.upVotes)
  const [downvotes, setDownvotes] = useState(0); // votes.downVotes

  useEffect(() => {
    const updateViewCount = async (_id) => {
      try {
        const response = await fetch(
          `${config.endpoint}/v1/videos/${_id}/views`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        if (response.status !== 204) {
          throw new Error(response.json());
        }
      } catch (e) {
        console.log(`Error in updating view count ${e.message}`);
      }
    };
    updateViewCount(id);
  }, []);

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

  const handleVote = (event) => {
    let data;
    if (event === 'upvote') {
      data = {
        vote: 'upVote',
        change: 'increase',
      };
    } else if (event === 'downvote') {
      data = {
        vote: 'downVote',
        change: 'increase',
      };
    }
    const updateVote = async (id) => {
      try {
        const response = await fetch(
          `${config.endpoint}/v1/videos/${id}/votes`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          }
        );
        if (response.status === 204) {
          if (event === 'upvote') {
            setUpvotes(upvotes + 1);
          } else {
            setDownvotes(downvotes + 1);
          }
        } else {
          throw new Error(response.json());
        }
      } catch (e) {
        console.log(`Upvote error: ${e.message}`);
      }
    };

    updateVote(video._id);
  };

  if (video !== null) {
    return (
      <>
        <Grid
          container
          sx={{ pl: 20, my: 2, pr: 22 }}
          columns={{ xs: 12, sm: 12, md: 12, lg: 12 }}
        >
          <Grid item xs={12} sx={{ height: 700, aspectRatio: 16 / 9 }}>
            {/* .videoWrapper {
            position: relative;
            padding-bottom: 56.25%; // 16: 9
            padding-top: 25px;
            height: 0;
          }*/}
            <iframe
              width="100%"
              height="100%"
              frameBorder="0"
              src={`https://${video.videoLink}`}
            />
            {/* .videoWrapper iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            width="100%"
              
          } */}
          </Grid>
        </Grid>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ pl: 20, my: 2, pr: 22 }}
        >
          <Box>
            <Typography
              variant="h5"
              display="block"
              sx={{ fontWeight: 'bold' }}
            >
              {video.title}
            </Typography>
            <Typography
              sx={{ pt: 1 }}
              variant="body2"
              align="left"
              color="text.secondary"
            >
              {`${video.contentRating} • ${video.releaseDate}`}
            </Typography>
          </Box>
          <Box>
            {/* Content for Like  */}
            <Fab
              variant="extended"
              size="medium"
              color="primary"
              aria-label="add"
              sx={{ mr: 1 }}
              value="upVote"
              onClick={() => handleVote('upvote')}
            >
              <ThumbUp sx={{ mr: 1 }} />
              {upvotes}
            </Fab>
            {/* Content for dislike */}
            <Fab
              variant="extended"
              size="medium"
              color="primary"
              aria-label="add"
              onClick={() => handleVote('downvote')}
            >
              <ThumbDown sx={{ mr: 1 }} />
              {downvotes}
            </Fab>
          </Box>
        </Stack>
      </>
    );
  }
  return <div> {'Video is Loading'} </div>;
};

export default VideoPlayer;
