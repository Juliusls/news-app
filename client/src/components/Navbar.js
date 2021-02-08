import React from 'react'
import { Toolbar, Button, AppBar } from '@material-ui/core'

const Navbar = () => {
	return (
		<AppBar position="static">
			<Toolbar>
				<Button variant="contained" color="primary">Latest</Button>
				<Button variant="contained" color="primary">Business</Button>
				<Button variant="contained" color="primary">Cars</Button>
				<Button variant="contained" color="primary">Entertainment</Button>
				<Button variant="contained" color="primary">Family</Button>
				<Button variant="contained" color="primary">Health</Button>
				<Button variant="contained" color="primary">Politics</Button>
				<Button variant="contained" color="primary">Religion</Button>
				<Button variant="contained" color="primary">Science</Button>
				<Button variant="contained" color="primary">Sports</Button>
				<Button variant="contained" color="primary">Technology</Button>
				<Button variant="contained" color="primary">Travel</Button>
				<Button variant="contained" color="primary">World</Button>
				<Button variant="contained" color="primary">My Favorites</Button>
				<Button variant="contained" color="primary">Business</Button>
			</Toolbar>
		</AppBar>
	)
}

export default Navbar
