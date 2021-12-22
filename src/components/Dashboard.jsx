import React, { useContext } from 'react';
import { Box, Grid } from '@mui/material';

import VideoContext from '../utils/VideoContext';
import PreviewCard from './PreviewCard';

const Dashboard = () => {
  const [localVideos, setLocalVideos] = useContext(VideoContext);
  console.log('local Videos', localVideos);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        sx={{ px: 20, my: 2 }}
        columns={{ xs: 12, sm: 12, md: 12, lg: 12 }}
      >
        {localVideos.map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item._id}>
            <PreviewCard
              id={item._id}
              previewImage={item.previewImage}
              releaseDate={item.releaseDate}
              title={item.title}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard;
