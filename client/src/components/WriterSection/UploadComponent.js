import React, { useMemo } from 'react'
import { useDropzone } from 'react-dropzone'
import theme from '../../theme'
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
  
const activeStyle = {
	borderColor: '#2196f3'
}
  
const acceptStyle = {
	borderColor: '#00e676'
}
  
const rejectStyle = {
	borderColor: '#ff1744'
}


const UploadComponent = ({ setFieldValue }) => {
	const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
		accept: 'image/*',
		onDrop: acceptedFiles => {
			setFieldValue('files', acceptedFiles.map(file => Object.assign(file, {
				preview: URL.createObjectURL(file)
			})))
		}
	})

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
		<div {...getRootProps({ style })}>
			<input {...getInputProps()} />
			<p>Drag and drop image here, or click to select image</p>
			<BackupIcon />
		</div>
	)
}

export default UploadComponent
