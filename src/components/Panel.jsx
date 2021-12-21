import React from 'react';
import { useState, useEffect, useContext } from 'react';
import {
  Chip,
  Stack,
  Select,
  MenuItem,
  Button,
  Container,
} from '@mui/material';
import SwapVertIcon from '@mui/icons-material/SwapVert';

import VideoContext from '../utils/VideoContext';

// Helper methods

const viewSort = (a, b) => {
  if (a.viewCount < b.viewCount) return 1;
  else if (a.viewCount > b.viewCount) return -1;
  return 0;
};

const dateSort = (a, b) => {
  let d1 = new Date(a.releaseDate);
  let d2 = new Date(b.releaseDate);

  if (d1 < d2) return 1;
  else if (d1 > d2) return -1;
  return 0;
};

const getFilters = (group) => {
  let filters = group.reduce((arr, item) => {
    return item.color === 'primary' ? [...arr, item.label] : arr;
  }, []);
  return filters;
};

const updateVideoList = (videos, genreFilter, ageFilter) => {
  let newVideoList = [];
  if (genreFilter[0] === 'All Genre') {
    newVideoList = videos.map((item) => {
      return JSON.parse(JSON.stringify(item));
    });
  } else {
    newVideoList = videos.filter((item) => {
      if (genreFilter.includes(item.genre))
        return JSON.parse(JSON.stringify(item));
    });
  }

  if (ageFilter[0] === 'Any age group') {
    newVideoList = newVideoList.map((item) => {
      return JSON.parse(JSON.stringify(item));
    });
  } else {
    newVideoList = newVideoList.filter((item) => {
      if (ageFilter.includes(item.contentRating))
        return JSON.parse(JSON.stringify(item));
    });
  }

  return newVideoList;
};

// Component

const Panel = ({ allVideos }) => {
  const criteria = [
    { label: 'Release Date', key: 0 },
    { label: 'View Count', key: 1 },
  ];

  const [localVideos, setLocalVideos] = useContext(VideoContext);

  // useEffect(() => {
  //   setVideos(allVideos);
  // }, [allVideos]);

  const [open, setOpen] = useState(false);
  const [sortOption, setSortOption] = useState(criteria[0].label);

  const [ageGroup, setAgeGroup] = useState([
    { label: 'Any age group', color: 'primary', key: 0 },
    { label: '7+', color: 'success', key: 1 },
    { label: '12+', color: 'success', key: 2 },
    { label: '16+', color: 'success', key: 3 },
    { label: '18+', color: 'success', key: 4 },
  ]);

  const [genreGroup, setGenreGroup] = useState([
    { label: 'All Genre', color: 'primary', key: 0 },
    { label: 'Education', color: 'success', key: 1 },
    { label: 'Sports', color: 'success', key: 2 },
    { label: 'Comedy', color: 'success', key: 3 },
    { label: 'Lifestyle', color: 'success', key: 4 },
    { label: 'Movies', color: 'success', key: 5 },
  ]);

  const handleFilterClick = (group, label) => {
    let newList = [];
    if (group === genreGroup && label === 'All Genre') {
      newList = group.map((item) => {
        if (item.label !== 'All Genre') {
          return Object.assign({}, item, { color: 'success' });
        } else {
          return Object.assign({}, item, { color: 'primary' });
        }
      });
    } else if (group === ageGroup && label === 'Any age group') {
      newList = group.map((item) => {
        if (item.label !== 'Any age group') {
          return Object.assign({}, item, { color: 'success' });
        } else {
          return Object.assign({}, item, { color: 'primary' });
        }
      });
    } else {
      newList = group.map((item) => {
        if (item.label === 'All Genre' || item.label === 'Any age group') {
          return Object.assign({}, item, { color: 'success' });
        } else if (item.label === label) {
          return Object.assign({}, item, { color: 'primary' });
        } else if(group === ageGroup && item.label !== label ) {
          return Object.assign({}, item, { color: 'success' });
        } else {
          return Object.assign({}, item);
        }
      });
    }
    if (group === genreGroup) {
      setGenreGroup(newList);
    }
    if (group === ageGroup) {
      setAgeGroup(newList);
    }
  };

  useEffect(() => {
    let genreFilter = getFilters(genreGroup);
    let ageFilter = getFilters(ageGroup);

    let newVideoList = updateVideoList(allVideos, genreFilter, ageFilter);
    setLocalVideos(newVideoList);
  }, [genreGroup, ageGroup]);

  const handleSortChange = (event) => {
    let sortedList = [];
    if (event.target.value === 'Release Date') {
      sortedList = [...localVideos].sort(dateSort);
    } else {
      sortedList = [...localVideos].sort(viewSort);
    }
    setLocalVideos(sortedList);
    setSortOption(event.target.value);
  };

  return (
    <Container sx={{my: 2}} spacing={2}>
      <Stack spacing={2}>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          alignItems="center"
        >
          {genreGroup.map(({ label, key, color }) => (
            <Chip
              key={key}
              color={color}
              label={label}
              onClick={() => handleFilterClick(genreGroup, label)}
            />
          ))}
          {/* show modal and check for which one is selected */}

          <Button  // replace it with Floating Action Button aka Fab
            onClick={() => {
              setOpen(!open);
            }}
          >
            <Select
              sx={{ borderRadius: '100px' }}
              size={'small'}
              onClick={() => setOpen(!open)}
              value={sortOption}
              open={open}
              onChange={handleSortChange}
              IconComponent={() => <SwapVertIcon />}
            >
              <MenuItem value={criteria[0].label}>{criteria[0].label}</MenuItem>
              <MenuItem value={criteria[1].label}>{criteria[1].label}</MenuItem>
            </Select>
          </Button>
        </Stack>

        <Stack
          spacing={2}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          {ageGroup.map(({ label, key, color }) => (
            <Chip
              key={key}
              label={label}
              color={color}
              onClick={() => handleFilterClick(ageGroup, label)}
            />
          ))}
        </Stack>
      </Stack>
    </Container>
  );
};

export default Panel;