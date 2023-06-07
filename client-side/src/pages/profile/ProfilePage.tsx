import { Avatar } from '@mui/material'
import { Dispatch } from '@reduxjs/toolkit'
import { useState } from 'react'
import { BsTelephoneFill } from 'react-icons/bs'
import { MdEmail } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import AdvertisementItem_grid from '../../app/components/ui/Advertisement/AdvertisementItem_grid'
import Loader from '../../app/components/ui/spiner/Loader'
import { useActions } from '../../hooks/use-actions'
import { useTypedSelector } from '../../hooks/use-typed-selector'
import EditModal from './EditModal'

const ProfilePage = () => {
	const { user, isAuth, errorMessage, isLoadingAuth, userAds } =
		useTypedSelector(state => state.user)
	const location = useLocation()
	const [isLoading, setIsLoading] = useState(false)
	const dispatch = useDispatch<Dispatch<any>>()
	const { setUser, setUserAds } = useActions()
	const [open, setOpen] = useState(false)

	const handleOpenEdit = () => {
		setOpen(true)
	}

	const handleCloseEdit = () => {
		setOpen(false)
	}

	if (isLoading || isLoadingAuth || !user) {
		return (
			<div className='flex justify-center items-center mt-44'>
				<Loader />
			</div>
		)
	} else {
		return (
			<div className=''>
				<div className='mt-14 flex'>
					<div className='flex flex-auto w-[25%] flex-col'>
						<Avatar sx={{ width: 150, height: 150, fontSize: 60 }}>
							{user.login?.slice(0, 1)}
						</Avatar>
						<div className='flex mt-10 text-3xl text-center items-center'>
							<h1>{user.login}</h1>
						</div>
						<div className='mt-2'>
							<h1 className='text-stone-400'>
								{user.firstName} {user.lastName}
							</h1>
						</div>
						<div className='mt-3'>
							{user.aboutMe && (
								<p>
									<span className='text-stone-500 font-bold'>Обо мне: </span>
									{user.aboutMe}
								</p>
							)}

							<div className='mt-5 text-stone-500 flex items-center'>
								<BsTelephoneFill className='mr-2 ' />
								<p>{user.phoneNumber}</p>
							</div>
							<div className='mt-3 text-stone-500 flex items-center'>
								<MdEmail className='mr-2 w-5 h-5 ' />
								<p>{user.email}</p>
							</div>
						</div>

						<div className='mt-10 text-center'>
							<button
								onClick={handleOpenEdit}
								className='bg-[#F9CBA4] rounded-md text-[#F17E1B] hover:opacity-80 transition-opacity w-[100%] px-4 py-3'
							>
								Редактировать
							</button>
						</div>
						<EditModal open={open} handleCloseEdit={handleCloseEdit} />
					</div>
					<div className='flex ml-14 flex-auto w-[80%] flex-col'>
						<h1 className='text-3xl font-'>Мои объявления</h1>
						{userAds ? (
							<ul className='grid grid-cols-4 gap-5 mt-7'>
								{userAds.map(advrt => (
									<AdvertisementItem_grid
										advrt_data={advrt}
										mini={true}
										key={advrt.id} // Add a unique key to each item in the map function
									/>
								))}
							</ul>
						) : (
							<h1>У вас нету активных объявлений</h1>
						)}
					</div>
				</div>
			</div>
		)
	}
}

export default ProfilePage
