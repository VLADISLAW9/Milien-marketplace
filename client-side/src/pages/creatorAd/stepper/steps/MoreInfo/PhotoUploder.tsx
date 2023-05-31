import { CardMedia } from '@mui/material'
import { Image } from 'antd'
import React, { FC, useRef, useState } from 'react'
import { BiImageAdd } from 'react-icons/bi'
import { MdChangeCircle } from 'react-icons/md'
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
			const updatedPhotos: File[] = Array.from(files)
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
			<div className='w-[848px]'>
				<div className='flex justify-center mb-5'>
					{uploadedPhotos.length > 0 ? (
						<div
							onMouseLeave={() => setIsHover(false)}
							onMouseEnter={() => setIsHover(true)}
							onFocus={() => setIsHover(false)}
							className='cursor-pointer relative'
							onClick={() => {
								handleButtonClick()
								handlePhotoDelete(0)
								setIsHover(false)
							}}
						>
							<CardMedia
								component='img'
								className='hover:blur-[2px] transition-all max-w-[848px] max-h-[400px]'
								image={URL.createObjectURL(uploadedPhotos[0])}
							/>
							{isHover && (
								<div className='absolute right-0 top-0 text-[#166430]  '>
									<MdChangeCircle className='w-20 h-20' />
								</div>
							)}
						</div>
					) : (
						<button
							className='flex justify-center items-center border-4 border-dashed hover:border-stone-400 hover:text-stone-400 transition-colors border-stone-300  text-stone-300 p-4 w-[100%] rounded-lg h-[400px]'
							onClick={handleButtonClick}
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
					{uploadedPhotos.slice(1).map((photo, index) => (
						<li key={index} className='flex flex-col relative rounded-lg'>
							<Image
								width={'104px'}
								height={'104px'}
								src={URL.createObjectURL(photo)}
							/>

							<button
								className='text-red-500 hover:text-white p-1 hover:bg-red-500 absolute transition-all right-0'
								onClick={() => handlePhotoDelete(index + 1)}
							>
								<RxCross1 className='w-5 h-5' />
							</button>
						</li>
					))}
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
				</ul>
			</div>
		</div>
	)
}

export default PhotoUploader
