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
import { DesktopDatePicker } from '@mui/lab';

const UploadForm = () => {
  const [value, setValue] = React.useState(new Date());


  // this and similar methods to handle change in input  
  const handleChange = (newValue) => {
    setValue(newValue);
  };

  // method to toggle visibility of form
  const handleClickOpen = () => {};

  // method to submit the form
  const handleClose = () => {};

  return (
    <div>
      <Dialog
        components="form"
        oValidate
        autoComplete="off"
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Upload Video</DialogTitle>
        <DialogContent>
          <TextField
            id="name"
            label="Email Address"
            type="email"
            defaultValue="Default Value"
            helperText="Some important text"
          />
          <TextField
            id="name"
            label="Email Address"
            type="email"
            defaultValue="Default Value"
            helperText="Some important text"
          />
          <TextField
            id="name"
            label="Email Address"
            type="email"
            defaultValue="Default Value"
            helperText="Some important text"
          />
          <FormControl sx={{ m: 1, minWidth: 120 }}>
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
          <FormControl sx={{ m: 1, minWidth: 120 }}>
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
          <DesktopDatePicker
            label="Suitable age group for the clip"
            inputFormat="MM/dd/yyyy"
            value={value}
            onChange={handleChange}
            renderInput={(params) => (
              <TextField
                {...params}
                helperText="This will be used to filter videos on age group suitability"
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UploadForm;

{
  /* <DialogContentText>
To subscribe to this website, please enter your email address here. We
will send updates occasionally.
</DialogContentText> */
}
