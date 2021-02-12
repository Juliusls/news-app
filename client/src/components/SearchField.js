import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import SearchIcon from '@material-ui/icons/Search'
import { makeStyles, IconButton, TextField } from '@material-ui/core/'

const useStyles = makeStyles(theme => ({
	icons: {
		fill: theme.icons.fill,
		fontSize: theme.icons.fontSize
	},
	label: {
		color: 'white'
	},
}))

const SearchField = () => {
	let histry = useHistory()
	const classes = useStyles()
	const [searchVisible, setSearchVisible] = useState(false)
	const [searchValue, setSearchValue] = useState('')

	const handleSearchVisibility = () => {
		setSearchVisible(!searchVisible)
	}

	const onChangeSearch = event => {
		setSearchValue(event.target.value)
	}
	
	const handleSubmit = (event) => {
		if (event.charCode === 13) { 
			event.preventDefault()
			setSearchVisible(false)
			histry.push(`/search/${searchValue}`)
			setSearchValue('')
		} 
	}

	return (
		<div style={{ display: 'inline-block' }}>
			<TextField
				id="outlined-basic"
				label="Search"
				type="search"
				value={searchValue}
				onChange={onChangeSearch}
				variant="outlined"
				onKeyPress={handleSubmit}
				InputLabelProps={{
					classes: {
						root: classes.label,
					}
				}}
				style={{ display: searchVisible ? 'inline-block' : 'none' }}
			/>
			
			<IconButton
				onClick={handleSearchVisibility}
			>
				<SearchIcon className={classes.icons}/>
			</IconButton>
		</div>
	)
}

export default SearchField
