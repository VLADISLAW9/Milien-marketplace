import { Avatar } from '@mui/material'
import { Dispatch } from '@reduxjs/toolkit'
import { FC } from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../../../../store/slices/userSlice'

const UserHeader: FC = () => {
	const dispatch = useDispatch<Dispatch<any>>()

	const handleLogout = () => {
		dispatch(logout())
	}

	return (
		<div className='flex w-[15%] flex-auto justify-end'>
			<Avatar/>
			<button onClick={handleLogout}>Выйти</button>
		</div>
	)
}

export default UserHeader
