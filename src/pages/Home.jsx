import React from 'react';
import { useContext } from 'react';

import Panel from '../components/Panel';
import headerOptionsContext from '../utils/HeaderOptionsContext';
import Dashboard from '../components/Dashboard';

const Home = () => {
	const [headerOptions, setHeaderOptions] = useContext(headerOptionsContext);
	setHeaderOptions(true);
	console.log(headerOptions);
	
	return (
		<>
			<Panel />
			<Dashboard></Dashboard>
		</>
	);
}

export default Home;