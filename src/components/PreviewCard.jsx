import React from 'react';
import { Card, CardActionArea, CardMedia, CardContent } from '@mui/material';
import { Typography } from '@mui/material';
import { formatDistanceToNow } from 'date-fns';

const PreviewCard = ({ previewImage, title, releaseDate }) => {
  return (
    <Card sx={{ maxWidth: 414 }} elevation={0}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="230"
          image={previewImage}
          alt={title}
        />
        <CardContent>
          <Typography gutterBottom variant="subtitle1" noWrap={true} align="left" component="div">
            {title}
          </Typography>
          <Typography variant="body2" align="left" color="text.secondary">
            {`${formatDistanceToNow(new Date(releaseDate))} ago`}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default PreviewCard;