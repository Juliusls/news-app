import React from 'react'
import { Formik } from 'formik'
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

const initialValues = {
	firstName: '',
	lastName: '',
	userName: '',
	password: '',
	passwordConfirmation: ''
}

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

const SignUpReaderForm = ({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => {
	const classes = useStyles()

	return (
		<div className={classes.container}>
			<div className={classes.item}>
				<form onSubmit={handleSubmit} className={classes.form}>
					<Typography variant='h4' className={classes.loginText}>
                        Sign Up
					</Typography>
					<TextField
						value={values.firstName}
						onChange={handleChange}
						onBlur={handleBlur}
						error={touched.firstName && Boolean(errors.firstName)}
						helperText={touched.firstName && errors.firstName}
						fullWidth
						id="firstName"
						name="firstName"
						label="First name"
						variant="outlined"
						InputProps={{
							className: classes.inputColor
						}}
						className={classes.paddings}
						
					/>
					<TextField
						value={values.lastName}
						onChange={handleChange}
						onBlur={handleBlur}
						error={touched.lastName && Boolean(errors.lastName)}
						helperText={touched.lastName && errors.lastName}
						fullWidth
						id="lastName"
						name="lastName"
						label="Last name"
						variant="outlined"
						InputProps={{
							className: classes.inputColor
						}}
						className={classes.paddings}
					/>
					<TextField
						value={values.userName}
						onChange={handleChange}
						onBlur={handleBlur}
						error={touched.userName && Boolean(errors.userName)}
						helperText={touched.userName && errors.userName}
						fullWidth
						id="userName"
						name="userName"
						label="Username"
						variant="outlined"
						InputProps={{
							className: classes.inputColor
						}}
						className={classes.paddings}
					/>
					<TextField
						value={values.password}
						onChange={handleChange}
						onBlur={handleBlur}
						error={touched.password && Boolean(errors.password)}
						helperText={touched.password && errors.password}
						fullWidth
						id="password"
						name="password"
						label="Password"
						type="password"
						variant="outlined"
						InputProps={{
							className: classes.inputColor
						}}
						className={classes.paddings}
					/>
					<TextField
						value={values.passwordConfirmation}
						onChange={handleChange}
						onBlur={handleBlur}
						error={touched.passwordConfirmation && Boolean(errors.passwordConfirmation)}
						helperText={touched.passwordConfirmation && errors.passwordConfirmation}
						fullWidth
						id="passwordConfirmation"
						name="passwordConfirmation"
						label="Password confirmation"
						type="password"
						variant="outlined"
						InputProps={{
							className: classes.inputColor
						}}
						className={classes.paddings}
					/>
					<Button color="primary" variant="contained" type="submit" className={classes.button}>
                        Sign Up
					</Button>
				</form>
			</div>
		</div>
	)
}

const SignUpReader = () => {
	const history = useHistory()
	const dispatch = useDispatch()

	const handleSubmit = async (values) => {
		try {
			dispatch(createReader(values))
			dispatch(notifySuccess('Registration successful'))
			history.push('/reader/login')
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}
			>
				{({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => 
					<SignUpReaderForm 
						values={values}
						errors={errors}
						touched={touched}
						handleChange={handleChange}
						handleBlur={handleBlur}
						handleSubmit={handleSubmit}
					/>}
			</Formik>
		</div>
	)
}

export default SignUpReader

// TODO username unique validator