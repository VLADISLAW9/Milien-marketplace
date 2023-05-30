import { PlusOutlined } from '@ant-design/icons'
import { message, Modal, Upload } from 'antd'
import type { RcFile, UploadProps } from 'antd/es/upload'
import type { UploadFile } from 'antd/es/upload/interface'
import { FC, useState } from 'react'
import { IAdvrtData } from '../../../CreateAdvrtPage'

interface IImagesUploader {
	advrtData: IAdvrtData
	setAdvrtData: (data: IAdvrtData) => void
}

const ImagesUploader: FC<IImagesUploader> = ({ advrtData, setAdvrtData }) => {
	const [previewOpen, setPreviewOpen] = useState(false)
	const [previewImage, setPreviewImage] = useState('')
	const [previewTitle, setPreviewTitle] = useState('')
	const [fileList, setFileList] = useState<UploadFile[]>([])

	console.log(fileList)

	const handleCancel = () => setPreviewOpen(false)

	const beforeUpload = (file: RcFile) => {
		const isImage = file.type.startsWith('image/')
		if (!isImage) {
			message.error('Можно загружать только изображения!')
		}
		return isImage
	}

	const handleRemove = (file: UploadFile) => {
		const newFileList = fileList.filter(item => item.uid !== file.uid)
		setFileList(newFileList)
	}

	const handlePreview = (file: UploadFile) => {
		const reader = new FileReader()
		reader.onload = () => {
			setPreviewImage(reader.result as string)
			setPreviewOpen(true)
			setPreviewTitle(file.name || '')
		}
		reader.readAsDataURL(file.originFileObj as RcFile)
	}

	const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
		const updatedFileList: any[] = newFileList.map(file => {
			if (file.status === 'uploading' || file.status === 'removed') {
				return file
			}
			// Создаем новый экземпляр File на основе исходного файла
			const blobFile = new File([file.originFileObj as Blob], file.name, {
				type: file.type,
			})
			return { ...file, status: 'done', originFileObj: blobFile }
		})
		setFileList(updatedFileList)
	}

	const uploadButton = (
		<div>
			<PlusOutlined />
			<div style={{ marginTop: 8 }}>
				<h1>
					Загрузить <br /> фото
				</h1>
			</div>
		</div>
	)

	return (
		<>
			<Upload
				listType='picture-card'
				fileList={fileList}
				onPreview={handlePreview}
				onChange={handleChange}
				beforeUpload={beforeUpload}
				accept='image/*'
				onRemove={handleRemove}
				showUploadList={{
					showRemoveIcon: true,
					showPreviewIcon: true,
				}}
				maxCount={15}
			>
				{fileList.length >= 15 ? null : uploadButton}
			</Upload>
			<Modal
				visible={previewOpen}
				title={previewTitle}
				footer={null}
				onCancel={handleCancel}
			>
				<img alt='example' style={{ width: '100%' }} src={previewImage} />
			</Modal>
		</>
	)
}

export default ImagesUploader
