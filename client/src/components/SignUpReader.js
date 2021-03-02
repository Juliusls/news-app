import React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Button from '@material-ui/core/Button'
import { makeStyles, TextField, Typography } from '@material-ui/core'
import { createReader } from '../reducers/readersReducer'
import { notifySuccess } from '../reducers/notificationReducer'

const useStyles = makeStyles(theme => ({
	inputColor:{
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
	firstName: yup.string()
		.min(2, 'Too Short!')
		.max(50, 'Too Long!')
		.required('Required'),
	lastName: yup.string()
		.min(2, 'Too Short!')
		.max(50, 'Too Long!')
		.required('Required'),
	userName: yup.string()
		.min(3, 'Username too Short!')
		.max(50, 'Username too Long!')
		.required('Required'),
	password: yup.string()
		.min(8, 'Password too Short!')
		.max(50, 'Password too Long!')
		.required('Required'),
	passwordConfirmation: yup.string()
		.oneOf([yup.ref('password'), null], 'Passwords must match')
})

const SignUpReader = () => {
	const classes = useStyles()
	const dispatch = useDispatch()
	let hisotry = useHistory()

	const handleSubmit = async (values) => {
		try {
			dispatch(createReader(values))
			dispatch(notifySuccess('Registration successful'))
			hisotry.push('/reader/login')
		} catch (error) {
			console.log(error)
		}
	}

	const formik = useFormik({
		initialValues: {
			firstName: '',
			lastName: '',
			userName: '',
			password: '',
			passwordConfirmation: ''
		},
		validationSchema: validationSchema,
		onSubmit: (values) => { handleSubmit(values) }
	})

	return (
		<div className={classes.container}>
			<div className={classes.item}>
				<form onSubmit={formik.handleSubmit} className={classes.form}>
					<Typography variant='h4' className={classes.loginText}>
                        Sign Up
					</Typography>
					<TextField
						className={classes.paddings}
						fullWidth
						id="firstName"
						name="firstName"
						label="First name"
						variant="outlined"
						InputProps={{
							className: classes.inputColor
						}}
						value={formik.values.firstName}
						onChange={formik.handleChange}
						error={formik.touched.firstName && Boolean(formik.errors.firstName)}
						helperText={formik.touched.firstName && formik.errors.firstName}
					/>
					<TextField
						className={classes.paddings}
						fullWidth
						id="lastName"
						name="lastName"
						label="Last name"
						variant="outlined"
						InputProps={{
							className: classes.inputColor
						}}
						value={formik.values.lastName}
						onChange={formik.handleChange}
						error={formik.touched.lastName && Boolean(formik.errors.lastName)}
						helperText={formik.touched.lastName && formik.errors.lastName}
					/>
					<TextField
						className={classes.paddings}
						fullWidth
						id="userName"
						name="userName"
						label="Username"
						variant="outlined"
						InputProps={{
							className: classes.inputColor
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
							className: classes.inputColor
						}}
						value={formik.values.password}
						onChange={formik.handleChange}
						error={formik.touched.password && Boolean(formik.errors.password)}
						helperText={formik.touched.password && formik.errors.password}
					/>
					<TextField
						className={classes.paddings}
						fullWidth
						id="passwordConfirmation"
						name="passwordConfirmation"
						label="Password confirmation"
						type="password"
						variant="outlined"
						InputProps={{
							className: classes.inputColor
						}}
						value={formik.values.passwordConfirmation}
						onChange={formik.handleChange}
						error={formik.touched.passwordConfirmation && Boolean(formik.errors.passwordConfirmation)}
						helperText={formik.touched.passwordConfirmation && formik.errors.passwordConfirmation}
					/>
					<Button color="primary" variant="contained" type="submit" className={classes.button}>
                        Sign Up
					</Button>
				</form>
			</div>
		</div>
	)
}

export default SignUpReader


// TODO username unique validator