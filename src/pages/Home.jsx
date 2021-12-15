import React from 'react';
import { useContext } from 'react';
import headerOptionsContext from '../utilities/HeaderOptionsContext';

const Home = () => {
	const [headerOptions, setHeaderOptions] = useContext(headerOptionsContext);
	setHeaderOptions(true);
	console.log(headerOptions);
	
	return (
		<p>
			Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores in dolorum dicta magni magnam sapiente laborum nam debitis.
		</p>
	);
}

export default Home;