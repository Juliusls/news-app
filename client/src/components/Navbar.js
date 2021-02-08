import React from 'react'
import { Toolbar, Button, AppBar } from '@material-ui/core'

const Navbar = () => {
	return (
		<AppBar position="static">
			<Toolbar>
				<Button variant="contained" color="primary">
                    One
				</Button>
				<Button variant="contained" color="primary">
                    Two
				</Button>
				<Button variant="contained" color="primary">
                    Three
				</Button>
				<Button variant="contained" color="primary">
                    Four
				</Button>
			</Toolbar>
		</AppBar>
	)
}

export default Navbar
