import React, { useMemo } from 'react'
import { useDropzone } from 'react-dropzone'

import theme from '../theme'

import BackupIcon from '@material-ui/icons/Backup'

const baseStyle = {
	flex: 1,
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	padding: '20px',
	borderWidth: 3,
	borderRadius: 10,
	borderColor: theme.palette.primary.main,
	borderStyle: 'dashed',
	backgroundColor: theme.palette.primary.lightGrey,
	color: theme.palette.primary.main,
	outline: 'none',
}

const thumbsContainer = {
	display: 'flex',
	flexDirection: 'row',
	flexWrap: 'wrap',
	marginTop: 16
}

const thumb = {
	display: 'inline-flex',
	marginBottom: 8,
	marginRight: 8,
	width: 150,
	height: 150,
	padding: 4,
	boxSizing: 'border-box'
}

const img = {
	borderRadius: 10,
	display: 'block',
	width: 'auto',
	height: '100%'
}
  
const activeStyle = {
	borderColor: '#2196f3'
}
  
const acceptStyle = {
	borderColor: '#00e676'
}
  
const rejectStyle = {
	borderColor: '#ff1744'
}


const UploadComponent = ({ setFieldValue, values }) => {
	const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
		accept: 'image/*',
		onDrop: acceptedFiles => {
			setFieldValue('files', acceptedFiles.map(file => Object.assign(file, {
				preview: URL.createObjectURL(file)
			})))
		}
	})
	
	const thumbs = values.files.map(file => (
		<div style={thumb} key={file.name}>
			<div>
				<img
					src={file.preview}
					style={img}
				/>
			</div>
		</div>
	))

	const style = useMemo(() => ({
		...baseStyle,
		...(isDragActive ? activeStyle : {}),
		...(isDragAccept ? acceptStyle : {}),
		...(isDragReject ? rejectStyle : {})
	}), [
		isDragActive,
		isDragReject,
		isDragAccept
	])

	return (
		<div>
			<div {...getRootProps({ style })}>
				<input {...getInputProps()} name='image' id='imageUpload'/>
				<p>Drag and drop image here, or click to select image</p>
				<BackupIcon />
			</div>
			<aside style={thumbsContainer}>
				{thumbs}
			</aside>
		</div>
		
	)
}

export default UploadComponent
