import React from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { Typography } from '@material-ui/core'

const initialValues = {
	firstName: '',
	lastName: '',
	userName: '',
	password: '',
	passwordConfirmation: ''
}

const SignUpReaderSchema = Yup.object().shape({
	firstName: Yup.string()
		.min(2, 'Too Short!')
		.max(50, 'Too Long!')
		.required('Required'),
	lastName: Yup.string()
		.min(2, 'Too Short!')
		.max(50, 'Too Long!')
		.required('Required'),
	userName: Yup.string()
		.min(3, 'Username too Short!')
		.max(50, 'Username too Long!')
		.required('Required'),
	password: Yup.string()
		.min(8, 'Password too Short!')
		.max(50, 'Password too Long!')
		.required('Required'),
	passwordConfirmation: Yup.string()
		.oneOf([Yup.ref('password'), null], 'Passwords must match')
})
 
const SignUpReaderForm = ({ onSubmit }) => (
	<form>
		<Typography>
			
		</Typography>
		<form onSubmit={onSubmit}>
			<input
				type="email"
				name="email"

			/>
			<input
				type="password"
				name="password"

			/>
			<button type="submit">
             Submit
			</button>
		</form>

	</form>
)

const SignUpReader = ({ onSubmit }) => {
	return (
		<Formik
			initialValues={initialValues}
			onSubmit={onSubmit}
			validationSchema={SignUpReaderSchema}
		>
			{({ handleSubmit }) => <SignUpReaderForm onSubmit={handleSubmit} />}
		</Formik>
	)
} 
 
export default SignUpReader


// TODO username unique validator