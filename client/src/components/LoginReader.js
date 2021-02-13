import React from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'

const initialValues = {
	userName: '',
	password: ''
}

const LoginReaderSchema = Yup.object().shape({
	firstName: Yup.string()
		.min(2, 'Too Short!')
		.max(50, 'Too Long!')
		.required('Required'),
	password: Yup.string()
		.min(2, 'Too Short!')
		.max(50, 'Too Long!')
		.required('Required'),
})
 
const LoginReaderForm = ({ onSubmit }) => (
	<div>
		<h1>Anywhere in your app!</h1>
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

	</div>
)

const LoginReader = ({ onSubmit }) => {
	return (
		<Formik
			initialValues={initialValues}
			onSubmit={onSubmit}
			validationSchema={LoginReaderSchema}
		>
			{({ handleSubmit }) => <LoginReaderForm onSubmit={handleSubmit} />}
		</Formik>
	)
} 
 
export default LoginReader
