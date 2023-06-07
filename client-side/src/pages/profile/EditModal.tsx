import {
	Avatar,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
} from '@mui/material'
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
	const [newUsersData, setNewUsersData] = useState({
		firstName: user.firstName,
		lastName: user.lastName,
		aboutMe: user.aboutMe,
	})
	const [isLoading, setIsLoading] = useState(false)
	const [isError, setIsError] = useState(null)
	const location = useLocation()
	const { isAuth } = useTypedSelector(state => state.user)

	const handleSubmitData = async () => {
		if (
			(newUsersData.aboutMe !== user.aboutMe ||
				newUsersData.firstName !== user.firstName ||
				newUsersData.lastName !== user.lastName) &&
			newUsersData.firstName &&
			newUsersData.aboutMe &&
			newUsersData.lastName &&
			user.email &&
			user.phoneNumber &&
			user.login
		) {
			try {
				setIsLoading(true)
				const response = await userService
					.editUserData(
						user.login,
						newUsersData.aboutMe,
						newUsersData.firstName,
						newUsersData.lastName,
						user.email,
						user.phoneNumber
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

	return (
		<div>
			<Dialog open={open} onClose={handleCloseEdit}>
				<DialogTitle>
					<h1 className='text-3xl'>Редактирование профиля</h1>
				</DialogTitle>
				<DialogContent>
					<div className='flex justify-center '>
						<Avatar
							className='mt-3 text-center mb-5'
							sx={{ width: 150, height: 150 }}
						/>
					</div>
					<TextField
						value={newUsersData.firstName}
						onChange={(e: any) => {
							setNewUsersData({ ...newUsersData, firstName: e.target.value })
						}}
						margin='dense'
						id='name'
						label='Имя'
						type='text'
						fullWidth
						variant='standard'
					/>
					<TextField
						value={newUsersData.lastName}
						onChange={(e: any) => {
							setNewUsersData({ ...newUsersData, lastName: e.target.value })
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
							value={newUsersData.aboutMe ? newUsersData.aboutMe : ''}
							onChange={(e: any) => {
								setNewUsersData({ ...newUsersData, aboutMe: e.target.value })
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