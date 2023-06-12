import {
	Button,
	CardMedia,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	TextField,
} from '@mui/material'
import { FC, useRef, useState } from 'react'
import { MdAddToPhotos, MdClose } from 'react-icons/md'
import { categories } from '../../../app/data/category'
import CreateAdvrtService from '../../../services/CreatorAdvrtService'
import { IAdvrt } from '../../../types/IAdvrt'

interface IEditAdvrtModal {
	advrt: IAdvrt
	open: boolean
	handleCloseEdit: () => void
}

const EditAdvrtModal: FC<IEditAdvrtModal> = ({
	advrt,
	open,
	handleCloseEdit,
}) => {
	const [newAdvrtData, setNewAdvrtData] = useState({
		photoPath: [...advrt.photoPath] as any[],
		newPhotoPath: [] as any[],
		title: advrt.title,
		price: advrt.price,
		adress: advrt.adress,
		category: advrt.category,
		subcategory: advrt.subcategory,
		description: advrt.description,
	})

	const [isLoading, setIsLoading] = useState(false)

	const [uploadedPhotos, setUploadedPhotos] = useState<File[]>([])

	const convertURLsToFiles = async (urls: string[]): Promise<File[]> => {
		const files: File[] = []

		for (const url of urls) {
			const response = await fetch(url)
			const data = await response.blob()
			const file = new File([data], 'photo.jpg', { type: 'image/jpeg' })
			files.push(file)
		}

		return files
	}

	console.log(newAdvrtData)

	const fileInputRef = useRef<HTMLInputElement>(null)

	const handleSubmitData = async () => {
		try {
			setIsLoading(true)
			const editAdvrt = await CreateAdvrtService.editAdvrtData(
				newAdvrtData.title,
				newAdvrtData.description,
				newAdvrtData.price,
				advrt.id,
				newAdvrtData.adress,
				newAdvrtData.category,
				newAdvrtData.subcategory,
				newAdvrtData.newPhotoPath,
				newAdvrtData.photoPath
			).then(res => {
				handleCloseEdit()
				window.location.reload()
			})
		} catch (e) {
			console.log(e)
		} finally {
			setIsLoading(false)
		}
	}

	console.log(newAdvrtData.photoPath, 'old')
	console.log(newAdvrtData.newPhotoPath, 'new')

	const handlePhotoUpload = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const files = event.target.files
		if (files) {
			const updatedPhotos: File[] = Array.from(files).slice(
				0,
				advrt.premium
					? 30 -
							(newAdvrtData.photoPath.length + newAdvrtData.newPhotoPath.length)
					: 15 -
							(newAdvrtData.photoPath.length + newAdvrtData.newPhotoPath.length)
			) // Ограничение до 15 фотографий
			setUploadedPhotos([...uploadedPhotos, ...updatedPhotos])

			const uploadedURLs = updatedPhotos.map(file => URL.createObjectURL(file))
			const uploadedFiles = await convertURLsToFiles(uploadedURLs)

			setNewAdvrtData({
				...newAdvrtData,
				newPhotoPath: [...newAdvrtData.newPhotoPath, ...uploadedFiles], // Add newly uploaded photos to newPhotoPath
			})
		}
	}

	const handleButtonClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click()
		}
	}

	const handlePhotoRemove = (index: number, isNewPhoto: boolean) => {
		if (isNewPhoto) {
			const updatedNewPhotos = [...newAdvrtData.newPhotoPath]
			updatedNewPhotos.splice(index, 1)
			setNewAdvrtData({
				...newAdvrtData,
				newPhotoPath: updatedNewPhotos,
			})
		} else {
			const updatedPhotos = [...newAdvrtData.photoPath]
			updatedPhotos.splice(index, 1)
			setNewAdvrtData({
				...newAdvrtData,
				photoPath: updatedPhotos,
			})
		}
	}

	const handleChangeCategory = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		setNewAdvrtData({ ...newAdvrtData, category: event.target.value })
	}

	const handleChangeSubcategory = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		setNewAdvrtData({ ...newAdvrtData, subcategory: event.target.value })
	}

	return (
		<div>
			<Dialog open={open} onClose={handleCloseEdit}>
				<DialogTitle>
					<h1 className='text-3xl'>Редактирование объявления</h1>
					{advrt.premium && <h1 className='text-yellow-500'>"Премиум"</h1>}
				</DialogTitle>
				<DialogContent>
					<ul className='grid grid-cols-6 my-5'>
						{newAdvrtData.photoPath.map((img, index) => (
							<li className='relative' key={index}>
								<CardMedia
									sx={{ width: 80, height: 80 }}
									image={
										typeof img === 'string' ? img : URL.createObjectURL(img)
									}
								/>
								<button
									className='absolute top-0 right-[10px] bg-red-600 text-white'
									onClick={() => handlePhotoRemove(index, false)}
								>
									<MdClose />
								</button>
							</li>
						))}

						{newAdvrtData.newPhotoPath.map((img, index) => (
							<li className='relative' key={index}>
								<CardMedia
									sx={{ width: 80, height: 80 }}
									image={
										typeof img === 'string' ? img : URL.createObjectURL(img)
									}
								/>
								<button
									className='absolute top-0 right-[10px] bg-red-600 text-white'
									onClick={() => handlePhotoRemove(index, true)}
								>
									<MdClose />
								</button>
							</li>
						))}
						{advrt.premium &&
							newAdvrtData.newPhotoPath.length + newAdvrtData.photoPath.length <
								30 && (
								<button
									onClick={handleButtonClick}
									className='h-[80px] flex text-stone-400 justify-center items-center w-[80px] border-2 border-stone-300 border-dashed'
								>
									<MdAddToPhotos className='w-10 h-10' />
								</button>
							)}
						{!advrt.premium &&
							newAdvrtData.newPhotoPath.length + newAdvrtData.photoPath.length <
								15 && (
								<button
									onClick={handleButtonClick}
									className='h-[80px] flex text-stone-400 justify-center items-center w-[80px] border-2 border-stone-300 border-dashed'
								>
									<MdAddToPhotos className='w-10 h-10' />
								</button>
							)}

						<input
							ref={fileInputRef}
							accept='image/*'
							type='file'
							multiple
							onChange={handlePhotoUpload}
							style={{ display: 'none' }}
						/>
					</ul>
					<TextField
						margin='dense'
						id='name'
						label='Название'
						type='text'
						fullWidth
						onChange={(e: any) => {
							setNewAdvrtData({ ...newAdvrtData, title: e.target.value })
						}}
						value={newAdvrtData.title}
						variant='standard'
					/>
					<TextField
						margin='dense'
						id='price'
						label='Цена'
						type='number'
						onChange={(e: any) => {
							setNewAdvrtData({ ...newAdvrtData, price: e.target.value })
						}}
						fullWidth
						value={newAdvrtData.price}
						variant='standard'
					/>
					<TextField
						margin='dense'
						id='adress'
						label='Адрес'
						onChange={(e: any) => {
							setNewAdvrtData({ ...newAdvrtData, adress: e.target.value })
						}}
						type='text'
						fullWidth
						value={newAdvrtData.adress}
						variant='standard'
					/>

					<h1 className='mt-6 text-center text-xl'>Категория</h1>

					<FormControl
						sx={{ marginTop: '30px', marginBottom: '5px', minWidth: '100%' }}
					>
						<select
							id='category'
							value={newAdvrtData.category}
							onChange={handleChangeCategory}
							className='w-full p-2 border border-gray-300 rounded-md'
						>
							{categories.map(cat => (
								<option key={cat.name} value={cat.name}>
									{cat.name}
								</option>
							))}
						</select>
					</FormControl>

					<FormControl
						sx={{ marginTop: '20px', marginBottom: '5px', minWidth: '100%' }}
					>
						<select
							id='subcategory'
							value={newAdvrtData.subcategory}
							onChange={handleChangeSubcategory}
							className='w-full p-2 border border-gray-300 rounded-md'
						>
							{categories
								.find(cat => cat.name === newAdvrtData.category)
								?.subcategories.map(sub => (
									<option key={sub} value={sub}>
										{sub}
									</option>
								))}
						</select>
					</FormControl>

					<div className='mt-7'>
						<textarea
							placeholder='Описание'
							rows={10}
							onChange={(e: any) => {
								setNewAdvrtData({
									...newAdvrtData,
									description: e.target.value,
								})
							}}
							cols={55}
							value={newAdvrtData.description}
							className='border rounded-xl p-5 border-[#919191] placeholder:text-[#919191]'
						/>
					</div>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseEdit}>Отмена</Button>
					<Button disabled={isLoading} onClick={handleSubmitData}>
						{isLoading ? <>Загрузка...</> : <>Сохранить изменения</>}
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}

export default EditAdvrtModal
