import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import { makeStyles, IconButton, TextField } from '@material-ui/core/'
import SearchIcon from '@material-ui/icons/Search'

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
	let hisotry = useHistory()
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
			hisotry.push(`/search/${searchValue}`)
			setSearchValue('')
		} 
	}

	return (
		<div style={{ display: 'inline-block' }}>
			<TextField
				label="Search"
				type="search"
				id='searchInput'
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
				id='searchFieldButton'
			>
				<SearchIcon className={classes.icons}/>
			</IconButton>
		</div>
	)
}

export default SearchField
