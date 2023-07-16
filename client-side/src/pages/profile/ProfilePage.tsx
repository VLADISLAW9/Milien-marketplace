import { DeleteOutlined } from '@ant-design/icons'
import { Avatar } from '@mui/material'
import { Dispatch } from '@reduxjs/toolkit'
import { message } from 'antd'
import { useEffect, useState } from 'react'
import { BsTelephoneFill } from 'react-icons/bs'
import { MdEmail } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import AdvertisementItem_grid from '../../app/components/ui/Advertisement/AdvertisementItem_grid'
import Loader from '../../app/components/ui/spiner/Loader'
import { useActions } from '../../hooks/use-actions'
import { useFetching } from '../../hooks/use-fetching'
import { useTypedSelector } from '../../hooks/use-typed-selector'
import UserService from '../../services/UserService'
import { IAdvrt } from '../../types/IAdvrt'
import EditModal from './EditModal'

const ProfilePage = () => {
	const { isAuth, errorMessage, isLoadingAuth } = useTypedSelector(
		state => state.user
	)
	const location = useLocation()
	const [userData, setUserData] = useState<any>(null)
	const [userAds, setUserDataAds] = useState<IAdvrt[]>([])
	const dispatch = useDispatch<Dispatch<any>>()
	const { setUser, setUserAds } = useActions()
	const [messageApi, contextHolder] = message.useMessage()
	const [open, setOpen] = useState(false)
	const [fetchUserData, isLoading, userDataError] = useFetching(async () => {
		const fetcher = await UserService.getUserData()
		setUserData(fetcher.data.user)
		dispatch(setUser(fetcher.data.user))
		if (fetcher.data.userAds) {
			setUserDataAds([...fetcher.data.userAds, ...userAds])
			dispatch(setUserAds(fetcher.data.userAds))
		}
	})

	const messageRemoveFromFav = () => {
		messageApi.open({
			type: 'success',
			content: 'Ваше объявление удалено',
			className: 'custom-class',
			icon: <DeleteOutlined style={{ color: 'rgb(220 38 38)' }} />,
			style: {
				color: 'rgb(220 38 38)',
			},
		})
	}

	useEffect(() => {
		fetchUserData()
	}, [])

	const handleOpenEdit = () => {
		setOpen(true)
	}

	const handleCloseEdit = () => {
		setOpen(false)
	}

	const RemoveAdFromMyAds = (id: number) => {
		setUserDataAds(prevFav => prevFav.filter(item => item.id !== id))
		messageRemoveFromFav()
	}

	if (isLoading || isLoadingAuth || !userData) {
		return (
			<div className='flex justify-center items-center mt-44'>
				<Loader />
			</div>
		)
	} else if (userData) {
		return (
			<>
				{contextHolder}
				<div className=''>
					<div className='mt-14 flex max-lg:flex-col'>
						<div className='flex flex-auto w-[25%] max-lg:w-[100%] flex-col'>
							{userData.avatar === null ? (
								<Avatar sx={{ width: 200, height: 200, fontSize: 60 }}>
									{userData.login?.slice(0, 1)}
								</Avatar>
							) : (
								<Avatar sx={{ width: 200, height: 200 }}>
									<img src={userData.avatar} />
								</Avatar>
							)}
							<div className='flex mt-10 text-3xl text-center items-center'>
								<h1>{userData.login}</h1>
							</div>
							<div className='mt-2'>
								<h1 className='text-stone-400'>
									{userData.firstName} {userData.lastName}
								</h1>
							</div>
							<div className='mt-3'>
								{userData.aboutMe && (
									<p>
										<span className='text-stone-500 font-bold'>Обо мне: </span>
										{userData.aboutMe}
									</p>
								)}

								<div className='mt-5 text-stone-500 flex items-center'>
									<BsTelephoneFill className='mr-2 ' />
									<p>{userData.phoneNumber}</p>
								</div>
								<div className='mt-3 text-stone-500 flex items-center'>
									<MdEmail className='mr-2 w-5 h-5 ' />
									<p>{userData.email}</p>
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
						<div className='flex ml-14 flex-auto max-lg:w-[100%] max-lg:ml-0 max-xl:mt-10  w-[80%] flex-col'>
							<h1 className='text-3xl font-'>Мои объявления</h1>
							{userAds ? (
								<ul className='grid grid-cols-4 max-lg:grid-cols-3 max-lg:gap-2 gap-5 mt-7'>
									{userAds.map((advrt: IAdvrt) => (
										<AdvertisementItem_grid
											advrt_data={advrt}
											mini={true}
											onRemoveAdFromMyAds={RemoveAdFromMyAds}
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
			</>
		)
	} else return null
}

export default ProfilePage
