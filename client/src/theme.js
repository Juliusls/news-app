import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
	palette: {
		type: 'light',
		primary: {
			main: '#181616',
			lighter: '#222525',
			middleGrey: '#515151',
			hover: '#606060',
			lightGrey: '#eeeeee'
		},
		secondary: {
			main: '#f50057',
		},
		text: {
			primary: '#FCFCFC',
			secondary: '#181616',
			blueish: '#731DD8'
		}
	},
	icons: {
		fontSize: 30,
		fill: '#FCFCFC'
	}

})

export default theme