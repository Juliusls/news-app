import React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Button from '@material-ui/core/Button'
import { makeStyles, TextField, Typography } from '@material-ui/core'
import { addReader } from '../reducers/readerReducer'
import loginReaderService from '../services/loginReader'

const useStyles = makeStyles(theme => ({
	multilineColor:{
		color: theme.palette.text.secondary
	},
	loginText: {
		textAlign: 'center',
		marginBottom: 30
	},
	container: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		height: '80vh'
	},
	item: {
		maxWidth: 600,
		borderColor: theme.palette.primary.main,
		borderRadius: 10,
		borderWidth: 1,
		borderStyle: 'solid',
		background: theme.palette.primary.lightGrey

	},
	form: {
		margin: 30
	},
	paddings: {
		marginBottom: 20
	},
	button: {
		display: 'block',
		marginLeft: 'auto',
		marginRight: 'auto',
	}
}))

const validationSchema = yup.object().shape({
	userName: yup
		.string()
		.required('Username is required'),
	password: yup
		.string()
		.required('Password is required')
})

const LoginReader = () => {
	const classes = useStyles()
	const dispatch = useDispatch()
	let hisotry = useHistory()

	const handleSubmit = async (values) => {

		try {
			const reader = await loginReaderService.login(values)
			console.log(reader)
			dispatch(addReader(reader))
			hisotry.push('/')
		} catch (error) {
			console.log(error)
		}
	}

	const formik = useFormik({
		initialValues: {
			userName: '',
			password: '',
		},
		validationSchema: validationSchema,
		onSubmit: (values) => { handleSubmit(values) }
	})

	return (
		<div className={classes.container}>
			<div className={classes.item}>
				<form onSubmit={formik.handleSubmit} className={classes.form}>
					<Typography variant='h4' className={classes.loginText}>
                        Log In
					</Typography>
					<TextField
						className={classes.paddings}
						fullWidth
						id="userName"
						name="userName"
						label="Username"
						variant="outlined"
						InputProps={{
							className: classes.multilineColor
						}}
						value={formik.values.userName}
						onChange={formik.handleChange}
						error={formik.touched.userName && Boolean(formik.errors.userName)}
						helperText={formik.touched.userName && formik.errors.userName}
					/>
					<TextField
						className={classes.paddings}
						fullWidth
						id="password"
						name="password"
						label="Password"
						type="password"
						variant="outlined"
						InputProps={{
							className: classes.multilineColor
						}}
						value={formik.values.password}
						onChange={formik.handleChange}
						error={formik.touched.password && Boolean(formik.errors.password)}
						helperText={formik.touched.password && formik.errors.password}
					/>
					<Button color="primary" variant="contained" type="submit" className={classes.button}>
                        Log in
					</Button>
				</form>
			</div>
		</div>
	)
}

export default LoginReader