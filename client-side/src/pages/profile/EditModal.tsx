import {
	Avatar,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
} from '@mui/material'
import { Upload } from 'antd'
import { RcFile, UploadChangeParam, UploadFile, UploadProps } from 'antd/es/upload'
import { FC, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useTypedSelector } from '../../hooks/use-typed-selector'
import userService from '../../services/UserService'

interface IEditModal {
	open: boolean
	handleCloseEdit: () => void
}

const EditModal: FC<IEditModal> = ({ open, handleCloseEdit }) => {
	const { user } = useTypedSelector(state => state.user)
	const [newAvatarFile, setNewAvatarFile] = useState<any>('')
	const [avatar, setAvatar] = useState('')
	const [newUsersData, setNewUsersData] = useState(
		user && {
			firstName: user.firstName,
			lastName: user.lastName,
			aboutMe: user.aboutMe,
		}
	)
	const [isLoading, setIsLoading] = useState(false)
	const [isError, setIsError] = useState(null)
	const location = useLocation()
	const { isAuth } = useTypedSelector(state => state.user)

	const handleSubmitData = async () => {
		if (user && newUsersData) {
			if (
				(newUsersData.aboutMe !== user.aboutMe ||
					newUsersData.firstName !== user.firstName ||
					newUsersData.lastName !== user.lastName) &&
				newUsersData.firstName &&
				newUsersData.lastName &&
				user.email &&
				user.phoneNumber &&
				user.login &&
				user.id
			) {
				try {
					setIsLoading(true)
					const response = await userService
						.editUserData(
							user.id,
							user.login,
							newUsersData.aboutMe,
							newUsersData.firstName,
							newUsersData.lastName,
							user.email,
							user.phoneNumber,
							newAvatarFile
						)
						.then(res => {
							handleCloseEdit()
							window.location.reload()
						})
				} catch (e: any) {
					setIsError(e.response.data)
				} finally {
					setIsLoading(false)
				}
			} else {
				handleCloseEdit()
			}
		}
	}

	console.log(newAvatarFile)

	useEffect(() => {
		if (isAuth === true && location.pathname === '/my-profile') {
			try {
				const getUser = async () => {
					const userDate = await userService.getUserData().then(res => {
						setNewUsersData({
							firstName: res.data.user.firstName,
							lastName: res.data.user.lastName,
							aboutMe: res.data.user.aboutMe || '',
						})
					})
				}
				getUser()
			} catch (e) {
				console.log(e)
			} finally {
			}
		}
	}, [])

	

	const getBase64 = (img: RcFile, callback: (url: string) => void) => {
		const reader = new FileReader()
		reader.addEventListener('load', () => callback(reader.result as string))
		reader.readAsDataURL(img)
	}

	const handleUploadAvatar: UploadProps['onChange'] = (
		info: UploadChangeParam<UploadFile>
	) => {
		console.log(info.file.originFileObj)
		setNewAvatarFile(info.file.originFileObj)
		getBase64(info.file.originFileObj as RcFile, url => {
			setAvatar(url)
		})
	}

	return (
		<div>
			<Dialog open={open} onClose={handleCloseEdit}>
				<DialogTitle>
					<h1 className='text-3xl'>Редактирование профиля</h1>
				</DialogTitle>
				<DialogContent>
					<div className='flex justify-center flex-col gap-3 items-center '>
						<Avatar
							src={avatar ? avatar : user.avatar ? user.avatar : ""}
							className='max-lg:h-20 max-lg:w-20'
							sx={{ width: 150, height: 150, fontSize: 50 }}
						>
							{user.login?.slice(0, 1)}
						</Avatar>
						<Upload
							onChange={handleUploadAvatar}
							showUploadList={false}
							maxCount={1}
						>
							<Button sx={{ color: '#BABABA' }}>Загрузить аватар</Button>
						</Upload>
					</div>
					<TextField
						value={newUsersData && newUsersData.firstName}
						onChange={(e: any) => {
							setNewUsersData(
								newUsersData && { ...newUsersData, firstName: e.target.value }
							)
						}}
						margin='dense'
						id='name'
						label='Имя'
						type='text'
						fullWidth
						variant='standard'
					/>
					<TextField
						value={newUsersData && newUsersData.lastName}
						onChange={(e: any) => {
							setNewUsersData(
								newUsersData && { ...newUsersData, lastName: e.target.value }
							)
						}}
						margin='dense'
						id='name'
						label='Фамилия'
						type='text'
						fullWidth
						variant='standard'
					/>
					<div className='mt-7'>
						<textarea
							value={
								newUsersData && newUsersData.aboutMe ? newUsersData.aboutMe : ''
							}
							onChange={(e: any) => {
								setNewUsersData(
									newUsersData && { ...newUsersData, aboutMe: e.target.value }
								)
							}}
							placeholder='Обо мне'
							rows={10}
							cols={55}
							className='border rounded-xl p-5 border-[#919191] placeholder:text-[#919191]'
						/>
					</div>
					{isError && (
						<div className='mt-3'>
							<h1 className='text-sm text-red-500'>{isError}</h1>
						</div>
					)}
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseEdit}>Отмена</Button>
					<Button disabled={isLoading} onClick={handleSubmitData}>
						{isLoading ? <>Загрузка...</> : <>Редактировать</>}
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}

export default EditModal
