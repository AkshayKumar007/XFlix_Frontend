import React, { useContext } from 'react';
import { Box, Grid, Typography } from '@mui/material';

import VideoContext from '../utils/VideoContext';
import PreviewCard from './PreviewCard';

const Dashboard = () => {
  const [localVideos, setLocalVideos] = useContext(VideoContext);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ pt: 4 }}
        rowSpacing={{ xs: 1, sm: 2, md: 5 }}
        columnSpacing={{ xs: 1, sm: 2, md: 2 }}
        columns={{ xs: 12, sm: 12, md: 12, lg: 12 }}
      >
        {/* sx={{ px: 20, my: 2 }} */}
        {localVideos.length !== 0 ? (
          localVideos.map((item) => (
            <Grid item xs={11} sm={5} md={5} lg={2.5} key={item._id}>
              <PreviewCard
                id={item._id}
                previewImage={item.previewImage}
                releaseDate={
                  item.releaseDate ? item.releaseDate : item.uploadDate
                }
                title={item.title}
              />
            </Grid>
          ))
        ) : (
          <Grid item xs={11} sm={5} md={5} lg={2.5}>
            <Typography variant="h2">No videos found</Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default Dashboard;
