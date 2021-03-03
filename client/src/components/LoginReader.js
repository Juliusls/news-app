import React from 'react'
import * as yup from 'yup'
import { Formik } from 'formik'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Button from '@material-ui/core/Button'
import { makeStyles, TextField, Typography } from '@material-ui/core'
import { addReader } from '../reducers/loginReaderReducer'
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
	userName: '',
	password: '',
}

const validationSchema = yup.object().shape({
	userName: yup
		.string()
		.required('Username is required'),
	password: yup
		.string()
		.required('Password is required')
})

const LoginReaderForm = ({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => {
	const classes = useStyles()

	return (
		<div className={classes.container}>
			<div className={classes.item}>
				<form onSubmit={handleSubmit} className={classes.form}>
					<Typography variant='h4' className={classes.loginText}>
                        Log In
					</Typography>
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
					<Button color="primary" variant="contained" type="submit" className={classes.button}>
                        Log in
					</Button>
				</form>
			</div>
		</div>
	)
}

const LoginReader = () => {
	const history = useHistory()
	const dispatch = useDispatch()


	const handleSubmit = async (values) => {
		try {
			dispatch(addReader(values))
			dispatch(notifySuccess('Login successful'))
			history.push('/')
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
					<LoginReaderForm 
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

export default LoginReader

// TODO username unique validator