import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#181616',
			lighter: '#222525',
			lightGrey: '#eeeeee'
		},
		secondary: {
			main: '#0063cc',
		},
		text: {
			primary: '#FCFCFC',
			secondary: '#181616'
		}
	},
	icons: {
		fontSize: 30,
		fill: '#FCFCFC'
	}

})

export default theme