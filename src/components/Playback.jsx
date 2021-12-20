import React from 'react';
import { Stack, Item } from '@mui/material';

const Playback = ({ url, title, rating, views, age, time }) => {
  return (
    <Stack direction="column" alignItems="center">
      <Item>
        <iframe src={url} />
      </Item>
      <Item>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Item>
            {/* For video Title and avatar  */}
            {/* Below it is video rating & days past  */}
          </Item>
          <Item>
            {/* Content for Like/dislike  */}
          </Item>
        </Stack>
      </Item>
    </Stack>
  );
};

export default Playback;
