import React from 'react';
import { useState } from 'react';
import { Chip, Stack, Select, MenuItem, Button, Container} from '@mui/material'; //
import SwapVertIcon from '@mui/icons-material/SwapVert';
// import { config } from "../App";

const Panel = () => {

	const criteria = [
		{label: 'Release Date', key: 0},
		{label: 'View Count', key: 1},
	];

	const [open, setOpen] = useState(false);
	const [sortOption, setSortOption] = useState(criteria[0].label); 

	const [ageGroup, setAgeGroup] = useState([
		{label: 'Any age group', color: 'success', key: 0},
		{label: '7+', color: 'success', key: 1},
		{label: '12+', color: 'success', key: 2},
		{label: '16+', color: 'success', key: 3},
		{label: '18+', color: 'success', key: 4}
	]);
	
	const [genreGroup, setGenreGroup] = useState([
		{label: 'All Genre', color: 'success', key: 0},
		{label: 'Education', color: 'success', key: 1},
		{label: 'Sports', color: 'success', key: 2},
		{label: 'Comedy', color: 'success', key: 3},
		{label: 'Lifestyle', color: 'success', key: 4}
	]);

	const handleFilterClick = (group, label) => {
		let newList = group.map((item) => {
			if(label === item.label) {
				let newColor = item.color === 'primary'? 'success' : 'primary';
				return Object.assign({}, item, {color: newColor});
			} else {
				return Object.assign({}, item);
			}
		});
		if(group === genreGroup) {
			setGenreGroup(newList);
		}
		if(group === ageGroup) {
			setAgeGroup(newList);
		}
	};

	const handleChange = (event) => {
		// make API call here for sorting
		setSortOption(event.target.value);
  };

	return (
		<Container spacing={2}>
			<Stack spacing={2}>
				<Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
					{
						genreGroup.map(({label, key, color}) => 
							<Chip  key={key} color={color} label={label} onClick={() => handleFilterClick(genreGroup, label)} />
						)
					}
					{/* show modal and check for which one is selected */}
					{/* Test */}
					<Button onClick={() => { setOpen(!open); }} >
						<Select
							sx={{"borderRadius": "100px"}}
							size={"small"}
							onClick={() => setOpen(!open)}
							value={sortOption}
							open={open}
							onChange={handleChange}
							IconComponent={() => (
								<SwapVertIcon />
							)}
						>
							<MenuItem value={criteria[0].label}>
								{criteria[0].label}
							</MenuItem>
							<MenuItem value={criteria[1].label}>
								{criteria[1].label}
							</MenuItem>
						</Select>
					</Button>
				</Stack>

				<Stack spacing={2} direction="row" justifyContent="center" alignItems="center"> 
				{
					ageGroup.map(({label, key, color}) => 
						<Chip  key={key} label={label} color={color} onClick={() => handleFilterClick(ageGroup, label)} />
					)
				}
				</Stack>
				
			</Stack>
		</Container>
	);

}

export default Panel;

	// const handleGenreClick = (genre) => {
	// 	let newList = genreGroup.map((item) => {
	// 		if(genre === item.label) {
	// 			let newColor = item.color === 'primary'? 'success' : 'primary';
	// 			return Object.assign({}, ...item, {color: newColor});
	// 		} else {
	// 			return Object.assign({}, ...item);
	// 		}
	// 	});
	// 	setGenreGroup(newList);
	// };

	// const handleAgeClick = (age) => {
	// 	let newList = ageGroup.map((item) => {
	// 		if(age === item.label) {
	// 			let newColor = item.color === 'primary'? 'success' : 'primary';
	// 			return Object.assign({}, ...item, {color: newColor});
	// 		} else {
	// 			return Object.assign({}, ...item);
	// 		}
	// 	});
	// 	setAgeGroup(newList);
	// };

	// <Chip label={sortOption} onClick={() => { setOpen(!open); }} > {/* sortOption */}
	// 					<Select
	// 						onClick={() => setOpen(!open)}
	// 						value={sortOption}
	// 						onChange={handleChange}
	// 						open={open}
	// 					>
	// 						{/* {criteria.map((option, index) => {
	// 							return (
	// 								<MenuItem key={index} value={option.label}>
	// 									{option.label}
	// 								</MenuItem>
	// 							);
	// 						})} */}
	// 						<MenuItem value={criteria[0].label}>
	// 							{criteria[0].label}
	// 						</MenuItem>
	// 						<MenuItem value={criteria[1].label}>
	// 							{criteria[1].label}
	// 						</MenuItem>
	// 					</Select>
	// 				</Chip>