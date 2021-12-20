import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormControl,
  FormHelperText,
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material';
import AdapterDateFns from '@date-io/date-fns';
import { DesktopDatePicker, LocalizationProvider } from '@mui/lab';

const UploadForm = ({ visibility, setVisibility }) => {
  const [value, setValue] = React.useState(new Date());

  // this and similar methods to handle change in input
  const handleChange = (newValue) => {
    setValue(newValue);
  };

  // method to toggle visibility of form
  const handleClickSubmit = () => {};

  // method to submit the form
  const handleClose = () => {
    setVisibility(false);
  };

  return (
    <Dialog
      components="form"
      autoComplete="off"
      open={visibility}
      onClose={handleClose}
    >
      <form noValidate autoComplete="off">
        <DialogTitle>Upload Video</DialogTitle>
        <DialogContent>
          <TextField
            sx={{ mt: 2 }}
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            helperText="Some important text"
          />
          <TextField
            sx={{ mt: 2.5 }}
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            helperText="Some important text"
          />
          <TextField
            sx={{ mt: 2.5 }}
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            helperText="Some important text"
          />
          <FormControl fullWidth sx={{ mt: 2.5 }}>
            <InputLabel id="demo-simple-select-helper-label">Age</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={value}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
            <FormHelperText>With label + helper text</FormHelperText>
          </FormControl>
          <FormControl fullWidth sx={{ mt: 2.5 }}>
            <InputLabel id="demo-simple-select-helper-label">Age</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={value}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
            <FormHelperText>With label + helper text</FormHelperText>
          </FormControl>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label="Suitable age group for the clip"
              inputFormat="MM/dd/yyyy"
              value={value}
              onChange={handleChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  sx={{ mt: 2.5 }}
                  helperText="This will be used to filter videos on age group suitability"
                />
              )}
            />
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClickSubmit}>Subscribe</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default UploadForm;

{
  /* <DialogContentText>
To subscribe to this website, please enter your email address here. We
will send updates occasionally.
</DialogContentText> */
}
