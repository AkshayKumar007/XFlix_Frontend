import React, { useState, useEffect } from 'react';
import { Skeleton, Grid, Typography, Fab, Box } from '@mui/material';
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
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{ pt: 2 }}
          // sx={{ pr: 22 }}  pl: 20, my: 2,
          columns={{ xs: 12, sm: 12, md: 12, lg: 12 }}
        >
          <Grid item xs={10} sx={{ height: 700, aspectRatio: 16 / 9 }}>
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
        <Grid sx={{ py: 4 }} container justifyContent="space-between">
          <Grid item xs={1} sm={1} md={1} lg={1}>
            <Box sx={{ flexGrow: 1 }} />
          </Grid>
          <Grid item xs={6} sm={8} md={8} lg={8}>
            <Typography
              variant="h5"
              noWrap
              align="left"
              sx={{ fontWeight: 'bold' }}
            >
              {'Consumed by the Apocalypse'}
            </Typography>
            <Typography
              sx={{ pt: 1 }}
              variant="body2"
              align="left"
              color="text.secondary"
            >
              {`12+ • 18 Jan 2021`}
            </Typography>
          </Grid>
          <Grid item xs={4} sm={2} md={1} lg={2}>
            <Fab
              variant="extended"
              size="medium"
              color="primary"
              aria-label="add"
              value="upVote"
              sx={{ mr: 1 }}
            >
              <ThumbUp sx={{ mr: 1 }} />
              {0}
            </Fab>
            <Fab
              variant="extended"
              size="medium"
              color="primary"
              aria-label="add"
            >
              <ThumbDown sx={{ mr: 1 }} />
              {1}
            </Fab>
          </Grid>
          <Grid item xs={1} sm={1} md={1} lg={0.5}>
            <Box sx={{ flexGrow: 1 }} />
          </Grid>
        </Grid>
      </Box>
    );
  }
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={{ pt: 2 }}
      columns={{ xs: 12, sm: 12, md: 12, lg: 12 }}
    >
      <Grid item xs={12} sx={{ height: 700, aspectRatio: 16 / 9 }}>
        <Skeleton height="90%" variant="rectangular" />
        <Box sx={{ pt: 0.5 }}>
          <Skeleton />
          <Skeleton width="60%" />
        </Box>
      </Grid>
    </Grid>
  );
};

export default VideoPlayer;

{
  /* <Grid item xs={4}>
<Fab
  variant="extended"
  size="medium"
  color="primary"
  aria-label="add"
  value="upVote"
  onClick={() => handleVote('upvote')}
>
  <ThumbUp sx={{ mr: 1 }} />
  {upvotes}
</Fab>
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
</Grid> */
}
