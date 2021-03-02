import React from 'react'
import { Formik, Field } from 'formik'
import { useDispatch } from 'react-redux'
import * as yup from 'yup'
import { makeStyles, TextField, FormControl, Typography, FormControlLabel, FormGroup, Button } from '@material-ui/core'
import { newsCategories } from '../../data/data'
import { createWriter } from '../../reducers/writersReducer'
import { notifySuccess } from '../../reducers/notificationReducer'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
	inputColor:{
		color: theme.palette.text.secondary
	},
	loginText: {
		textAlign: 'center',
		marginBottom: 30
	},
	container: {
		marginTop: 200,
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
	}
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
	passwordConfirmation: ''
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
		.oneOf([yup.ref('password'), null], 'Passwords must match')
})

const WriterSignUpForm = ({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => {
	const classes = useStyles()

	return (
		<div className={classes.container}>
			<div className={classes.item}>
				<Typography variant='h4' style={{ textAlign: 'center', marginTop: 20 }}>Writer registration form</Typography>
				<form onSubmit={handleSubmit} className={classes.form}>
					<TextField
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
					<TextField
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
					<TextField
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
					<TextField	
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
								<FormControlLabel
									key={categoryValue}
									control={
										<Field
											type="checkbox"
											name="writerGenres"
											value={categoryValue}
										/>
									}
									label={categoryValue}
								/>
							)}
						</FormGroup>
					</FormControl>
					<FormControl component="fieldset" className={classes.paddings}>
						<Typography variant='subtitle1' style={{ marginBottom: 10 }}>Pricing</Typography>
						<div className={classes.priceContainer}>
							<TextField
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
							<TextField
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
							<TextField
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
					<TextField
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
					<TextField
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
					<Button color="primary" variant="contained" type="submit" className={classes.button}>
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


	const handleSubmit = async (values) => {
		try {
			dispatch(createWriter(values))
			dispatch(notifySuccess('Registered successfully'))
			history.push('/writerssection/login')
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
					<WriterSignUpForm 
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

export default SignUpWriter

// TODO username unique validator