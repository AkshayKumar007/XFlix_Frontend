import React from 'react';
import { Card, CardActionArea, CardMedia, CardContent } from '@mui/material';
import { Typography } from '@mui/material';
import { formatDistanceToNow } from 'date-fns';

const PreviewCard = ({ previewImage, title, releaseDate }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="153"
          image={previewImage}
          alt={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`${formatDistanceToNow(new Date(releaseDate))} ago`}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default PreviewCard;
