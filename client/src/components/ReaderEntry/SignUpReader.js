import React from 'react'
import { Formik, Field } from 'formik'
import * as yup from 'yup'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { TextField } from 'formik-material-ui'
import { makeStyles, Typography, Button } from '@material-ui/core'

import { createReader } from '../../reducers/readersReducer'
import { addReaderImage } from '../../reducers/readerImagesReducer'
import { notifyError, notifySuccess } from '../../reducers/notificationReducer'

import UploadComponent from '../UploadComponent'

import readerImagesService from '../../services/readerImages'
import readersService from '../../services/readers'

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
	},
	formControl: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 5,
	},
}))

const initialValues = {
	firstName: '',
	lastName: '',
	userName: '',
	password: '',
	passwordConfirmation: '',
	files: []
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
		.oneOf([yup.ref('password'), null], 'Passwords must match'),
	files:  yup.array()
		.min(1, 'One image required')
})

const SignUpReaderForm = ({ values, errors, touched, handleChange, handleBlur, handleSubmit, validateUsername, setFieldValue }) => {
	const classes = useStyles()

	return (
		<div className={classes.container}>
			<div className={classes.item}>
				<form onSubmit={handleSubmit} className={classes.form}>
					<Typography variant='h4' className={classes.loginText}>
                        Sign Up
					</Typography>
					<Field
						component={TextField}
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
					<Field
						component={TextField}
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
					<Field
						component={TextField}
						validate={validateUsername}
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
					<Field
						component={TextField}
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
					<Field
						component={TextField}
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
					<Typography variant='subtitle1' className={classes.formControl}>Profile picture</Typography>
					<div className={classes.formControl}>
						{errors.files && touched.files && 
								<Typography variant='caption' style={{ color: '#f44336' }}>{errors.files}</Typography>
						}
					</div>
					<UploadComponent setFieldValue={setFieldValue} values={values}/>
					<Button id='submitReaderRegister' color="primary" variant="contained" type="submit" className={classes.button}>
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
	const readers = useSelector(state => state.readers)

	const handleSubmit = async (values) => {
		try {
			const data = new FormData() 
			data.append('file', values.files[0])
			const imageFromDb = await readerImagesService.create(data)

			const readerforDb = { ...values, imageId: imageFromDb.id }
			const readerFromDb = await readersService.create(readerforDb)

			const imageForDispatch = { ...imageFromDb, reader: readerFromDb.id }
			await dispatch(addReaderImage(imageForDispatch))
			await dispatch(createReader(readerFromDb))
			dispatch(notifySuccess('Registration successful'))
			history.push('/reader/login')
		} catch (error) {
			dispatch(notifyError('An error occurred. Please try again'))
		}
	}

	const validateUsername = (newUserName) => {
		let error
		if (readers.some(reader => reader.userName === newUserName)) {
			error = 'Sorry, this username already exists '
		}
		return error
	}

	return (
		<div>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}
			>
				{({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => 
					<SignUpReaderForm 
						validateUsername={validateUsername}
						values={values}
						errors={errors}
						touched={touched}
						handleChange={handleChange}
						handleBlur={handleBlur}
						handleSubmit={handleSubmit}
						setFieldValue={setFieldValue}
					/>}
			</Formik>
		</div>
	)
}

export default SignUpReader