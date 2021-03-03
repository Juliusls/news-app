import React from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Button from '@material-ui/core/Button'
import { makeStyles, TextField, Typography } from '@material-ui/core'
import { addWriter } from '../../reducers/loginWriterReducer'
import { notifySuccess } from '../../reducers/notificationReducer'

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

const LoginWriterForm = ({ reader, values, errors, touched, handleChange, handleBlur, handleSubmit }) => {
	const classes = useStyles()

	return (
		<div className={classes.container}>
			<div className={classes.item}>
				<form onSubmit={handleSubmit} className={classes.form}>
					<Typography variant='h4' className={classes.loginText}>
                        Writer Log In
					</Typography>
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
						value={values.userName}
						onChange={handleChange}
						onBlur={handleBlur}
						error={touched.userName && Boolean(errors.userName)}
						helperText={touched.userName && errors.userName}
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
						value={values.password}
						onChange={handleChange}
						onBlur={handleBlur}

						error={touched.password && Boolean(errors.password)}
						helperText={touched.password && errors.password}
					/>
					{reader
						? (
							<div>
								<Button color="primary" variant="contained" disabled type="submit" className={classes.button}>
									Log in
								</Button>
								<div style={{ display: 'flex', justifyContent: 'center' }}>
									<Typography fullWidth variant='subtitle1' style={{ color: '#f44336', marginTop: 10 }}>Logout from Reader account to Login as Writer</Typography>
								</div>
							</div>
						)
						: (
							<Button color="primary" variant="contained" type="submit" className={classes.button}>
								Log in
							</Button>
						) 
						
					}
				</form>
			</div>
		</div>
	)
}

const LoginWriter = () => {
	const reader = useSelector(state => state.reader)
	const writers = useSelector(state => state.writers)
	const dispatch = useDispatch()
	let hisotry = useHistory()


	const handleSubmit = async (values) => {
		try {
			await dispatch(addWriter(values))
			const idForLink = writers.filter(writer => writer.userName === String(values.userName))[0]
			dispatch(notifySuccess('Logged in successfully'))
			hisotry.push(`/writerssection/profile/${idForLink.id}`)
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
					<LoginWriterForm 
						reader={reader}
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

export default LoginWriter

// TODO username unique validator