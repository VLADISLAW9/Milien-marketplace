import { Avatar, IconButton } from '@mui/material'
import Menu, { MenuProps } from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { alpha, styled } from '@mui/material/styles'
import { Dispatch } from '@reduxjs/toolkit'
import * as React from 'react'
import { FC } from 'react'
import { AiOutlineUser } from 'react-icons/ai'
import { BsSuitHeartFill } from 'react-icons/bs'
import { FiEdit } from 'react-icons/fi'
import { MdLogout } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../../../../../store/slices/userSlice'
import { IUser } from '../../../../../types/IUser'

const StyledMenu = styled((props: MenuProps) => (
	<Menu
		elevation={0}
		anchorOrigin={{
			vertical: 'bottom',
			horizontal: 'right',
		}}
		transformOrigin={{
			vertical: 'top',
			horizontal: 'right',
		}}
		{...props}
	/>
))(({ theme }) => ({
	'& .MuiPaper-root': {
		borderRadius: 6,
		marginTop: theme.spacing(1),
		minWidth: 180,
		color:
			theme.palette.mode === 'light'
				? 'rgb(55, 65, 81)'
				: theme.palette.grey[300],
		boxShadow:
			'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
		'& .MuiMenu-list': {
			padding: '4px 0',
		},
		'& .MuiMenuItem-root': {
			'& .MuiSvgIcon-root': {
				fontSize: 18,
				color: theme.palette.text.secondary,
				marginRight: theme.spacing(1.5),
			},
			'&:active': {
				backgroundColor: alpha(
					theme.palette.primary.main,
					theme.palette.action.selectedOpacity
				),
			},
		},
	},
}))

interface ICustomizedMenus {
	user: IUser
}

const CustomizedMenus: FC<ICustomizedMenus> = ({ user }) => {
	const dispatch = useDispatch<Dispatch<any>>()
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
	const open = Boolean(anchorEl)
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget)
	}

	const handleExit = () => {
		dispatch(logout())
		setAnchorEl(null)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	return (
		<div className='flex w-[15%]  items-center flex-auto justify-end'>
			<Link to='/favorite'>
				<BsSuitHeartFill className='text-stone-400 w-[22px] h-[22px]  hover:text-red-500 transition-colors' />
			</Link>
			<IconButton
				onClick={handleClick}
				size='small'
				sx={{ ml: 2 }}
				aria-controls={open ? 'account-menu' : undefined}
				aria-haspopup='true'
				aria-expanded={open ? 'true' : undefined}
			>
				<Avatar sx={{ width: 50, height: 50 }}>
					{user.login?.slice(0, 1)}
				</Avatar>
			</IconButton>
			<StyledMenu
				id='demo-customized-menu'
				MenuListProps={{
					'aria-labelledby': 'demo-customized-button',
				}}
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
			>
				<Link to='/my-profile'>
					<MenuItem className='' onClick={handleClose} disableRipple>
						<AiOutlineUser className='mr-1 -translate-x-[2px] w-6 h-6' />
						<h1 className='text-base'>Профиль</h1>
					</MenuItem>
				</Link>
				<div>
					<MenuItem className='' onClick={handleClose} disableRipple>
						<FiEdit className='mr-2 w-5 h-5' />
						<h1 className='text-base'>Редактировать</h1>
					</MenuItem>
				</div>
				<div>
					<MenuItem className='' onClick={handleExit} disableRipple>
						<MdLogout className='mr-1 w-6 h-6' />
						<h1 className='text-base'>Выйти</h1>
					</MenuItem>
				</div>
			</StyledMenu>
		</div>
	)
}

export default CustomizedMenus
