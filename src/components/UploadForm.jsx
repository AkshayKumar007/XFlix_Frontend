import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  FormControl,
  FormHelperText,
  Select,
  MenuItem,
  InputLabel,
  Grid,
  Snackbar,
  IconButton,
  Alert,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AdapterDateFns from '@date-io/date-fns';
import { DesktopDatePicker, LocalizationProvider } from '@mui/lab';

import { config } from '../App';

const uploadVideo = async (data) => {
  try {
    const response = await fetch(`${config.endpoint}/v1/videos`, {
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const jsonResponse = await response.json();
    if (response.status !== 201) {
      throw new Error(jsonResponse);
    }
  } catch (error) {
    console.log(`Error in video upload: ${error.message}`);
    return false;
  }
  return true;
};

const UploadForm = ({ visibility, setVisibility }) => {
  const ageOptions = [
    { label: '7+', key: 1 },
    { label: '12+', key: 2 },
    { label: '16+', key: 3 },
    { label: '18+', key: 4 },
  ];

  const genreOptions = [
    { label: 'Education', key: 1 },
    { label: 'Sports', key: 2 },
    { label: 'Comedy', key: 3 },
    { label: 'Lifestyle', key: 4 },
    { label: 'Movies', key: 5 },
  ];

  const [open, setOpen] = useState(false);
  const [alertMessage, setAlert] = useState({
    type: 'success',
    message: 'Video Uploaded Successfully',
  });

  const handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleCloseSnack}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  const [dateValue, setDateValue] = useState(new Date());
  const [genre, setGenre] = useState('');
  const [contentRating, setContentRating] = useState('');
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [thumbnail, setThumbnail] = useState('');

  // method to toggle visibility of form
  const handleClickSubmit = () => {
    const data = {
      videoLink: link,
      title: title,
      genre: genre,
      contentRating: contentRating,
      releaseDate: dateValue,
      previewImage: thumbnail,
    };
    const result = uploadVideo(data);
    if (result === true) {
      setAlert({
        type: 'success',
        message: 'Video Uploaded Successfully',
      });
    } else {
      setAlert({
        type: 'error',
        message: 'Video Upload Failed!',
      });
    }
    setOpen(true);
  };

  // method to submit the form
  const handleClose = () => {
    setVisibility(false);
  };

  return (
    <>
      <Dialog
        components="form"
        autoComplete="off"
        open={visibility}
        onClose={handleClose}
      >
        <form noValidate autoComplete="off">
          <DialogTitle>Upload Video</DialogTitle>
          <DialogContent>
            {/* Video Link */}
            <TextField
              sx={{ mt: 1 }}
              id="video-link"
              label="Video Link"
              type="url"
              fullWidth
              helperText="This link will be used to derive the  video"
              onChange={(e) => {
                setLink(e.target.value);
              }}
            />

            {/* Thumbnail */}
            <TextField
              sx={{ mt: 2.5 }}
              id="thumbnail"
              label="Thumbnail Image Link"
              type="url"
              fullWidth
              helperText="This link will be used to preview the thumbnail image"
              onChange={(e) => {
                setThumbnail(e.target.value);
              }}
            />

            {/* Title */}
            <TextField
              sx={{ mt: 2.5 }}
              id="title"
              label="Title"
              type="text"
              fullWidth
              helperText="The title will be the representative text for video"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />

            {/* Genre */}
            <FormControl sx={{ mt: 2.5 }} fullWidth>
              <InputLabel id="demo-simple-select-helper-label">
                Genre
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={genre}
                label="Age"
                onChange={(event) => {
                  console.log(event.target.value);
                  setGenre(event.target.value);
                }}
              >
                {genreOptions.map((option) => {
                  return (
                    <MenuItem value={option.label} key={option.label}>
                      {option.label}
                    </MenuItem>
                  );
                })}
              </Select>
              <FormHelperText>
                Genre will help in categorizing your videos
              </FormHelperText>
            </FormControl>

            {/* Content Rating */}
            <FormControl sx={{ mt: 2.5 }} fullWidth>
              <InputLabel id="demo-simple-select-helper-label">
                Content Rating
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={contentRating}
                label="Genre"
                onChange={(event) => {
                  console.log(event.target.value);
                  setContentRating(event.target.value);
                }}
              >
                {ageOptions.map((option) => {
                  return (
                    <MenuItem value={option.label} key={option.label}>
                      {option.label}{' '}
                    </MenuItem>
                  );
                })}
              </Select>
              <FormHelperText>
                This will be used to filter videos on age group suitability
              </FormHelperText>
            </FormControl>

            {/* Date picker */}
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="Release Date"
                inputFormat="MM/dd/yyyy"
                value={dateValue}
                onChange={(newValue) => {
                  setDateValue(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    sx={{ mt: 2.5 }}
                    helperText="This will be used to sort videos"
                  />
                )}
              />
            </LocalizationProvider>
          </DialogContent>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            sx={{ pl: 3, pb: 3 }}
          >
            <Button
              color="error"
              variant="contained"
              onClick={handleClickSubmit}
            >
              Upload Video
            </Button>
            <Button sx={{ pl: 3 }} onClick={handleClose}>
              Cancel
            </Button>
          </Grid>
        </form>
      </Dialog>
      {/* Snack bar */}
      <div>
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={handleCloseSnack}
          message="Note archived"
          action={action}
        >
          <Alert
            onClose={handleClose}
            severity={alertMessage.type}
            sx={{ width: '100%' }}
          >
            {alertMessage.message}
          </Alert>
        </Snackbar>
      </div>
    </>
  );
};

export default UploadForm;

{
  /* <DialogContentText>
To subscribe to this website, please enter your email address here. We
will send updates occasionally.
</DialogContentText> */
}

{
  /* <DialogActions>
<Button onClick={handleClose}>Cancel</Button>
<Button onClick={handleClickSubmit}>Subscribe</Button>
</DialogActions> */
}
