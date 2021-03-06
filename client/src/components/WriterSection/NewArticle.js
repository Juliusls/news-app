import React from 'react'
import { Formik, Field, FieldArray } from 'formik'
import { useSelector, useDispatch } from 'react-redux'
import * as yup from 'yup'
import { makeStyles, FormControl, Typography, FormControlLabel, FormGroup, Button, Radio, IconButton } from '@material-ui/core'
import { RadioGroup, CheckboxWithLabel, TextField } from 'formik-material-ui'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'
import { newsCategories } from '../../data/data'
import { createArticle } from '../../reducers/articlesReducer'
import { addArticleToWriter } from '../../reducers/writersReducer'
import { useHistory } from 'react-router-dom'
import articlesService from '../../services/articles'
import { notifyError, notifySuccess } from '../../reducers/notificationReducer'
import { useCookies } from 'react-cookie'
import { removeWriter } from '../../reducers/loginWriterReducer'

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
		height: '80vh',
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
	radioGroup: {
		display: 'inline-block'
	},
	formControl: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 10,
		marginBottom: 10,
	},
	checkBoxMargins: {
		marginRight: 0,
		marginLeft: 0
	},
	contentField: {
		marginBottom: 15
	}
}))

const initialValues = {
	title: '',
	content: [],
	genres: [],
	paid: 'no',
	file: null
}

const validationSchema = yup.object().shape({
	title: yup.string()
		.min(10, 'Too Short')
		.max(100, 'Too Long')
		.required('Required'),
	content: yup.array()
		.min(1, 'At least one paragraph required')
		.of(yup.string().min(50, 'Too Short')),
	genres: yup.array()
		.min(1, 'Check at least one category'),
	paid: yup.mixed()
		.oneOf(['yes', 'no']),
	file: yup.mixed().required()
})

const NewArticleForm = ({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => {
	const classes = useStyles()

	return (
		<div className={classes.container}>
			<div className={classes.item}>
				<Typography variant='h4' style={{ textAlign: 'center', marginTop: 20 }}>Create an article</Typography>
				<form onSubmit={handleSubmit} className={classes.form}>
					<Typography variant='h6' className={classes.formControl}>Title</Typography>
					<Field
						component={TextField}
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.title}
						error={touched.title && Boolean(errors.title)}
						helperText={touched.title && errors.title}
						id="title"
						name="title"
						label="Title"
						variant="outlined"
						fullWidth
						className={classes.paddings}
						InputProps={{
							className: classes.inputColor
						}}
					/>
					<Typography variant='h6' className={classes.formControl}>Content</Typography>
					<FieldArray
						name="content"
						render={({ pop, push }) => (
							<div>
								{values.content.map((paragraph, index) => (
									<div key={index}>
										<Field
											component={TextField}
											value={paragraph.index}
											label={`Paragraph ${index + 1}`}
											variant="outlined"
											name={`content.${index}`}
											type="text"
											multiline
											fullWidth
											className={classes.contentField}
											InputProps={{
												className: classes.inputColor
											}}
										/>
										{errors.content &&	errors.content[index] && touched.content && touched.content[index]}
									</div>
								))
								}
								<IconButton color="primary" size='small' aria-label="upload picture" component="span" onClick={() => push('')}>
									<AddIcon />
								</IconButton>
								<IconButton className={classes.minusItem} color="primary" aria-label="upload picture" size='small' component="span" onClick={pop}>
									<RemoveIcon />
								</IconButton>
							</div>
						)}
					/>
					<FormControl component="fieldset" className={classes.formControl}>
						<Typography variant='h6'>Categories</Typography>
						{errors.genres && touched.genres && 
							<Typography variant='caption' style={{ color: '#f44336' }}>{errors.genres}</Typography>
						}
						<FormGroup row>
							{newsCategories.map(categoryValue =>
								<FormControlLabel classes={{ root: classes.checkBoxMargins }}
									key={categoryValue}
									control={
										<Field
											component={CheckboxWithLabel}
											classes={{ root: classes.checkBoxMargins }}
											type="checkbox"
											name="genres"
											value={categoryValue}
											Label={{ label: `${categoryValue}` }}
										/>
									}
								/>
							)}

						</FormGroup>
					</FormControl>
					
					<Typography variant='h6' className={classes.formControl}>Paid</Typography>
					<Field component={RadioGroup} name="paid" row defaultValue='no' className={classes.formControl}>
						<FormControlLabel
							value="yes"
							control={<Radio/>}
							label="Yes"
						/>
						<FormControlLabel
							value="no"
							control={<Radio />}
							label="No"
						/>
					</Field>
					<input
						accept="image/*"
						style={{ display: 'none' }}
						id="raised-button-file"
						multiple
						type="file"
					/>
					<label htmlFor="raised-button-file">
						<Button variant="raised" component="span" className={classes.button}>
							Upload
						</Button>
					</label> 
					<Button color="primary" variant="contained" type="submit" className={classes.button}>
                        Publish
					</Button>
				</form>
			</div>
		</div>
	)
}

const NewArticle = () => {
	const history = useHistory()
	const writer = useSelector(state => state.writer)
	const dispatch = useDispatch()
	// eslint-disable-next-line no-unused-vars
	const [cookies, setCookie, removeCookie] = useCookies(['writerAuthCookie'])


	const handleSubmit = async (values) => {
		try {
			const article = await articlesService.create(values)
			await dispatch(createArticle(article))
			await dispatch(addArticleToWriter(article))
			dispatch(notifySuccess('Article created'))
			history.push(`/writerssection/profile/${writer.id}`)
		} catch (error) {
			console.log('error response', error.response)
			if (error.response.statusText === 'Unauthorized' && error.response.data.error === 'token expired') {
				dispatch(notifyError('You session has expired. Please login again'))
				dispatch(removeWriter())
				removeCookie('writerAuthCookie', { path: '/' })
				history.push('/writerssection/login')
			} else {
				dispatch(notifyError('An error occurred. Please try again'))
			}
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
					<NewArticleForm 
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

export default NewArticle