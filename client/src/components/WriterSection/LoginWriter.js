import React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Button from '@material-ui/core/Button'
import { makeStyles, TextField, Typography } from '@material-ui/core'
import { addWriter } from '../../reducers/loginWriterReducer'
// import loginReaderService from '../services/loginReader'

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
	userName: yup
		.string()
		.required('Username is required'),
	password: yup
		.string()
		.required('Password is required')
})

const LoginWriter = () => {
	const classes = useStyles()
	const reader = useSelector(state => state.reader)
	const writers = useSelector(state => state.writers)
	const dispatch = useDispatch()
	let hisotry = useHistory()

	const handleSubmit = async (values) => {
		try {
			await dispatch(addWriter(values))
			const idForLink = writers.filter(writer => writer.userName === String(values.userName))[0]
			hisotry.push(`/writerssection/profile/${idForLink.id}`)
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

export default LoginWriter