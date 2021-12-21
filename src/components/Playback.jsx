import React, { useState, useEffect } from 'react';
import { Stack, Item, Typography, Fab } from '@mui/material';
import { ThumbUpIcon, ThumbDownIcon } from '@mui/icons-material';
import { formatDistanceToNow } from 'date-fns';

import { config } from '../App';

const Playback = ({ video }) => {
  let { title, votes, videoLink, contentRating, releaseDate, _id } = video;

  const [upvotes, setUpvotes] = useState(votes.upvotes);
  const [downvotes, setDownvotes] = useState(votes.downvotes);

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
    updateViewCount(_id);
  }, []);

  const handleClick = (event) => {
    console.log(event.target.value);
  };

  const handleVote = (event) => {
    let data;
    if (event.currentTarget === 'upvote') {
      data = {
        vote: 'upVote',
        change: 'increase',
      };
    } else if (event.currentTarget === 'downvote') {
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
          if (event.currentTarget === 'upvote') {
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

    updateVote(_id);
  };

  return (
    <Stack direction="column" alignItems="center">
      <Item>
        <iframe src={videoLink} />
      </Item>
      <Item>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Item>
            {/* For video Title and avatar  */}
            <Typography>{title}</Typography>
            {/* Below it is video rating & days past  */}
            <Typography variant="body2" align="left" color="text.secondary">
              {`${contentRating} • ${formatDistanceToNow(
                new Date(releaseDate)
              )} ago`}
            </Typography>
          </Item>
          <Item>
            {/* Content for Like  */}
            <Fab
              variant="extended"
              size="medium"
              color="primary"
              aria-label="add"
              onClick={handleClick}
            >
              <ThumbUpIcon sx={{ mr: 1 }} />
              {upvotes}
            </Fab>
            {/* Content for dislike */}
            <Fab
              variant="extended"
              size="medium"
              color="primary"
              aria-label="add"
              onClick={handleClick}
            >
              <ThumbDownIcon sx={{ mr: 1 }} />
              {downvotes};
            </Fab>
          </Item>
        </Stack>
      </Item>
    </Stack>
  );
};

export default Playback;
