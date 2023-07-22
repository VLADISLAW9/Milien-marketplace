import { Avatar } from '@mui/material'
import { Dispatch } from '@reduxjs/toolkit'
import { Dropdown } from 'antd'
import { FC } from 'react'
import { AiOutlineUser } from 'react-icons/ai'
import { BsSuitHeartFill } from 'react-icons/bs'
import { MdLogout } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../../../../../store/slices/userSlice'
import { IUser } from '../../../../../types/IUser'
import Notification from './notifications/Notification'

interface ICustomizedMenus {
	user: IUser
}

const CustomizedMenus: FC<ICustomizedMenus> = ({ user }) => {
	const dispatch = useDispatch<Dispatch<any>>()
	const handleExit = () => {
		dispatch(logout())
	}

	const items: any = [
		{
			key: '1',
			label: (
				<Link to='/my-profile'>
					<div className='flex px-1 py-1 text-stone-500 items-center'>
						<AiOutlineUser className='mr-2 -translate-x-[2px] w-6 h-6' />
						<h1 className='text-lg font-medium'>Мой профиль</h1>
					</div>
				</Link>
			),
		},
		{
			key: '2',
			label: (
				<div
					className='flex px-1 py-1 text-stone-500 items-center hover:text-red-500'
					onClick={handleExit}
				>
					<MdLogout className='mr-2  -translate-x-[2px] w-6 h-6' />
					<h1 className='text-lg  font-medium'>Выйти</h1>
				</div>
			),
		},
	]

	return (
		<div className='flex items-center'>
			<Link to='/favorite'>
				<BsSuitHeartFill className='text-stone-400 w-[22px] h-[22px]  hover:text-red-500 transition-colors' />
			</Link>
			<Notification />
			<Dropdown
				className='ml-5 cursor-pointer'
				menu={{ items }}
				placement='bottomRight'
				trigger={['click']}
			>
				{user.avatar === null ? (
					<Avatar
						className='max-lg:h-20 max-lg:w-20'
						sx={{ width: 50, height: 50 }}
					>
						{user.login?.slice(0, 1)}
					</Avatar>
				) : (
					<Avatar sx={{ width: 50, height: 50 }}>
						<img src={user.avatar} />
					</Avatar>
				)}
			</Dropdown>
		</div>
	)
}

export default CustomizedMenus
