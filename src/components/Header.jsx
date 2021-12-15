import React from 'react';
import { Link } from 'react-router-dom';
import Search from './Search';
import { useContext } from 'react';
import headerOptionsContext from '../utilities/HeaderOptionsContext';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { AppBar, CssBaseline, Toolbar, Box, Button} from '@mui/material';

const Header = () => {
	const [headerOptions, setHeaderOptions] = useContext(headerOptionsContext);
	console.log(setHeaderOptions);

	const handleSearch = (event) => {
		console.log(event);
	}

  return (
    <div className="header">
      {	headerOptions ? 
				<AppBar position="static">
					<Toolbar>
						<CssBaseline>
							{/* Xflix icon */}
							<Link to="/">
								<Box sx ={{ height: 30,}} component="img" alt="XFlix" src="/XFlix-logo.png" />
							</Link>

							{/* Search icon */}
							<Search handleSearch={handleSearch} />

							{/* Upload Button */}

							<Button variant="contained" endIcon={<FileUploadIcon />}>
								Upload
							</Button>
						</CssBaseline>
					</Toolbar>
				</AppBar>
				:
				<AppBar position="static">
					<Toolbar>
						<CssBaseline>
							{/* Xflix icon */}
							<Link to="/">
								<Box component="img" alt="XFlix" src="/XFlix-logo.png" />
							</Link>
						</CssBaseline>
					</Toolbar>
				</AppBar>
			}
    </div>
  );
}

export default Header;
