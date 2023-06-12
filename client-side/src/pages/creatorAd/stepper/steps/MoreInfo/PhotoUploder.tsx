import { CardMedia } from '@mui/material'
import { Image } from 'antd'
import React, { FC, useRef, useState } from 'react'
import { BiImageAdd } from 'react-icons/bi'
import { RxCross1 } from 'react-icons/rx'
import { IAdvrtData } from '../../../CreateAdvrtPage'

interface IPhotoUploaderProps {
	advrtData: IAdvrtData
	setAdvrtData: (data: IAdvrtData) => void
}

const PhotoUploader: FC<IPhotoUploaderProps> = ({
	advrtData,
	setAdvrtData,
}) => {
	const [uploadedPhotos, setUploadedPhotos] = useState<File[]>([])
	const [isHover, setIsHover] = useState(false)
	const fileInputRef = useRef<HTMLInputElement>(null)

	const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files
		if (files) {
			const updatedPhotos: File[] = Array.from(files).slice(
				0,
				15 - uploadedPhotos.length
			) // Ограничение до 15 фотографий
			setUploadedPhotos([...uploadedPhotos, ...updatedPhotos])
			setAdvrtData({
				...advrtData,
				images: [...uploadedPhotos, ...updatedPhotos],
			})
		}
	}

	const handlePhotoDelete = (index: number) => {
		const updatedPhotos = [...uploadedPhotos]
		updatedPhotos.splice(index, 1)
		setUploadedPhotos(updatedPhotos)
		setAdvrtData({
			...advrtData,
			images: updatedPhotos,
		})
	}

	const handlePreviewUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files
		if (files) {
			const updatedPhotos: File[] = Array.from(files)
			setUploadedPhotos([...updatedPhotos, ...uploadedPhotos])
		}
	}

	const handleButtonClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click()
		}
	}

	return (
		<div>
			<div></div>
			<div className='w-[848px] max-lg:w-[600px]'>
				<div className='flex justify-center mb-5'>
					{uploadedPhotos.length > 0 ? (
						<div
							onMouseLeave={() => setIsHover(false)}
							onMouseEnter={() => setIsHover(true)}
							onFocus={() => setIsHover(false)}
							className='relative'
						>
							<CardMedia
								component='img'
								className='max-w-[848px] max-h-[400px]'
								image={URL.createObjectURL(uploadedPhotos[0])}
							/>
							{isHover && (
								<div
									onClick={() => {
										handlePhotoDelete(0)
									}}
									className='absolute cursor-pointer right-0 top-0 text-red-500 hover:text-white p-1 hover:bg-red-500'
								>
									<RxCross1 className='w-14 h-14' />
								</div>
							)}
						</div>
					) : (
						<button
							className='flex justify-center items-center border-4 border-dashed hover:border-stone-400 hover:text-stone-400 transition-colors border-stone-300  text-stone-300 p-4 w-[100%] rounded-lg h-[400px]'
							onClick={handleButtonClick}
							disabled={uploadedPhotos.length >= 15}
						>
							<BiImageAdd className='w-16  translate-x-[2px] translate-y-[3px] h-16' />
						</button>
					)}

					<input
						ref={fileInputRef}
						accept='image/*'
						type='file'
						multiple
						onChange={handlePreviewUpload}
						style={{ display: 'none' }}
					/>
				</div>
				<ul className='grid grid-cols-7 gap-5'>
					{uploadedPhotos.slice(1, 15).map((photo, index) => (
						<li key={index} className='flex flex-col relative rounded-lg'>
							<Image
								width={'104px'}
								height={'104px'}
								src={URL.createObjectURL(photo)}
							/>

							<button
								className='text-red-500 hover:text-white p-1 hover:bg-red-500 absolute transition-all right-0'
								onClick={() => handlePhotoDelete(index)}
							>
								<RxCross1 className='w-5 h-5' />
							</button>
						</li>
					))}
					{uploadedPhotos.length < 15 && (
						<li>
							<button
								className='flex justify-center items-center border-4 border-dashed hover:border-stone-400 hover:text-stone-400 transition-colors border-stone-300  text-stone-300 p-4 rounded-lg'
								onClick={handleButtonClick}
							>
								<BiImageAdd className='w-16  translate-x-[2px] translate-y-[3px] h-16' />
							</button>
							<input
								ref={fileInputRef}
								accept='image/*'
								type='file'
								multiple
								onChange={handlePhotoUpload}
								style={{ display: 'none' }}
							/>
						</li>
					)}
				</ul>
			</div>
		</div>
	)
}

export default PhotoUploader
