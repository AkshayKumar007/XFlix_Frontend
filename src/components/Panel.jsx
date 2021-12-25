import React, { useState, useEffect, useContext } from 'react';
import { Chip, MenuItem, Menu, Grid, Fab } from '@mui/material';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import { styled } from '@mui/material/styles';

import VideoContext from '../utils/VideoContext';
import SearchContext from '../utils/SearchContext';
import { config } from '../App';

// Helper methods

const MyGrid = styled(Grid)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
}));

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

// {
//   title: searchTerm,
//   genres:  genreFilter,
//   contentRating: ageFilter
// }
const createQueryString = (params) => {
  let query = '';
  for (let key in params) {
    if (key === 'title') {
      if (
        params[key] !== '' &&
        params[key] !== null &&
        params[key] !== undefined
      ) {
        query += `title=${params[key]}`;
      }
    } else if (key === 'genres') {
      if (params[key][0] === 'All Genre') continue;
      if (query !== '') {
        query += '&';
      }
      query += `${key}=${params[key].join(',')}`;
    } else if (key === 'contentRating') {
      if (params[key][0] === 'Any age group') continue;
      if (query !== '') {
        query += '&';
      }
      query += `${key}=${encodeURIComponent(params[key])}`;
    }
  }
  return query;
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
  const [searchTerm, setSearchTerm] = useContext(SearchContext);

  // useEffect(() => {
  //   setVideos(allVideos);
  // }, [allVideos]);

  const [open, setOpen] = useState(false);
  const [sortOption, setSortOption] = useState(criteria[0].label);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const [ageGroup, setAgeGroup] = useState([
    { label: 'Any age group', color: 'primary', key: 0 },
    { label: '7+', color: 'secondary', key: 1 },
    { label: '12+', color: 'secondary', key: 2 },
    { label: '16+', color: 'secondary', key: 3 },
    { label: '18+', color: 'secondary', key: 4 },
  ]);

  const [genreGroup, setGenreGroup] = useState([
    { label: 'All Genre', color: 'primary', key: 0 },
    { label: 'Education', color: 'secondary', key: 1 },
    { label: 'Sports', color: 'secondary', key: 2 },
    { label: 'Comedy', color: 'secondary', key: 3 },
    { label: 'Lifestyle', color: 'secondary', key: 4 },
    { label: 'Movies', color: 'secondary', key: 5 },
  ]);

  const handleFilterClick = (group, label) => {
    let newList = [];
    if (group === genreGroup && label === 'All Genre') {
      newList = group.map((item) => {
        if (item.label !== 'All Genre') {
          return Object.assign({}, item, { color: 'secondary' });
        } else {
          return Object.assign({}, item, { color: 'primary' });
        }
      });
    } else if (group === ageGroup && label === 'Any age group') {
      newList = group.map((item) => {
        if (item.label !== 'Any age group') {
          return Object.assign({}, item, { color: 'secondary' });
        } else {
          return Object.assign({}, item, { color: 'primary' });
        }
      });
    } else {
      newList = group.map((item) => {
        if (item.label === 'All Genre' || item.label === 'Any age group') {
          return Object.assign({}, item, { color: 'secondary' });
        } else if (item.label === label) {
          return Object.assign({}, item, { color: 'primary' });
        } else if (group === ageGroup && item.label !== label) {
          return Object.assign({}, item, { color: 'secondary' });
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

  // useEffect(() => {
  //   let genreFilter = getFilters(genreGroup);
  //   let ageFilter = getFilters(ageGroup);

  //   let newVideoList = updateVideoList(allVideos, genreFilter, ageFilter);
  //   setLocalVideos(newVideoList);
  // }, [genreGroup, ageGroup]);

  const handleSortChange = (event) => {
    setAgeGroup([
      { label: 'Any age group', color: 'primary', key: 0 },
      { label: '7+', color: 'secondary', key: 1 },
      { label: '12+', color: 'secondary', key: 2 },
      { label: '16+', color: 'secondary', key: 3 },
      { label: '18+', color: 'secondary', key: 4 },
    ]);

    setGenreGroup([
      { label: 'All Genre', color: 'primary', key: 0 },
      { label: 'Education', color: 'secondary', key: 1 },
      { label: 'Sports', color: 'secondary', key: 2 },
      { label: 'Comedy', color: 'secondary', key: 3 },
      { label: 'Lifestyle', color: 'secondary', key: 4 },
      { label: 'Movies', color: 'secondary', key: 5 },
    ]);

    setSearchTerm('');

    const getSortedData = async (query) => {
      try {
        let response = await fetch(`${config.endpoint}/v1/videos?${query}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        let jsonResponse = await response.json();
        if (!response.ok) {
          throw new Error(jsonResponse);
        }
        setLocalVideos(jsonResponse.videos);
      } catch (e) {
        console.log(`Error in Sort ${e.message}`);
        setLocalVideos(allVideos);
      }
    };

    if (event === 'Release Date') {
      getSortedData(`sortBy=releaseDate`);
    } else if (event === 'View Count') {
      getSortedData(`sortBy=viewCount`);
    }
  };

  useEffect(() => {
    const getData = async (query) => {
      try {
        let response = await fetch(`${config.endpoint}/v1/videos?${query}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        let jsonResponse = await response.json();
        if (!response.ok) {
          throw new Error(jsonResponse);
        }
        setLocalVideos(jsonResponse.videos);
      } catch (e) {
        console.log(`Error in Search and Filter ${e.message}`);
        setLocalVideos(allVideos);
      }
    };

    let genreFilter = getFilters(genreGroup);
    let ageFilter = getFilters(ageGroup);

    let query = createQueryString({
      title: searchTerm,
      genres: genreFilter,
      contentRating: ageFilter,
    });

    getData(query);
  }, [genreGroup, ageGroup, searchTerm]);

  return (
    // <MyContainer sx={{ my: 25,  }} spacing={2}>
    <MyGrid
      container
      justifyContent="center"
      direction="column"
      sx={{ paddingTop: 2, paddingBottom: 4 }}
    >
      <Grid item>
        <Grid
          container
          spacing={2}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          {genreGroup.map(({ label, key, color }) => (
            <Grid item key={key}>
              <Chip
                color={color}
                label={label}
                onClick={() => handleFilterClick(genreGroup, label)}
              />
            </Grid>
          ))}
          {/* show Dialog and check for which one is selected */}
          <Grid item>
            <Fab
              variant="extended"
              size="medium"
              color="primary"
              sx={{ boxShadow: 0 }}
              onClick={(event) => {
                setAnchorEl(event.currentTarget);
                setOpen(!open);
              }}
            >
              <SwapVertIcon sx={{ mr: 1 }} />
              {sortOption}
            </Fab>
            <Menu
              sx={{ borderRadius: '100px' }}
              size={'small'}
              onClick={() => setOpen(!open)}
              anchorEl={anchorEl}
              value={sortOption}
              open={open}
              onChange={handleSortChange}
            >
              <MenuItem
                onClick={() => handleSortChange(criteria[0].label)}
                value={criteria[0].label}
              >
                {criteria[0].label}
              </MenuItem>
              <MenuItem
                onClick={() => handleSortChange(criteria[1].label)}
                value={criteria[1].label}
              >
                {criteria[1].label}
              </MenuItem>
            </Menu>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid
          container
          sx={{ mt: 1 }}
          spacing={2}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          {ageGroup.map(({ label, key, color }) => (
            <Grid item key={key}>
              <Chip
                label={label}
                color={color}
                onClick={() => handleFilterClick(ageGroup, label)}
              />{' '}
            </Grid>
          ))}
        </Grid>
      </Grid>
    </MyGrid>
    // </MyContainer>
  );
};

export default Panel;

// const MyContainer = styled(Container)(({ theme }) => ({
//   backgroundColor: theme.palette.secondary.main,
// }));
