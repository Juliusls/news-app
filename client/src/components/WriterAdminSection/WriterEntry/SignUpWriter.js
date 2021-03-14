import React from 'react'
import { Formik, Field } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import * as yup from 'yup'
import { useHistory } from 'react-router-dom'

import { TextField, CheckboxWithLabel } from 'formik-material-ui'
import { makeStyles, FormControl, Typography, FormControlLabel, FormGroup, Button } from '@material-ui/core'

import { newsCategories } from '../../../data/data'

import { createWriter } from '../../../reducers/writersReducer'
import { addWriterImage } from '../../../reducers/writerImagesReducer'
import { notifySuccess, notifyError } from '../../../reducers/notificationReducer'

import UploadComponent from '../../UploadComponent'

import writerImagesService from '../../../services/writerImages'
import writerService from '../../../services/writers'

const useStyles = makeStyles(theme => ({
	inputColor:{
		color: theme.palette.text.secondary
	},
	loginText: {
		textAlign: 'center',
		marginBottom: 30
	},
	container: {
		marginTop: 150,
		marginBottom: 150,
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
	priceContainer: {
		display: 'flex',
		flexDirection: 'row'
	},
	priceItem: {
		marginRight: 5
	},
	checkBoxMargins: {
		marginRight: 0,
		marginLeft: 0
	},
}))

const initialValues = {
	firstName: '',
	lastName: '',
	userName: '',
	writerDescription: '',
	writerGenres: [],
	oneArticlePrice: 0,
	montlySubscriptionPrice: 0,
	yearlySubscriptionPrice: 0,
	password: '',
	passwordConfirmation: '',
	files: []
}

const validationSchema = yup.object().shape({
	firstName: yup.string()
		.min(2, 'Too Short')
		.max(50, 'Too Long')
		.required('Required'),
	lastName: yup.string()
		.min(2, 'Too Short')
		.max(50, 'Too Long')
		.required('Required'),
	userName: yup.string()
		.min(3, 'Too Short')
		.max(50, 'Too Long')
		.required('Required'),
	writerDescription: yup.string()
		.min(50, 'Description must be at least 50 characters')
		.max(500, 'Description must be less than 500 characters')
		.required('Required'),
	writerGenres: yup.array()
		.min(1, 'Check at least one category'),
	oneArticlePrice: yup.number()
		.required('Required')
		.moreThan(0, 'Value must be greater than 0'),
	montlySubscriptionPrice: yup.number()
		.required('Required')
		.moreThan(0, 'Value must be greater than 0'),
	yearlySubscriptionPrice: yup.number()
		.required('Required')
		.moreThan(0, 'Value must be greater than 0'),
	password: yup.string()
		.min(8, 'Password too Short')
		.max(50, 'Password too Long')
		.required('Required'),
	passwordConfirmation: yup.string()
		.oneOf([yup.ref('password'), null], 'Passwords must match'),
	files:  yup.array()
		.min(1, 'One image required')
})

const WriterSignUpForm = ({ validateUsername,  values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => {
	const classes = useStyles()

	return (
		<div className={classes.container}>
			<div className={classes.item}>
				<Typography variant='h4' style={{ textAlign: 'center', marginTop: 20 }}>Writer registration form</Typography>
				<form onSubmit={handleSubmit} className={classes.form}>
					<Field
						component={TextField}
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.firstName}
						error={touched.firstName && Boolean(errors.firstName)}
						helperText={touched.firstName && errors.firstName}
						id="firstName"
						name="firstName"
						label="First name"
						variant="outlined"
						fullWidth
						className={classes.paddings}
						InputProps={{
							className: classes.inputColor
						}}
					/>
					<Field
						component={TextField}
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.lastName}
						error={touched.lastName && Boolean(errors.lastName)}
						helperText={touched.lastName && errors.lastName}
						id="lastName"
						name="lastName"
						label="Last name"
						variant="outlined"
						fullWidth
						className={classes.paddings}
						InputProps={{
							className: classes.inputColor
						}}

					/>
					<Field
						validate={validateUsername}
						component={TextField}
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.userName}
						error={touched.userName && Boolean(errors.userName)}
						helperText={touched.userName && errors.userName}
						id="userName"
						name="userName"
						label="Username"
						variant="outlined"
						fullWidth
						className={classes.paddings}
						InputProps={{
							className: classes.inputColor
						}}
					/>
					<Field
						component={TextField}	
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.writerDescription}
						error={touched.writerDescription && Boolean(errors.writerDescription)}
						helperText={touched.writerDescription && errors.writerDescription}					
						id="writerDescription"
						name="writerDescription"
						label="Description"
						variant="outlined"
						multiline
						fullWidth
						className={classes.paddings}

						InputProps={{
							className: classes.inputColor
						}}
					/>

					<FormControl component="fieldset" className={classes.formControl}>
						<Typography variant='subtitle1'>Categories</Typography>
						{errors.writerGenres && touched.writerGenres && 
							<Typography variant='caption' style={{ color: '#f44336' }}>{errors.writerGenres}</Typography>
						}
						<FormGroup row>
							{newsCategories.map(categoryValue =>
								<FormControlLabel classes={{ root: classes.checkBoxMargins }}
									key={categoryValue}
									control={
										<Field
											component={CheckboxWithLabel}
											classes={{ root: classes.checkBoxMargins }}
											id={categoryValue.toLowerCase()}
											type="checkbox"
											name="writerGenres"
											value={categoryValue}
											Label={{ label: `${categoryValue}` }}
										/>
									}
								/>
							)}
						</FormGroup>
					</FormControl>

					<FormControl component="fieldset" className={classes.paddings}>
						<Typography variant='subtitle1' style={{ marginBottom: 10 }}>Pricing</Typography>
						<div className={classes.priceContainer}>
							<Field
								component={TextField}
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.oneArticlePrice}
								
								id="oneArticlePrice"
								name="oneArticlePrice"
								label="One Article"
								type="number"
								variant="outlined"
								fullWidth
								className={classes.priceItem}
								InputProps={{
									className: classes.inputColor
								}}
							/>
							<Field
								component={TextField}
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.montlySubscriptionPrice}
								error={touched.montlySubscriptionPrice && Boolean(errors.montlySubscriptionPrice)}
								helperText={touched.montlySubscriptionPrice && errors.montlySubscriptionPrice}
								id="montlySubscriptionPrice"
								name="montlySubscriptionPrice"
								label="Montly Subscription"
								type="number"
								variant="outlined"
								fullWidth
								className={classes.priceItem}
								InputProps={{
									className: classes.inputColor
								}}
							/>
							<Field
								component={TextField}
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.yearlySubscriptionPrice}
								error={touched.yearlySubscriptionPrice && Boolean(errors.yearlySubscriptionPrice)}
								helperText={touched.yearlySubscriptionPrice && errors.yearlySubscriptionPrice}
								id="yearlySubscriptionPrice"
								name="yearlySubscriptionPrice"
								label="Yearly Subscription"
								type="number"
								variant="outlined"
								fullWidth
								InputProps={{
									className: classes.inputColor
								}}
							/>
						</div>
					</FormControl>
					<Field
						component={TextField}
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.password}
						error={touched.password && Boolean(errors.password)}
						helperText={touched.password && errors.password}
						id="password"
						name="password"
						label="Password"
						type="password"
						variant="outlined"
						fullWidth
						className={classes.paddings}
						InputProps={{
							className: classes.inputColor
						}}
					/>
					<Field
						component={TextField}
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.passwordConfirmation}
						error={touched.passwordConfirmation && Boolean(errors.passwordConfirmation)}
						helperText={touched.passwordConfirmation && errors.passwordConfirmation}
						id="passwordConfirmation"
						name="passwordConfirmation"
						label="Password confirmation"
						type="password"
						variant="outlined"
						fullWidth
						className={classes.paddings}
						InputProps={{
							className: classes.inputColor
						}}
					/>
					<Typography variant='subtitle1' className={classes.formControl}>Profile picture</Typography>
					<div className={classes.formControl}>
						{errors.files && touched.files && 
								<Typography variant='caption' style={{ color: '#f44336' }}>{errors.files}</Typography>
						}
					</div>
					<UploadComponent setFieldValue={setFieldValue} values={values}/>
					<Button color="primary" variant="contained" type="submit" id='submitWriterRegister' className={classes.button}>
                        Sign Up
					</Button>
				</form>
			</div>
		</div>
	)
}

const SignUpWriter = () => {
	const history = useHistory()
	const dispatch = useDispatch()
	const writers = useSelector(state => state.writers)


	const handleSubmit = async (values) => {
		try {
			const data = new FormData() 
			data.append('file', values.files[0])
			
			const imageFromDb = await writerImagesService.create(data)

			const writerForFb = { ...values, imageId: imageFromDb.id }
			const writerFromDb = await writerService.create(writerForFb)

			const imageForDispatch = { ...imageFromDb, writer: writerFromDb.id }

			await dispatch(addWriterImage(imageForDispatch))
			await dispatch(createWriter(writerFromDb))
			dispatch(notifySuccess('Registered successfully'))
			history.push('/writerssection/login')
		} catch (error) {
			dispatch(notifyError('An error occurred. Please try again'))
		}
	}

	const validateUsername = (newUserName) => {
		let error
		if (writers.some(writer => writer.userName === newUserName)) {
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
					<WriterSignUpForm 
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

export default SignUpWriter