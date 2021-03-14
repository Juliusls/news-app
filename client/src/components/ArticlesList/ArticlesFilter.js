import React from 'react'
import { makeStyles, Radio, RadioGroup, FormControlLabel, FormControl } from '@material-ui/core/'

const useStyles = makeStyles({
	posisioning: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	radioGroup: {
		display: 'inline-block'
	}
})

const ArticlesFilter = ({ setFilterValue }) => {
	const classes = useStyles()

	const handleChange = (event) => {
		setFilterValue(event.target.value)
	}

	return (
		<FormControl component="fieldset" className={classes.posisioning} fullWidth>
			<RadioGroup className={classes.radioGroup} onChange={handleChange} row aria-label="position" name="position" defaultValue="all">
				<FormControlLabel value="all" control={<Radio color="primary" />} label="All" />
				<FormControlLabel value="free" control={<Radio color="primary" />} label="Free" />
				<FormControlLabel value="paid" control={<Radio color="primary" />} label="Paid" />
			</RadioGroup>
		</FormControl>
	)
}

export default ArticlesFilter
