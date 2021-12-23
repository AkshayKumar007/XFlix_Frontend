import React from 'react';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
  Avatar,
} from '@mui/material';
import { useHistory } from 'react-router';
import { formatDistanceToNow } from 'date-fns';

function stringToColor(string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }
  return color;
}

function stringAvatar(name) {
  console.log(name);
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[1][0]}`,
  };
}

const PreviewCard = ({ id, previewImage, title, releaseDate }) => {
  const history = useHistory();

  const handleClick = () => {
    history.push(`/video/${id}`);
  };

  return (
    <Card elevation={0} onClick={handleClick}> 
    {/* sx={{ mr: 2, my: 2 }} */}
      <CardMedia
        align="left"
        component="img"
        image={previewImage}
        alt={title}
      />
      <CardHeader
        align="left"
        avatar={<Avatar {...stringAvatar(title)} />}
        titleTypographyProps={{ variant: 'subtitle1', fontWeight: 'bold', noWrap: true }}
        subheader={`${formatDistanceToNow(new Date(releaseDate))} ago`}
        title={title}
      />
    </Card>
  );
};

export default PreviewCard;

{
  /* <Typography gutterBottom variant="subtitle1" sx={{ fontWeight: 'bold' }}>
{title}
</Typography> */
}

{
  /* align="left" 
                component="div"
                noWrap={true}
                */
}
